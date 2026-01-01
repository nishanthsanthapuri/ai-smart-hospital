export default function OccupancyGrid({ rooms }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {rooms.map((room) => (
        <div
          key={room._id}
          className={`p-3 rounded text-white ${
            room.isOccupied ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <p className="font-semibold">
            Room {room.roomNumber} - Bed {room.bedNumber}
          </p>
          <p className="text-sm">
            {room.isOccupied ? "Occupied" : "Available"}
          </p>
        </div>
      ))}
    </div>
  );
}
