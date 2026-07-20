"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Heart } from "lucide-react";

interface Item { id: number; name: string; price: number; description: string; image: string; category_id: number; }
interface Category { id: number; name: string; }

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/categories/").then((r) => r.json()).then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory ? `http://127.0.0.1:8000/items/?category_id=${selectedCategory}` : "http://127.0.0.1:8000/items/";
    fetch(url).then((r) => r.json()).then((data) => { setItems(data); setLoading(false); }).catch(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold" style={{ color: "var(--heading)" }}>ផលិតផលទាំងអស់</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>រកមើលផលិតផលដែលអ្នកត្រូវការ</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium border ${selectedCategory === null ? "bg-primary text-white border-primary" : ""}`}
          style={selectedCategory !== null ? { borderColor: "var(--border)", color: "var(--muted)", backgroundColor: "var(--surface)" } : {}}
        >
          ទាំងអស់
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium border ${selectedCategory === cat.id ? "bg-primary text-white border-primary" : ""}`}
            style={selectedCategory !== cat.id ? { borderColor: "var(--border)", color: "var(--muted)", backgroundColor: "var(--surface)" } : {}}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-[var(--radius-xl)] p-4 space-y-4" style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-xs)" }}>
              <div className="h-44 rounded-[var(--radius-lg)]" style={{ backgroundColor: "var(--hover-bg)" }} />
              <div className="h-4 w-3/4 rounded" style={{ backgroundColor: "var(--hover-bg)" }} />
              <div className="h-3 w-1/2 rounded" style={{ backgroundColor: "var(--hover-bg)" }} />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 rounded-[var(--radius-xl)] border" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-lg font-medium mb-2" style={{ color: "var(--heading)" }}>មិនមានផលិតផល</h3>
          <p className="text-sm" style={{ color: "var(--muted)" }}>សូមជ្រើសរើសប្រភេទផ្សេង</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="rounded-[var(--radius-xl)] flex flex-col h-full overflow-hidden" style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-sm)" }}>
              <div className="relative h-52 overflow-hidden" style={{ backgroundColor: "var(--hover-bg)" }}>
                <Link href={`/store/products/${product.id}`}>
                  <img src={product.image.startsWith("http") ? product.image : `https://placehold.co/400x300?text=${encodeURIComponent(product.name)}`} alt={product.name} className="w-full h-full object-contain p-4" loading="lazy" />
                </Link>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center border hover:text-danger" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--muted)" }} aria-label="Wishlist"><Heart size={14} /></button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <Link href={`/store/products/${product.id}`}><h3 className="font-semibold text-sm leading-tight line-clamp-2 hover:text-primary" style={{ color: "var(--heading)" }}>{product.name}</h3></Link>
                <p className="text-xs mt-1.5 line-clamp-2 flex-grow" style={{ color: "var(--muted)" }}>{product.description}</p>
                <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
                  <span className="text-base font-semibold" style={{ color: "var(--heading)" }}>${product.price}</span>
                  <button onClick={() => addToCart(product.id, 1)} className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-medium px-3 py-2 rounded-[var(--radius-lg)] shadow-xs"><ShoppingCart size={14} /> បន្ថែម</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
