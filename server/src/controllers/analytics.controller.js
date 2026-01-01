const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Room = require("../models/Room");
const Bill = require("../models/Bill");
const Department = require("../models/Department");
const Visit = require("../models/Visit");

exports.getDashboardStats = async (req, res) => {
  const hospitalId = req.user.hospitalId;

  const totalPatients = await Patient.countDocuments({ hospitalId });
  const admittedPatients = await Patient.countDocuments({
    hospitalId,
    status: "ADMITTED",
  });
  const dischargedPatients = await Patient.countDocuments({
    hospitalId,
    status: "DISCHARGED",
  });

  const appointmentsToday = await Appointment.countDocuments({
    hospitalId,
    appointmentDate: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      $lte: new Date(new Date().setHours(23, 59, 59, 999)),
    },
  });

  const rooms = await Room.find({ hospitalId });
  let totalBeds = 0;
  let occupiedBeds = 0;

  rooms.forEach((room) => {
    totalBeds += room.beds.length;
    occupiedBeds += room.beds.filter((b) => b.occupied).length;
  });

  const bills = await Bill.find({ hospitalId, status: "PAID" });
  const revenue = bills.reduce((sum, b) => sum + b.totalAmount, 0);

  res.json({
    patients: {
      total: totalPatients,
      admitted: admittedPatients,
      discharged: dischargedPatients,
    },
    appointmentsToday,
    beds: {
      total: totalBeds,
      occupied: occupiedBeds,
      available: totalBeds - occupiedBeds,
    },
    revenue,
  });
};

exports.getRevenueSummary = async (req, res) => {
  try {
    const totalRevenue = await Bill.aggregate([
      { $match: { status: "PAID" } },
      { $group: { _id: null, total: { $sum: "$consultationFee" } } },
    ]);

    const unpaidCount = await Bill.countDocuments({
      status: "UNPAID",
    });

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      unpaidBills: unpaidCount,
    });
  } catch (err) {
    console.error("Revenue analytics error:", err);
    res.status(500).json({
      error: "Failed to fetch revenue analytics",
    });
  }
};

exports.getAppointmentStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();

    const completed = await Appointment.countDocuments({
      status: "COMPLETED",
    });

    const cancelled = await Appointment.countDocuments({
      status: "CANCELLED",
    });

    res.json({
      totalAppointments,
      completed,
      cancelled,
    });
  } catch (err) {
    console.error("Appointment analytics error:", err);
    res.status(500).json({
      error: "Failed to fetch appointment stats",
    });
  }
};

// newly added functions below
exports.overview = async (req, res) => {
  res.json({
    patientsToday: 12,
    admittedToday: 5,
    dischargedToday: 3,
    revenueToday: 24500,
  });
};

exports.patientFlow = async (req, res) => {
  res.json([
    { date: "Mon", admitted: 10, discharged: 6 },
    { date: "Tue", admitted: 14, discharged: 9 },
    { date: "Wed", admitted: 8, discharged: 5 },
  ]);
};

exports.departmentLoad = async (req, res) => {
  const departments = await Department.find();

  res.json(
    departments.map((d) => ({
      department: d.name,
      count: Math.floor(Math.random() * 20 + 5),
    }))
  );
};

exports.revenue = async (req, res) => {
  res.json({ total: 125000 });
};

exports.patientFlow = async (req, res) => {
  const hospitalId = req.user.hospitalId;

  const stats = await Visit.aggregate([
    { $match: { hospitalId } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const result = {
    OPD: 0,
    ADMITTED: 0,
    DISCHARGED: 0,
  };

  stats.forEach((s) => {
    result[s._id] = s.count;
  });

  res.json(result);
};

exports.bedOccupancy = async (req, res) => {
  const hospitalId = req.user.hospitalId;

  const rooms = await Room.find({ hospitalId });

  let totalBeds = 0;
  let occupiedBeds = 0;

  rooms.forEach((room) => {
    room.beds.forEach((bed) => {
      totalBeds++;
      if (bed.occupied) occupiedBeds++;
    });
  });

  const occupancyPercent =
    totalBeds === 0 ? 0 : Math.round((occupiedBeds / totalBeds) * 100);

  res.json({
    totalBeds,
    occupiedBeds,
    availableBeds: totalBeds - occupiedBeds,
    occupancyPercent,
  });
};

const Doctor = require("../models/Doctor");

exports.departmentLoad = async (req, res) => {
  const hospitalId = req.user.hospitalId;

  const departments = await Department.find({ hospitalId });

  const results = [];

  for (const dept of departments) {
    const doctors = await Doctor.find({ department: dept._id });
    const doctorIds = doctors.map((d) => d._id);

    const visits = await Visit.find({
      doctorId: { $in: doctorIds },
      status: { $in: ["OPD", "ADMITTED"] },
    });

    results.push({
      department: dept.name,
      activePatients: visits.length,
      opd: visits.filter((v) => v.status === "OPD").length,
      admitted: visits.filter((v) => v.status === "ADMITTED").length,
    });
  }

  res.json(results);
};
