exports.buildResponse = ({ intent, role }) => {
  switch (intent) {
    case "SYMPTOM_CHECK":
      return {
        reply:
          "I can help assess symptoms for guidance only. This is not a diagnosis. Would you like me to suggest the appropriate department?",
        disclaimer: true,
      };

    case "APPOINTMENT_QUERY":
      return { reply: "I can help you book or view appointments." };

    case "BILLING_QUERY":
      return { reply: "I can help you view bills and payment status." };

    case "DOCTOR_SCHEDULE":
      return { reply: "I can show your schedule and patient list." };

    case "ADMIN_ANALYTICS":
      return { reply: "I can summarize hospital performance metrics." };

    default:
      return { reply: "How can I assist you today?" };
  }
};
