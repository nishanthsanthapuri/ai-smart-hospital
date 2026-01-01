const mongoose = require("mongoose");

const aiUsageLogSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    role: String,
    question: String,
    response: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIUsageLog", aiUsageLogSchema);
