<NavLink
  to="/doctor/appointments"
  className={({ isActive }) =>
    `block p-2 rounded ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
    }`
  }
>
  Appointments
</NavLink>;
