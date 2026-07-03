"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, fetchCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetchCart().finally(() => setLoading(false));
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  const updateQuantity = async (cartItemId: number, newQty: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (newQty <= 0) {
      deleteItem(cartItemId);
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/cart/${cartItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQty }),
      });

      if (res.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteItem = async (cartItemId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("តើអ្នកពិតជាចង់លុបទំនិញនេះមែនទេ?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/cart/${cartItemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("សូមចូលគណនីជាមុនសិន!");
      router.push("/login");
      return;
    }

    if (!confirm("តើអ្នកពិតជាចង់ទូទាត់ប្រាក់មែនទេ?")) return;

    setCheckoutLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/orders/", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        alert("ការបញ្ជាទិញបានជោគជ័យ! 🎉");
        fetchCart();
        router.push(`/store/invoice/${data.order_id}`);
      } else {
        alert("មានបញ្ហា៖ " + (data.detail || "សូមព្យាយាមម្តងទៀត"));
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("មានបញ្ហាក្នុងការតភ្ជាប់ទៅ Server");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">កំពុងទាញយកកន្ត្រក...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-semibold text-gray-900 mb-10">🛒 កន្ត្រកទំនិញ</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl">
          <div className="text-6xl mb-6">🛍️</div>
          <p className="text-xl text-gray-500 mb-6">កន្ត្រកទំនិញរបស់អ្នកនៅទទេ</p>
          <Link
            href="/store/products"
            className="inline-block bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-medium hover:bg-black transition"
          >
            ទិញផលិតផលឥឡូវនេះ
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center"
              >
                <img
                  src={item.item.image}
                  alt={item.item.name}
                  className="w-28 h-28 object-contain bg-gray-50 rounded-2xl border"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xl text-gray-900 line-clamp-2">
                    {item.item.name}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ${item.item.price}
                  </p>
                </div>

                {/* Quantity & Delete */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-11 h-11 hover:bg-gray-100 transition text-xl font-medium"
                    >
                      −
                    </button>
                    <span className="px-6 font-semibold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-11 h-11 hover:bg-gray-100 transition text-xl font-medium"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-3 transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6">សេចក្តីសរុប</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>ចំនួនផលិតផលសរុប</span>
                  <span className="font-medium">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} ដុំ
                  </span>
                </div>

                <div className="flex justify-between text-2xl font-bold border-t border-gray-100 pt-6">
                  <span>ទឹកប្រាក់សរុប</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className={`w-full mt-8 py-4 rounded-2xl font-medium text-lg transition-all ${
                  checkoutLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-black text-white"
                }`}
              >
                {checkoutLoading ? "កំពុងដំណើរការ..." : "បន្តទៅទូទាត់ប្រាក់"}
              </button>

              <Link
                href="/store/products"
                className="block text-center text-gray-500 hover:text-gray-700 mt-5 text-sm"
              >
                ← បន្តទិញទំនិញបន្ថែម
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}