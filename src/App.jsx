import React from "react";
import VoLogo from "./components/VoLogo.jsx";
import "./App.scss";

function ActionButton({ children, variant = "primary" }) {
  return (
    <button className={`action-button action-button--${variant}`}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div className="page-shell">
      <div className="hero">
        <div className="hero__halo"></div>
        <header className="hero__header" aria-label="VoNav hero">
          <div className="hero__logo-stack">
            <VoLogo size={88} />
            <span className="hero__brand-name" aria-label="VoNav brand name">
              VoNav
            </span>
          </div>
          <p className="hero__tagline">
            A screen reader you don't have to learn
          </p>
          <div
            className="hero__cta-group"
            role="group"
            aria-label="Primary actions"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSebloM9bIN8uJ-7qQmRnDuG-WNovoJiwKSYTnlHkgGD6hElsw/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ActionButton variant="primary">Waitlist</ActionButton>
            </a>
            <a
              href="https://www.youtube.com/watch?v=LC5k0qVJHwA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ActionButton variant="secondary">Video</ActionButton>
            </a>
          </div>
        </header>
      </div>

      <main>
        <section className="mission" aria-labelledby="mission-heading">
          <div className="mission__card">
            <h2 id="mission-heading">Our Mission</h2>
            <p>Build a screen reader that can work with just your voice.</p>
          </div>
        </section>

        <section className="pain-points" aria-labelledby="pain-heading">
          <div className="pain-points__content">
            <h2 id="pain-heading">No more!</h2>
            <ul className="pain-points__list">
              <li>
                <span className="pain-points__icon" aria-hidden="true">
                  ❌
                </span>
                <span>Memorizing hotkeys</span>
              </li>
              <li>
                <span className="pain-points__icon" aria-hidden="true">
                  ❌
                </span>
                <span>Clicking 20 buttons for 1 email</span>
              </li>
              <li>
                <span className="pain-points__icon" aria-hidden="true">
                  ❌
                </span>
                <span>Not knowing what that image is</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="about" aria-labelledby="about-heading">
          <div className="about__content">
            <h2 id="about-heading">Why we built VoNav</h2>
            <p>
              We built VoNav because screen readers feel like they're stuck decades in the
              past. We wanted something that felt like talking to your friend as they help
              you with your computer. Your friend wouldn't make you memorize a whole new
              language just to talk with you, so we don't expect that either. Your friend
              wouldn't skip half the page, or give up on an image, so we do our best to meet
              that.
            </p>
            <p>
              VoNav is really just our vision to bring screen readers to 2025. We don't want
              this to feel like just another screen reader, but a completely different way of
              using your computer. We're definitely going to have hiccups. It's not going to
              start off perfect. But if we don't build this, screen readers aren't going to
              improve themselves.
            </p>
            <p>
              We hope you love VoNav: a voice-first way to navigate your computer that’s
              fast, natural, and kind of magical. No steep learning curve. No robotic menus.
              Just you, talking to your machine like it’s 2025.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer" role="contentinfo">
        <span>VoNav — Expanding accessibility with playful precision.</span>
      </footer>
    </div>
  );
}
