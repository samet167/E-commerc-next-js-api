"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddUserPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/users/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) router.push("/admin/users"); else alert("មានបញ្ហា");
    } catch { alert("Server error"); } finally { setLoading(false); }
  };

  const inputCls = "w-full px-4 py-2.5 text-sm rounded-[var(--radius-lg)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10";
  const inputStyle = { backgroundColor: "var(--input-bg)", borderColor: "var(--border)", color: "var(--body)" };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users" className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--hover-bg)]" style={{ color: "var(--muted)" }}><ArrowLeft size={18} /></Link>
        <div><h1 className="text-xl font-semibold" style={{ color: "var(--heading)" }}>បន្ថែមអ្នកប្រើថ្មី</h1></div>
      </div>
      <div className="rounded-[var(--radius-xl)] border p-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ឈ្មោះ</label><input type="text" required className={inputCls} style={inputStyle} onChange={e => setForm({...form, username: e.target.value})} placeholder="ឈ្មោះ" /></div>
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>អ៊ីមែល</label><input type="email" required className={inputCls} style={inputStyle} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" /></div>
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ពាក្យសម្ងាត់</label><input type="password" required className={inputCls} style={inputStyle} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" /></div>
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>តួនាទី</label><select className={inputCls} style={inputStyle} onChange={e => setForm({...form, role: e.target.value})} value={form.role}><option value="user">User</option><option value="admin">Admin</option></select></div>
          <div className="flex gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <Link href="/admin/users" className="px-4 py-2.5 border rounded-[var(--radius-lg)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>បោះបង់</Link>
            <button type="submit" disabled={loading} className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-[var(--radius-lg)] text-sm font-medium disabled:opacity-50 shadow-xs">{loading ? "កំពុងរក្សាទុក..." : "បន្ថែម"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
