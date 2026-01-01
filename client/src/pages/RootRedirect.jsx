import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RootRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.role === "PATIENT") return <Navigate to="/patient" />;
  if (user.role === "DOCTOR") return <Navigate to="/doctor" />;
  return <Navigate to="/admin" />;
}
