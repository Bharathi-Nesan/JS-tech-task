const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Models
const Event = require("./models/Event");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/eventsDB")
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Seed events if none exist
    const count = await Event.countDocuments();
    if (count === 0) {
      await Event.insertMany([
        { name: "TechSprint 2025", description: "A 24-hour hackathon", date: "2025-09-15" },
        { name: "CodeFest 2025", description: "Coding competition", date: "2025-10-01" },
        { name: "AI Workshop", description: "Hands-on AI workshop", date: "2025-10-20" }
      ]);
      console.log("🌱 Seeded default events");
    }
  })
  .catch(err => console.error(err));

// ======================
// Routes
// ======================

// GET all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single event by ID
// Get single event details
app.get("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const event = events.find(e => e.id === eventId);
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
});

// Register for an event
app.post("/events/:id/register", (req, res) => {
  const { rollNumber } = req.body;
  const eventId = req.params.id;
  // Save registration in DB
  registrations.push({ eventId, rollNumber });
  res.json({ message: "Registration successful!" });
});


// PUT update an event
app.put("/events/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an event
app.delete("/events/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
    res.json({ message: `Event '${deletedEvent.name}' deleted successfully.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
