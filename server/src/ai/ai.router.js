import { isAIEnabled, isMockAI } from "./ai.mode.js";
import { mockAnswer } from "./mock/mock.ai.js";
import { realAIAnswer } from "./real/openai.service.js";

import { getAIResponse } from "./ai.safe.call.js";

export const handleAIChat = async (req, res) => {
  const { message } = req.body;
  const role = req.user.role;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  const reply = await getAIResponse({
    message,
    role,
    context: req.user,
  });

  res.json({
    role,
    reply,
  });
};

export const isAIEnabled = () => {
  return process.env.ENABLE_AI === "true";
};

export const isMockAI = () => {
  return process.env.MOCK_AI === "true";
};

export const shouldUseMock = () => {
  return !isAIEnabled() || isMockAI();
};

import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { aiChatController } from "./ai.controller.js";

const router = express.Router();

router.post("/chat", protect, aiChatController);

router.get("/status", (req, res) => {
  res.json({
    aiEnabled: process.env.ENABLE_AI === "true",
    mockMode: process.env.MOCK_AI === "true",
  });
});

export default router;
