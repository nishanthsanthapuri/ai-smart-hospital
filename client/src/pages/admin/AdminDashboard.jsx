import DashboardLayout from "../../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import api from "../../api/axios";

import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";

import StatCard from "../../components/common/StatCard";

import AIChat from "../../components/ai/AIChat";

export default function AdminDashboard() {
  const [patientCount, setPatientCount] = useState(0);
  const [opdCount, setOpdCount] = useState(0);
  const [admittedCount, setAdmittedCount] = useState(0);
  const [availableBeds, setAvailableBeds] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);

  const [departmentLoad, setDepartmentLoad] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [patientFlowChart, setPatientFlowChart] = useState([]);
  const [departmentChart, setDepartmentChart] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    // Patients
    const patientRes = await api.get("/patients");
    setPatientCount(patientRes.data.length);

    // Patient Flow (FIXED)
    const flowRes = await api.get("/analytics/patient-flow");
    setOpdCount(flowRes.data.opd || 0);
    setAdmittedCount(flowRes.data.admitted || 0);
    // Patient Flow → Line Chart

    setPatientFlowChart([
      { date: "OPD", count: flowRes.data.opd },
      { date: "Admitted", count: flowRes.data.admitted },
      { date: "Discharged", count: flowRes.data.discharged },
    ]);

    // Department Load → Pie Chart
    const deptRes = await api.get("/analytics/department-load");

    setDepartmentChart(
      deptRes.data.map((d) => ({
        name: d.department,
        value: d.activePatients,
      }))
    );

    // Doctors
    const doctorRes = await api.get("/doctors");
    setDoctorCount(doctorRes.data.length);

    // Rooms & Beds
    const roomRes = await api.get("/rooms");
    setRooms(roomRes.data);

    let freeBeds = 0;
    roomRes.data.forEach((room) => {
      room.beds.forEach((bed) => {
        if (!bed.occupied) freeBeds++;
      });
    });
    setAvailableBeds(freeBeds);

    // Department Load (THIS ONE *IS* AN ARRAY)

    setDepartmentLoad(deptRes.data);
  };

  return (
    <DashboardLayout title="Hospital Admin Dashboard">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Total Patients"
          value={patientCount}
          icon="🧑‍🤝‍🧑"
          color="text-blue-600"
        />
        <StatCard
          title="OPD Visits"
          value={opdCount}
          icon="🟡"
          color="text-yellow-600"
        />
        <StatCard
          title="Admitted Patients"
          value={admittedCount}
          icon="🛏️"
          color="text-red-600"
        />
        <StatCard
          title="Available Beds"
          value={availableBeds}
          icon="🟢"
          color="text-green-600"
        />
        <StatCard
          title="Doctors"
          value={doctorCount}
          icon="👨‍⚕️"
          color="text-purple-600"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <AIChat />
        {/* Patient Flow Line Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Patient Flow</h3>
          <LineChart data={patientFlowChart} />
        </div>

        {/* Department Load Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Department Load</h3>
          <PieChart data={departmentChart} />
        </div>
      </div>

      {/* DEPARTMENT LOAD */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Department Load</h3>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Department</th>
              <th className="border p-2">OPD</th>
              <th className="border p-2">Admitted</th>
            </tr>
          </thead>
          <tbody>
            {departmentLoad.map((d, i) => (
              <tr key={i}>
                <td className="border p-2">{d.department}</td>
                <td className="border p-2">{d.opd}</td>
                <td className="border p-2">{d.admitted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ROOM & BED AVAILABILITY */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Room & Bed Availability</h3>

        {rooms.map((room) => (
          <div key={room._id} className="border p-3 mb-3 rounded">
            <div className="font-semibold">
              Room {room.roomNumber} ({room.type})
            </div>

            <div className="grid grid-cols-4 gap-2 mt-2">
              {room.beds.map((bed) => (
                <div
                  key={bed._id}
                  className={`p-2 text-center rounded text-sm ${
                    bed.occupied ? "bg-red-200" : "bg-green-200"
                  }`}
                >
                  Bed {bed.bedNumber}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
