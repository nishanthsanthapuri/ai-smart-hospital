const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
router.post("/symptom-analyze", auth, aiController.analyzeSymptoms);
router.post("/ask", auth, aiController.askAssistant);
router.post("/chat", auth, aiController.chat);
module.exports = router;
//added at 12.2.4.1

// AI booking confirmation (PATIENT only)
router.post(
  "/confirm-booking",
  auth,
  role("PATIENT"),
  aiController.confirmBooking
);
////////
//const { askAssistant } = require("../controllers/ai.controller");
//const { protect } = require("../middlewares/auth.middleware");

// router.post("/ask", auth, aiController);

// module.exports = router;
