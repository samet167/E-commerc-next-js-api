// "use client";
// import { useEffect, useState } from "react";

// export default function DashboardStats() {
//   const [stats, setStats] = useState({ total_users: 0, total_items: 0, total_categories: 0, total_value: 0 });

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/dashboard/stats", {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//     })
//     .then(res => res.json())
//     .then(data => setStats(data));
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* ផ្នែក KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <StatCard title="អ្នកប្រើប្រាស់សរុប" value={stats.total_users} trend="+12%" />
//         <StatCard title="ផលិតផលសរុប" value={stats.total_items} trend="+5%" />
//         <StatCard title="ប្រភេទផលិតផល" value={stats.total_categories} trend="0%" />
//         <StatCard title="តម្លៃទំនិញសរុប" value={`$${stats.total_value.toLocaleString()}`} trend="+8%" />
//       </div>

//       {/* ទីនេះអ្នកអាចបន្ថែម Chart component នៅពេលក្រោយ */}
//       <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
//         <h3 className="font-bold text-lg mb-4">ទិដ្ឋភាពទូទៅនៃទិន្នន័យ</h3>
//         <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg text-gray-400">
//           [ក្រាហ្វិកនឹងបង្ហាញនៅទីនេះ]
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value, trend }: { title: string, value: string | number, trend: string }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
//       <p className="text-gray-500 text-sm font-medium">{title}</p>
//       <div className="flex justify-between items-end mt-2">
//         <h2 className="text-3xl font-black">{value}</h2>
//         <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">{trend}</span>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import DashboardCharts from "../../components/DashboardCharts"; // Import ក្រាហ្វិកដែលបង្កើតថ្មី

export default function DashboardStats() {
  const [stats, setStats] = useState({ total_users: 0, total_items: 0, total_categories: 0, total_value: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // ទាញទិន្នន័យ Cards
    fetch("http://127.0.0.1:8000/dashboard/stats", { /* headers... */ })
      .then(res => res.json()).then(setStats);
    
    // ទាញទិន្នន័យសម្រាប់ Chart
    fetch("http://127.0.0.1:8000/dashboard/chart-data", { /* headers... */ })
      .then(res => res.json()).then(setChartData);
  }, []);

  return (
    <div className="space-y-6">
      {/* ផ្នែក KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="អ្នកប្រើប្រាស់សរុប" value={stats.total_users} trend="+12%" />
        <StatCard title="ផលិតផលសរុប" value={stats.total_items} trend="+5%" />
        <StatCard title="ប្រភេទផលិតផល" value={stats.total_categories} trend="0%" />
        <StatCard title="តម្លៃទំនិញសរុប" value={`$${stats.total_value.toLocaleString()}`} trend="+8%" />
      </div>

      {/* បង្ហាញក្រាហ្វិក */}
      <DashboardCharts data={chartData} />
    </div>
  );
}

function StatCard({ title, value, trend }: { title: string, value: string | number, trend: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <div className="flex justify-between items-end mt-2">
        <h2 className="text-3xl font-black">{value}</h2>
        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">{trend}</span>
      </div>
    </div>
  );
}
