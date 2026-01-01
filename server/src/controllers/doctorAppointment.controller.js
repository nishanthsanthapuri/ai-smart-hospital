const Appointment = require("../models/Appointment");
const Bill = require("../models/Bill");

exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const appointments = await Appointment.find({
      doctorId,
      status: "BOOKED",
    })
      .populate("patientId", "name email")
      .populate("departmentId", "name")
      .sort({ date: 1, startTime: 1 });

    res.json(appointments);
  } catch (err) {
    console.error("Doctor appointments error:", err);
    res.status(500).json({
      error: "Failed to fetch doctor appointments",
    });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { appointmentId } = req.params;
    const { status } = req.body;

    if (!["COMPLETED", "CANCELLED"].includes(status)) {
      return res.status(400).json({
        error: "Invalid status",
      });
    }

    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, doctorId },
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found",
      });
    }

    // 🔥 AUTO-GENERATE BILL ON COMPLETION
    if (status === "COMPLETED") {
      const existingBill = await Bill.findOne({
        appointmentId: appointment._id,
      });

      if (!existingBill) {
        await Bill.create({
          appointmentId: appointment._id,
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          departmentId: appointment.departmentId,
          consultationFee: 500, // 🔧 Fixed for now
        });
      }
    }

    res.json(appointment);
  } catch (err) {
    console.error("Update appointment error:", err);
    res.status(500).json({
      error: "Failed to update appointment",
    });
  }
};
