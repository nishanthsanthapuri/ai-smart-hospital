const moment = require("moment");

module.exports = function generateSlots(startTime, endTime, slotDuration) {
  const slots = [];

  let start = moment(startTime, "HH:mm");
  const end = moment(endTime, "HH:mm");

  while (start.clone().add(slotDuration, "minutes").isSameOrBefore(end)) {
    const slotStart = start.format("HH:mm");
    const slotEnd = start.clone().add(slotDuration, "minutes").format("HH:mm");

    slots.push({
      startTime: slotStart,
      endTime: slotEnd,
    });

    start.add(slotDuration, "minutes");
  }

  return slots;
};
