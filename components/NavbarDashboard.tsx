"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LogOut, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // ពិនិត្យមើលថាតើមាន Token ឬអត់
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login"; // ប្តូរទិសទៅទំព័រ Login
  };

  return (
    <nav className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
      <Link href="/" className="font-black text-xl">K-STORE</Link>

      {isLoggedIn ? (
        // បង្ហាញឈ្មោះ User និង Dropdown
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full hover:bg-gray-100 transition"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-sm">{username}</span>
            <ChevronDown size={16} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-2xl shadow-xl py-2 z-50">
              <button 
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
              >
                <LogOut size={16} /> ចាកចេញ
              </button>
            </div>
          )}
        </div>
      ) : (
        // បង្ហាញប៊ូតុង Login
        <Link 
          href="/login" 
          className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition"
        >
          ចូលប្រើប្រាស់
        </Link>
      )}
    </nav>
  );
}