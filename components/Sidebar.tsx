"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Users, Grid, Settings, LogOut } from "lucide-react";

const menus = [
  { name: "ផ្ទាំងគ្រប់គ្រង", href: "/admin", icon: LayoutDashboard },
  { name: "ផលិតផល", href: "/admin/products", icon: Package },
  { name: "អ្នកប្រើប្រាស់", href: "/admin/users", icon: Users },
  { name: "ប្រភេទ", href: "/admin/categories", icon: Grid },
  { name: "ការកំណត់", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("username"); window.location.href = "/login"; };

  return (
    <aside className="w-[260px] min-h-screen flex flex-col border-r" style={{ backgroundColor: "var(--sidebar-bg)", borderColor: "var(--border)" }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-[var(--radius-lg)] flex items-center justify-center text-white font-semibold text-sm">K</div>
          <div>
            <h1 className="font-semibold text-sm" style={{ color: "var(--sidebar-heading)" }}>K-Store</h1>
            <p className="text-[10px] font-medium" style={{ color: "var(--muted)" }}>Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname === menu.href;
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium"
              style={{
                backgroundColor: isActive ? "var(--sidebar-active-bg)" : "transparent",
                color: isActive ? "var(--sidebar-active-text)" : "var(--sidebar-text)",
              }}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium w-full text-danger hover:bg-danger-light">
          <LogOut size={18} />
          <span>ចាកចេញ</span>
        </button>
      </div>
    </aside>
  );
}
