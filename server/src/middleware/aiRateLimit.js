const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { answer: "AI rate limit exceeded. Try again later." },
});
