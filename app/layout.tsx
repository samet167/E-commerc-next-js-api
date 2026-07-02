"use client"; 

import "./globals.css";
import Link from "next/link"; 
import { CartProvider, useCart } from "@/context/CartContext"; 
import { useState, useEffect } from "react"; // ◄ ✅ ថែមការនាំចូល useState និង useEffect

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <head>
        <title>ជំនួញអនឡាញ - E-commerce</title>
        <meta name="description" content="ទិញទំនិញអនឡាញទាន់សម័យ" />
      </head>
      <body className="bg-gray-50 text-gray-950 min-h-screen">
        <CartProvider>
          <HeaderContent />
          <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

function HeaderContent() {
  const { cartCount } = useCart(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ◄ ✅ State សម្រាប់ចំណាំស្ថានភាព Login

  useEffect(() => {
    // ឆែកមើលក្នុង localStorage បើមាន token មានន័យថាបាន Login រួចហើយ
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // មុខងារសម្រាប់ Logout (លុប Token រួច Refresh ទំព័រ)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("បានចាកចេញពីគណនី! 🔒");
    window.location.reload(); 
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-blue-600 tracking-tight">
          K-Store
        </Link>
        
        {/* Navigation & Cart Menu */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
            ទំព័រដើម
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-blue-600 transition">
            ផលិតផល
          </Link>

          {/* 🛒 ប៊ូតុងកន្ត្រកទំនិញ */}
          <Link href="/cart" className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <span className="text-lg">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce shadow">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 🔑 ✅ កន្លែងឆែកបង្ហាញប៊ូតុង Login / Logout */}
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              ចាកចេញ (Logout)
            </button>
          ) : (
            <Link 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
            >
              ចូលប្រើ (Login)
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}