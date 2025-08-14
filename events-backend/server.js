const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Models
const Event = require("./models/Event");
const Registration = require("./models/Registration");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/eventsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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
app.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new event
app.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
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

// POST register a student for an event
app.post("/events/:id/register", async (req, res) => {
 const { name, rollNumber, email } = req.body;

if (!name || !rollNumber) {
  return res.status(400).json({ message: "Student name and roll number are required" });
}


  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const registration = new Registration({
      eventId: event._id,
      studentName,
      rollNumber,
      email
    });

    const savedRegistration = await registration.save();
    res.status(201).json({ message: "Student registered successfully", registration: savedRegistration });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all registrations for an event
app.get("/events/:id/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.id });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
