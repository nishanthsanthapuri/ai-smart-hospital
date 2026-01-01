export const mockAnswer = ({ message, role }) => {
  if (role === "ADMIN") {
    return "Admin insight: Hospital systems are running normally.";
  }

  if (role === "DOCTOR") {
    return "Doctor assistant: Please check your appointment dashboard.";
  }

  if (role === "PATIENT") {
    return "Patient assistant: I can help you with appointments and hospital services.";
  }

  return "Hospital AI assistant is here to help.";
};
