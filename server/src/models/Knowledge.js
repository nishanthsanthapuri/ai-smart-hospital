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

knowledgeSchema.index({ title: "text", tags: "text" });

module.exports = mongoose.model("Knowledge", knowledgeSchema);
