"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";

export default function DashboardCharts({ data }: { data: any[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Bar Chart */}
      <div className="rounded-[var(--radius-xl)] p-6 border" style={{ background: "var(--gradient-card)", borderColor: "var(--border)" }}>
        <h3 className="font-semibold text-sm mb-6" style={{ color: "var(--heading)" }}>ទំនិញតាមប្រភេទ</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} />
              <Tooltip cursor={{ fill: "var(--hover-bg)" }} contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", backgroundColor: "var(--card)", boxShadow: "var(--shadow-lg)" }} />
              <Bar dataKey="views" fill="url(#barGradient)" radius={[8, 8, 0, 0]} barSize={32} />
              <defs><linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366F1" /><stop offset="100%" stopColor="#2563EB" /></linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area Chart */}
      <div className="rounded-[var(--radius-xl)] p-6 border" style={{ background: "var(--gradient-card)", borderColor: "var(--border)" }}>
        <h3 className="font-semibold text-sm mb-6" style={{ color: "var(--heading)" }}>និន្នាការទិញ</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted)", fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", backgroundColor: "var(--card)", boxShadow: "var(--shadow-lg)" }} />
              <defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#06B6D4" stopOpacity={0.3} /><stop offset="100%" stopColor="#06B6D4" stopOpacity={0} /></linearGradient></defs>
              <Area type="monotone" dataKey="views" stroke="#06B6D4" strokeWidth={2} fill="url(#areaGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
