const DoctorAvailability = require("../models/DoctorAvailability");
const Appointment = require("../models/Appointment");
const generateSlots = require("../utils/slotGenerator");

exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({
        error: "doctorId and date are required",
      });
    }

    const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    const availability = await DoctorAvailability.find({
      doctorId,
      dayOfWeek,
    });

    if (!availability.length) {
      return res.json([]);
    }

    const bookedAppointments = await Appointment.find({
      doctorId,
      date,
      status: "BOOKED",
    });

    const bookedSlots = bookedAppointments.map((a) => a.startTime);

    let slots = [];

    availability.forEach((a) => {
      const generated = generateSlots(a.startTime, a.endTime, a.slotDuration);
      slots = slots.concat(generated);
    });

    const availableSlots = slots.filter(
      (s) => !bookedSlots.includes(s.startTime)
    );

    res.json(availableSlots);
  } catch (err) {
    console.error("Slot fetch error:", err);
    res.status(500).json({
      error: "Failed to fetch available slots",
    });
  }
};
