import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import EventDetail from "./EventDetail";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">EventHub</div>
          <div className="dropdown">
            <button className="dropbtn">Menu ▾</button>
            <div className="dropdown-content">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/events">Events</Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/events"
            element={
              <div className="events-grid">
                {events.map((event) => (
                  <Link
                    to={`/event/${event._id}`}
                    key={event._id}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="event-card">
                      <h2>{event.name}</h2>
                      <p>{event.description}</p>
                      <span className="date">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            }
          />
          <Route path="/event/:id" element={<EventDetail events={events} />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          © 2025 EventHub. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
