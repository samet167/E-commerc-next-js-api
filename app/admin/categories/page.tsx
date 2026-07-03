"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * limit;
      const res = await fetch(`http://127.0.0.1:8000/categories/?skip=${skip}&limit=${limit}`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  const deleteCategory = async (id: number) => {
    if (!confirm("តើអ្នកពិតជាចង់លុបប្រភេទនេះមែនទេ?")) return;
    try {
      await fetch(`http://127.0.0.1:8000/categories/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCategories();
    } catch (err) {
      alert("មានបញ្ហាក្នុងការលុប");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">គ្រប់គ្រងប្រភេទផលិតផល</h1>
          <p className="text-gray-500 mt-1">ទំព័រទី {page}</p>
        </div>
        <Link href="/admin/categories/add" className="w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-black transition flex items-center justify-center gap-2 font-medium">
          + បន្ថែមប្រភេទថ្មី
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">កំពុងទាញយកទិន្នន័យ...</div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {/* Table View */}
          <table className="w-full hidden md:table">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">ID</th>
                <th className="px-6 py-5 text-left text-sm font-medium text-gray-500">ឈ្មោះប្រភេទ</th>
                <th className="px-6 py-5 text-center text-sm font-medium text-gray-500">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-5 text-gray-500">#{cat.id}</td>
                  <td className="px-6 py-5 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-6 py-5 text-center space-x-6">
                    <Link href={`/admin/categories/edit/${cat.id}`} className="text-blue-600 hover:underline">កែប្រែ</Link>
                    <button onClick={() => deleteCategory(cat.id)} className="text-red-600 hover:underline">លុប</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y">
            {categories.map((cat) => (
              <div key={cat.id} className="p-5 flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-400">#{cat.id}</div>
                  <div className="font-medium text-gray-900">{cat.name}</div>
                </div>
                <div className="flex gap-4">
                  <Link href={`/admin/categories/edit/${cat.id}`} className="text-blue-600 text-sm font-medium">កែប្រែ</Link>
                  <button onClick={() => deleteCategory(cat.id)} className="text-red-600 text-sm font-medium">លុប</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-white border rounded-xl text-sm disabled:opacity-50">មុន</button>
            <span className="text-sm text-gray-600">ទំព័រ {page}</span>
            <button disabled={categories.length < limit} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-white border rounded-xl text-sm">បន្ទាប់</button>
          </div>
        </div>
      )}
    </div>
  );
}