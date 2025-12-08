"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DangerButton from "../../../components/DangerButton";
import {
  ChevronDown,
  ChevronRight,
  BarChart2,
  Database,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  // -----------------------------------------------------
  // HANDLE LOGOUT HERE (NO PROPS)
  // -----------------------------------------------------
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      router.replace("/admin-access");
    } catch (err) {
      console.error("Logout failed", err);
      router.replace("/admin-access");
    }
  };

  return (
    <aside className="w-72 bg-white shadow-xl p-6 flex flex-col min-h-screen">

      {/* Logo */}
      <div className="flex flex-col items-center pb-6 border-b">
        <Link href="/">
          <Image
            src="/images/logo.png"
            width={70}
            height={70}
            alt="Logo"
            className="mb-3"
          />
        </Link>
        <h2 className="text-xl font-bold text-gray-700">Admin Panel</h2>
      </div>

      {/* MAIN NAV */}
      <nav className="mt-6 space-y-2">

        {/* Dashboard */}
        <Link href="/admin-dashboard/dashboard">
          <button className="flex justify-between w-full p-3 rounded-lg hover:bg-gray-200">
            <span className="flex items-center space-x-2">
              <BarChart2 size={18} />
              <span>Dashboard</span>
            </span>
          </button>
        </Link>

        {/* Home Page Data */}
        <button
          onClick={() => toggleMenu("data")}
          className="flex justify-between w-full p-3 rounded-lg hover:bg-gray-200"
        >
          <span className="flex items-center space-x-2">
            <Database size={18} />
            <span>Home Page Data</span>
          </span>

          {openMenu === "data" ? <ChevronDown /> : <ChevronRight />}
        </button>

        {openMenu === "data" && (
          <div className="ml-8 mt-1 space-y-1">
            <SidebarLink href="/admin-dashboard/news-update" label="News & Updates" />
            <SidebarLink href="/admin-dashboard/banner" label="Banner Details" />
            <SidebarLink href="/admin-dashboard/authority-personnel" label="Authority Personnel" />
            <SidebarLink href="/admin-dashboard/plan-program" label="Plan & Programme" />
            <SidebarLink href="/admin-dashboard/highlight" label="Highlight News" />
            <SidebarLink href="/admin-dashboard/photoes" label="Upload Photoes" />
          </div>
        )}

        {/* Menu Data */}
        <button
          onClick={() => toggleMenu("settings")}
          className="flex justify-between w-full p-3 rounded-lg hover:bg-gray-200"
        >
          <span className="flex items-center space-x-2">
            <Settings size={18} />
            <span>Menu Data</span>
          </span>

          {openMenu === "settings" ? <ChevronDown /> : <ChevronRight />}
        </button>

        {openMenu === "settings" && (
          <div className="ml-8 mt-1 space-y-1">
            <SidebarLink href="/admin-dashboard/report" label="Report (प्रतिवेदन Upload)" />
            <SidebarLink href="/admin-dashboard/laws-rules" label="Rules (कानुन / नियम)" />
          </div>
        )}
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="mt-auto pt-6 border-t">
        <DangerButton
          onClick={handleLogout}
          className="w-full text-center"
          label="Logout"
        />
      </div>
    </aside>
  );
}

/* --- COMPONENT: SidebarLink --- */
function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href}>
      <p
        className="text-sm py-2 px-3 rounded-md hover:bg-blue-100 hover:text-blue-700
        border-l-4 border-transparent hover:border-blue-500 cursor-pointer transition-all"
      >
        {label}
      </p>
    </Link>
  );
}
