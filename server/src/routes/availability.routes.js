const express = require("express");
const router = express.Router();

const availabilityController = require("../controllers/availability.controller");
const auth = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

// Admin defines availability
router.post(
  "/",
  auth,
  requireRole("ADMIN", "SUPER_ADMIN"),
  availabilityController.addAvailability
);

// Anyone logged in can view doctor's availability
router.get("/:doctorId", auth, availabilityController.getAvailabilityByDoctor);

module.exports = router;
