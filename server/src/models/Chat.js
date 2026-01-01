const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    role: {
      type: String,
      enum: ["PATIENT", "DOCTOR", "ADMIN", "FINANCE"],
    },

    question: String,
    answer: String,

    confidence: {
      type: Number,
      default: 0,
    },

    hospitalId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
