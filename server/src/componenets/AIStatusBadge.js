import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AIStatusBadge() {
  const [status, setStatus] = useState("LOADING");

  useEffect(() => {
    let mounted = true;

    api
      .get("/ai/status")
      .then((res) => {
        if (!mounted) return;

        if (!res.data.enabled) setStatus("OFF");
        else if (res.data.mock) setStatus("MOCK");
        else setStatus("LIVE");
      })
      .catch(() => {
        if (mounted) setStatus("OFFLINE");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const color =
    status === "LIVE"
      ? "bg-green-600"
      : status === "MOCK"
      ? "bg-yellow-500"
      : "bg-gray-400";

  return (
    <span className={`px-2 py-1 text-white text-xs rounded ${color}`}>
      AI: {status}
    </span>
  );
}
