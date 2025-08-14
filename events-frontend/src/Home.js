import React from "react";
import bgImage from "./assets/bg.jpg"; // Import image
import "./App.css";

function Home() {
  return (
    <div
      className="homepage"
      style={{
        background: `linear-gradient(135deg, rgba(13,13,13,0.8), rgba(26,26,26,0.8)), url(${bgImage}) no-repeat center center`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#e0e0e0",
        textAlign: "center",
      }}
    >
      <h1>Welcome to EventHub</h1>
      <p>Discover and register for amazing events!</p>
    </div>
  );
}

export default Home;
