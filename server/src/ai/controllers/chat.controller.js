const { detectIntent } = require("../utils/intent.parser");
const { getAIData } = require("../data/ai.data");
const { askOpenAI } = require("../services/openai.service");
const { mockReply } = require("../services/mock.service");
const config = require("../config/ai.config");

const { resolveAnalyticsIntent } = require("../intents/analytics.intent");
const { fetchAnalytics } = require("../services/analytics.service");

exports.chat = async (req, res) => {
  const { message } = req.body;
  const user = req.user;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  const intent = detectIntent(message);
  const data = await getAIData({ intent, user });

  // 🧪 MOCK MODE
  if (!config.ENABLE_AI || config.MOCK_AI) {
    const reply = await mockReply(user.role, message, data);
    return res.json({ mode: "MOCK", intent, reply });
  }

  // 🔍 Analytics intent detection
  const analyticsIntent = resolveAnalyticsIntent(message);

  if (analyticsIntent) {
    const data = await fetchAnalytics(
      analyticsIntent,
      req.headers.authorization
    );

    return res.json({
      role: req.user.role,
      intent: analyticsIntent,
      reply: `Here is the latest ${analyticsIntent
        .replace("_", " ")
        .toLowerCase()} data.`,
      data,
    });
  }

  // 🤖 REAL AI
  try {
    const context =
      data !== null ? [`Relevant hospital data: ${JSON.stringify(data)}`] : [];

    const reply = await askOpenAI({
      role: user.role,
      message,
      context,
    });

    return res.json({ mode: "REAL", intent, reply });
  } catch (err) {
    console.error("AI error → fallback", err.message);
    const reply = await mockReply(user.role, message, data);
    return res.json({ mode: "FALLBACK_MOCK", intent, reply });
  }
};
