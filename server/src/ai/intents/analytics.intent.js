exports.resolveAnalyticsIntent = (message) => {
  const q = message.toLowerCase();

  if (q.includes("patient") && q.includes("flow")) {
    return "PATIENT_FLOW";
  }

  if (q.includes("department")) {
    return "DEPARTMENT_LOAD";
  }

  if (q.includes("bed")) {
    return "BED_OCCUPANCY";
  }

  if (q.includes("opd") || q.includes("admitted") || q.includes("discharged")) {
    return "PATIENT_FLOW";
  }

  return null;
};
