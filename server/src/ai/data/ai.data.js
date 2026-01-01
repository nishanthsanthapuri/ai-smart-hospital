const Doctor = require("../../models/Doctor");
const Patient = require("../../models/Patient");
const Appointment = require("../../models/Appointment");
const Bed = require("../../models/Bed");

exports.getAIData = async ({ intent, user }) => {
  switch (intent) {
    case "COUNT_DOCTORS":
      if (user.role !== "ADMIN") return null;
      return await Doctor.countDocuments({ hospitalId: user.hospitalId });

    case "COUNT_PATIENTS":
      if (user.role !== "ADMIN") return null;
      return await Patient.countDocuments({ hospitalId: user.hospitalId });

    case "MY_APPOINTMENTS":
      if (user.role !== "DOCTOR") return null;
      return await Appointment.countDocuments({
        doctorId: user.id,
        status: "BOOKED",
      });

    case "BED_STATUS":
      if (user.role !== "ADMIN") return null;
      return await Bed.countDocuments({ status: "OCCUPIED" });

    default:
      return null;
  }
};
