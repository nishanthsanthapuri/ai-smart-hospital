const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },
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
    consultationFee: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["UNPAID", "PAID"],
      default: "UNPAID",
    },
    paidAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
