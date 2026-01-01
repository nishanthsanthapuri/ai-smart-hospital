exports.getAIStatus = (req, res) => {
  res.json({
    enabled: process.env.ENABLE_AI === "true",
    mock: process.env.MOCK_AI === "true",
    provider: process.env.ENABLE_AI === "true" ? "OPENAI" : "MOCK",
    status: "OK",
  });
};
