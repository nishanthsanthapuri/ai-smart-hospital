const symptomMap = require("./symptomMap");

exports.analyzeSymptoms = (message) => {
  const text = message.toLowerCase();

  for (const entry of symptomMap) {
    for (const keyword of entry.keywords) {
      if (text.includes(keyword)) {
        return {
          department: entry.department,
          severity: entry.severity,
          emergency: entry.emergency,
        };
      }
    }
  }

  return {
    department: "General Medicine",
    severity: "LOW",
    emergency: false,
  };
};
