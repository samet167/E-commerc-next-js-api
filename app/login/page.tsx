"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔗 FastAPI ភាគច្រើនប្រើ OAuth2 ដែលតម្រូវឱ្យផ្ញើជា Form Data (URL Encoded) សម្រាប់ Login
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
        // ✅ រក្សាទុក Token ចូលទៅក្នុង localStorage ម៉ាស៊ីនអ្នកប្រើប្រាស់
        localStorage.setItem("token", data.access_token);
        
        alert("ចូលប្រើប្រាស់បានជោគជ័យ! 🔑");
        
        // រុញទៅទំព័រដើម រួចបង្ខំឱ្យ Refresh មួយដងដើម្បីឱ្យ Navbar ទាញយកកន្ត្រកទំនិញមកបង្ហាញ
        router.push("/");
        setTimeout(() => window.location.reload(), 500);
      } else {
        setError(data.detail || "ឈ្មោះអ្នកប្រើ ឬ លេខកកូដសម្ងាត់មិនត្រឹមត្រូវទេ");
      }
    } catch (err) {
      setError("មិនអាចតភ្ជាប់ទៅកាន់ Server បានទេ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ចូលប្រើប្រាស់គណនី</h2>

      {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះអ្នកប្រើ (Username)</label>
          <input
            type="text"
            required
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">លេខកូដសម្ងាត់ (Password)</label>
          <input
            type="password"
            required
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
        >
          {loading ? "កំពុងផ្ទៀងផ្ទាត់..." : "ចូលប្រើប្រាស់"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        មិនទាន់មានគណនីមែនទេ? <Link href="/register" className="text-blue-600 hover:underline">ចុះឈ្មោះឥឡូវនេះ</Link>
      </p>
    </div>
  );
}