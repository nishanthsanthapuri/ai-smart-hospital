const INTENTS = require("./intents");

exports.detectIntent = (message) => {
  const text = message.toLowerCase();

  if (
    text.includes("pain") ||
    text.includes("fever") ||
    text.includes("symptom")
  )
    return INTENTS.SYMPTOM_CHECK;

  if (text.includes("appointment") || text.includes("book"))
    return INTENTS.APPOINTMENT_QUERY;

  if (text.includes("bill") || text.includes("payment"))
    return INTENTS.BILLING_QUERY;

  if (text.includes("schedule") || text.includes("patients"))
    return INTENTS.DOCTOR_SCHEDULE;

  if (text.includes("revenue") || text.includes("analytics"))
    return INTENTS.ADMIN_ANALYTICS;

  return INTENTS.GENERAL_HELP;
};
