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

  // ទាញ Categories
  useEffect(() => {
    fetch("http://127.0.0.1:8000/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // ទាញ Items
  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `http://127.0.0.1:8000/items/?category_id=${selectedCategory}`
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
    <div className="space-y-10">
      {/* Category Filter Bar */}
      <div className="border-b border-gray-100 pb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-gray-500 mr-2">ប្រភេទ៖</span>
          
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all ${
              selectedCategory === null
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            ទាំងអស់
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-24">
          <div className="text-gray-400 text-lg">កំពុងទាញយកផលិតផល...</div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          មិនមានផលិតផលនៅក្នុងប្រភេទនេះទេ
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <Link href={`/store/products/${product.id}`} className="block overflow-hidden bg-gray-50">
                <div className="h-56 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <Link href={`/store/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-black transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-gray-500 text-sm mt-2 line-clamp-3 flex-1">
                  {product.description}
                </p>

                {/* Price & Actions */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">តម្លៃ</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/store/products/${product.id}`}
                      className="py-3 text-center border border-gray-200 hover:border-gray-300 rounded-2xl text-sm font-medium transition"
                    >
                      មើលលម្អិត
                    </Link>
                    <button
                      onClick={() => {
                        addToCart(product.id, 1);
                        alert(`បានបន្ថែម ${product.name} ទៅកន្ត្រក ✓`);
                      }}
                      className="py-3 bg-gray-900 hover:bg-black text-white rounded-2xl text-sm font-medium transition"
                    >
                      + បញ្ចូលកន្ត្រក
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}