const express = require("express");
const router = express.Router();

const controller = require("../controllers/doctorAppointment.controller");
const auth = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");

router.get(
  "/my-appointments",
  auth,
  requireRole("DOCTOR"),
  controller.getDoctorAppointments
);

router.patch(
  "/:appointmentId/status",
  auth,
  requireRole("DOCTOR"),
  controller.updateAppointmentStatus
);

module.exports = router;
