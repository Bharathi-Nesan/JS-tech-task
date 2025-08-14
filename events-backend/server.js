const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let events = [
  { id: 1, name: "TechSprint 2025", description: "A 24-hour hackathon", date: "2025-09-15" },
  { id: 2, name: "CodeFest 2025", description: "Coding competition", date: "2025-10-01" },
  { id: 3, name: "AI Workshop", description: "Hands-on AI workshop", date: "2025-10-20" }
];

// GET all events
app.get('/events', (req, res) => {
  res.json(events);
});

// POST a new event
app.post('/events', (req, res) => {
  const newEvent = { id: Date.now(), ...req.body };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// DELETE an event by ID
app.delete('/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  events = events.filter(event => event.id !== id);
  res.json({ message: 'Event deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
