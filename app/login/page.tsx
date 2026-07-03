"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", username);
        alert("ចូលប្រើប្រាស់បានជោគជ័យ! 🔑");
        window.location.href = "/store";
      } else {
        setError(data.detail || "ឈ្មោះអ្នកប្រើ ឬ លេខកូដសម្ងាត់មិនត្រឹមត្រូវទេ");
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
              <span className="text-white text-3xl">🔑</span>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900">សូមស្វាគមន៍</h2>
            <p className="text-gray-600 mt-2">ចូលប្រើប្រាស់គណនីរបស់អ្នក</p>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 rounded-2xl outline-none transition-all text-gray-900"
                placeholder="បញ្ចូលឈ្មោះអ្នកប្រើ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">លេខកូដសម្ងាត់</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 rounded-2xl outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 hover:bg-black text-white font-semibold text-lg rounded-2xl transition-all duration-200 disabled:opacity-70"
            >
              {loading ? "កំពុងផ្ទៀងផ្ទាត់..." : "ចូលប្រើប្រាស់"}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            មិនទាន់មានគណនី?{" "}
            <Link href="/register" className="text-gray-900 font-medium hover:underline">
              ចុះឈ្មោះឥឡូវនេះ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}