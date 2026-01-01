require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;
const initAI = require("./ai");

(async () => {
  try {
    if (process.env.ENABLE_AI === "true") {
      await initAI();
      console.log("🧠 AI initialized");
    } else {
      console.log("🧠 AI disabled (safe mode)");
    }
  } catch (err) {
    console.error("⚠️ AI init failed, continuing without AI");
  }
  app.listen(PORT, () => {
    console.log(`🏥 Hospital server running on port ${PORT}`);
  });
})();
