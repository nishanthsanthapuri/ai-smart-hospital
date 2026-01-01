const { ChatOpenAI } = require("@langchain/openai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.2,
  maxTokens: 300,
  apiKey: process.env.OPENAI_API_KEY,
});

exports.askOpenAI = async ({ role, message, context = [], history = [] }) => {
  const systemPrompt = `
You are an AI assistant for a hospital system.

User role: ${role}

Rules:
- Be concise
- Never hallucinate numbers
- If data is missing, say so
`;

  //   const messages = [
  //     new SystemMessage(systemPrompt),
  //     ...(context || []).map((c) => new SystemMessage(c)),
  //     new HumanMessage(message),
  //   ];

  const messages = [
    {
      role: "system",
      content: `You are a hospital AI assistant. User role: ${role}`,
    },
    ...context.map((c) => ({
      role: "system",
      content: c,
    })),
    ...history,
    {
      role: "user",
      content: message,
    },
  ];

  const res = await model.invoke(messages);
  return res.content;
};
