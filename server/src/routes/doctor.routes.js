const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const controller = require("../controllers/doctor.controller");

// ADMIN manages doctors
router.post("/", auth, role("ADMIN"), controller.createDoctor);

// ADMIN & DOCTOR can view doctors
router.get("/", auth, role("ADMIN", "DOCTOR"), controller.getDoctors);

module.exports = router;
