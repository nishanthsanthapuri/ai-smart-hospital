import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import ChatWidget from "../../components/chat/ChatWidget";

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    api.get("/appointments/my").then((res) => {
      setAppointments(res.data || []);
    });

    api.get("/bills/my").then((res) => {
      setBills(res.data || []);
    });
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>

      {/* Appointments */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
        <div className="bg-white shadow rounded p-4">
          {appointments.length === 0 ? (
            <p>No appointments</p>
          ) : (
            appointments.map((a) => (
              <div key={a._id} className="border-b py-2">
                <p>
                  <strong>Date:</strong> {a.date} | {a.startTime}
                </p>
                <p>
                  <strong>Status:</strong> {a.status}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bills */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Bills</h3>
        <div className="bg-white shadow rounded p-4">
          {bills.length === 0 ? (
            <p>No bills</p>
          ) : (
            bills.map((b) => (
              <div key={b._id} className="border-b py-2 flex justify-between">
                <span>₹ {b.consultationFee}</span>
                <span
                  className={
                    b.status === "PAID" ? "text-green-600" : "text-red-600"
                  }
                >
                  {b.status}
                </span>
              </div>
            ))
          )}
        </div>
        {/* <AIChat /> */}
        <ChatWidget />
        <>{/* existing dashboard UI */}</>
      </div>
      <ChatWidget />
    </DashboardLayout>
  );
}
