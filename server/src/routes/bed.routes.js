const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/bed.controller");

router.post("/assign", auth, role("ADMIN", "DOCTOR"), controller.assignBed);

router.post(
  "/discharge",
  auth,
  role("ADMIN", "DOCTOR"),
  controller.dischargeBed
);

module.exports = router;
