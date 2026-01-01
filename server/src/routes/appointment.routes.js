const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const controller = require("../controllers/appointment.controller");

// ADMIN books appointments
router.post("/", auth, role("ADMIN"), controller.createAppointment);

// DOCTOR views own appointments
router.get(
  "/doctor/:doctorId",
  auth,
  role("DOCTOR"),
  controller.getAppointmentsByDoctor
);
router.post("/book", auth, role("PATIENT"), controller.bookAppointment);
router.get("/my", auth, role("PATIENT"), controller.getMyAppointments);

module.exports = router;
