"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // ១. ទាញយកបញ្ជីប្រភេទ (Categories) ទាំងអស់សម្រាប់ដាក់លើរបារប៊ូតុងខាងលើ
  useEffect(() => {
    fetch("http://127.0.0.1:8000/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // ២. ទាញយកបញ្ជីទំនិញ (Items) ដោយផ្អែកលើ Category ដែលបានជ្រើសរើស
  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? "http://127.0.0.1:8000/items/?category_id=" + selectedCategory
      : "http://127.0.0.1:8000/items/";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div className="space-y-8">
      {/* 🏷️ របារចម្រោះស្វែងរកតាមប្រភេទ (Category Filter Bar) */}
      <div className="flex flex-wrap gap-3 items-center border-b pb-6">
        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mr-2">
          ប្រភេទផលិតផល៖
        </span>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            selectedCategory === null
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white border text-gray-700 hover:bg-gray-50"
          }`}
        >
          ទាំងអស់ (All)
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              selectedCategory === cat.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 📦 ផ្នែកបង្ហាញបញ្ជីទំនិញ (Products Grid) */}
      {loading ? (
        <div className="text-center py-20 text-gray-500 font-medium">
          កំពុងទាញយកផលិតផល...
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          មិនមានទំនិញនៅក្នុងប្រភេទនេះឡើយ! 🍃
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              {/* លីងចុចទៅកាន់ទំព័រលម្អិត (លើរូបភាព និងឈ្មោះ) */}
              <Link href={"/products/" + product.id} className="group">
                <div className="p-4 bg-gray-50 flex justify-center items-center h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-gray-800 text-base line-clamp-1 group-hover:text-blue-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2 min-h-[2rem]">
                    {product.description}
                  </p>
                </div>
              </Link>

              {/* ផ្នែកតម្លៃ និងប៊ូតុងសកម្មភាព */}
              <div className="p-4 pt-0 mt-auto space-y-3">
                <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                  <span className="text-sm font-semibold text-gray-400">តម្លៃ</span>
                  <span className="text-lg font-extrabold text-gray-900">
                    ${product.price}
                  </span>
                </div>
                
                {/* 🔘 ប៊ូតុងបញ្ជា៖ មើលលម្អិត និង ថែមចូលកន្ត្រក */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={"/products/" + product.id}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-2 rounded-xl text-xs font-bold transition duration-200 flex items-center justify-center"
                  >
                    🔍 មើលលម្អិត
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(product.id, 1);
                      alert("បានបន្ថែម " + product.name + " ទៅក្នុងកន្ត្រក! 🛒");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-bold transition duration-200"
                  >
                    + ថែមចូលកន្ត្រក
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}