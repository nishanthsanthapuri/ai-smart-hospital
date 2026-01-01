import { answerFromDB } from "./ai.services/db.ai.service.js";
import { mockAnswer } from "./mock/mock.ai.js";
import { realAnswer } from "./real/openai.service.js";

export const aiChatController = async (req, res) => {
  const { message } = req.body;
  const { role } = req.user;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  try {
    /* 🧠 Try DB-based answer first */
    const dbAnswer = await answerFromDB({
      message,
      role,
      user: req.user,
    });

    if (dbAnswer) {
      return res.json({
        source: "DATABASE",
        answer: dbAnswer,
      });
    }

    /* 🎭 MOCK MODE */
    if (process.env.MOCK_AI === "true") {
      return res.json({
        source: "MOCK",
        answer: mockAnswer({ message, role }),
      });
    }

    /* 🤖 REAL AI */
    const answer = await realAnswer({ message, role });
    return res.json({
      source: "OPENAI",
      answer,
    });
  } catch (err) {
    console.error("AI ERROR:", err.message);
    return res.status(503).json({
      error: "AI service unavailable",
    });
  }
};
