// src/EventDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventDetail() {
  const { id } = useParams(); // get event ID from URL
  const [event, setEvent] = useState(null);
  const [rollNumber, setRollNumber] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleRegister = () => {
    fetch(`http://localhost:5000/events/${id}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rollNumber }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || "Registered successfully!"))
      .catch((err) => console.error(err));
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{event.name}</h1>
      <p>{event.description}</p>

      <h3>Participation Details</h3>
      <p>{event.participation}</p>

      <h3>Rules</h3>
      <ul>
        {event.rules && event.rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>

      <h3>Register</h3>
      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
