"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, FileClock, Home, LayoutDashboard } from "lucide-react";

const menuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { name: "New Consultation", href: "/patient/consultation", icon: ClipboardList },
  { name: "Medical History", href: "/patient/history", icon: FileClock },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-zinc-200 bg-white">
      <div className="flex h-16 items-center border-b border-zinc-200 px-6"><h1 className="text-lg font-semibold text-zinc-900">MediKiosk</h1></div>
      <nav className="flex-1 p-4">
        <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-zinc-400">Patient portal</p>
        <div className="space-y-1">{menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"}`}><Icon size={18} />{item.name}</Link>;
        })}</div>
      </nav>
      <div className="border-t border-zinc-200 p-4"><div className="px-3 text-xs text-zinc-400">Secure patient portal</div></div>
    </aside>
  );
}
