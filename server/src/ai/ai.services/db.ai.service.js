import Doctor from "../../models/Doctor.js";
import Patient from "../../models/Patient.js";
import Appointment from "../../models/Appointment.js";

export const answerFromDB = async ({ message, role, user }) => {
  const q = message.toLowerCase();

  /* 🔐 ADMIN */
  if (role === "ADMIN") {
    if (q.includes("how many doctors")) {
      const count = await Doctor.countDocuments();
      return `There are currently ${count} registered doctors.`;
    }

    if (q.includes("how many patients")) {
      const count = await Patient.countDocuments();
      return `There are ${count} registered patients in the system.`;
    }

    if (q.includes("appointments today")) {
      const today = new Date().toISOString().split("T")[0];
      const count = await Appointment.countDocuments({ date: today });
      return `There are ${count} appointments scheduled today.`;
    }
  }

  /* 🧑‍⚕️ DOCTOR */
  if (role === "DOCTOR") {
    if (q.includes("my appointments")) {
      const count = await Appointment.countDocuments({
        doctorId: user.id,
      });
      return `You have ${count} total appointments assigned.`;
    }

    return "Please use your dashboard for detailed clinical information.";
  }

  /* 🧑 PATIENT */
  if (role === "PATIENT") {
    if (q.includes("doctors available")) {
      const count = await Doctor.countDocuments();
      return `We have ${count} doctors available across departments.`;
    }

    return "I can help you with appointments and hospital services.";
  }

  return null; // fallback to LLM
};
