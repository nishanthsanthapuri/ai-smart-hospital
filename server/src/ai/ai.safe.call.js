import { shouldUseMock } from "./ai.mode.js";
import { mockAnswer } from "./mock/mock.ai.js";
import { realAnswer } from "./real/openai.service.js";

export const getAIResponse = async ({ message, role, context }) => {
  if (shouldUseMock()) {
    return mockAnswer({ message, role });
  }

  try {
    return await realAnswer({ message, role, context });
  } catch (err) {
    console.error("⚠️ OpenAI failed. Falling back to MOCK:", err.message);
    return mockAnswer({ message, role });
  }
};
