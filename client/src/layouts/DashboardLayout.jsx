import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AIStatusBadge from "../components/AIStatusBadge";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white px-6 py-4 flex justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold">
            AI Smart Hospital — {user?.role}
          </h1>
          <AIStatusBadge />
        </div>
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow px-6 py-3 flex gap-6">
        {user?.role === "PATIENT" && <Link to="/patient">Dashboard</Link>}
        {user?.role === "DOCTOR" && <Link to="/doctor">Dashboard</Link>}
        {user?.role === "ADMIN" && <Link to="/admin">Dashboard</Link>}
      </div>

      {/* Page Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}
