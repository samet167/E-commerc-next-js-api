"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("បានបន្ថែមអ្នកប្រើប្រាស់ថ្មីដោយជោគជ័យ! ✅");
        router.push("/admin/users");
      } else {
        alert("មានបញ្ហា សូមព្យាយាមម្តងទៀត");
      }
    } catch (error) {
      alert("មិនអាចតភ្ជាប់ទៅ Server បានទេ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow border border-gray-100">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">បន្ថែមអ្នកប្រើថ្មី</h1>
      <p className="text-gray-500 mb-8">បំពេញព័ត៌មានខាងក្រោមដើម្បីបង្កើតគណនី</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ឈ្មោះអ្នកប្រើ</label>
          <input
            type="text"
            required
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition"
            placeholder="បញ្ចូលឈ្មោះអ្នកប្រើ"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">អ៊ីមែល</label>
          <input
            type="email"
            required
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition"
            placeholder="example@email.com"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ពាក្យសម្ងាត់</label>
          <input
            type="password"
            required
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition"
            placeholder="••••••••"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">តួនាទី (Role)</label>
          <select
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition bg-white"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            value={form.role}
          >
            <option value="user">User (ធម្មតា)</option>
            <option value="admin">Admin (អ្នកគ្រប់គ្រង)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg disabled:opacity-70"
        >
          {loading ? "កំពុងរក្សាទុក..." : "បន្ថែមអ្នកប្រើប្រាស់"}
        </button>
      </form>
    </div>
  );
}