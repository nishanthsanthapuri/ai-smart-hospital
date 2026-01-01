import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function BookAppointment() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/departments").then((res) => setDepartments(res.data));
  }, []);

  const handleDepartmentChange = async (id) => {
    setDepartmentId(id);
    setDoctorId("");
    const res = await api.get(`/doctors?departmentId=${id}`);
    setDoctors(res.data);
  };

  const handleSubmit = async () => {
    if (!doctorId || !date) return;

    setLoading(true);
    setMessage("");

    try {
      await api.post("/appointments", {
        doctorId,
        date,
      });

      setMessage("✅ Appointment booked successfully");
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Book Appointment">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
        <select
          className="w-full border p-2 rounded"
          value={departmentId}
          onChange={(e) => handleDepartmentChange(e.target.value)}
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          className="w-full border p-2 rounded"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          disabled={!doctors.length}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} ({doc.specialization})
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>

        {message && (
          <p className="text-center text-sm text-blue-600">{message}</p>
        )}
      </div>
    </DashboardLayout>
  );
}
