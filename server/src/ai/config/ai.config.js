module.exports = {
  ENABLE_AI: process.env.ENABLE_AI === "true",
  MOCK_AI: process.env.MOCK_AI === "true",
  MAX_TOKENS: 300,
  MODEL: "gpt-4o-mini", // cheap + fast
};
