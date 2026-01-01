const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 10_000, // ⏱️ 10 seconds max
});

exports.askOpenAI = async (prompt) => {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a hospital AI assistant. Answer clearly and safely.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 250,
  });

  return response.choices[0].message.content;
};
