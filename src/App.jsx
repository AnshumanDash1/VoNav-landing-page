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
            <ActionButton variant="primary">Buy Now</ActionButton>
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
      </main>

      <footer className="footer" role="contentinfo">
        <span>VoNav — Expanding accessibility with playful precision.</span>
      </footer>
    </div>
  );
}
