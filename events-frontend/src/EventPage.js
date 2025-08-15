import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function EventPage({ events }) {
  const { id } = useParams();
  const event = events.find((e) => e._id === id);
  const [rollNumber, setRollNumber] = useState("");
  const [registeredRolls, setRegisteredRolls] = useState([]);

  const handleRegister = () => {
    if (rollNumber.trim() && !registeredRolls.includes(rollNumber)) {
      setRegisteredRolls([...registeredRolls, rollNumber]);
      setRollNumber("");
    }
  };

  if (!event) return <h2>Loading event...</h2>;

  return (
    <div className="event-detail">
      <h1>{event.name}</h1>
      <p><strong>Description:</strong> {event.description || "No description provided."}</p>
      <p><strong>Participation:</strong> {event.participation || "Details coming soon."}</p>
      <h3>Rules:</h3>
      <ul>
        {event.rules && event.rules.length > 0
          ? event.rules.map((rule, index) => <li key={index}>{rule}</li>)
          : <li>No rules provided.</li>}
      </ul>

      <h3>Register</h3>
      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>

      {registeredRolls.length > 0 && (
        <>
          <h4>Registered Students:</h4>
          <ul>
            {registeredRolls.map((roll, index) => (
              <li key={index}>{roll}</li>
            ))}
          </ul>
        </>
      )}

      <br />
      <Link to="/events">⬅ Back to Events</Link>
    </div>
  );
}
