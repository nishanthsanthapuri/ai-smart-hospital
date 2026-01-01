const { retrieveRelevantKnowledge } = require("../services/knowledgeService");
const knowledge = await retrieveRelevantKnowledge(question);

const { validateAIQuestion } = require("../config/aiGuardrails");
const AIUsageLog = require("../models/AIUsageLog");

const validation = validateAIQuestion(question, role);
if (!validation.ok) {
  return res.json({ answer: validation.reason });
}

console.log("Retrieved Knowledge:", knowledge.length);
function buildKnowledgeContext(knowledgeDocs = []) {
  if (!knowledgeDocs.length) return "";

  return knowledgeDocs
    .map((k, i) => `${i + 1}. ${k.title}: ${k.content}`)
    .join("\n");
}

await AIUsageLog.create({
  userId: req.user._id,
  role,
  question,
  response: answer,
});

const systemPrompt = `
You are an AI assistant for a hospital management system.
Role: ${role}

Use the following hospital knowledge when relevant:
${knowledgeContext || "No additional hospital knowledge available."}

Answer clearly and concisely.
`;
