"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!name.trim()) return; setLoading(true);
    const formData = new FormData(); formData.append("name", name);
    try {
      const res = await fetch("http://127.0.0.1:8000/categories/", { method: "POST", body: formData, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      if (res.ok) router.push("/admin/categories"); else alert("មានបញ្ហា សូមព្យាយាមម្តងទៀត");
    } catch { alert("មិនអាចតភ្ជាប់ Server"); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories" className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--hover-bg)]" style={{ color: "var(--muted)" }}><ArrowLeft size={18} /></Link>
        <div><h1 className="text-xl font-semibold" style={{ color: "var(--heading)" }}>បន្ថែមប្រភេទថ្មី</h1></div>
      </div>
      <div className="rounded-[var(--radius-xl)] border p-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ឈ្មោះប្រភេទ</label><input type="text" required className="w-full px-4 py-2.5 text-sm rounded-[var(--radius-lg)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border)", color: "var(--body)" }} value={name} onChange={e => setName(e.target.value)} placeholder="ឧ. ទូរស័ព្ទ" /></div>
          <div className="flex gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <Link href="/admin/categories" className="px-4 py-2.5 border rounded-[var(--radius-lg)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>បោះបង់</Link>
            <button type="submit" disabled={loading} className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-[var(--radius-lg)] text-sm font-medium disabled:opacity-50 shadow-xs">{loading ? "កំពុងរក្សាទុក..." : "បន្ថែម"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
