const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    dayOfWeek: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    startTime: { type: String, required: true }, // "09:00"
    endTime: { type: String, required: true }, // "12:00"
    slotDuration: { type: Number, default: 15 }, // minutes
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoctorAvailability", availabilitySchema);
