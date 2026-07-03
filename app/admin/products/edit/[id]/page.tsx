"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category_id: "",
    file: null as File | null,
  });

  // ១. ទាញយកបញ្ជី Category និងទិន្នន័យផលិតផលចាស់
  useEffect(() => {
    const fetchData = async () => {
      // យកបញ្ជី Category
      const catRes = await fetch("http://127.0.0.1:8000/categories/");
      const catData = await catRes.json();
      setCategories(catData);

      // យកទិន្នន័យផលិតផលតាម ID
      const itemRes = await fetch(`http://127.0.0.1:8000/items/${id}`);
      const itemData = await itemRes.json();
      setFormData({
        name: itemData.name,
        description: itemData.description,
        price: itemData.price,
        quantity: itemData.quantity,
        category_id: itemData.category_id,
        file: null, // រូបភាពមិនអាច set ចូល input file បានទេ
      });
    };
    fetchData();
  }, [id]);

  // ២. មុខងារ Submit កែប្រែ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("category_id", formData.category_id);
    if (formData.file) data.append("file", formData.file);

    try {
      const res = await fetch(`http://127.0.0.1:8000/items/${id}`, {
        method: "PUT",
        body: data,
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.ok) router.push("/admin/products");
      else alert("មានបញ្ហាក្នុងការកែប្រែ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">កែប្រែផលិតផល</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-3 border rounded-xl" value={formData.name} 
               onChange={e => setFormData({...formData, name: e.target.value})} />
        
        <textarea className="w-full p-3 border rounded-xl" value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})} />

        <div className="grid grid-cols-2 gap-4">
          <input className="w-full p-3 border rounded-xl" type="number" value={formData.price}
                 onChange={e => setFormData({...formData, price: e.target.value})} />
          <input className="w-full p-3 border rounded-xl" type="number" value={formData.quantity}
                 onChange={e => setFormData({...formData, quantity: e.target.value})} />
        </div>

        <select className="w-full p-3 border rounded-xl" value={formData.category_id}
                onChange={e => setFormData({...formData, category_id: e.target.value})}>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>

        <input type="file" className="w-full p-2 border rounded-xl" 
               onChange={e => setFormData({...formData, file: e.target.files![0]})} />
        
        <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
          {loading ? "កំពុងអាប់ដេត..." : "រក្សាទុកការកែប្រែ"}
        </button>
      </form>
    </div>
  );
}