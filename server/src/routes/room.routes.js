const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const controller = require("../controllers/room.controller");

// ADMIN manages rooms
router.post("/", auth, role("ADMIN"), controller.createRoom);

router.get("/", auth, role("ADMIN", "NURSE"), controller.getRooms);

// ADMIN admits/discharges patients
router.post("/admit", auth, role("ADMIN"), controller.admitPatient);

router.post("/discharge", auth, role("ADMIN"), controller.dischargePatient);

const roomController = require("../controllers/room.controller");
router.post(
  "/discharge",
  auth,
  role("DOCTOR", "ADMIN"),
  roomController.dischargePatient
);
module.exports = router;
