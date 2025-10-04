"""Utility tools for navigating a browser session with Playwright."""
from __future__ import annotations

import logging
import re
from dataclasses import dataclass

from playwright.sync_api import (  # type: ignore
    Error as PlaywrightError,
    TimeoutError as PlaywrightTimeoutError,
    Locator,
    Page,
    sync_playwright,
)

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="[%(levelname)s] %(asctime)s %(name)s: %(message)s",
)


DEFAULT_TIMEOUT = 20_000


@dataclass
class ClickResult:
    """Represents the result of an attempted click."""

    success: bool
    locator_strategy: str
    error: str | None = None


class BrowserNavTools:
    """Helper wrapper exposing high level navigation actions for agents."""

    def __init__(self, page: Page) -> None:
        self.page = page

    def open_url(self, url: str) -> None:
        logger.info("Opening URL: %s", url)
        self.page.goto(url, wait_until="domcontentloaded")

    def wait_for_network_idle(self, timeout: int = DEFAULT_TIMEOUT) -> None:
        logger.info("Waiting for network idle")
        self.page.wait_for_load_state("networkidle", timeout=timeout)

    def type_text(
        self,
        role: str,
        name: str,
        value: str,
        *,
        clear: bool = True,
        timeout: int = DEFAULT_TIMEOUT,
    ) -> None:
        logger.info("Typing into element role=%s name=%s", role, name)
        locator = self._get_role_locator(role, name)
        locator.wait_for(state="visible", timeout=timeout)
        locator.scroll_into_view_if_needed(timeout=timeout)
        if clear:
            locator.fill(value, timeout=timeout)
        else:
            locator.type(value, delay=50)

    def click_text(
        self,
        role: str,
        name: str,
        *,
        exact: bool = False,
        timeout: int = DEFAULT_TIMEOUT,
    ) -> ClickResult:
        """Click an element using its role and accessible name."""

        logger.info("Attempting click role=%s name=%s (exact=%s)", role, name, exact)
        attempts = []

        # Candidate locators from most to least specific
        locators = []
        locators.append(("role_name", self.page.get_by_role(role, name=name, exact=exact)))
        if not exact:
            pattern = re.compile(re.escape(name), re.IGNORECASE)
            locators.append(("role_regex", self.page.get_by_role(role, name=pattern)))
        locators.append(("text_locator", self.page.get_by_text(name, exact=exact)))

        for strategy, locator in locators:
            try:
                first = locator.first
                first.wait_for(state="visible", timeout=timeout)
                first.scroll_into_view_if_needed(timeout=timeout)
                first.click()
                logger.info("Click success using strategy=%s", strategy)
                return ClickResult(True, strategy)
            except PlaywrightTimeoutError as exc:
                logger.debug("Timeout using strategy=%s: %s", strategy, exc)
                attempts.append(f"{strategy}: timeout")
            except PlaywrightError as exc:  # type: ignore[misc]
                logger.debug("Playwright error using strategy=%s: %s", strategy, exc)
                attempts.append(f"{strategy}: {exc}")

        error_message = "; ".join(attempts) or "No matching locator found"
        logger.error("Failed to click role=%s name=%s. Attempts: %s", role, name, error_message)
        return ClickResult(False, "", error_message)

    def _get_role_locator(self, role: str, name: str) -> Locator:
        try:
            return self.page.get_by_role(role, name=name)
        except PlaywrightError:
            pattern = re.compile(re.escape(name), re.IGNORECASE)
            return self.page.get_by_role(role, name=pattern)


# --------------------------- Manual smoke tests ---------------------------

def _youtube_navigation_smoke_test(query: str = "lofi hip hop") -> None:
    logger.info("Starting YouTube smoke test with query: %s", query)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        tools = BrowserNavTools(page)

        tools.open_url("https://www.youtube.com/")
        try:
            tools.click_text("button", "Accept all")
        except Exception:  # noqa: BLE001
            logger.info("No cookie dialog detected")

        tools.click_text("combobox", "Search")
        tools.type_text("combobox", "Search", query)
        tools.click_text("button", "Search")
        tools.wait_for_network_idle()

        first_video = page.locator("ytd-video-renderer a#video-title").first
        title = first_video.inner_text(timeout=DEFAULT_TIMEOUT).strip()
        logger.info("First video title: %s", title)
        click_result = tools.click_text("link", title)
        if not click_result.success:
            logger.info("Falling back to direct click on first video")
            first_video.click()

        tools.wait_for_network_idle()
        logger.info("Page title after navigating: %s", page.title())

        # Ensure the player is present and play/pause button is accessible
        play_button = page.get_by_role("button", name=re.compile("play", re.IGNORECASE))
        try:
            play_button.wait_for(state="visible", timeout=DEFAULT_TIMEOUT)
            logger.info("Play button located. Toggling to ensure playback")
            play_button.click()
        except PlaywrightTimeoutError:
            logger.warning("Could not locate play button")

        logger.info("YouTube smoke test finished")
        browser.close()


if __name__ == "__main__":
    _youtube_navigation_smoke_test()
