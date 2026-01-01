import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RootRedirect from "./pages/RootRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SymptomAnalyzer from "./pages/patient/SymptomAnalyzer";
import BookAppointment from "./pages/patient/BookAppointment";
import PatientManagement from "./pages/admin/PatientManagement";
import AdminLayout from "./layouts/AdminLayout";
import DoctorManagement from "./pages/admin/DoctorManagement";
import DoctorAvailability from "./pages/admin/DoctorAvailability";
import RoomAvailability from "./pages/admin/RoomAvailability";
import Departments from "./pages/admin/Departments";

import Unauthorized from "./pages/Unauthorized";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<RootRedirect />} />

        <Route
          path="/patient"
          element={
            <ProtectedRoute roles={["PATIENT"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute roles={["DOCTOR"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="DOCTOR">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN", "SUPER_ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/symptoms"
          element={
            <ProtectedRoute roles={["PATIENT"]}>
              <SymptomAnalyzer />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/departments" element={<Departments />} />

        <Route
          path="/patient/book-appointment"
          element={
            <ProtectedRoute roles={["PATIENT"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="patients" element={<PatientManagement />} />
          <Route path="doctors" element={<DoctorManagement />} />
          <Route path="availability" element={<DoctorAvailability />} />
          <Route path="rooms" element={<RoomAvailability />} />
          <Route path="/admin/availability" element={<DoctorAvailability />} />
        </Route>

        <Route path="doctors" element={<DoctorManagement />} />

        <Route path="rooms" element={<RoomAvailability />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute role="ADMIN">
              <PatientManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute roles={["DOCTOR"]}>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
        <Route path="departments" element={<Departments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
