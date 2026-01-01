const Department = require("../models/Department");

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};
exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Department name is required" });
    }

    const exists = await Department.findOne({ name });
    if (exists) {
      return res.status(409).json({
        error: "Department already exists",
      });
    }

    const department = await Department.create({
      name,
      description,
    });

    return res.status(201).json(department);
  } catch (err) {
    console.error("Create department error:", err.message);

    // ✅ HANDLE DUPLICATE KEY ERROR
    if (err.code === 11000) {
      return res.status(409).json({
        error: "Department already exists",
      });
    }

    return res.status(500).json({
      error: "Failed to create department",
    });
  }
};
