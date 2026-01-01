const Doctor = require("../../models/Doctor");

async function loadDoctors() {
  const doctors = await Doctor.find()
    .populate("userId", "name email")
    .populate("departmentId", "name");

  return doctors
    .filter((d) => d.userId && d.departmentId) // 🔒 safety
    .map(
      (d) => `
Doctor Name: ${d.userId.name}
Email: ${d.userId.email}
Department: ${d.departmentId.name}
Specialization: ${d.specialization}
Experience: ${d.experienceYears} years
`
    );
}

module.exports = loadDoctors;
