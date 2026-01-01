const axios = require("axios");

exports.fetchAnalytics = async (intent, token) => {
  const headers = {
    Authorization: token,
  };

  if (intent === "PATIENT_FLOW") {
    const res = await axios.get(
      "http://localhost:5000/api/analytics/patient-flow",
      { headers }
    );
    return res.data;
  }

  if (intent === "DEPARTMENT_LOAD") {
    const res = await axios.get(
      "http://localhost:5000/api/analytics/department-load",
      { headers }
    );
    return res.data;
  }

  if (intent === "BED_OCCUPANCY") {
    const res = await axios.get(
      "http://localhost:5000/api/analytics/bed-occupancy",
      { headers }
    );
    return res.data;
  }

  return null;
};
