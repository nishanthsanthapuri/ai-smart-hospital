const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    // 🔗 LINK TO LOGIN USER (CRITICAL)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      sparse: true, // allows multiple patients without user (future-safe)
    },

    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["REGISTERED", "OPD", "ADMITTED", "DISCHARGED"],
      default: "REGISTERED",
    },

    hospitalId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);

// const mongoose = require("mongoose");

// const PatientSchema = new mongoose.Schema(
//   {
//     name: String,
//     age: Number,
//     gender: String,
//     phone: String,

//     status: {
//       type: String,
//       enum: ["REGISTERED", "OPD", "ADMITTED", "DISCHARGED"],
//       default: "REGISTERED",
//     },

//     hospitalId: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Patient", PatientSchema);
