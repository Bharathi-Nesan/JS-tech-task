
const mongoose = require("mongoose");
const Event = require("./models/Event");

mongoose.connect("mongodb://localhost/eventsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Connected to MongoDB, seeding events...");

  await Event.deleteMany(); // Clear old data

  await Event.insertMany([
    { name: "TechSprint 2025", description: "A 24-hour hackathon", date: "2025-09-15" },
    { name: "CodeFest 2025", description: "Programming contest", date: "2025-10-05" }
  ]);

  console.log("Events seeded successfully!");
  mongoose.connection.close();
});
