"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, ArrowLeft, Heart, Package } from "lucide-react";

interface Product { id: number; name: string; price: number; description: string; image: string; quantity?: number; }

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`http://127.0.0.1:8000/items/${id}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="h-96 rounded-[var(--radius-xl)]" style={{ backgroundColor: "var(--hover-bg)" }} />
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded-[var(--radius-md)]" style={{ backgroundColor: "var(--hover-bg)" }} />
            <div className="h-6 w-1/4 rounded" style={{ backgroundColor: "var(--hover-bg)" }} />
            <div className="h-20 w-full rounded-[var(--radius-lg)]" style={{ backgroundColor: "var(--hover-bg)" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--heading)" }}>រកមិនឃើញផលិតផល</h2>
        <Link href="/store/products" className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"><ArrowLeft size={16} /> ត្រឡប់ទៅផលិតផល</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
          <li><Link href="/store/products" className="hover:text-primary">ផលិតផល</Link></li>
          <li>/</li>
          <li className="font-medium truncate max-w-[200px]" style={{ color: "var(--heading)" }}>{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="rounded-[var(--radius-xl)] p-8 flex items-center justify-center border" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <img src={product.image.startsWith("http") ? product.image : `https://placehold.co/600x500?text=${encodeURIComponent(product.name)}`} alt={product.name} className="max-h-[480px] w-full object-contain rounded-[var(--radius-lg)]" />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold leading-tight" style={{ color: "var(--heading)" }}>{product.name}</h1>
            <p className="text-3xl font-semibold mt-4" style={{ color: "var(--heading)" }}>${product.price}</p>
          </div>

          {product.quantity !== undefined && (
            <div className="flex items-center gap-2">
              <Package size={16} style={{ color: "var(--muted)" }} />
              {product.quantity > 0 ? (
                <span className="text-sm font-medium text-success">មានក្នុងស្តុក ({product.quantity} នៅសល់)</span>
              ) : (
                <span className="text-sm font-medium text-danger">អស់ពីស្តុក</span>
              )}
            </div>
          )}

          <div className="border-t pt-6" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--heading)" }}>ការពិពណ៌នា</h3>
            <p className="leading-relaxed" style={{ color: "var(--muted)" }}>{product.description}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: "var(--heading)" }}>ចំនួន</label>
            <div className="flex items-center border rounded-[var(--radius-lg)] w-fit" style={{ borderColor: "var(--border)" }}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[var(--hover-bg)] rounded-l-[var(--radius-lg)]" aria-label="បន្ថយ"><Minus size={16} /></button>
              <div className="w-12 text-center font-semibold text-base border-x" style={{ borderColor: "var(--border)", color: "var(--heading)" }}>{quantity}</div>
              <button onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-[var(--hover-bg)] rounded-r-[var(--radius-lg)]" aria-label="បង្កើន"><Plus size={16} /></button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={() => addToCart(product.id, quantity)} className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-[var(--radius-lg)] text-sm shadow-sm">
              <ShoppingCart size={18} /> បន្ថែមទៅកន្ត្រក
            </button>
            <button className="flex items-center justify-center gap-2 border font-medium py-3 px-5 rounded-[var(--radius-lg)] text-sm hover:bg-[var(--hover-bg)]" style={{ borderColor: "var(--border)", color: "var(--muted)" }} aria-label="Wishlist">
              <Heart size={18} />
            </button>
          </div>

          <Link href="/store/products" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary pt-4" style={{ color: "var(--muted)" }}>
            <ArrowLeft size={14} /> ត្រឡប់ទៅផលិតផលទាំងអស់
          </Link>
        </div>
      </div>
    </div>
  );
}
