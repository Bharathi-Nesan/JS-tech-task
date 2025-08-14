const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Event = require("./models/Event");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/eventsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("✅ Connected to MongoDB");

  // Seed events only if none exist
  const count = await Event.countDocuments();
  if (count === 0) {
    await Event.insertMany([
      {
        name: "TechSprint 2025",
        description: "A 24-hour hackathon focusing on AI and web development.",
        date: "2025-09-15"
      },
      {
        name: "CodeFest 2025",
        description: "A programming contest for developers of all levels.",
        date: "2025-10-05"
      },
      {
        name: "DesignCon 2025",
        description: "Conference for UI/UX and product designers.",
        date: "2025-11-20"
      }
    ]);
    console.log("🌱 Seeded default events");
  }
}).catch(err => console.error(err));

// Routes
app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
