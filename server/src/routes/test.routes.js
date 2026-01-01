const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

router.get("/me", auth, (req, res) => {
  res.json({
    message: "Auth works",
    user: req.user,
  });
});

module.exports = router;
