"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import NavbarDashboard from "@/components/NavbarDashboard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsSidebarOpen(false); }, [pathname]);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {isSidebarOpen && <div className="fixed inset-0 z-40 lg:hidden" style={{ backgroundColor: "var(--overlay)" }} onClick={() => setIsSidebarOpen(false)} />}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform lg:transform-none ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col w-full min-w-0">
        <NavbarDashboard onToggleSidebar={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
