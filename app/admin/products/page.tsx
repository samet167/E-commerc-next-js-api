"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ManageProductsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchItems = async () => {
    const res = await fetch(`http://127.0.0.1:8000/items/?page=${page}&limit=${limit}`);
    setItems(await res.json());
  };

  useEffect(() => { fetchItems(); }, [page]);

  const deleteItem = async (id: number) => {
    if (!confirm("តើអ្នកប្រាកដជាចង់លុបផលិតផលនេះទេ?")) return;
    await fetch(`http://127.0.0.1:8000/items/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: "var(--heading)" }}>គ្រប់គ្រងផលិតផល</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>ទំព័រទី {page}</p>
        </div>
        <Link href="/admin/products/add" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium shadow-xs">
          <Plus size={16} /> បន្ថែមថ្មី
        </Link>
      </div>

      <div className="rounded-[var(--radius-xl)] border overflow-hidden" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "var(--hover-bg)" }}>
              <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--muted)" }}>រូបភាព</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--muted)" }}>ឈ្មោះ</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--muted)" }}>តម្លៃ</th>
                <th className="text-left px-5 py-3 font-medium" style={{ color: "var(--muted)" }}>ចំនួន</th>
                <th className="text-right px-5 py-3 font-medium" style={{ color: "var(--muted)" }}>សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-[var(--hover-bg)]" style={{ borderColor: "var(--border)" }}>
                  <td className="px-5 py-3"><img src={item.image?.startsWith("http") ? item.image : `https://placehold.co/80x80?text=${encodeURIComponent(item.name)}`} className="w-10 h-10 object-cover rounded-[var(--radius-md)] border" style={{ borderColor: "var(--border)" }} alt="" /></td>
                  <td className="px-5 py-3 font-medium" style={{ color: "var(--heading)" }}>{item.name}</td>
                  <td className="px-5 py-3" style={{ color: "var(--muted)" }}>${item.price}</td>
                  <td className="px-5 py-3">
                    {item.quantity != null ? (
                      item.quantity > 10 ? (
                        <span className="text-xs font-medium text-success bg-success-light px-2 py-0.5 rounded-[var(--radius-full)]">{item.quantity}</span>
                      ) : item.quantity > 0 ? (
                        <span className="text-xs font-medium text-warning bg-warning-light px-2 py-0.5 rounded-[var(--radius-full)]">{item.quantity}</span>
                      ) : (
                        <span className="text-xs font-medium text-danger bg-danger-light px-2 py-0.5 rounded-[var(--radius-full)]">0</span>
                      )
                    ) : <span style={{ color: "var(--muted)" }}>—</span>}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/edit/${item.id}`} className="p-2 rounded-[var(--radius-md)] hover:bg-info-light text-primary"><Pencil size={15} /></Link>
                      <button onClick={() => deleteItem(item.id)} className="p-2 rounded-[var(--radius-md)] hover:bg-danger-light text-danger"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--hover-bg)" }}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3.5 py-1.5 text-sm font-medium border rounded-[var(--radius-md)] disabled:opacity-40" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--body)" }}>មុន</button>
          <span className="text-sm" style={{ color: "var(--muted)" }}>ទំព័រ {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={items.length < limit} className="px-3.5 py-1.5 text-sm font-medium border rounded-[var(--radius-md)] disabled:opacity-40" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--body)" }}>បន្ទាប់</button>
        </div>
      </div>
    </div>
  );
}
