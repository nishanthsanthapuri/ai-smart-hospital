const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../src/models/User");

mongoose.connect(process.env.MONGO_URI);

(async () => {
  const exists = await User.findOne({ email: "admin@cityhospital.com" });
  if (exists) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashed = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Admin",
    email: "admin@cityhospital.com",
    password: hashed,
    role: "ADMIN",
    hospitalId: "HOSP001",
  });

  console.log("Admin user created");
  process.exit(0);
})();
