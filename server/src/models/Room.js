const mongoose = require("mongoose");

const BedSchema = new mongoose.Schema({
  bedNumber: {
    type: String,
    required: true,
  },
  occupied: {
    type: Boolean,
    default: false,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
});

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
    },

    floor: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["ICU", "GENERAL", "PRIVATE"],
      required: true,
    },

    beds: [BedSchema],

    hospitalId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
