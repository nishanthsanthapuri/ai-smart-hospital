export const isAIEnabled = () => {
  return process.env.ENABLE_AI === "true";
};

export const isMockAI = () => {
  return process.env.MOCK_AI === "true";
};
