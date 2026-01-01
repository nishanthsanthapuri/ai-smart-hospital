const Bill = require("../models/Bill");

const Patient = require("../models/Patient");

exports.getMyBills = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      user: req.user.id,
      hospitalId: req.user.hospitalId,
    });

    if (!patient) return res.json([]);

    const bills = await Bill.find({
      patientId: patient._id,
    });

    res.json(bills);
  } catch (err) {
    console.error("MY BILLS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch bills" });
  }
};

exports.payBill = async (req, res) => {
  try {
    const { billId } = req.params;
    const patientId = req.user.id;

    const bill = await Bill.findOneAndUpdate(
      { _id: billId, patientId, status: "UNPAID" },
      { status: "PAID", paidAt: new Date() },
      { new: true }
    );

    if (!bill) {
      return res.status(404).json({
        error: "Bill not found or already paid",
      });
    }

    res.json(bill);
  } catch (err) {
    console.error("Pay bill error:", err);
    res.status(500).json({
      error: "Payment failed",
    });
  }
};
