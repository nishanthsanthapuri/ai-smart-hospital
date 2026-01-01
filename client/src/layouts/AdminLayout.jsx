import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow">
        <div className="p-4 font-bold text-lg border-b">Hospital Admin</div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Dashboard
          </NavLink>

          {/* ✅ ADD THIS */}
          <NavLink
            to="/admin/departments"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Departments
          </NavLink>

          <NavLink
            to="/admin/patients"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Patients
          </NavLink>

          <NavLink
            to="/admin/doctors"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Doctors
          </NavLink>

          <NavLink
            to="/admin/availability"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Doctor Availability
          </NavLink>

          <NavLink
            to="/admin/rooms"
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Rooms & Beds
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
