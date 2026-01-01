const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const controller = require("../controllers/bill.controller");

// Patient views own bills
router.get("/my", auth, role("PATIENT"), controller.getMyBills);

// Patient pays bill
router.patch("/:billId/pay", auth, role("PATIENT"), controller.payBill);

module.exports = router;
