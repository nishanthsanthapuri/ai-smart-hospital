const { askOpenAI } = require("../services/openai.service");
const { mockReply } = require("../services/mock.service");
const config = require("../config/ai.config");

exports.chat = async (req, res) => {
  const { message } = req.body;
  const { role } = req.user;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  // 🧪 FORCE MOCK
  if (!config.ENABLE_AI || config.MOCK_AI) {
    const reply = await mockReply(role, message);
    return res.json({
      role,
      mode: "MOCK",
      reply,
    });
  }

  // 🤖 TRY REAL AI
  try {
    const reply = await askOpenAI({
      role,
      message,
    });

    return res.json({
      role,
      mode: "REAL",
      reply,
    });
  } catch (err) {
    console.error("⚠️ OpenAI failed, falling back to MOCK:", err.message);

    const reply = await mockReply(role, message);

    return res.json({
      role,
      mode: "FALLBACK_MOCK",
      reply,
    });
  }
};
