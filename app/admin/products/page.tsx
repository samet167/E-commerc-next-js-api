"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ManageProductsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10; // កំណត់ចំនួនទិន្នន័យក្នុងមួយទំព័រ

  const fetchItems = async () => {
    // បញ្ជូន page និង limit ទៅកាន់ Backend
    const res = await fetch(`http://127.0.0.1:8000/items/?page=${page}&limit=${limit}`);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => { 
    fetchItems(); 
  }, [page]); // ហៅឡើងវិញរាល់ពេលប្តូរ page

  const deleteItem = async (id: number) => {
    if (!confirm("តើអ្នកប្រាកដជាចង់លុបផលិតផលនេះទេ?")) return;
    await fetch(`http://127.0.0.1:8000/items/${id}`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    fetchItems();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">គ្រប់គ្រងផលិតផល</h1>
        <Link href="/admin/products/add" className="bg-blue-600 text-white px-4 py-2 rounded-xl">បន្ថែមថ្មី</Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-sm rounded-xl">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr><th className="p-4">រូបភាព</th><th className="p-4">ឈ្មោះ</th><th className="p-4">តម្លៃ</th><th className="p-4">សកម្មភាព</th></tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t">
                <td className="p-2"><img src={item.image} className="w-16 h-16 object-cover rounded mx-auto" /></td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">${item.price}</td>
                <td className="p-4">
                  <Link href={`/admin/products/edit/${item.id}`} className="text-blue-600 mr-4">កែប្រែ</Link>
                  <button onClick={() => deleteItem(item.id)} className="text-red-600">លុប</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button 
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >មុន</button>
        <span className="py-2">ទំព័រទី {page}</span>
        <button 
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >បន្ទាប់</button>
      </div>
    </div>
  );
}