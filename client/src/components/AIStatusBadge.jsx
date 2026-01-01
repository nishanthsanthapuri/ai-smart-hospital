import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AIStatusBadge() {
  const [status, setStatus] = useState("CHECKING");

  useEffect(() => {
    api
      .get("/ai/status")
      .then((res) => {
        setStatus(res.data.mode);
      })
      .catch(() => {
        setStatus("OFFLINE");
      });
  }, []);

  const color =
    status === "REAL"
      ? "bg-green-600"
      : status === "MOCK"
      ? "bg-yellow-500"
      : "bg-red-600";

  return (
    <span className={`text-white px-3 py-1 rounded text-xs ${color}`}>
      AI: {status}
    </span>
  );
}
