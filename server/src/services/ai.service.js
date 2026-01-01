let client = null;

if (process.env.ENABLE_AI === "true") {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required when ENABLE_AI=true");
  }

  const OpenAI = require("openai");
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

exports.askLLM = async ({ role, message, context }) => {
  if (!client) {
    return "(AI disabled) Please contact hospital staff for assistance.";
  }

  const systemPrompt = `
You are an AI assistant for a hospital system.
Role: ${role}
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
};
