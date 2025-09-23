import React from "react";
import "./VoLogo.scss";

export default function VoLogo({ size = 72 }) {
  return (
    <div className="vo-logo" style={{ width: size, height: size }} aria-hidden="true">
      <svg
        viewBox="0 0 160 96"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="VoNav logo"
      >
        <defs>
          <linearGradient id="vo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7D2D9D" />
            <stop offset="50%" stopColor="#C74D8D" />
            <stop offset="100%" stopColor="#FDD92C" />
          </linearGradient>
          <radialGradient id="vo-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
        </defs>
        <g filter="url(#softGlow)">
          <path
            d="M7 7c-4.2 0-7 3.5-7 7.8 0 1.7 0.4 3.4 1.1 4.9l35.6 73.2c2.4 4.9 7.6 3.2 9.4-0.5l21.3-46.1 21.3 46.1c1.8 3.7 7 5.4 9.4 0.5l35.6-73.2c0.7-1.5 1.1-3.2 1.1-4.9C134.8 10.5 132 7 127.8 7H111c-3 0-5.7 1.8-7 4.5L76.4 60 48.8 11.5C47.5 8.8 44.8 7 41.8 7H7z"
            fill="url(#vo-gradient)"
          />
          <circle cx="129" cy="48" r="41" fill="url(#vo-gradient)" />
          <circle cx="129" cy="48" r="18" fill="#fff" opacity="0.9" />
          <circle cx="129" cy="48" r="10" fill="#FDD92C" />
        </g>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <circle cx="80" cy="48" r="60" fill="url(#vo-glow)" />
      </svg>
    </div>
  );
}
