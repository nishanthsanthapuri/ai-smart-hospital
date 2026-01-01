const Visit = require("../models/Visit");
const Patient = require("../models/Patient");

exports.createVisit = async (req, res) => {
  const { patientId, doctorId, symptoms } = req.body;

  if (!patientId || !doctorId || !symptoms || symptoms.length === 0) {
    return res
      .status(400)
      .json({ error: "Patient, doctor and symptoms required" });
  }

  // ensure patient belongs to hospital
  const patient = await Patient.findOne({
    _id: patientId,
    hospitalId: req.user.hospitalId,
  });

  if (!patient) {
    return res.status(404).json({ error: "Patient not found" });
  }

  // move patient to OPD
  patient.status = "OPD";
  await patient.save();

  const visit = await Visit.create({
    patientId,
    doctorId,
    symptoms,
    hospitalId: req.user.hospitalId,
  });

  res.status(201).json({
    message: "Visit created (OPD started)",
    visit,
  });
};

exports.getVisitsByPatient = async (req, res) => {
  const { patientId } = req.params;

  const visits = await Visit.find({
    patientId,
    hospitalId: req.user.hospitalId,
  })
    .populate("doctorId")
    .populate("patientId");

  res.json(visits);
};

exports.dischargeVisit = async (req, res) => {
  const { visitId } = req.params;

  const visit = await Visit.findByIdAndUpdate(
    visitId,
    {
      status: "DISCHARGED",
      dischargeDate: new Date(),
    },
    { new: true }
  );

  res.json(visit);
};
