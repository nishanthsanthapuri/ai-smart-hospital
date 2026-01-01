const express = require("express");
const router = express.Router();

const controller = require("../controllers/superAdmin.controller");

router.post("/bootstrap", controller.createSuperAdmin);

module.exports = router;
