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
        // ❗ DO NOT fetch csrf-cookie here
        // Login page only

        const res = await fetch(`${API_URL}/api/user`, {
          method: "GET",
          credentials: "include",
        });

        console.log(res);

        const data = await res.json().catch(() => null);

        // If data is null or missing user → not authenticated
        if (!data || !data.id) {
          return router.replace("/admin-access");
        }

        // Optional: admin check
        if (!data.isAdmin) {
          return router.replace("/admin-access");
        }

        setIsChecking(false);
      } catch {
        router.replace("/admin-access");
      }
    };

    checkAdmin();
  }, [router, API_URL]);

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
