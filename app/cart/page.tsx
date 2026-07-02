"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  // 🔗 ទាញយក State និងមុខងារគ្រប់គ្រងពី CartContext មកប្រើ
  const { cartItems, fetchCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetchCart().finally(() => setLoading(false));
  }, []);

  // គណនាតម្លៃសរុបក្នុងកន្ត្រក (តម្លៃទំនិញ x ចំនួន)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  // មុខងារកែប្រែចំនួនលេខទំនិញ (+ ឬ -) ហៅទៅកាន់ FastAPI Backend
  const updateQuantity = async (cartItemId: number, newQty: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (newQty <= 0) {
      deleteItem(cartItemId);
      return;
    }

    try {
      // ✅ ប្រើការបូកអក្សរធម្មតា ការពារដាច់សញ្ញា / ទៅជា /cart:1
      const res = await fetch("http://127.0.0.1:8000/cart/" + cartItemId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ quantity: newQty }),
      });

      if (res.ok) {
        fetchCart(); // ទាញយកទិន្នន័យថ្មីមក Update លើអេក្រង់
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // មុខងារលុបទំនិញមួយចេញពីកន្ត្រក
  const deleteItem = async (cartItemId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("តើអ្នកពិតជាចង់លុបទំនិញនេះចេញពីកន្ត្រកមែនទេ?")) return;

    try {
      // ✅ ប្រើការបូកអក្សរធម្មតា ការពារកំហុស URL
      const res = await fetch("http://127.0.0.1:8000/cart/" + cartItemId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (res.ok) {
        alert("បានលុបចេញពីកន្ត្រក! 🗑️");
        fetchCart();
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // 💳 មុខងារដំណើរការទូទាត់ប្រាក់ (Checkout) ទៅកាន់ FastAPI Backend
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("សូមចូលគណនី (Login) ជាមុនសិន!");
      router.push("/login");
      return;
    }

    if (!confirm("តើអ្នកពិតជាចង់ទូទាត់ប្រាក់លើទំនិញទាំងនេះមែនទេ?")) return;

    setCheckoutLoading(true);
    try {
      // 🔗 ផ្លូវ URL ទៅកាន់ /orders/ របស់ FastAPI
      const res = await fetch("http://127.0.0.1:8000/orders/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert("ការទូទាត់ប្រាក់បានជោគជ័យ! 🎉");
        fetchCart(); // សម្អាតកន្ត្រកទំនិញឱ្យទៅជាទទេស្អាតឡើងវិញ
        
        // 🚀 ✅ រុញអតិថិជនទៅកាន់ទំព័រវិក្កយបត្រ (Invoice) ភ្លាមៗជាមួយលេខ order_id
        router.push("/invoice/" + data.order_id);
      } else {
        alert("ការទូទាត់បរាជ័យ: " + (data.detail || "មានកំហុសបច្ចេកទេស"));
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("មានបញ្ហាក្នុងការតភ្ជាប់ទៅកាន់ Server");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) return <div className="text-center p-10">កំពុងទាញយកទិន្នន័យកន្ត្រកទំនិញ...</div>;

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-2">
        🛒 កន្ត្រកទំនិញរបស់អ្នក
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-gray-500 text-lg">មិនទាន់មានទំនិញនៅក្នុងកន្ត្រករបស់អ្នកឡើយឡើយ។</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow"
          >
            ទៅទិញទំនិញឥឡូវនេះ
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* បញ្ជីមុខទំនិញឆ្វេងដៃ */}
          <div className="lg:w-2/3 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                {/* រូបភាពនិងឈ្មោះ */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.item.image}
                    alt={item.item.name}
                    className="w-20 h-20 object-contain rounded-lg bg-white p-1 border"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{item.item.name}</h3>
                    <p className="text-blue-600 font-semibold">${item.item.price}</p>
                  </div>
                </div>

                {/* ឧបករណ៍បញ្ជា (+ / - / លុប) */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center border bg-white rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 font-bold text-gray-600 transition"
                    >
                      -
                    </button>
                    <span className="px-4 font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 font-bold text-gray-600 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* ប៊ូតុងលុប */}
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 font-medium text-sm transition"
                  >
                    🗑️ លុប
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ផ្ទាំងសរុបលុយស្តាំដៃ */}
          <div className="lg:w-1/3 p-6 bg-gray-50 rounded-2xl border border-gray-200 h-fit space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-3">សេចក្តីសរុបការបញ្ជាទិញ</h2>
            
            <div className="flex justify-between items-center text-gray-600">
              <span>ចំនួនមុខទំនិញសរុប៖</span>
              <span className="font-semibold text-gray-800">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} មុខ
              </span>
            </div>

            <div className="flex justify-between items-center text-lg font-bold text-gray-800 border-t pt-4">
              <span>ទឹកប្រាក់សរុប៖</span>
              <span className="text-2xl text-green-600">${totalPrice}</span>
            </div>

            {/* 💳 ប៊ូតុង Checkout */}
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className={`w-full text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 shadow ${
                checkoutLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {checkoutLoading ? "កំពុងដំណើរការទូទាត់..." : "បន្តទៅកាន់ការទូទាត់ប្រាក់"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}