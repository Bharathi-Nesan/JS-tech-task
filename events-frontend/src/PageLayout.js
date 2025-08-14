import React from "react";
import "./App.css";

function PageLayout({ background, children }) {
  return (
    <div
      className="page-background"
      style={{
        background: `linear-gradient(135deg, rgba(13,13,13,0.8), rgba(26,26,26,0.8)), url(${background}) no-repeat center center`,
        backgroundSize: "cover",
      }}
    >
      <div className="page-content">{children}</div>
    </div>
  );
}

export default PageLayout;
