const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },

  specialization: String,
  experienceYears: Number,

  availability: [
    {
      day: String, // Monday
      slots: [String], // "10:00-10:30"
    },
  ],

  hospitalId: { type: String, required: true },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
