const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const controller = require("../controllers/admin.controller");

router.post(
  "/create-hospital-admin",
  auth,
  role("SUPER_ADMIN"),
  controller.createHospitalAdmin
);

router.post(
  "/create-patient-login",
  auth,
  role("ADMIN"),
  controller.createPatientUser
);

module.exports = router;
