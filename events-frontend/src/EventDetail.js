import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "./PageLayout";
import eventBg from "./assets/bg-event.jpg";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then(res => res.json())
      .then(data => setEvent(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Trim input to remove extra spaces
    const trimmedName = name.trim();
    const trimmedRoll = rollNumber.trim();

    if (!trimmedName || !trimmedRoll) {
      setMessage("❌ Student name and roll number are required!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/events/${id}/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 
    studentName: trimmedName,   // <-- change from 'name' to 'studentName'
    rollNumber: trimmedRoll, 
    email: email.trim() 
  })
});


      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Registered successfully!");
        setName(""); setRollNumber(""); setEmail("");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Registration failed.");
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <PageLayout background={eventBg}>
      <div className="event-detail">
        <h1>{event.name}</h1>
        <p>{event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

        <h2>Register for this event</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleRegister}>
            <input
  type="text"
  placeholder="Your Name"
  value={name}
  onChange={e => { setName(e.target.value); setMessage(""); }}
/>
<input
  type="text"
  placeholder="Roll Number"
  value={rollNumber}
  onChange={e => { setRollNumber(e.target.value); setMessage(""); }}
/>

          
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={e => { setEmail(e.target.value); setMessage(""); }}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </PageLayout>
  );
}

export default EventDetail;
