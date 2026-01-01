import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function RoomAvailability() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-gray-600">Loading rooms...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Room & Bed Availability</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {rooms.map((room) => {
          const totalBeds = room.beds.length;
          const occupiedBeds = room.beds.filter((b) => b.occupied).length;
          const availableBeds = totalBeds - occupiedBeds;

          return (
            <div key={room._id} className="bg-white p-4 rounded shadow border">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">
                  Room {room.roomNumber}
                </h2>

                <span
                  className={`px-2 py-1 text-xs rounded ${
                    availableBeds === 0
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {availableBeds === 0 ? "FULL" : "AVAILABLE"}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                Type: {room.type} | Floor: {room.floor}
              </p>

              <div className="mt-4 space-y-1 text-sm">
                <p>Total Beds: {totalBeds}</p>
                <p className="text-red-600">Occupied: {occupiedBeds}</p>
                <p className="text-green-600">Available: {availableBeds}</p>
              </div>

              {/* BED GRID */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {room.beds.map((bed) => (
                  <div
                    key={bed._id}
                    className={`text-xs p-2 text-center rounded border cursor-pointer ${
                      bed.occupied
                        ? "bg-red-200 text-red-800"
                        : "bg-green-200 text-green-800"
                    }`}
                    onClick={() => {
                      if (!bed.occupied) {
                        const patientId = prompt("Enter Patient ID to assign");
                        if (!patientId) return;

                        api
                          .post("/beds/assign", {
                            roomId: room._id,
                            bedId: bed._id,
                            patientId,
                          })
                          .then(loadRooms);
                      } else {
                        if (confirm("Discharge patient from this bed?")) {
                          api
                            .post("/beds/discharge", {
                              roomId: room._id,
                              bedId: bed._id,
                              patientId: bed.patientId,
                            })
                            .then(loadRooms);
                        }
                      }
                    }}
                  >
                    {bed.bedNumber}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
