"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", role: "user" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ទាញទិន្នន័យពី Backend
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`http://127.0.0.1:8000/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("កែប្រែព័ត៌មានបានជោគជ័យ! ✅");
        router.push("/admin/users");
      } else {
        alert("មានបញ្ហា សូមព្យាយាមម្តងទៀត");
      }
    } catch (error) {
      alert("មិនអាចតភ្ជាប់ទៅ Server បានទេ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">កំពុងទាញយកព័ត៌មាន...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-10 rounded-3xl shadow border border-gray-100">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">កែប្រែព័ត៌មានអ្នកប្រើ</h1>
      <p className="text-gray-500 mb-8">ID: #{id}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ឈ្មោះអ្នកប្រើ</label>
          <input
            type="text"
            required
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">អ៊ីមែល</label>
          <input
            type="email"
            required
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">តួនាទី (Role)</label>
          <select
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition bg-white"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User (ធម្មតា)</option>
            <option value="admin">Admin (អ្នកគ្រប់គ្រង)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg disabled:opacity-70"
        >
          {saving ? "កំពុងរក្សាទុក..." : "អាប់ដេតព័ត៌មាន"}
        </button>
      </form>
    </div>
  );
}