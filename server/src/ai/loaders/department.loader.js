const Department = require("../../models/Department");

module.exports = async function loadDepartments() {
  const departments = await Department.find();
  return departments.map(
    (d) => `
Department: ${d.name}
Description: ${d.description || "N/A"}
`
  );
};
