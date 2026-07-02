"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-xl font-bold">E-Shop</Link>
      
      <Link href="/cart" className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200">
        🛒 
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}