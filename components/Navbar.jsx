"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect, useRef } from "react";

export default function HeaderContent() {
  const { cartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "User");
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-3xl font-black text-gray-900 tracking-tighter">K</span>
          <span className="text-2xl font-light text-gray-400">Store</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/store" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            ទំព័រដើម
          </Link>
          <Link 
            href="/store/products" 
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            ផលិតផល
          </Link>

          <Link href="/store/cart" className="relative p-2 -m-2 rounded-xl hover:bg-gray-100 transition-all group">
            <span className="text-2xl transition-transform group-hover:scale-110">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-medium text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
              >
                <div className="w-8 h-8 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-sm font-semibold shadow">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 leading-none">{username}</p>
                  <p className="text-[10px] text-gray-500">គណនី</p>
                </div>
                <span className="text-gray-400 text-xl leading-none">▼</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-3xl shadow-2xl py-3 z-50 overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{username}</p>
                    <p className="text-sm text-gray-500">កំពុងប្រើប្រាស់</p>
                  </div>
                  
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 mx-1 rounded-2xl transition-all font-medium"
                    >
                      <span className="text-xl">⭍</span>
                      ចាកចេញពីគណនី
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="bg-gray-900 text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-black transition-all"
            >
              ចូលប្រើប្រាស់
            </Link>
          )}
        </nav>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-3 text-2xl text-gray-700"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 flex flex-col gap-4">
          <Link href="/store" className="py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-2xl">ទំព័រដើម</Link>
          <Link href="/store/products" className="py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-2xl">ផលិតផល</Link>
          <Link href="/store/cart" className="py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-2xl flex justify-between items-center">
            កន្ត្រកទំនិញ <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">({cartCount})</span>
          </Link>

          <div className="h-px bg-gray-100 my-2" />

          {!isLoggedIn ? (
            <Link href="/login" className="bg-gray-900 text-white py-3.5 rounded-2xl text-center font-medium text-lg">
              ចូលប្រើប្រាស់
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-red-600 font-medium py-3.5 text-left px-4 hover:bg-red-50 rounded-2xl text-lg flex items-center gap-3">
              <span className="text-xl">⭍</span> ចាកចេញ
            </button>
          )}
        </div>
      )}
    </header>
  );
}