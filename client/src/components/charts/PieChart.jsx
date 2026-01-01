import { PieChart as RePieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#f59e0b"];

export default function PieChart({ data }) {
  return (
    <RePieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </RePieChart>
  );
}
