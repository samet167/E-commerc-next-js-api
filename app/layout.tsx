import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ជំនួញអនឡាញ - E-commerce",
  description: "ទិញទំនិញអនឡាញទាន់សម័យ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <body className="bg-gray-50 text-gray-950 min-h-screen">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
            <a href="/" className="text-xl font-extrabold text-blue-600 tracking-tight">K-Store</a>
            <nav className="space-x-6 text-sm font-medium">
              <a href="/" className="text-gray-600 hover:text-blue-600">ទំព័រដើម</a>
              <a href="/products" className="text-gray-600 hover:text-blue-600">ផលិតផល</a>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}