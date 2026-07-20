"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, LogOut, ChevronDown, Menu, X, Search, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token) { setIsLoggedIn(true); setUsername(storedUsername || "User"); }
    const handleClickOutside = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("username"); window.location.href = "/"; };

  return (
    <header className="sticky top-0 z-50 w-full border-b" style={{ height: "64px", backgroundColor: "var(--navbar)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-[var(--radius-lg)] flex items-center justify-center text-white font-semibold text-sm bg-primary">K</div>
          <span className="text-lg font-semibold hidden sm:block" style={{ color: "var(--heading)" }}>K-Store</span>
        </Link>

        {/* Center */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/store" className="px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ color: "var(--muted)" }}>ទំព័រដើម</Link>
          <Link href="/store/products" className="px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ color: "var(--muted)" }}>ផលិតផល</Link>
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--placeholder)" }} />
            <input type="text" placeholder="ស្វែងរក..." className="pl-9 pr-4 py-2 w-44 lg:w-52 text-sm rounded-[var(--radius-full)] border outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border)", color: "var(--body)" }} />
          </div>

          <button onClick={toggleTheme} className="p-2 rounded-[var(--radius-full)] hover:bg-[var(--hover-bg)]" aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} className="text-warning" /> : <Moon size={18} style={{ color: "var(--muted)" }} />}
          </button>

          <Link href="/store/cart" className="relative p-2 rounded-[var(--radius-full)] hover:bg-[var(--hover-bg)]" aria-label="កន្ត្រក">
            <ShoppingCart size={18} style={{ color: "var(--muted)" }} />
            {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] font-bold text-white bg-primary">{cartCount > 9 ? "9+" : cartCount}</span>}
          </Link>

          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-[var(--radius-full)] hover:bg-[var(--hover-bg)]" aria-label="Menu">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-primary">{username.charAt(0).toUpperCase()}</div>
                <span className="text-sm font-medium max-w-[72px] truncate" style={{ color: "var(--heading)" }}>{username}</span>
                <ChevronDown size={14} style={{ color: "var(--muted)" }} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-52 rounded-[var(--radius-xl)] border py-1 z-50" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-xl)" }}>
                  <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                    <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{username}</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>គណនីផ្ទាល់ខ្លួន</p>
                  </div>
                  <Link href="/store/cart" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[var(--hover-bg)]" style={{ color: "var(--body)" }}><ShoppingCart size={16} /> កន្ត្រកទំនិញ</Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger-light border-t" style={{ borderColor: "var(--border)" }}><LogOut size={16} /> ចាកចេញ</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="text-white px-4 py-2 rounded-[var(--radius-full)] text-sm font-medium bg-primary hover:bg-primary-hover shadow-sm">ចូលប្រើប្រាស់</Link>
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button onClick={toggleTheme} className="p-2 rounded-[var(--radius-full)]" aria-label="Theme">{theme === "dark" ? <Sun size={18} className="text-warning" /> : <Moon size={18} style={{ color: "var(--muted)" }} />}</button>
          <Link href="/store/cart" className="relative p-2" aria-label="Cart"><ShoppingCart size={20} style={{ color: "var(--muted)" }} />{cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white bg-primary">{cartCount}</span>}</Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2" style={{ color: "var(--muted)" }} aria-label="Menu">{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-4 space-y-1" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <Link href="/store" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 px-4 rounded-[var(--radius-lg)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ color: "var(--body)" }}>ទំព័រដើម</Link>
          <Link href="/store/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 px-4 rounded-[var(--radius-lg)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ color: "var(--body)" }}>ផលិតផល</Link>
          <Link href="/store/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-2.5 px-4 rounded-[var(--radius-lg)] text-sm font-medium hover:bg-[var(--hover-bg)]" style={{ color: "var(--body)" }}>កន្ត្រកទំនិញ {cartCount > 0 && <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}</Link>
          <div className="pt-3 mt-3 border-t" style={{ borderColor: "var(--border)" }}>
            {isLoggedIn ? <button onClick={handleLogout} className="w-full flex items-center gap-3 py-2.5 px-4 text-sm font-medium text-danger hover:bg-danger-light rounded-[var(--radius-lg)]"><LogOut size={16} /> ចាកចេញ</button> : <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center text-white py-2.5 rounded-[var(--radius-full)] text-sm font-medium bg-primary">ចូលប្រើប្រាស់</Link>}
          </div>
        </div>
      )}
    </header>
  );
}
