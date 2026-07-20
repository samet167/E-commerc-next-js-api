"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchUsers = async () => { setLoading(true); try { const skip = (page-1)*limit; const res = await fetch(`http://127.0.0.1:8000/users/?skip=${skip}&limit=${limit}`); setUsers(await res.json()); } catch {} finally { setLoading(false); } };
  useEffect(() => { fetchUsers(); }, [page]);

  const deleteUser = async (id: number) => {
    if (!confirm("តើអ្នកពិតជាចង់លុបអ្នកប្រើប្រាស់នេះមែនទេ?")) return;
    await fetch(`http://127.0.0.1:8000/users/${id}`, { method: "DELETE" }); fetchUsers();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-xl font-semibold" style={{ color: "var(--heading)" }}>គ្រប់គ្រងអ្នកប្រើ</h1><p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>ទំព័រទី {page}</p></div>
        <Link href="/admin/users/add" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium shadow-xs"><Plus size={16} /> បន្ថែមថ្មី</Link>
      </div>
      {loading ? <div className="space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="h-12 rounded-[var(--radius-lg)]" style={{ backgroundColor: "var(--hover-bg)" }} />)}</div> : (
        <div className="rounded-[var(--radius-xl)] border overflow-hidden" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "var(--hover-bg)" }}><tr className="border-b" style={{ borderColor: "var(--border)" }}><th className="text-left px-5 py-3 font-medium" style={{ color: "var(--muted)" }}>ID</th><th className="text-left px-5 py-3 font-medium" style={{ color: "var(--muted)" }}>ឈ្មោះ</th><th className="text-left px-5 py-3 font-medium" style={{ color: "var(--muted)" }}>អ៊ីមែល</th><th className="text-left px-5 py-3 font-medium" style={{ color: "var(--muted)" }}>តួនាទី</th><th className="text-right px-5 py-3 font-medium" style={{ color: "var(--muted)" }}>សកម្មភាព</th></tr></thead>
              <tbody>{users.map(u => (
                <tr key={u.id} className="border-b hover:bg-[var(--hover-bg)]" style={{ borderColor: "var(--border)" }}>
                  <td className="px-5 py-3.5" style={{ color: "var(--muted)" }}>#{u.id}</td>
                  <td className="px-5 py-3.5 font-medium" style={{ color: "var(--heading)" }}>{u.username}</td>
                  <td className="px-5 py-3.5" style={{ color: "var(--muted)" }}>{u.email}</td>
                  <td className="px-5 py-3.5"><span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-[var(--radius-sm)] ${u.role === "admin" ? "bg-danger-light text-danger" : "bg-info-light text-info"}`}>{u.role}</span></td>
                  <td className="px-5 py-3.5 text-right"><div className="flex items-center justify-end gap-1"><Link href={`/admin/users/edit/${u.id}`} className="p-2 rounded-[var(--radius-md)] hover:bg-info-light text-primary"><Pencil size={15} /></Link><button onClick={() => deleteUser(u.id)} className="p-2 rounded-[var(--radius-md)] hover:bg-danger-light text-danger"><Trash2 size={15} /></button></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--hover-bg)" }}>
            <button disabled={page===1} onClick={() => setPage(p => p-1)} className="px-3.5 py-1.5 text-sm font-medium border rounded-[var(--radius-md)] disabled:opacity-40" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--body)" }}>មុន</button>
            <span className="text-sm" style={{ color: "var(--muted)" }}>ទំព័រ {page}</span>
            <button disabled={users.length<limit} onClick={() => setPage(p => p+1)} className="px-3.5 py-1.5 text-sm font-medium border rounded-[var(--radius-md)] disabled:opacity-40" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", color: "var(--body)" }}>បន្ទាប់</button>
          </div>
        </div>
      )}
    </div>
  );
}
