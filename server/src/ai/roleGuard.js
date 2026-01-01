exports.isAllowed = (role, intent) => {
  const rules = {
    PATIENT: [
      "SYMPTOM_CHECK",
      "APPOINTMENT_QUERY",
      "BILLING_QUERY",
      "GENERAL_HELP",
    ],
    DOCTOR: ["DOCTOR_SCHEDULE", "GENERAL_HELP"],
    ADMIN: ["ADMIN_ANALYTICS", "GENERAL_HELP"],
  };

  return rules[role]?.includes(intent);
};
