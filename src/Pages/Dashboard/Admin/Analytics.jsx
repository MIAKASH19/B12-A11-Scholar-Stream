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

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }

  const {
    totalUsers,
    totalScholarships,
    totalFeesCollected,
    applicationsByUniversity = [],
  } = data;

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-zinc-200">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{totalUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-zinc-200">
          <h3 className="text-gray-500">Total Scholarships</h3>
          <p className="text-3xl font-bold mt-2">{totalScholarships}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-zinc-200">
          <h3 className="text-gray-500">Total Fees Collected</h3>
          <p className="text-3xl font-bold mt-2">
            ${totalFeesCollected}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-zinc-200">
        <h3 className="font-semibold mb-4">
          Applications per University
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={applicationsByUniversity}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-zinc-200">
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
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
