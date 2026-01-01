const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createSuperAdmin = async (req, res) => {
  const { name, email, password, bootstrapKey } = req.body;

  // 1️⃣ Check if bootstrap allowed
  if (process.env.ALLOW_SUPER_ADMIN_BOOTSTRAP !== "true") {
    return res.status(403).json({ error: "Bootstrap disabled" });
  }

  // 2️⃣ Validate bootstrap key
  if (bootstrapKey !== process.env.SUPER_ADMIN_BOOTSTRAP_KEY) {
    return res.status(401).json({ error: "Invalid bootstrap key" });
  }

  // 3️⃣ Prevent duplicate super admin
  const existing = await User.findOne({ role: "SUPER_ADMIN" });
  if (existing) {
    return res.status(400).json({ error: "SUPER_ADMIN already exists" });
  }

  // 4️⃣ Create super admin
  const hashedPassword = await bcrypt.hash(password, 10);

  const superAdmin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "SUPER_ADMIN",
    hospitalId: "GLOBAL",
  });

  res.status(201).json({
    message: "SUPER_ADMIN created successfully",
    id: superAdmin._id,
  });
};
