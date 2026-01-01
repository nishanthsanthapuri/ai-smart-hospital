const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const controller = require("../controllers/department.controller");

// Only ADMIN can manage departments
router.post("/", auth, role("ADMIN"), controller.createDepartment);

router.post(
  "/",
  auth,
  role(["ADMIN", "SUPER_ADMIN"]),
  controller.createDepartment
);

router.get("/", auth, role("ADMIN", "DOCTOR"), controller.getDepartments);

router.get("/", auth, controller.getDepartments);

module.exports = router;
