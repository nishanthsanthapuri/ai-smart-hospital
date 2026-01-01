import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

import AIChat from "../../components/ai/AIChat";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = async () => {
    const res = await api.get("/doctor-appointments/my-appointments");
    setAppointments(res.data || []);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/doctor/${id}/status`, { status });
    loadAppointments();
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

      <div className="bg-white shadow rounded p-4">
        {appointments.length === 0 ? (
          <p>No appointments today</p>
        ) : (
          appointments.map((a) => (
            <div
              key={a._id}
              className="border-b py-3 flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Patient:</strong> {a.patientId?.name}
                </p>
                <p>
                  <strong>Date:</strong> {a.date} | {a.startTime}
                </p>
                <p>
                  <strong>Department:</strong> {a.departmentId?.name}
                </p>
              </div>

              <div className="flex gap-2">
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
              </div>
            </div>
          ))
        )}
        <AIChat />
      </div>
    </DashboardLayout>
  );
}
