"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Package,
  Layers3,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import DashboardCharts from "@/components/DashboardCharts";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_items: 0,
    total_categories: 0,
    total_value: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    Promise.all([
      fetch("http://127.0.0.1:8000/dashboard/stats", { headers }).then((res) =>
        res.json()
      ),
      fetch("http://127.0.0.1:8000/dashboard/chart-data", {
        headers,
      }).then((res) => res.json()),
    ])
      .then(([statsData, chart]) => {
        setStats(statsData);
        setChartData(chart);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800">
          📊 Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome back! Here's your business summary.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="អ្នកប្រើប្រាស់"
          value={stats.total_users}
          trend="+12%"
          icon={<Users size={28} />}
          gradient="from-blue-500 to-cyan-500"
          badge="bg-blue-100 text-blue-700"
        />

        <StatCard
          title="ផលិតផល"
          value={stats.total_items}
          trend="+5%"
          icon={<Package size={28} />}
          gradient="from-emerald-500 to-green-500"
          badge="bg-emerald-100 text-emerald-700"
        />

        <StatCard
          title="ប្រភេទ"
          value={stats.total_categories}
          trend="0%"
          icon={<Layers3 size={28} />}
          gradient="from-orange-500 to-amber-500"
          badge="bg-orange-100 text-orange-700"
        />

        <StatCard
          title="តម្លៃសរុប"
          value={`$${Number(stats.total_value).toLocaleString()}`}
          trend="+8%"
          icon={<DollarSign size={28} />}
          gradient="from-violet-500 to-fuchsia-500"
          badge="bg-violet-100 text-violet-700"
        />
      </div>

      {/* Charts */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          📈 Analytics
        </h2>

        <DashboardCharts data={chartData} />
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  icon: React.ReactNode;
  gradient: string;
  badge: string;
}

function StatCard({
  title,
  value,
  trend,
  icon,
  gradient,
  badge,
}: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6">
      {/* Background Decoration */}
      <div
        className={`absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-r ${gradient} opacity-10`}
      />

      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}
      >
        {icon}
      </div>

      {/* Title */}
      <p className="mt-6 text-gray-500 font-semibold uppercase tracking-wide">
        {title}
      </p>

      {/* Value */}
      <h2 className="text-4xl font-extrabold text-gray-800 mt-2">
        {value}
      </h2>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${badge}`}
        >
          {trend}
        </span>

        <TrendingUp className="text-green-500" size={22} />
      </div>
    </div>
  );
}