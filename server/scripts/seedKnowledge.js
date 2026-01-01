const mongoose = require("mongoose");
const Knowledge = require("../models/Knowledge");

mongoose.connect("mongodb://localhost:27017/hospital");

async function seed() {
  await Knowledge.deleteMany();

  await Knowledge.insertMany([
    {
      title: "OPD Timings",
      content: "OPD is available from 9 AM to 5 PM on weekdays.",
      category: "POLICY",
      tags: ["opd", "timings"],
    },
    {
      title: "Billing Policy",
      content:
        "Billing is generated at discharge and must be cleared within 24 hours.",
      category: "BILLING",
      tags: ["billing", "payment"],
    },
  ]);

  console.log("Knowledge seeded");
  process.exit();
}

seed();
