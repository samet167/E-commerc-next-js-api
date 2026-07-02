"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// កំណត់ប្រភេទលក្ខណៈទិន្នន័យរបស់ Item
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductDetailPage() {
  const { id } = useParams(); // ◄ ចាប់យកលេខ ID ពី URL (ឧទាហរណ៍៖ /products/1)
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // ហៅទៅកាន់ FastAPI Backend ដើម្បីទាញយកទិន្នន័យទំនិញតាម ID ជាក់ស្តែង
  useEffect(() => {
    if (!id) return;
    
    fetch(`http://127.0.0.1:8000/items/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("រកមិនឃើញទំនិញនេះទេ");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center p-10">កំពុងទាញយកទិន្នន័យ...</div>;
  if (!product) return <div className="text-center p-10 text-red-500">រកមិនឃើញផលិតផលឡើយ!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md flex gap-8 items-center my-10">
      {/* ផ្នែករូបភាព - ទាញចេញពី URL ពេញលេញដែលផ្តល់ដោយ FastAPI */}
      <div className="w-1/2 bg-gray-100 p-4 rounded-lg flex justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-80 object-contain rounded-lg"
        />
      </div>

      {/* ផ្នែកព័ត៌មានទំនិញ */}
      <div className="w-1/2 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-2xl font-semibold text-gray-900">${product.price}</p>
        <p className="text-gray-500">{product.description}</p>

        {/* កន្លែងរើសចំនួន */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">ចំនួន:</label>
          <div className="flex items-center border rounded-lg">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold"
            >
              -
            </button>
            <span className="px-4 py-1 font-semibold">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* 🛒 ប៊ូតុង បន្ថែមទៅក្នុងកន្ត្រក */}
        <button
          onClick={() => addToCart(product.id, quantity)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition duration-200 shadow-md"
        >
          បន្ថែមទៅក្នុងកន្ត្រក
        </button>
      </div>
    </div>
  );
}