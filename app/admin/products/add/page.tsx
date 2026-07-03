"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ 
    name: "", 
    description: "", 
    price: "", 
    quantity: "", 
    category_id: "", 
    file: null as File | null 
  });

  // ទាញយកបញ្ជី Category ដើម្បីដាក់ក្នុង Select Box
  useEffect(() => {
    fetch("http://127.0.0.1:8000/categories/")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("category_id", formData.category_id);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/items/", {
        method: "POST",
        body: data,
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}` 
        }
      });

      if (response.ok) {
        router.push("/admin/products");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail || "មិនអាចបន្ថែមបានទេ"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">បន្ថែមផលិតផលថ្មី</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* ឈ្មោះ */}
        <div>
          <label className="block text-sm font-medium mb-1">ឈ្មោះផលិតផល</label>
          <input className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
                 placeholder="ឧ. ស្មាតហ្វូន Samsung" onChange={e => setFormData({...formData, name: e.target.value})} required />
        </div>

        {/* ការពិពណ៌នា */}
        <div>
          <label className="block text-sm font-medium mb-1">ការពិពណ៌នា</label>
          <textarea className="w-full p-3 rounded-xl border border-slate-200" 
                    onChange={e => setFormData({...formData, description: e.target.value})} required />
        </div>

        {/* តម្លៃ និង ចំនួន */}
        <div className="grid grid-cols-2 gap-4">
          <input className="w-full p-3 rounded-xl border border-slate-200" placeholder="តម្លៃ ($)" type="number" 
                 onChange={e => setFormData({...formData, price: e.target.value})} required />
          <input className="w-full p-3 rounded-xl border border-slate-200" placeholder="ចំនួនក្នុងស្តុក" type="number" 
                 onChange={e => setFormData({...formData, quantity: e.target.value})} required />
        </div>

        {/* ប្រភេទ (Category Select) */}
        <div>
          <label className="block text-sm font-medium mb-1">ជ្រើសរើសប្រភេទ (Category)</label>
          <select className="w-full p-3 rounded-xl border border-slate-200" 
                  onChange={e => setFormData({...formData, category_id: e.target.value})} required>
            <option value="">-- ជ្រើសរើសប្រភេទ --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* ឯកសាររូបភាព */}
        <div>
          <label className="block text-sm font-medium mb-1">រូបភាពផលិតផល</label>
          <input type="file" className="w-full p-2 border border-slate-200 rounded-xl" 
                 onChange={e => setFormData({...formData, file: e.target.files![0]})} required />
        </div>

        <button disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
          {loading ? "កំពុងរក្សាទុក..." : "រក្សាទុកផលិតផល"}
        </button>
      </form>
    </div>
  );
}