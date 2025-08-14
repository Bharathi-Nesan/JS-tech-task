import React from "react";
import contactBg from "./assets/bg-contact.avif"; // import image
import "./App.css";

function Contact() {
  return (
    <div
      className="page-background"
      style={{
        background: `linear-gradient(135deg, rgba(13,13,13,0.8), rgba(26,26,26,0.8)), url(${contactBg}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>Email: support@eventhub.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>
    </div>
  );
}

export default Contact;
