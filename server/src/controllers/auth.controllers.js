const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log("REQ BODY:", req.body);

  const { name, email, password, role, hospitalId } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
    hospitalId,
  });

  res.status(201).json({ message: "User registered", userId: user._id });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // ✅ CREATE TOKEN FIRST
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        hospitalId: user.hospitalId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ LOG AFTER TOKEN EXISTS
    console.log("JWT PAYLOAD ISSUED:", {
      id: user._id,
      role: user.role,
      hospitalId: user.hospitalId,
    });

    // ✅ SEND RESPONSE
    return res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login failed" });
  }
};
