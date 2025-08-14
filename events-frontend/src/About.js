import React from "react";
import aboutBg from "./assets/bg-about.avif"; // import image
import "./App.css";

function About() {
  return (
    <div
      className="page-background"
      style={{
        background: `linear-gradient(135deg, rgba(13,13,13,0.8), rgba(26,26,26,0.8)), url(${aboutBg}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <div className="page-content">
        <h1>About EventHub</h1>
        <p>
          EventHub is your ultimate platform to discover, register, and manage events seamlessly.
        </p>
      </div>
    </div>
  );
}

export default About;
