const Room = require("../models/Room");
const Patient = require("../models/Patient");

exports.createRoom = async (req, res) => {
  const { roomNumber, floor, type, bedCount } = req.body;

  if (!roomNumber || !floor || !type || !bedCount) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const beds = [];
  for (let i = 1; i <= bedCount; i++) {
    beds.push({ bedNumber: `B${i}` });
  }

  const room = await Room.create({
    roomNumber,
    floor,
    type,
    beds,
    hospitalId: req.user.hospitalId,
  });

  res.status(201).json({
    message: "Room created successfully",
    room,
  });
};

exports.getRooms = async (req, res) => {
  const rooms = await Room.find({
    hospitalId: req.user.hospitalId,
  });

  res.json(rooms);
};

exports.admitPatient = async (req, res) => {
  const { patientId, roomId } = req.body;

  const room = await Room.findOne({
    _id: roomId,
    hospitalId: req.user.hospitalId,
  });

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  const freeBed = room.beds.find((b) => !b.occupied);

  if (!freeBed) {
    return res.status(400).json({ error: "No beds available" });
  }

  freeBed.occupied = true;
  freeBed.patientId = patientId;
  await room.save();

  await Visit.findOneAndUpdate(
    { patientId, status: "OPD" },
    {
      status: "ADMITTED",
      admissionRequired: true,
      admissionTime: new Date(),
    }
  );

  await Patient.findByIdAndUpdate(patientId, {
    status: "ADMITTED",
  });

  res.json({
    message: "Patient admitted",
    roomNumber: room.roomNumber,
    bed: freeBed.bedNumber,
  });
};

exports.dischargePatient = async (req, res) => {
  const { patientId } = req.body;

  const room = await Room.findOne({
    hospitalId: req.user.hospitalId,
    "beds.patientId": patientId,
  });

  if (!room) {
    return res.status(404).json({ error: "Patient not assigned to any room" });
  }

  const bed = room.beds.find(
    (b) => b.patientId && b.patientId.toString() === patientId
  );

  bed.occupied = false;
  bed.patientId = null;
  await room.save();

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

  router.patch(
    "/visits/:visitId/discharge",
    auth,
    role("DOCTOR"),
    dischargePatient
  );

  const Visit = require("../models/Visit");

  await Visit.findOneAndUpdate(
    {
      patientId,
      hospitalId,
      status: "OPD",
    },
    {
      status: "ADMITTED",
      admissionRequired: true,
      admissionTime: new Date(),
    }
  );

  await Patient.findByIdAndUpdate(patientId, {
    status: "DISCHARGED",
  });

  res.json({
    message: "Patient discharged successfully",
  });
};

exports.admitPatient = async (req, res) => {
  try {
    const { visitId, roomId, bedNumber } = req.body;

    // 1️⃣ Find visit
    const visit = await Visit.findById(visitId);
    if (!visit) {
      return res.status(404).json({ error: "Visit not found" });
    }

    // 2️⃣ Find room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // 3️⃣ Find bed
    const bed = room.beds.find((b) => b.bedNumber === bedNumber);
    if (!bed || bed.occupied) {
      return res.status(400).json({ error: "Bed not available" });
    }

    // 4️⃣ Occupy bed
    bed.occupied = true;
    bed.patientId = visit.patientId;

    // 5️⃣ Update visit
    visit.status = "ADMITTED";
    visit.admissionTime = new Date();

    await room.save();
    await visit.save();

    res.json({
      message: "Patient admitted successfully",
      visit,
      roomNumber: room.roomNumber,
      bedNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Admission failed" });
  }
};

exports.dischargePatient = async (req, res) => {
  try {
    const { visitId, roomId, bedNumber } = req.body;

    // 1️⃣ Find visit
    const visit = await Visit.findById(visitId);
    if (!visit) {
      return res.status(404).json({ error: "Visit not found" });
    }

    // 2️⃣ Find room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // 3️⃣ Find bed
    const bed = room.beds.find((b) => b.bedNumber === bedNumber);
    if (!bed || !bed.occupied) {
      return res.status(400).json({ error: "Bed is already free" });
    }

    // 4️⃣ Free bed
    bed.occupied = false;
    bed.patientId = null;

    // 5️⃣ Update visit
    visit.status = "DISCHARGED";
    visit.dischargeDate = new Date();

    await room.save();
    await visit.save();

    res.json({
      message: "Patient discharged successfully",
      visitId,
      roomNumber: room.roomNumber,
      bedNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Discharge failed" });
  }
};
