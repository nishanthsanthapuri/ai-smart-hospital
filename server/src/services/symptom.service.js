const symptomMap = {
  fever: "GENERAL_MEDICINE",
  cough: "GENERAL_MEDICINE",
  chest: "CARDIOLOGY",
  heart: "CARDIOLOGY",
  pain: "ORTHOPEDICS",
  fracture: "ORTHOPEDICS",
  headache: "NEUROLOGY",
  dizziness: "NEUROLOGY",
};

exports.analyzeSymptoms = (symptoms) => {
  const lower = symptoms.toLowerCase();

  const matchedDepartments = new Set();

  Object.keys(symptomMap).forEach((keyword) => {
    if (lower.includes(keyword)) {
      matchedDepartments.add(symptomMap[keyword]);
    }
  });

  let urgency = "LOW";
  if (lower.includes("chest") || lower.includes("breathing")) {
    urgency = "HIGH";
  }

  return {
    departments: Array.from(matchedDepartments),
    urgency,
  };
};
