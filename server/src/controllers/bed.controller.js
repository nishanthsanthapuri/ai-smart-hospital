const Room = require("../models/Room");
const Patient = require("../models/Patient");

exports.assignBed = async (req, res) => {
  try {
    const { roomId, bedId, patientId } = req.body;

    if (!roomId || !bedId || !patientId) {
      return res.status(400).json({ error: "Missing data" });
    }

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    const bed = room.beds.id(bedId);
    if (!bed) return res.status(404).json({ error: "Bed not found" });

    if (bed.occupied) {
      return res.status(400).json({ error: "Bed already occupied" });
    }

    bed.occupied = true;
    bed.patientId = patientId;

    await room.save();

    await Patient.findByIdAndUpdate(patientId, {
      status: "ADMITTED",
      roomId,
      bedId,
    });

    res.json({ message: "Bed assigned successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bed assignment failed" });
  }
};

exports.dischargeBed = async (req, res) => {
  try {
    const { roomId, bedId, patientId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    const bed = room.beds.id(bedId);
    if (!bed) return res.status(404).json({ error: "Bed not found" });

    bed.occupied = false;
    bed.patientId = null;

    await room.save();

    await Patient.findByIdAndUpdate(patientId, {
      status: "DISCHARGED",
      roomId: null,
      bedId: null,
    });

    res.json({ message: "Patient discharged & bed freed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Discharge failed" });
  }
};
