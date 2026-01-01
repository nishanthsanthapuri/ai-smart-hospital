exports.calculateSeverityScore = (severity) => {
  switch (severity) {
    case "HIGH":
      return 90;
    case "MEDIUM":
      return 60;
    default:
      return 30;
  }
};
