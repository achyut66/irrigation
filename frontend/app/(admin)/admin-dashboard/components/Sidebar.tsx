"use client";

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

type SidebarProps = {
  onLogout: () => void;
};

export default function Sidebar({ onLogout }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <aside className="w-72 bg-white shadow-xl p-6 flex flex-col min-h-screen">

      {/* Logo + Name */}
      <div className="flex flex-col items-center pb-6 border-b">
        <Link href={"/"}>
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

      {/* Menu List */}
      <nav className="mt-6 space-y-2">

        {/* Dashboard */}
        <Link href="/admin-dashboard/dashboard">
        <button
          onClick={() => toggleMenu("dashboard")}
          className="flex justify-between w-full p-3 rounded-lg hover:bg-gray-200"
        >
          <span className="flex items-center space-x-2">
            <BarChart2 size={18} />
            <span>Dashboard</span>
          </span>
        </button>
        </Link>

        {/* Data Entry */}
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
          <Link href="/admin-dashboard/news-update">
            <p className="text-sm py-2 px-3 rounded-md hover:bg-blue-100 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-500 cursor-pointer transition-all">
              News & Updates
            </p>
          </Link>
        
          <Link href="/admin-dashboard/banner">
            <p className="text-sm py-2 px-3 rounded-md hover:bg-blue-100 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-500 cursor-pointer transition-all">
              Banner Details
            </p>
          </Link>
          <Link href="/admin-dashboard/authority-personnel">
            <p className="text-sm py-2 px-3 rounded-md hover:bg-blue-100 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-500 cursor-pointer transition-all">
              Authority Personnel
            </p>
          </Link>
          <Link href="/admin-dashboard/plan-program">
            <p className="text-sm py-2 px-3 rounded-md hover:bg-blue-100 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-500 cursor-pointer transition-all">
              Plan & Proggramme
            </p>
          </Link>
          <Link href="/admin-dashboard/highlight">
            <p className="text-sm py-2 px-3 rounded-md hover:bg-blue-100 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-500 cursor-pointer transition-all">
              Highlight News
            </p>
          </Link>
          <Link href="/admin-dashboard/photoes">
            <p className="text-sm py-2 px-3 rounded-md hover:bg-blue-100 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-500 cursor-pointer transition-all">
              Upload Photoes
            </p>
          </Link>
        </div>
        
        )}

       {/* Menu Bar */}
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

        {/* SETTINGS SUBMENU */}
        {openMenu === "settings" && (
          <div className="ml-8 mt-1 space-y-1">
            <Link href="/admin-dashboard/report">
              <p className="text-sm py-2 px-3 rounded-md hover:bg-blue-100 hover:text-blue-700 border-l-4 
                border-transparent hover:border-blue-500 cursor-pointer transition-all">
                Report (प्रतिवेदन Upload)
              </p>
            </Link>

            <Link href="/admin-dashboard/laws-rules">
              <p className="text-sm py-2 px-3 rounded-md hover:bg-blue-100 hover:text-blue-700 border-l-4 
                border-transparent hover:border-blue-500 cursor-pointer transition-all">
                 Rules (कानुन / नियम)
              </p>
            </Link>
          </div>
        )}
      </nav>
      {/* Logout Button */}
      <div className="mt-auto pt-6 border-t">
        <DangerButton
          onClick={onLogout}
          className="w-full text-center"
          label="Logout"
        />
      </div>

    </aside>
  );
}
