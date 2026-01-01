const Availability = require("../../models/DoctorAvailability");

module.exports = async function loadAvailability() {
  const data = await Availability.find().populate("doctorId");
  return data.map(
    (a) => `
Doctor ID: ${a.doctorId._id}
Available on ${a.dayOfWeek}
From ${a.startTime} to ${a.endTime}
Slot Duration: ${a.slotDuration} minutes
`
  );
};
