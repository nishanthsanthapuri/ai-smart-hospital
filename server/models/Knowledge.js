const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["POLICY", "MEDICAL", "BILLING", "FAQ"],
      required: true,
    },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Knowledge", knowledgeSchema);
