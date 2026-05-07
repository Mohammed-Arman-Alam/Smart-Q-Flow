import { useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminPanel() {
  const Axios = useAxios();

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedic",
    "General",
    "Medicine",
    "Surgery",
    "Gynaecology",
    "Pediatrics",
    "Dermatology",
  ];

  const { data: allAppointments = [], isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await Axios.get(`/appointments`);
      return res.data;
    },
  });

  const stats = useMemo(() => {
    return {
      registered: allAppointments.length,
      completed: allAppointments.filter((a) => a.status === "completed").length,
      waiting: allAppointments.filter(
        (a) => a.status === "waiting" || a.status === "assigned"
      ).length,
      inProgress: allAppointments.filter((a) => a.status === "in-progress").length,
      missed: allAppointments.filter((a) => a.status === "missed").length,
      avgWait: 0,
    };
  }, [allAppointments]);

  const departmentData = useMemo(() => {
    const map = {};

    departments.forEach((d) => {
      map[d] = {
        name: d,
        rooms: 0,
        wait: 0,
        done: 0,
        inProgress: 0,
      };
    });

    allAppointments.forEach((a) => {
      if (!map[a.department]) return;

      if (a.status === "completed") map[a.department].done++;
      if (a.status === "in-progress") map[a.department].inProgress++;
      if (a.status === "waiting" || a.status === "assigned")
        map[a.department].wait++;
    });

    return Object.values(map);
  }, [allAppointments]);

  const chartData = useMemo(() => {
    const map = {};

    allAppointments.forEach((a) => {
      if (!map[a.department]) map[a.department] = 0;

      if (a.status === "waiting" || a.status === "assigned") {
        map[a.department]++;
      }
    });

    return Object.keys(map).map((k) => ({
      name: k,
      waiting: map[k],
    }));
  }, [allAppointments]);

  if (isLoading) {
    return <div className="p-10 text-center">Loading admin dashboard...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold">📊 Hospital Overview</h1>
            <p className="text-gray-500 mt-1">Live operational metrics</p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">In Progress</p>
            <p className="text-3xl font-bold">{stats.inProgress}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Paid Patients" value={stats.registered} color="blue" />
          <StatCard title="Completed" value={stats.completed} color="green" />
          <StatCard title="Waiting" value={stats.waiting} color="amber" />
          <StatCard title="In Progress" value={stats.inProgress} color="blue" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Department Load</h2>

            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="waiting" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow">
            <h2 className="p-6 font-semibold">Department Status</h2>

            <div className="divide-y">
              {departmentData.map((dept, i) => (
                <div key={i} className="p-4 flex justify-between">
                  <div>
                    <p className="font-semibold">{dept.name}</p>
                    <p className="text-sm text-gray-500">
                      {dept.inProgress} active rooms
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-amber-600">{dept.wait} wait</p>
                    <p className="text-sm text-green-600">{dept.done} done</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="rounded-xl shadow p-6 flex justify-between items-center border">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-4xl font-bold">{value}</h3>
      </div>

      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${colors[color]}`}>
        📊
      </div>
    </div>
  );
}