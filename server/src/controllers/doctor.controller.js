const Doctor = require("../models/Doctor");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createDoctor = async (req, res) => {
  const {
    name,
    email,
    password,
    departmentId,
    specialization,
    experienceYears,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !departmentId ||
    !specialization ||
    experienceYears === undefined
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // create user account for doctor
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "DOCTOR",
    hospitalId: req.user.hospitalId,
  });

  // create doctor profile
  const doctor = await Doctor.create({
    userId: user._id,
    departmentId,
    specialization,
    experienceYears,
    availability: [],
    hospitalId: req.user.hospitalId,
  });

  res.status(201).json({
    message: "Doctor created successfully",
    doctorId: doctor._id,
  });
};

exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find({
    hospitalId: req.user.hospitalId,
  })
    .populate("departmentId", "name")
    .populate("userId", "name email");

  res.json(doctors);
};
