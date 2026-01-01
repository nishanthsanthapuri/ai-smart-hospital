const router = require("express").Router();
const ctrl = require("../controllers/knowledgeController");
const { auth, authorize } = require("../middleware/auth.middleware");

router.use(auth, authorize("ADMIN"));

router.get("/", ctrl.getAllKnowledge);
router.post("/", ctrl.createKnowledge);
router.put("/:id", ctrl.updateKnowledge);
router.delete("/:id", ctrl.deleteKnowledge);

module.exports = router;
