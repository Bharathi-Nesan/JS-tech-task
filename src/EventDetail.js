import React from "react";
import { useParams, Link } from "react-router-dom";

function EventDetail({ events }) {
  const { id } = useParams();
  const event = events.find((e) => e._id === id);

  if (!event) return <h2 style={{ color: "#e0e0e0" }}>Event not found</h2>;

  return (
    <div className="app-container" style={{ padding: "40px" }}>
      <h1 style={{ color: "#00ffe0" }}>{event.name}</h1>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <Link to="/" style={{ color: "#fffb00", marginTop: "20px", display: "inline-block" }}>
        ← Back to Events
      </Link>
    </div>
  );
}

export default EventDetail;
