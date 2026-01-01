const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.askLLM = async ({ role, message, context }) => {
  const systemPrompt = `
You are an AI assistant for a hospital system.

Rules:
- You DO NOT diagnose diseases.
- You provide educational and operational assistance only.
- You are role-aware: ${role}.
- You answer ONLY using provided context.
- If unsure, say you are not confident.

Context:
${context}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    temperature: 0.3,
  });

  return response.choices[0].message.content;

  return {
    role: "PATIENT",
    intent: "SYMPTOM_CHECK",
    departmentHint: "Cardiology",
    requiresConfirmation: true,
    message:
      "Based on your symptoms, Cardiology may be suitable. Would you like me to check available doctors and book the earliest appointment?",
  };
};
