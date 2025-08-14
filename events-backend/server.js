const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Helper function to read events
const readEvents = () => {
  try {
    const data = fs.readFileSync("events.json");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Helper function to write events
const writeEvents = (events) => {
  fs.writeFileSync("events.json", JSON.stringify(events, null, 2));
};

// GET all events
app.get("/events", (req, res) => {
  const events = readEvents();
  res.json(events);
});

// POST a new event
app.post("/events", (req, res) => {
  const events = readEvents();
  const newEvent = req.body;
  newEvent._id = Date.now().toString(); // unique id
  events.push(newEvent);
  writeEvents(events);
  res.status(201).json(newEvent);
});

// DELETE an event by ID
app.delete("/events/:id", (req, res) => {
  let events = readEvents();
  const eventId = req.params.id;

  const index = events.findIndex(e => e._id === eventId);
  if (index === -1) return res.status(404).json({ message: "Event not found" });

  const deletedEvent = events.splice(index, 1)[0];
  writeEvents(events);
  res.json({ message: "Event deleted", event: deletedEvent });
});

// PATCH / Update an event by ID
app.patch("/events/:id", (req, res) => {
  let events = readEvents();
  const eventId = req.params.id;

  const event = events.find(e => e._id === eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  Object.assign(event, req.body); // update fields
  writeEvents(events);
  res.json({ message: "Event updated", event });
});

app.listen(5000, () => console.log("Server running on port 5000"));
