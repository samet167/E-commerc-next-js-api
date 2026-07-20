"use client";
import { useEffect, useState } from "react";
import { Users, Package, Layers3, DollarSign } from "lucide-react";
import DashboardCharts from "@/components/DashboardCharts";

export default function DashboardPage() {
  const [stats, setStats] = useState({ total_users: 0, total_items: 0, total_categories: 0, total_value: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    Promise.all([
      fetch("http://127.0.0.1:8000/dashboard/stats", { headers }).then(r => r.json()),
      fetch("http://127.0.0.1:8000/dashboard/chart-data", { headers }).then(r => r.json()),
    ]).then(([s, c]) => { setStats(s); setChartData(c); }).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--heading)" }}>ទិដ្ឋភាពទូទៅ</h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>សង្ខេបស្ថិតិអាជីវកម្មរបស់អ្នក</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="អ្នកប្រើប្រាស់" value={stats.total_users} icon={<Users size={20} />} gradient="linear-gradient(135deg, #3B82F6, #2563EB)" lightBg="#EFF6FF" />
        <StatCard title="ផលិតផល" value={stats.total_items} icon={<Package size={20} />} gradient="linear-gradient(135deg, #10B981, #059669)" lightBg="#D1FAE5" />
        <StatCard title="ប្រភេទ" value={stats.total_categories} icon={<Layers3 size={20} />} gradient="linear-gradient(135deg, #F59E0B, #D97706)" lightBg="#FEF3C7" />
        <StatCard title="តម្លៃសរុប" value={`$${Number(stats.total_value).toLocaleString()}`} icon={<DollarSign size={20} />} gradient="linear-gradient(135deg, #8B5CF6, #6D28D9)" lightBg="#EDE9FE" />
      </div>

      <DashboardCharts data={chartData} />
    </div>
  );
}

function StatCard({ title, value, icon, gradient, lightBg }: { title: string; value: string | number; icon: React.ReactNode; gradient: string; lightBg: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] p-5 border relative overflow-hidden" style={{ background: "var(--gradient-card)", borderColor: "var(--border)" }}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-6 translate-x-6" style={{ background: gradient }} />
      <div className="w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center mb-4 text-white" style={{ background: gradient }}>
        {icon}
      </div>
      <p className="text-2xl font-bold" style={{ color: "var(--heading)" }}>{value}</p>
      <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{title}</p>
    </div>
  );
}
