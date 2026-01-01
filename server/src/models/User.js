const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["PATIENT", "DOCTOR", "NURSE", "ADMIN", "FINANCE", "SUPER_ADMIN"],
      required: true,
    },

    hospitalId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
