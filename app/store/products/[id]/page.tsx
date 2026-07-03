"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        កំពុងទាញយកព័ត៌មានផលិតផល...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        រកមិនឃើញផលិតផលនេះទេ!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="bg-gray-50 rounded-3xl p-8 flex items-center justify-center border border-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[520px] w-full object-contain rounded-2xl"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-gray-900 mt-4">
              ${product.price}
            </p>
          </div>

          <div className="prose text-gray-600 leading-relaxed">
            {product.description}
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">
              ចំនួន
            </label>
            <div className="flex items-center border border-gray-200 rounded-2xl w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 rounded-l-2xl transition"
              >
                −
              </button>
              <div className="w-16 text-center font-semibold text-xl">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100 rounded-r-2xl transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              addToCart(product.id, quantity);
              alert(`បានបន្ថែម ${product.name} (${quantity} ដុំ) ទៅកន្ត្រក ✓`);
            }}
            className="w-full bg-gray-900 hover:bg-black text-white font-medium py-4 rounded-2xl text-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            🛒 បន្ថែមទៅកន្ត្រក
          </button>

          {/* Back Button */}
          <Link
            href="/store/products"
            className="block text-center text-gray-500 hover:text-gray-700 font-medium py-3"
          >
            ← ត្រឡប់ទៅកាន់ផលិតផលទាំងអស់
          </Link>
        </div>
      </div>
    </div>
  );
}