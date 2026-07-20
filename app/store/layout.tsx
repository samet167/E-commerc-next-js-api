"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
        <Navbar />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
