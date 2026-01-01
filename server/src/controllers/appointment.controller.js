const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");

exports.createAppointment = async (req, res) => {
  const { patientId, doctorId, appointmentDate, timeSlot } = req.body;

  if (!patientId || !doctorId || !appointmentDate || !timeSlot) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // verify patient belongs to hospital
  const patient = await Patient.findOne({
    _id: patientId,
    hospitalId: req.user.hospitalId,
  });

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  // prevent double booking
  const existing = await Appointment.findOne({
    doctorId,
    appointmentDate,
    timeSlot,
    hospitalId: req.user.hospitalId,
  });

  if (existing) {
    return res.status(400).json({ error: "Time slot already booked" });
  }

  const appointment = await Appointment.create({
    patientId,
    doctorId,
    appointmentDate,
    timeSlot,
    hospitalId: req.user.hospitalId,
  });

  res.status(201).json({
    message: "Appointment booked successfully",
    appointment,
  });
};

exports.getAppointmentsByDoctor = async (req, res) => {
  const { doctorId } = req.params;

  const appointments = await Appointment.find({
    doctorId,
    hospitalId: req.user.hospitalId,
  })
    .populate("patientId", "name phone")
    .sort({ appointmentDate: 1 });

  res.json(appointments);
};

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    const patient = await Patient.findOne({
      user: req.user.id,
      hospitalId: req.user.hospitalId,
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient profile not found" });
    }

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId,
      date,
      status: "BOOKED",
      hospitalId: req.user.hospitalId,
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error("BOOK APPOINTMENT ERROR:", err);
    res.status(500).json({ error: "Failed to book appointment" });
  }
};
exports.getMyAppointments = async (req, res) => {
  try {
    // 1️⃣ map USER → PATIENT
    const patient = await Patient.findOne({
      user: req.user.id,
      hospitalId: req.user.hospitalId,
    });

    if (!patient) return res.json([]);

    // 2️⃣ fetch appointments
    const appointments = await Appointment.find({
      patientId: patient._id,
    })
      .populate("doctorId", "userId")
      .populate("departmentId", "name");

    res.json(appointments);
  } catch (err) {
    console.error("MY APPOINTMENTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};
