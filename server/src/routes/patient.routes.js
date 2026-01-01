const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const controller = require("../controllers/patient.controller");

// ADMIN & NURSE register patients

// ADMIN, DOCTOR, NURSE can view patients
router.get("/", auth, role("ADMIN", "DOCTOR", "NURSE"), controller.getPatients);

// ADMIN & DOCTOR update patient status
router.patch(
  "/:patientId/status",
  auth,
  role("ADMIN", "DOCTOR"),
  controller.updatePatientStatus
);

router.post("/", auth, role("ADMIN"), controller.registerPatient);

router.get("/", auth, role("ADMIN"), controller.getPatients);

module.exports = router;
