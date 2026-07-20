"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`http://127.0.0.1:8000/categories/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(r => r.json()).then(d => { setName(d.name ?? ""); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    const formData = new FormData(); formData.append("name", name);
    try {
      const res = await fetch(`http://127.0.0.1:8000/categories/${id}`, { method: "PUT", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, body: formData });
      if (res.ok) router.push("/admin/categories"); else alert("មិនអាចកែប្រែបានទេ");
    } catch (e: any) { alert(e.message); } finally { setSaving(false); }
  };

  if (loading) return <div className="max-w-lg mx-auto space-y-4 py-8"><div className="h-8 w-48 rounded-[var(--radius-md)]" style={{ backgroundColor: "var(--hover-bg)" }} /><div className="h-40 rounded-[var(--radius-xl)]" style={{ backgroundColor: "var(--hover-bg)" }} /></div>;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories" className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--hover-bg)]" style={{ color: "var(--muted)" }}><ArrowLeft size={18} /></Link>
        <div><h1 className="text-xl font-semibold" style={{ color: "var(--heading)" }}>កែប្រែប្រភេទ</h1><p className="text-sm" style={{ color: "var(--muted)" }}>ID: #{id}</p></div>
      </div>
      <div className="rounded-[var(--radius-xl)] border p-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ឈ្មោះប្រភេទ</label><input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2.5 text-sm rounded-[var(--radius-lg)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border)", color: "var(--body)" }} /></div>
          <div className="flex gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <Link href="/admin/categories" className="px-4 py-2.5 border rounded-[var(--radius-lg)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>បោះបង់</Link>
            <button type="submit" disabled={saving} className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-[var(--radius-lg)] text-sm font-medium disabled:opacity-50 shadow-xs">{saving ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
