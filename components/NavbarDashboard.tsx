"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { ChevronDown, LogOut, Bell, Menu, Sun, Moon } from "lucide-react";

interface Props { onToggleSidebar?: () => void; }

export default function NavbarDashboard({ onToggleSidebar }: Props) {
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Admin");
    const h = (e: MouseEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("username"); window.location.href = "/login"; };

  return (
    <header className="sticky top-0 z-30 h-16 border-b flex items-center justify-between px-4 lg:px-6" style={{ backgroundColor: "var(--navbar)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-[var(--radius-md)] hover:bg-[var(--hover-bg)]" style={{ color: "var(--muted)" }} aria-label="Menu"><Menu size={20} /></button>
        <h1 className="text-base font-semibold" style={{ color: "var(--heading)" }}>បន្ទប់គ្រប់គ្រង</h1>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} className="p-2 rounded-[var(--radius-full)] hover:bg-[var(--hover-bg)]" aria-label="Theme">{theme === "dark" ? <Sun size={16} className="text-warning" /> : <Moon size={16} style={{ color: "var(--muted)" }} />}</button>
        <button className="p-2 rounded-[var(--radius-full)] hover:bg-[var(--hover-bg)] relative" style={{ color: "var(--muted)" }} aria-label="Notifications"><Bell size={16} /></button>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-[var(--radius-full)] hover:bg-[var(--hover-bg)]">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-primary">{username.charAt(0).toUpperCase()}</div>
            <span className="text-sm font-medium hidden sm:block" style={{ color: "var(--heading)" }}>{username}</span>
            <ChevronDown size={14} className="hidden sm:block" style={{ color: "var(--muted)" }} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-[var(--radius-xl)] border py-1 z-50" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-xl)" }}>
              <div className="px-4 py-2.5 border-b" style={{ borderColor: "var(--border)" }}><p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{username}</p><p className="text-xs" style={{ color: "var(--muted)" }}>អ្នកគ្រប់គ្រង</p></div>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger-light"><LogOut size={15} /> ចាកចេញ</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
