import OpenAI from "openai";
import { ROLE_PROMPTS } from "../prompts/role.prompts.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const realAnswer = async ({ message, role }) => {
  const systemPrompt =
    ROLE_PROMPTS[role] || "You are a helpful hospital AI assistant.";

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
