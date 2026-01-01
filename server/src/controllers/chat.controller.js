const Chat = require("../models/Chat");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Room = require("../models/Room");
const Bill = require("../models/Bill");

const { askLLM } = require("../services/ai.service");

const { analyzeSymptoms } = require("../services/symptom.service");

async function buildContext(user) {
  const hospitalId = user.hospitalId;
  let context = "";

  if (user.role === "ADMIN") {
    const rooms = await Room.find({ hospitalId });
    const bills = await Bill.find({ hospitalId });

    context += `Total rooms: ${rooms.length}\n`;
    context += `Total bills: ${bills.length}\n`;
  }

  if (user.role === "DOCTOR") {
    const appointments = await Appointment.find({
      doctorId: user.id,
      hospitalId,
    });

    context += `You have ${appointments.length} appointments.\n`;
  }

  if (user.role === "PATIENT") {
    const bills = await Bill.find({
      patientId: user.id,
      hospitalId,
    });

    context += `Your bill count: ${bills.length}\n`;
  }

  return context || "No additional hospital data available.";
}

exports.askChatbot = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  const context = await buildContext(req.user);

  if (req.user.role === "PATIENT" && message.toLowerCase().includes("pain")) {
    const analysis = analyzeSymptoms(message);

    return res.json({
      answer: `Based on your symptoms, you may consult: ${analysis.departments.join(
        ", "
      )}. Urgency level: ${
        analysis.urgency
      }. This is educational guidance only.`,
      confidence: 0.85,
    });
  }

  const answer = await askLLM({
    role: req.user.role,
    message,
    context,
  });

  await Chat.create({
    userId: req.user.id,
    role: req.user.role,
    question: message,
    answer,
    confidence: 0.8,
    hospitalId: req.user.hospitalId,
  });

  res.json({
    answer,
    confidence: 0.8,
  });
};
