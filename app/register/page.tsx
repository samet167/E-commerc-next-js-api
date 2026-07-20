"use client";
import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (res.ok) { alert("ចុះឈ្មោះបានជោគជ័យ!"); window.location.href = "/login"; }
      else setError(data.detail || "មានកំហុសក្នុងការចុះឈ្មោះ");
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
            <h1 className="text-xl font-bold" style={{ color: "var(--heading)" }}>បង្កើតគណនី</h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>បំពេញព័ត៌មានខាងក្រោម</p>
          </div>

          {error && <div className="p-3 mb-5 text-sm text-danger bg-danger-light rounded-[var(--radius-lg)]" role="alert">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>ឈ្មោះអ្នកប្រើ</label>
              <div className="relative"><User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--placeholder)" }} /><input type="text" required className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-lg)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--body)" }} onChange={e => setFormData({...formData, username: e.target.value})} placeholder="username" /></div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>អ៊ីមែល</label>
              <div className="relative"><Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--placeholder)" }} /><input type="email" required className="w-full pl-10 pr-4 py-2.5 text-sm rounded-[var(--radius-lg)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--body)" }} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@example.com" /></div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>ពាក្យសម្ងាត់</label>
              <div className="relative"><Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--placeholder)" }} /><input type={showPassword ? "text" : "password"} required className="w-full pl-10 pr-10 py-2.5 text-sm rounded-[var(--radius-lg)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--body)" }} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--placeholder)" }}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
            </div>
            <label className="flex items-start gap-2 text-xs cursor-pointer" style={{ color: "var(--muted)" }}><input type="checkbox" required className="w-3.5 h-3.5 mt-0.5 rounded text-primary" /><span>ខ្ញុំយល់ព្រមនឹង <Link href="#" className="text-primary hover:underline">លក្ខខណ្ឌ</Link></span></label>
            <button type="submit" disabled={loading} className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-[var(--radius-lg)] text-sm disabled:opacity-50 shadow-sm">
              {loading ? "កំពុងចុះឈ្មោះ..." : "ចុះឈ្មោះ"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "var(--muted)" }}>មានគណនីរួចហើយ? <Link href="/login" className="text-primary font-semibold hover:underline">ចូលប្រើប្រាស់</Link></p>
      </div>
    </div>
  );
}
