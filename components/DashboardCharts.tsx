"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DashboardCharts({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mt-8">
      <h3 className="font-bold text-xl text-gray-800 mb-6">ស្ថិតិទំនិញតាមប្រភេទ</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '12px'}} />
            <Bar dataKey="views" fill="#10b981" radius={[10, 10, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}