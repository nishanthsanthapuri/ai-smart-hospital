import { isAIEnabled, isMockAI } from "./ai.mode.js";

export const getAIStatus = (req, res) => {
  if (!isAIEnabled()) {
    return res.json({
      enabled: false,
      mode: "DISABLED",
    });
  }

  if (isMockAI()) {
    return res.json({
      enabled: true,
      mode: "MOCK",
    });
  }

  return res.json({
    enabled: true,
    mode: "REAL",
  });
};
