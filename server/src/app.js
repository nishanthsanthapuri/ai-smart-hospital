const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  console.log("📦 Body:", req.body);
  next();
});

const aiRoutes = require("./routes/ai.routes");
const doctorAppointmentRoutes = require("./routes/doctorAppointment.routes");

const appointmentRoutes = require("./routes/appointment.routes");
const availabilityRoutes = require("./routes/availability.routes");

app.get("/health", (req, res) => {
  res.json({ status: "Hospital backend running" });
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/patients", require("./routes/patient.routes"));
app.use("/api/super-admin", require("./routes/superAdmin.routes"));
app.use("/api/test", require("./routes/test.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/departments", require("./routes/department.routes"));
app.use("/api/doctors", require("./routes/doctor.routes"));
app.use("/api/visits", require("./routes/visit.routes"));
app.use("/api/appointments", require("./routes/appointment.routes"));
app.use("/api/rooms", require("./routes/room.routes"));
app.use("/api/bills", require("./routes/bill.routes"));
app.use("/api/analytics", require("./routes/analytics.routes"));
app.use("/api/chat", require("./routes/chat.routes"));
app.use("/api/ai", require("./routes/ai.routes"));
app.use("/api/availability", require("./routes/availability.routes"));
//app.use("/api/slots", require("./routes/slot.routes"));

// app.use("/api/chat", aiRoutes);
// app.use("/api", aiRoutes);
app.use("/api/ai/chat", aiRoutes);

app.use("/api/beds", require("./routes/bed.routes"));
// app.use("/api", require("./routes/visit.routes"));
app.use("/api/doctor-appointments", doctorAppointmentRoutes);
app.use("/api/ai", require("./ai/routes/status.routes"));
//app.use("/api/knowledge", require("./routes/knowledgeRoutes"));

module.exports = app;
