const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    startTime: {
      type: String, // "09:00"
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["BOOKED", "CANCELLED", "COMPLETED"],
      default: "BOOKED",
    },
  },
  { timestamps: true }
);

// 🔒 Prevent double booking
appointmentSchema.index(
  { doctorId: 1, date: 1, startTime: 1 },
  { unique: true }
);
appointmentSchema.index({ doctorId: 1, date: 1 });
appointmentSchema.index({ patientId: 1 });

module.exports = mongoose.model("Appointment", appointmentSchema);
