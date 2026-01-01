const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const controller = require("../controllers/visit.controller");

// DOCTOR starts OPD visit
router.post("/", auth, role("DOCTOR"), controller.createVisit);

// ADMIN & DOCTOR view visits
router.get(
  "/patient/:patientId",
  auth,
  role("ADMIN", "DOCTOR"),
  controller.getVisitsByPatient
);

const { dischargeVisit } = require("../controllers/visit.controller");

router.patch(
  "/visits/:visitId/discharge",
  auth,
  role("DOCTOR"),
  dischargeVisit
);

module.exports = router;
