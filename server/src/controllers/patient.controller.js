const Patient = require("../models/Patient");

exports.registerPatient = async (req, res) => {
  const { name, age, gender, phone, user } = req.body;

  if (!name || !age || !gender || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const patient = await Patient.create({
    user,
    name,
    age,
    gender,
    phone,
    hospitalId: req.user.hospitalId,
  });

  res.status(201).json({
    message: "Patient registered successfully",
    patient,
  });
};

exports.getPatients = async (req, res) => {
  const patients = await Patient.find({
    hospitalId: req.user.hospitalId,
  }).populate("user", "email");

  res.json(patients);
};

exports.updatePatientStatus = async (req, res) => {
  const { patientId } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["OPD", "ADMITTED", "DISCHARGED"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const patient = await Patient.findOneAndUpdate(
    { _id: patientId, hospitalId: req.user.hospitalId },
    { status },
    { new: true }
  );

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  res.json({
    message: "Patient status updated",
    patient,
  });
};

// const Patient = require("../models/Patient");

// exports.registerPatient = async (req, res) => {
//   const { name, age, gender, phone } = req.body;

//   if (!name || !age || !gender || !phone) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const patient = await Patient.create({
//     name,
//     age,
//     gender,
//     phone,
//     hospitalId: req.user.hospitalId,
//   });

//   res.status(201).json({
//     message: "Patient registered successfully",
//     patient,
//   });
// };

// exports.getPatients = async (req, res) => {
//   const patients = await Patient.find({
//     hospitalId: req.user.hospitalId,
//   });

//   res.json(patients);
// };

// exports.updatePatientStatus = async (req, res) => {
//   const { patientId } = req.params;
//   const { status } = req.body;

//   const allowedStatuses = ["OPD", "ADMITTED", "DISCHARGED"];
//   if (!allowedStatuses.includes(status)) {
//     return res.status(400).json({ error: "Invalid status" });
//   }

//   const patient = await Patient.findOneAndUpdate(
//     { _id: patientId, hospitalId: req.user.hospitalId },
//     { status },
//     { new: true }
//   );

//   if (!patient) {
//     return res.status(404).json({ error: "Patient not found" });
//   }

//   res.json({
//     message: "Patient status updated",
//     patient,
//   });
// };
