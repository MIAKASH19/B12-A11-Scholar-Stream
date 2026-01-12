import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#ef4444", "#a855f7"];

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics");
      return res.data;
    },
  });

  if (isLoading)
  return (
    <div className="w-full flex items-center justify-center h-screen pt-10
      bg-white dark:bg-[#0b0f19]">
      <span className="loading loading-spinner text-info dark:text-blue-400"></span>
    </div>
  );


  const {
    totalUsers,
    totalScholarships,
    totalFeesCollected,
    applicationsByUniversity = [],
  } = data;

  return (
    <div className="p-6 space-y-10 min-h-screen
      bg-white dark:bg-[#0b0f19]
      text-zinc-900 dark:text-zinc-200"
    >
      <h2 className="text-2xl font-semibold">
        Analytics Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={totalUsers} />
        <StatCard title="Total Scholarships" value={totalScholarships} />
        <StatCard
          title="Total Fees Collected"
          value={`$${totalFeesCollected}`}
        />
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-[#121a2c]
        p-6 rounded-2xl
        border border-zinc-200 dark:border-zinc-700"
      >
        <h3 className="font-semibold mb-4">
          Applications per University
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={applicationsByUniversity}>
            <XAxis
              dataKey="_id"
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af" }}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #334155",
                color: "#e5e7eb",
              }}
            />
            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-[#121a2c]
        p-6 rounded-2xl
        border border-zinc-200 dark:border-zinc-700"
      >
        <h3 className="font-semibold mb-4">
          Applications Distribution
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={applicationsByUniversity}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {applicationsByUniversity.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #334155",
                color: "#e5e7eb",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-[#121a2c]
    p-6 rounded-2xl
    border border-zinc-200 dark:border-zinc-700"
  >
    <h3 className="text-sm text-gray-500 dark:text-gray-400">
      {title}
    </h3>
    <p className="text-3xl font-bold mt-2">
      {value}
    </p>
  </div>
);

export default Analytics;
