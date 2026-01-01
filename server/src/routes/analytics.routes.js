const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const controller = require("../controllers/analytics.controller");

// ADMIN & SUPER_ADMIN only
router.get(
  "/dashboard",
  auth,
  role("ADMIN", "SUPER_ADMIN"),
  controller.getDashboardStats
);

// Admin analytics
router.get(
  "/revenue",
  auth,
  role(["ADMIN", "SUPER_ADMIN"]),
  controller.getRevenueSummary
);

router.get(
  "/appointments",
  auth,
  role(["ADMIN", "SUPER_ADMIN"]),
  controller.getAppointmentStats
);

router.get(
  "/overview",
  auth,
  role("ADMIN", "SUPER_ADMIN"),
  controller.overview
);

router.get(
  "/patient-flow",
  auth,
  role("ADMIN", "SUPER_ADMIN"),
  controller.patientFlow
);

router.get(
  "/department-load",
  auth,
  role("ADMIN", "SUPER_ADMIN"),
  controller.departmentLoad
);

router.get("/patient-flow", auth, role("ADMIN"), controller.patientFlow);

router.get("/revenue", auth, role("ADMIN", "SUPER_ADMIN"), controller.revenue);

router.get("/bed-occupancy", auth, role("ADMIN"), controller.bedOccupancy);

router.get("/department-load", auth, role("ADMIN"), controller.departmentLoad);
module.exports = router;
