const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema(
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

    symptoms: {
      type: [String],
      required: true,
    },

    diagnosis: {
      type: String,
    },

    admissionRequired: {
      type: Boolean,
      default: false,
    },

    // 🔴 NEW — VISIT LIFECYCLE STATUS
    status: {
      type: String,
      enum: ["OPD", "ADMITTED", "DISCHARGED"],
      default: "OPD",
    },

    // 🔴 NEW — TIMELINE FIELDS
    checkInTime: {
      type: Date,
      default: Date.now,
    },

    admissionTime: {
      type: Date,
    },

    dischargeDate: {
      type: Date,
    },

    hospitalId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

VisitSchema.index({ patientId: 1 });
VisitSchema.index({ status: 1 });

module.exports = mongoose.model("Visit", VisitSchema);
