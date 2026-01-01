const loadDoctors = require("./loaders/doctor.loader");
const loadDepartments = require("./loaders/department.loader");
//const loadAvailability = require("./loaders/availability.loader");
const { buildVectorStore } = require("./vector/vector.store");

async function initAI() {
  console.log("🧠 Initializing Hospital AI...");

  const doctorDocs = await loadDoctors();
  const departmentDocs = await loadDepartments();

  const docs = [...doctorDocs, ...departmentDocs];

  try {
    await buildVectorStore(docs);
  } catch (err) {
    console.error("⚠️ AI init skipped:", err.message);
    console.warn("🧠 Server running WITHOUT AI (quota / billing issue)");
  }
  console.log("✅ AI Vector Store Ready");
}

module.exports = initAI;
