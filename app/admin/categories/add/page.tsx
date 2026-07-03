"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("សូមបញ្ចូលឈ្មោះប្រភេទ");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);

    try {
      const res = await fetch("http://127.0.0.1:8000/categories/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        alert("បានបន្ថែមប្រភេទថ្មីដោយជោគជ័យ! ✅");
        router.push("/admin/categories");
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
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">បន្ថែមប្រភេទថ្មី</h1>
      <p className="text-gray-500 mb-8">បំពេញឈ្មោះប្រភេទផលិតផលខាងក្រោម</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ឈ្មោះប្រភេទ
          </label>
          <input
            type="text"
            required
            className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition"
            placeholder="ឧ. ទូរស័ព្ទ ឬ Laptop"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg disabled:opacity-70"
        >
          {loading ? "កំពុងរក្សាទុក..." : "បន្ថែមប្រភេទ"}
        </button>
      </form>
    </div>
  );
}