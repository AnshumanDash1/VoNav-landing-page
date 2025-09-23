import React from "react";
import "./VoLogo.scss";
import vonavLogo from "../assets/vonav-logo.png"; // ✅ import your image

export default function VoLogo({ size = 50 }) {
  return (
    <div
      className="vo-logo"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <img
        src={vonavLogo}
        alt="VoNav logo"
        style={{ width: "100%", height: "50%" }}
      />
    </div>
  );
}
