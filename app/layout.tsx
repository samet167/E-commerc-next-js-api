"use client"; 

import "./globals.css";
import Link from "next/link"; 
import { CartProvider, useCart } from "@/context/CartContext"; 
import { useState, useEffect, useRef } from "react"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <head>
        <title>ជំនួញអនឡាញ - E-commerce</title>
        <meta name="description" content="ទិញទំនិញអនឡាញទាន់សម័យ" />
      </head>
      <body className="bg-gray-50 text-gray-950 min-h-screen flex flex-col justify-between">
        <CartProvider>
          {/* 1. Header Navigation */}
          <HeaderContent />
          
          {/* 2. Main Content Space */}
          <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">{children}</main>
          
          {/* 3. Footer Content Component */}
          <FooterContent />
        </CartProvider>
      </body>
    </html>
  );
}

// 🏗️ ✨ Component Header កែសម្រួលប្រព័ន្ធទាញទិន្នន័យ Login ត្រឹមត្រូវ
function HeaderContent() {
  const { cartCount } = useCart(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [username, setUsername] = useState(""); // ◄ ✅ ដំបូងទុកឱ្យទទេស្អាតសិន
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 💡 ដំណើរការតែនៅលើ Client-side ពេល Component រួចរាល់
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username"); // ◄ ✅ ចាប់យកឈ្មោះពិតពី LocalStorage

    if (token) {
      setIsLoggedIn(true);
      // ✅ បើមានឈ្មោះពិតក្នុងប្រព័ន្ធ ឱ្យបង្ហាញឈ្មោះពិត បើអត់ទេទើបដាក់ "User" ឬ "សាម៉េត"
      setUsername(storedUsername || "User"); 
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // ◄ ✅ លុបឈ្មោះចេញពេល Logout
    setIsLoggedIn(false);
    setUsername("");
    setShowDropdown(false);
    alert("បានចាកចេញពីគណនីជោគជ័យ! 🔒");
    window.location.href = "/"; 
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Logo ហាង */}
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-wider hover:opacity-90 transition">
          K<span className="text-gray-800 font-light">-</span>Store
        </Link>
        
        {/* របារ Menu */}
        <nav className="flex items-center space-x-6 text-sm font-semibold h-full">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition flex items-center h-full">
            ទំព័រដើម
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-blue-600 transition flex items-center h-full">
            ផលិតផល
          </Link>

          {/* 🛒 កន្ត្រកទំនិញ */}
          <Link href="/cart" className="relative p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition border border-gray-100 flex items-center justify-center">
            <span className="text-lg leading-none">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-md border-2 border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 🔐 ផ្នែកបង្ហាញឈ្មោះអតិថិជនដែលបាន Login */}
          <div className="flex items-center">
            {isLoggedIn && username ? ( // ◄ ✅ ពិនិត្យមើលទាល់តែដឹងថាបាន Login និងមានឈ្មោះទើបបង្ហាញ UI នេះ
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition h-9 focus:outline-none"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                    👤
                  </div>
                  {/* ✍️ លោតឈ្មោះអ្នក Login ពិតប្រាកដនៅត្រង់នេះ */}
                  <span className="text-gray-700 text-xs font-bold max-w-[100px] truncate leading-none">
                    {username}
                  </span>
                  <span className="text-[9px] text-gray-400">▼</span>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-2 text-[11px] border-b border-gray-50 text-gray-400 font-normal truncate">
                      គណនី៖ {username}
                    </div>
                    <Link 
                      href="/cart" 
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-50 text-xs transition"
                    >
                      📦 ប្រវត្តិបញ្ជាទិញ
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-50 text-xs font-bold transition border-t border-gray-50"
                    >
                      🚫 ចាកចេញ (Logout)
                    </button>
                  </div>
                )}
              </div>
            ) : !isLoggedIn ? ( // ◄ ✅ បង្ហាញប៊ូតុង Login តែក្នុងករណីមិនទាន់មានការ Login ប៉ុណ្ណោះ
              <Link 
                href="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl text-xs font-bold transition shadow-sm hover:shadow flex items-center justify-center h-9 active:scale-95 duration-150"
              >
                ចូលប្រើ (Login)
              </Link>
            ) : (
              /* ករណីកំពុង Loading ទាញទិន្នន័យ (រារាំងកុំឱ្យ UI រេ) */
              <div className="h-9 w-20 bg-gray-100 rounded-xl animate-pulse" />
            )}
          </div>
        </nav>

      </div>
    </header>
  );
}

// 🏗️ Component សម្រាប់បង្ហាញ Footer ខាងក្រោមគេបង្អស់
function FooterContent() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20 print:hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-blue-600 tracking-tight">K-Store</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            យើងខ្ញុំជាហាងលក់ទំនិញអនឡាញទាន់សម័យ ផ្តល់ជូនផលិតផលមានគុណភាពខ្ពស់ តម្លៃសមរម្យ និងសេវាកម្មរហ័សទាន់ចិត្តជូនដល់អតិថិជន។
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">លីងរហ័ស (Quick Links)</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-blue-600 transition">ទំព័រដើម</Link></li>
            <li><Link href="/products" className="text-gray-500 hover:text-blue-600 transition">ផលិតផលទាំងអស់</Link></li>
            <li><Link href="/cart" className="text-gray-500 hover:text-blue-600 transition">កន្ត្រកទំនិញ</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">ទំនាក់ទំនង (Contact)</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>📍 ទីតាំង៖ រាជធានីភ្នំពេញ, ប្រទេសកម្ពុជា</li>
            <li>📞 ទូរស័ព្ទ៖ +855 12 345 678</li>
            <li>✉️ អ៊ីមែល៖ info@kstore.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-50 py-6 text-center text-xs text-gray-400">
        <p>© ២០២៦ K-Store Co., Ltd. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
      </div>
    </footer>
  );
}