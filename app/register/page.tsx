"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("ចុះឈ្មោះបានជោគជ័យ! 🎉");
        window.location.href = "/login";
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-5">
              <span className="text-white text-3xl">👤</span>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900">បង្កើតគណនី</h2>
            <p className="text-gray-600 mt-2">បំពេញព័ត៌មានខាងក្រោម</p>
          </div>

          {error && (
            <div className="p-4 mb-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ឈ្មោះអ្នកប្រើ</label>
              <input
                type="text"
                required
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 rounded-2xl outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="បញ្ចូលឈ្មោះអ្នកប្រើ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">អ៊ីមែល</label>
              <input
                type="email"
                required
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 rounded-2xl outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">លេខកូដសម្ងាត់</label>
              <input
                type="password"
                required
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 rounded-2xl outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 hover:bg-black text-white font-semibold text-lg rounded-2xl transition-all duration-200 disabled:opacity-70"
            >
              {loading ? "កំពុងចុះឈ្មោះ..." : "ចុះឈ្មោះ"}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            មានគណនីរួចហើយ?{" "}
            <Link href="/login" className="text-gray-900 font-medium hover:underline">
              ចូលប្រើប្រាស់
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}