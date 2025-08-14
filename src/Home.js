import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app-container" style={{ padding: "40px" }}>
      <h1 style={{ color: "#00ffe0" }}>Welcome to EventHub</h1>
      <p>Discover upcoming events and stay updated!</p>
      <Link to="/events" style={{ color: "#fffb00", marginTop: "20px", display: "inline-block" }}>
        View Events →
      </Link>
    </div>
  );
}

export default Home;
