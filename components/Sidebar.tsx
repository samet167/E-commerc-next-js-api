"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Users, Grid, Settings } from "lucide-react";

const menus = [
  { name: "ផ្ទាំងគ្រប់គ្រង", href: "/admin", icon: LayoutDashboard },
  { name: "ផលិតផល", href: "/admin/products", icon: Package },
  { name: "អ្នកប្រើប្រាស់", href: "/admin/users", icon: Users },
  { name: "ប្រភេទ", href: "/admin/categories", icon: Grid },
  { name: "ការកំណត់", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center font-bold text-xl">K</div>
        <div>
          <h1 className="font-bold text-lg">K-STORE</h1>
          <p className="text-[10px] text-blue-400 uppercase tracking-widest">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname === menu.href;
          
          return (
            <Link 
              key={menu.href} 
              href={menu.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                isActive 
                ? "bg-white text-slate-900 shadow-lg" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="font-medium text-[15px]">{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile/Logout Section */}
      <div className="border-t border-slate-800 pt-6 mt-6">
        <button className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-red-400 transition">
          <span className="text-sm font-medium">ចាកចេញ</span>
        </button>
      </div>
    </aside>
  );
}