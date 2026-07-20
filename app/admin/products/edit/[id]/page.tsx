"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", quantity: "", category_id: "", file: null as File | null });

  useEffect(() => {
    (async () => {
      const [catRes, itemRes] = await Promise.all([fetch("http://127.0.0.1:8000/categories/"), fetch(`http://127.0.0.1:8000/items/${id}`)]);
      setCategories(await catRes.json());
      const item = await itemRes.json();
      setFormData({ name: item.name, description: item.description, price: item.price, quantity: item.quantity, category_id: item.category_id, file: null });
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const data = new FormData();
    data.append("name", formData.name); data.append("description", formData.description);
    data.append("price", formData.price); data.append("quantity", formData.quantity);
    data.append("category_id", formData.category_id);
    if (formData.file) data.append("file", formData.file);
    try {
      const res = await fetch(`http://127.0.0.1:8000/items/${id}`, { method: "PUT", body: data, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      if (res.ok) router.push("/admin/products"); else alert("មានបញ្ហាក្នុងការកែប្រែ");
    } finally { setLoading(false); }
  };

  const inputCls = "w-full px-4 py-2.5 text-sm rounded-[var(--radius-lg)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10";
  const inputStyle = { backgroundColor: "var(--input-bg)", borderColor: "var(--border)", color: "var(--body)" };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--hover-bg)]" style={{ color: "var(--muted)" }}><ArrowLeft size={18} /></Link>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: "var(--heading)" }}>កែប្រែផលិតផល</h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>ID: #{id}</p>
        </div>
      </div>
      <div className="rounded-[var(--radius-xl)] border p-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ឈ្មោះ</label><input className={inputCls} style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ការពិពណ៌នា</label><textarea className={`${inputCls} min-h-[100px]`} style={inputStyle} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>តម្លៃ</label><input type="number" className={inputCls} style={inputStyle} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required /></div>
            <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ចំនួន</label><input type="number" className={inputCls} style={inputStyle} value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} required /></div>
          </div>
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>ប្រភេទ</label><select className={inputCls} style={inputStyle} value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div><label className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>រូបភាពថ្មី</label><input type="file" className={inputCls} style={inputStyle} onChange={e => setFormData({...formData, file: e.target.files![0]})} /></div>
          <div className="flex gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <Link href="/admin/products" className="px-4 py-2.5 border rounded-[var(--radius-lg)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>បោះបង់</Link>
            <button type="submit" disabled={loading} className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-[var(--radius-lg)] text-sm font-medium disabled:opacity-50 shadow-xs">{loading ? "កំពុងអាប់ដេត..." : "រក្សាទុក"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
