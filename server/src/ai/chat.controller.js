const { searchVectorStore } = require("./vector/vector.store");

exports.chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;
    const { role, id, hospitalId } = req.user;
    const { getMemory, addToMemory } = require("../memory/memory.store");

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 🧪 MOCK MODE
    if (process.env.MOCK_AI_MODE === "true") {
      return res.json({
        answer: buildMockAnswer(role, question),
      });
    }
    const userId = req.user.id;
    const memory = getMemory(userId);
    addToMemory(userId, "user", message);
    // (Future real AI logic goes here)
    const reply = await askOpenAI({
      role: user.role,
      message,
      context,
      history: memory, // 👈 MEMORY
    });

    addToMemory(userId, "assistant", reply);

    return res.json({
      answer: "AI service temporarily unavailable",
    });
  } catch (err) {
    console.error("AI CHAT ERROR:", err.message);

    // ✅ FAIL-SAFE RESPONSE
    res.json({
      answer:
        "⚠️ AI service is temporarily unavailable. Please try again later.",
    });
  }
};

// 🔐 ROLE-BASED MOCK ANSWERS
function buildMockAnswer(role, question) {
  if (role === "ADMIN") {
    return `
(Admin AI)
You asked: "${question}"

As an Admin, you can view:
• Hospital analytics
• Departments
• Doctors
• Beds
• Patient flow

(Mock AI response)
`;
  }

  if (role === "DOCTOR") {
    return `
(Doctor AI)
You asked: "${question}"

As a Doctor, you can view:
• Your appointments
• Your patients
• Your department schedule

(Mock AI response)
`;
  }

  if (role === "PATIENT") {
    return `
(Patient AI)
You asked: "${question}"

As a Patient, you can view:
• Your appointments
• Available doctors
• Departments

(Mock AI response)
`;
  }

  return "AI response unavailable for this role.";
}
