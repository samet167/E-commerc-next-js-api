"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, ArrowRight } from "lucide-react";

interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function StorePage() {
  const { addToCart } = useCart();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/items/?page=1&limit=8")
      .then((res) => res.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Card */}
      <div
        className="rounded-[var(--radius-xl)] p-8 sm:p-10 border"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", boxShadow: "var(--shadow-sm)" }}
      >
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2" style={{ color: "var(--heading)" }}>
          ស្វាគមន៍មកកាន់ K-Store
        </h1>
        <p className="text-base max-w-2xl" style={{ color: "var(--muted)" }}>
          ស្វែងរកទំនិញអេឡិចត្រូនិក និងសម្ភារៈទំនើបៗជាច្រើនប្រភេទ ជាមួយតម្លៃសមរម្យបំផុត។
        </p>
        <Link href="/store/products" className="inline-flex items-center gap-2 mt-4 text-primary font-medium text-sm hover:underline">
          មើលផលិតផលទាំងអស់ <ArrowRight size={16} />
        </Link>
      </div>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold" style={{ color: "var(--heading)" }}>ផលិតផលថ្មីបំផុត</h2>
          <Link href="/store/products" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            មើលទាំងអស់ <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-[var(--radius-xl)] p-4 space-y-4" style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-xs)" }}>
                <div className="h-40 rounded-[var(--radius-lg)]" style={{ backgroundColor: "var(--hover-bg)" }} />
                <div className="h-4 w-3/4 rounded" style={{ backgroundColor: "var(--hover-bg)" }} />
                <div className="h-3 w-1/2 rounded" style={{ backgroundColor: "var(--hover-bg)" }} />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 rounded-[var(--radius-xl)] border" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <div className="text-5xl mb-4">📦</div>
            <p className="text-base" style={{ color: "var(--muted)" }}>មិនមានផលិតផលនៅឡើយទេ</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <div key={product.id} className="rounded-[var(--radius-xl)] flex flex-col h-full overflow-hidden" style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-sm)" }}>
                <Link href={`/store/products/${product.id}`} className="block h-48 overflow-hidden" style={{ backgroundColor: "var(--hover-bg)" }}>
                  <img
                    src={product.image.startsWith("http") ? product.image : `https://placehold.co/400x300?text=${encodeURIComponent(product.name)}`}
                    alt={product.name} className="w-full h-full object-contain p-4" loading="lazy"
                  />
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                  <Link href={`/store/products/${product.id}`}>
                    <h3 className="font-semibold text-sm leading-tight line-clamp-2 hover:text-primary" style={{ color: "var(--heading)" }}>{product.name}</h3>
                  </Link>
                  <p className="text-xs mt-1.5 line-clamp-2 flex-grow" style={{ color: "var(--muted)" }}>{product.description}</p>
                  <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
                    <span className="text-base font-semibold" style={{ color: "var(--heading)" }}>${product.price}</span>
                    <button onClick={() => addToCart(product.id, 1)} className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-medium px-3 py-2 rounded-[var(--radius-lg)] shadow-xs">
                      <ShoppingCart size={14} /> បន្ថែម
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
