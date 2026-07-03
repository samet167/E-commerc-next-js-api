// "use client";
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Package,
//   Users,
//   Grid,
//   Bell,
//   Search,
//   Settings,
//   LogOut,
//   ChevronDown,
//   Menu,
//   X,
// } from "lucide-react";

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown and sidebar when clicking outside or changing path
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setIsSidebarOpen(false); // Close sidebar on route change
//   }, [pathname]);

//   const isActive = (path: string) => pathname === path;

//   const menus = [
//     { name: "ផ្ទាំងគ្រប់គ្រង", href: "/admin", icon: LayoutDashboard },
//     { name: "ផលិតផល", href: "/admin/products", icon: Package },
//     { name: "អ្នកប្រើប្រាស់", href: "/admin/users", icon: Users },
//     { name: "ប្រភេទ", href: "/admin/categories", icon: Grid },
//     { name: "ការជូនដំណឹង", href: "/admin/notifications", icon: Bell },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile Overlay */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
//           onClick={() => setIsSidebarOpen(false)} 
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
//         <div className="px-8 py-10 border-b border-white/10 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center font-black text-2xl">K</div>
//             <div>
//               <div className="text-xl font-bold">K-STORE</div>
//               <div className="text-xs text-blue-400">បន្ទប់គ្រប់គ្រង</div>
//             </div>
//           </div>
//           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2">
//             <X size={24} />
//           </button>
//         </div>

//         <nav className="flex-1 px-4 py-6 space-y-2">
//           {menus.map((menu) => {
//             const Icon = menu.icon;
//             return (
//               <Link key={menu.href} href={menu.href} className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[15px] font-medium transition-all ${isActive(menu.href) ? "bg-white text-black" : "text-gray-300 hover:bg-white/10"}`}>
//                 <Icon size={19} />
//                 <span>{menu.name}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </aside>

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col w-full min-w-0">
//         <header className="sticky top-0 z-30 h-16 bg-white border-b px-4 lg:px-8 flex items-center justify-between shadow-sm">
//           <div className="flex items-center gap-4">
//             <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
//               <Menu size={24} />
//             </button>
//             <h1 className="text-lg lg:text-xl font-semibold truncate">បន្ទប់គ្រប់គ្រង</h1>
//           </div>

//           <div className="flex items-center gap-2 lg:gap-4">
//             {/* User Dropdown */}
//             <div className="relative" ref={dropdownRef}>
//               <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 lg:gap-3 px-2 lg:px-4 py-2 border border-gray-200 rounded-2xl hover:border-blue-300 transition-all">
//                 <div className="w-8 h-8 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xs">AD</div>
//                 <ChevronDown size={16} className="hidden lg:block" />
//               </button>

//               {showDropdown && (
//                 <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-3xl shadow-xl py-2 z-50">
//                   <button className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-50 text-sm"><Settings size={16} /> ការកំណត់</button>
//                   <button className="flex w-full items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 text-sm font-medium"><LogOut size={16} /> ចាកចេញ</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 p-4 lg:p-8 overflow-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";
import Sidebar from "@/components/Sidebar"; // ត្រូវប្រាកដថាអ្នកបានបង្កើត file នេះ
import { useState, useEffect } from "react";
import { LogOut, ChevronDown, Bell, Search, Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // ទាញឈ្មោះអ្នកប្រើពី localStorage
    setUsername(localStorage.getItem("username") || "Admin");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar ខាងឆ្វេង */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-800">បន្ទប់គ្រប់គ្រង</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* User Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-sm">{username}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-2xl shadow-xl py-2 z-50">
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 text-sm"
                  >
                    <LogOut size={16} /> ចាកចេញ
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* កន្លែងបង្ហាញ Content ផ្សេងៗ */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}