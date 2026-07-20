"use client";
import { useState } from "react";
import Link from "next/link";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const formData = new URLSearchParams(); formData.append("username", username); formData.append("password", password);
      const res = await fetch("http://127.0.0.1:8000/auth/login", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: formData });
      const data = await res.json();
      if (res.ok) { localStorage.setItem("token", data.access_token); localStorage.setItem("username", username); window.location.href = "/store"; }
      else setError(data.detail || "ឈ្មោះអ្នកប្រើ ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ");
    } catch { setError("មិនអាចតភ្ជាប់ Server"); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "var(--bg-section)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-[var(--radius-xl)] flex items-center justify-center text-white font-bold text-lg">K</div>
            <span className="text-xl font-bold" style={{ color: "var(--heading)" }}>K-Store</span>
          </Link>
        </div>

        <div className="rounded-[var(--radius-2xl)] border p-7" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", boxShadow: "var(--shadow-lg)" }}>
          <div className="mb-6">
            <h1 className="text-xl font-bold" style={{ color: "var(--heading)" }}>សូមស្វាគមន៍</h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>ចូលប្រើប្រាស់គណនីរបស់អ្នក</p>
          </div>

          {error && <div className="p-3 mb-5 text-sm text-danger bg-danger-light rounded-[var(--radius-lg)]" role="alert">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>ឈ្មោះអ្នកប្រើ</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--placeholder)" }} />
                <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-lg)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--body)" }} placeholder="username" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>ពាក្យសម្ងាត់</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--placeholder)" }} />
                <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-2.5 text-sm rounded-[var(--radius-lg)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--body)" }} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--placeholder)" }}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer" style={{ color: "var(--muted)" }}><input type="checkbox" className="w-3.5 h-3.5 rounded text-primary" /> ចងចាំ</label>
              <Link href="#" className="text-primary font-medium hover:underline">ភ្លេចពាក្យសម្ងាត់?</Link>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-[var(--radius-lg)] text-sm disabled:opacity-50 shadow-sm">
              {loading ? "កំពុងផ្ទៀងផ្ទាត់..." : "ចូលប្រើប្រាស់"}
            </button>
          </form>

          <div className="relative my-5"><div className="absolute inset-0 flex items-center"><div className="w-full border-t" style={{ borderColor: "var(--border)" }} /></div><div className="relative flex justify-center text-xs"><span className="px-3" style={{ backgroundColor: "var(--card)", color: "var(--muted)" }}>ឬ</span></div></div>

          <button type="button" className="w-full flex items-center justify-center gap-3 py-2.5 border rounded-[var(--radius-lg)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ borderColor: "var(--border)", color: "var(--heading)" }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            ចូលដោយ Google
          </button>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "var(--muted)" }}>មិនទាន់មានគណនី? <Link href="/register" className="text-primary font-semibold hover:underline">ចុះឈ្មោះ</Link></p>
      </div>
    </div>
  );
}
