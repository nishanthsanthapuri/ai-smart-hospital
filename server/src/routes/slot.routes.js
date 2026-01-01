const express = require("express");
const router = express.Router();

const slotController = require("../controllers/slot.controller");
const auth = require("../middleware/auth.middleware");

router.get("/available", auth, slotController.getAvailableSlots);

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const roomController = require("../controllers/room.controller");

router.post(
  "/admit",
  auth,
  role("DOCTOR", "ADMIN"),
  roomController.admitPatient
);

module.exports = router;
