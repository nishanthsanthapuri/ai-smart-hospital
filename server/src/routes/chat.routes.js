const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const controller = require("../controllers/chat.controller");

// All authenticated users can chat
router.post("/ask", auth, controller.askChatbot);

module.exports = router;
