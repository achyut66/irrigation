"use client";

import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import DashboardBody from "../components/AdminDash";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await fetch(`${API_URL}/sanctum/csrf-cookie`, {
          method: "GET",
          credentials: "include",
        });

        const res = await fetch(`${API_URL}/api/user`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) return router.replace("/admin-access");

        const data = await res.json();
        if (!data?.isAdmin) return router.replace("/admin-access");

        setIsChecking(false);
      } catch (err) {
        router.replace("/admin-access");
      }
    };

    checkAdmin();
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.replace("/admin-access");
  };

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Checking access...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      <DashboardBody />
    </div>
  );
}
