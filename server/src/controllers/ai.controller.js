exports.analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.trim().length < 3) {
      return res.status(400).json({
        error: "Please provide valid symptoms",
      });
    }

    // TEMP: Rule-based logic (AI-ready)
    let response = {
      condition: "General Checkup Recommended",
      urgency: "Low",
      department: "General Medicine",
      advice: "Please consult a doctor if symptoms persist",
    };

    const text = symptoms.toLowerCase();

    if (text.includes("chest") || text.includes("breath")) {
      response = {
        condition: "Possible Cardiac / Respiratory Issue",
        urgency: "High",
        department: "Cardiology",
        advice: "Seek immediate medical attention",
      };
    } else if (text.includes("fever") || text.includes("headache")) {
      response = {
        condition: "Possible Viral Infection",
        urgency: "Medium",
        department: "General Medicine",
        advice: "Consult a doctor within 24 hours",
      };
    }

    return res.json(response);
  } catch (err) {
    console.error("AI symptom error:", err);
    return res.status(500).json({
      error: "Symptom analysis failed",
    });
  }
};

const { detectIntent } = require("../ai/intentClassifier");
const { isAllowed } = require("../ai/roleGuard");
const { buildResponse } = require("../ai/responseBuilder");

const { analyzeSymptoms } = require("../ai/symptomAnalyzer");
const { calculateSeverityScore } = require("../ai/severityScore");

const Doctor = require("../models/Doctor");
const DoctorAvailability = require("../models/DoctorAvailability");
const Appointment = require("../models/Appointment");

/**
 * AI CHAT CONTROLLER
 */
exports.chat = async (req, res) => {
  const role = req.user.role;
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  // 🔐 ROLE-BASED SYSTEM PROMPTS
  let systemPrompt = "";

  if (role === "ADMIN") {
    systemPrompt = `
You are a hospital AI assistant for ADMIN users.
You can answer:
- statistics
- operational insights
- counts (doctors, patients, appointments)
- workflow guidance
DO NOT give medical advice.
`;
  }

  if (role === "DOCTOR") {
    systemPrompt = `
You are a hospital AI assistant for DOCTORS.
You can answer:
- appointment workflows
- patient visit lifecycle
- documentation help
DO NOT give hospital-wide analytics or admin data.
`;
  }

  if (role === "PATIENT") {
    systemPrompt = `
You are a hospital AI assistant for PATIENTS.
You can answer:
- booking help
- visit status explanations
- general health guidance
DO NOT diagnose or prescribe.
Always advise consulting a doctor.
`;
  }

  // 🔁 MOCK MODE
  if (process.env.MOCK_AI === "true") {
    return res.json({
      role,
      intent: "GENERAL_HELP",
      reply: `(${role} MOCK) I understand your question: "${message}". How can I help further?`,
    });
  }

  // REAL AI handled later (already wired)
};

exports.askAssistant = async (req, res) => {
  try {
    const { message } = req.body;
    const { role, id, hospitalId } = req.user;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    let response = "";
    let actions = [];

    /**
     * ROLE-BASED AI BEHAVIOR
     */
    if (role === "PATIENT") {
      response =
        "I can help with symptoms guidance, appointments, billing, and hospital information. Please tell me your concern.";
      actions.push("SYMPTOM_GUIDANCE", "APPOINTMENT_HELP", "BILLING_INFO");
    }

    if (role === "DOCTOR") {
      response =
        "I can summarize your appointments, patient load, and schedules.";
      actions.push("APPOINTMENT_SUMMARY", "PATIENT_LIST");
    }

    if (role === "ADMIN") {
      response =
        "I can provide revenue stats, unpaid bills, and hospital load insights.";
      actions.push("REVENUE_ANALYTICS", "OPERATIONAL_STATS");
    }

    return res.json({
      reply: response,
      role,
      actions,
    });
  } catch (err) {
    console.error("AI Assistant Error:", err);
    res.status(500).json({ error: "AI assistant failed" });
  }
};

/**
 * AI CONFIRM BOOKING
 */
exports.confirmBooking = async (req, res) => {
  try {
    const { doctorId, slotId } = req.body;

    if (!doctorId || !slotId) {
      return res.status(400).json({ error: "Missing booking data" });
    }

    const slot = await DoctorAvailability.findById(slotId);
    if (!slot || slot.isBooked) {
      return res.status(400).json({ error: "Slot unavailable" });
    }

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor: doctorId,
      availability: slotId,
      status: "CONFIRMED",
      bookedVia: "AI",
    });

    slot.isBooked = true;
    await slot.save();

    return res.json({
      success: true,
      message: "Appointment booked successfully via AI assistant",
      appointment,
    });
  } catch (err) {
    console.error("AI Booking Error:", err);
    return res.status(500).json({ error: "Failed to book appointment" });
  }
};
