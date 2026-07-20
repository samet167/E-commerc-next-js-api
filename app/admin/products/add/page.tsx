"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", quantity: "", category_id: "", file: null as File | null });

  useEffect(() => { fetch("http://127.0.0.1:8000/categories/").then(r => r.json()).then(setCategories).catch(() => {}); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const data = new FormData();
    data.append("name", formData.name); data.append("description", formData.description);
    data.append("price", formData.price); data.append("quantity", formData.quantity);
    data.append("category_id", formData.category_id);
    if (formData.file) data.append("file", formData.file);
    try {
      const res = await fetch("http://127.0.0.1:8000/items/", { method: "POST", body: data, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      if (res.ok) router.push("/admin/products"); else { const err = await res.json(); alert(err.detail || "មិនអាចបន្ថែមបានទេ"); }
    } catch {} finally { setLoading(false); }
  };

  const inputCls = "w-full px-4 py-2.5 text-sm rounded-[var(--radius-lg)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10";
  const inputStyle = { backgroundColor: "var(--input-bg)", borderColor: "var(--border)", color: "var(--body)" };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--hover-bg)]" style={{ color: "var(--muted)" }}><ArrowLeft size={18} /></Link>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: "var(--heading)" }}>បន្ថែមផលិតផលថ្មី</h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>បំពេញព័ត៌មានផលិតផល</p>
        </div>
      </div>

      <div className="rounded-[var(--radius-xl)] border p-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ឈ្មោះផលិតផល</label>
            <input className={inputCls} style={inputStyle} placeholder="ឧ. ស្មាតហ្វូន Samsung" onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ការពិពណ៌នា</label>
            <textarea className={`${inputCls} min-h-[100px]`} style={inputStyle} onChange={e => setFormData({...formData, description: e.target.value})} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>តម្លៃ ($)</label><input type="number" className={inputCls} style={inputStyle} onChange={e => setFormData({...formData, price: e.target.value})} required /></div>
            <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ចំនួន</label><input type="number" className={inputCls} style={inputStyle} onChange={e => setFormData({...formData, quantity: e.target.value})} required /></div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ប្រភេទ</label>
            <select className={inputCls} style={inputStyle} onChange={e => setFormData({...formData, category_id: e.target.value})} required>
              <option value="">-- ជ្រើសរើសប្រភេទ --</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>រូបភាព</label>
            <input type="file" className={inputCls} style={inputStyle} onChange={e => setFormData({...formData, file: e.target.files![0]})} required />
          </div>
          <div className="flex gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <Link href="/admin/products" className="px-4 py-2.5 border rounded-[var(--radius-lg)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>បោះបង់</Link>
            <button type="submit" disabled={loading} className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-[var(--radius-lg)] text-sm font-medium disabled:opacity-50 shadow-xs">{loading ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
