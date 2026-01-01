const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("../chat.controller");

router.post("/chat", auth, controller.chatWithAI);
router.get("/status", (req, res) => {
  res.json({
    enabled: false,
    mode: "safe",
    message: "AI is disabled in this environment",
  });
});

module.exports = router;
