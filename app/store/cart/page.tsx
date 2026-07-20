"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, fetchCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => { fetchCart().finally(() => setLoading(false)); }, []);

  const totalPrice = cartItems.reduce((s, i) => s + i.item.price * i.quantity, 0);
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  const updateQuantity = async (cartItemId: number, newQty: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (newQty <= 0) { deleteItem(cartItemId); return; }
    try {
      const res = await fetch(`http://127.0.0.1:8000/cart/${cartItemId}`, { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ quantity: newQty }) });
      if (res.ok) fetchCart();
    } catch (e) { console.error(e); }
  };

  const deleteItem = async (cartItemId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!confirm("តើអ្នកពិតជាចង់លុបទំនិញនេះមែនទេ?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/cart/${cartItemId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) fetchCart();
    } catch (e) { console.error(e); }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) { alert("សូមចូលគណនីជាមុនសិន!"); router.push("/login"); return; }
    if (!confirm("តើអ្នកពិតជាចង់ទូទាត់ប្រាក់មែនទេ?")) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/orders/", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) { fetchCart(); router.push(`/store/invoice/${data.order_id}`); }
      else alert("មានបញ្ហា៖ " + (data.detail || "សូមព្យាយាមម្តងទៀត"));
    } catch (e) { alert("មានបញ្ហាក្នុងការតភ្ជាប់ទៅ Server"); } finally { setCheckoutLoading(false); }
  };

  if (loading) return (
    <div className="max-w-6xl mx-auto py-8 space-y-4">
      <div className="h-8 w-48 rounded-[var(--radius-md)]" style={{ backgroundColor: "var(--hover-bg)" }} />
      {[1,2,3].map(i => <div key={i} className="h-24 rounded-[var(--radius-xl)]" style={{ backgroundColor: "var(--hover-bg)" }} />)}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--heading)" }}>កន្ត្រកទំនិញ</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{cartItems.length > 0 ? `${totalItems} ផលិតផល ក្នុងកន្ត្រក` : "កន្ត្រកទទេ"}</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 rounded-[var(--radius-xl)] border" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--hover-bg)" }}>
            <ShoppingBag size={28} style={{ color: "var(--muted)" }} />
          </div>
          <h3 className="text-lg font-medium mb-2" style={{ color: "var(--heading)" }}>កន្ត្រកទំនិញរបស់អ្នកនៅទទេ</h3>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>ចាប់ផ្តើមបន្ថែមផលិតផល</p>
          <Link href="/store/products" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-[var(--radius-lg)] font-medium text-sm shadow-xs">
            <ShoppingBag size={16} /> ទិញផលិតផល
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="rounded-[var(--radius-xl)] p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center border" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                <div className="w-16 h-16 rounded-[var(--radius-lg)] overflow-hidden shrink-0 border" style={{ backgroundColor: "var(--hover-bg)", borderColor: "var(--border)" }}>
                  <img src={item.item.image.startsWith("http") ? item.item.image : `https://placehold.co/200x200?text=${encodeURIComponent(item.item.name)}`} alt={item.item.name} className="w-full h-full object-contain p-1.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-1" style={{ color: "var(--heading)" }}>{item.item.name}</h3>
                  <p className="text-base font-semibold mt-0.5" style={{ color: "var(--heading)" }}>${item.item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-[var(--radius-lg)]" style={{ borderColor: "var(--border)" }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--hover-bg)] rounded-l-[var(--radius-lg)]"><Minus size={14} /></button>
                    <span className="w-8 text-center font-medium text-sm border-x" style={{ borderColor: "var(--border)" }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--hover-bg)] rounded-r-[var(--radius-lg)]"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => deleteItem(item.id)} className="w-8 h-8 flex items-center justify-center text-danger hover:bg-danger-light rounded-[var(--radius-md)]"><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-1/3">
            <div className="rounded-[var(--radius-xl)] p-6 sticky top-20 border" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <h2 className="text-base font-semibold mb-5" style={{ color: "var(--heading)" }}>សេចក្តីសរុប</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between" style={{ color: "var(--muted)" }}><span>ចំនួន</span><span className="font-medium" style={{ color: "var(--heading)" }}>{totalItems} ដុំ</span></div>
                <div className="flex justify-between" style={{ color: "var(--muted)" }}><span>ដឹកជញ្ជូន</span><span className="font-medium text-success">ឥតគិតថ្លៃ</span></div>
              </div>
              <div className="border-t mt-5 pt-5 flex justify-between items-center" style={{ borderColor: "var(--border)" }}>
                <span className="text-sm font-medium" style={{ color: "var(--heading)" }}>សរុប</span>
                <span className="text-xl font-semibold" style={{ color: "var(--heading)" }}>${totalPrice}</span>
              </div>
              <button onClick={handleCheckout} disabled={checkoutLoading} className="w-full mt-5 py-3 bg-primary hover:bg-primary-hover text-white rounded-[var(--radius-lg)] font-medium text-sm disabled:opacity-50 shadow-sm">
                {checkoutLoading ? "កំពុងដំណើរការ..." : "បន្តទៅទូទាត់"}
              </button>
              <Link href="/store/products" className="flex items-center justify-center gap-2 text-sm mt-4 font-medium hover:text-primary" style={{ color: "var(--muted)" }}>
                <ArrowLeft size={14} /> បន្តទិញទំនិញ
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
