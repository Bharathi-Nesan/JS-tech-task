const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event", 
    required: true 
  },
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Registration", registrationSchema);
