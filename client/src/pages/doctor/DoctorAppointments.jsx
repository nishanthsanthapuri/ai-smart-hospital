import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const res = await api.get("/doctor-appointments/my-appointments");
      setAppointments(res.data || []);
    } catch (err) {
      console.error("LOAD APPOINTMENTS ERROR:", err.response?.data);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/doctor-appointments/${id}/status`, { status });
      loadAppointments();
    } catch (err) {
      console.error("UPDATE STATUS ERROR:", err.response?.data);
      alert("Failed to update appointment");
    }
  };

  if (loading) return <p>Loading appointments...</p>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>

      <div className="bg-white shadow rounded p-4">
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments assigned.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Patient</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id}>
                  <td className="border p-2">{a.patientId?.name}</td>
                  <td className="border p-2">{a.departmentId?.name}</td>
                  <td className="border p-2">{a.date}</td>
                  <td className="border p-2">
                    {a.startTime} - {a.endTime}
                  </td>
                  <td className="border p-2">{a.status}</td>
                  <td className="border p-2 space-x-2">
                    {a.status === "BOOKED" && (
                      <>
                        <button
                          onClick={() => updateStatus(a._id, "COMPLETED")}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => updateStatus(a._id, "CANCELLED")}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
