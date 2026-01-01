export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded shadow p-4 flex items-center gap-4">
      <div className={`text-3xl ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
