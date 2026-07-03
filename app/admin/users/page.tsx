"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const skip = (page - 1) * limit;
      const res = await fetch(`http://127.0.0.1:8000/users/?skip=${skip}&limit=${limit}`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const deleteUser = async (id: number) => {
    if (!confirm("តើអ្នកពិតជាចង់លុបអ្នកប្រើប្រាស់នេះមែនទេ?")) return;
    try {
      await fetch(`http://127.0.0.1:8000/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (err) {
      alert("មានបញ្ហាក្នុងការលុប");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">គ្រប់គ្រងអ្នកប្រើប្រាស់</h1>
          <p className="text-gray-500 mt-1">រៀបចំតាមលេខសម្គាល់ថ្មីទៅចាស់</p>
        </div>
        <Link href="/admin/users/add" className="w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-black transition flex items-center justify-center gap-2 font-medium">
          + បន្ថែមអ្នកប្រើថ្មី
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">កំពុងទាញយកទិន្នន័យ...</div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">ឈ្មោះ</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">អ៊ីមែល</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">តួនាទី</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-5 text-gray-500">#{user.id}</td>
                    <td className="px-6 py-5 font-medium text-gray-900">{user.username}</td>
                    <td className="px-6 py-5 text-gray-600">{user.email}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${user.role === "admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center space-x-4">
                      <Link href={`/admin/users/edit/${user.id}`} className="text-blue-600 hover:underline">កែប្រែ</Link>
                      <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:underline">លុប</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y">
            {users.map((user) => (
              <div key={user.id} className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${user.role === "admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                    {user.role.toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-4 pt-2 border-t">
                  <Link href={`/admin/users/edit/${user.id}`} className="text-blue-600 text-sm font-medium">កែប្រែ</Link>
                  <button onClick={() => deleteUser(user.id)} className="text-red-600 text-sm font-medium">លុប</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)} 
              className="px-5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-gray-100 transition"
            >
              មុន
            </button>
            <span className="text-sm text-gray-600">ទំព័រទី <span className="font-bold">{page}</span></span>
            <button 
              disabled={users.length < limit} 
              onClick={() => setPage(p => p + 1)} 
              className="px-5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-50 hover:bg-gray-100 transition"
            >
              បន្ទាប់
            </button>
          </div>
        </div>
      )}
    </div>
  );
}