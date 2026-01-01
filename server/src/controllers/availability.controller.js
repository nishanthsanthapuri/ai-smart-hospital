const DoctorAvailability = require("../models/DoctorAvailability");
const Doctor = require("../models/Doctor");

exports.addAvailability = async (req, res) => {
  try {
    const { doctorId, dayOfWeek, startTime, endTime, slotDuration } = req.body;

    // Validate doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const availability = await DoctorAvailability.create({
      doctorId,
      dayOfWeek,
      startTime,
      endTime,
      slotDuration,
    });

    res.status(201).json(availability);
  } catch (err) {
    console.error("Add availability error:", err);
    res.status(500).json({
      error: "Failed to add doctor availability",
    });
  }
};

exports.getAvailabilityByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const availability = await DoctorAvailability.find({ doctorId });

    res.json(availability);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch availability",
    });
  }
};
