"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // តម្លៃដើមជា user ធម្មតា
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔗 ហៅទៅកាន់ API Register របស់ FastAPI Backend (ដូរ URL តាមជាក់ស្តែង)
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("ចុះឈ្មោះបានជោគជ័យ! 🎉 សូមមេត្តា Login");
        router.push("/login"); // រុញទៅទំព័រ Login
      } else {
        setError(data.detail || "មានកំហុសក្នុងការចុះឈ្មោះ");
      }
    } catch (err) {
      setError("មិនអាចតភ្ជាប់ទៅកាន់ Server បានទេ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">បង្កើតគណនីថ្មី</h2>
      
      {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះអ្នកប្រើ (Username)</label>
          <input
            type="text"
            required
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">អ៊ីមែល (Email)</label>
          <input
            type="email"
            required
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">លេខកូដសម្ងាត់ (Password)</label>
          <input
            type="password"
            required
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
        >
          {loading ? "កំពុងចុះឈ្មោះ..." : "ចុះឈ្មោះ"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        មានគណនីរួចហើយមែនទេ? <Link href="/login" className="text-blue-600 hover:underline">ចូលប្រើប្រាស់</Link>
      </p>
    </div>
  );
}