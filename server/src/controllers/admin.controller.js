const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createHospitalAdmin = async (req, res) => {
  const { name, email, password, hospitalId } = req.body;

  // basic validation
  if (!name || !email || !password || !hospitalId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // prevent duplicate admin for same hospital
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "ADMIN",
    hospitalId,
  });

  res.status(201).json({
    message: "Hospital Admin created successfully",
    adminId: admin._id,
  });
};

exports.createPatientUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: "PATIENT",
    hospitalId: req.user.hospitalId,
  });

  res.status(201).json({
    message: "Patient login created",
    userId: user._id,
  });
};
