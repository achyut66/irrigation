"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

      // 1️⃣ Get CSRF cookie (Sanctum)
      const csrf = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
      });

      if (!csrf.ok) {
        setError("Failed to get CSRF cookie");
        setLoading(false);
        return;
      }

      // 2️⃣ Login request
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        setError(err?.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // Success — redirect to dashboard
      router.push("/admin-dashboard/dashboard");

    } catch (err: any) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="min-h-20 flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src="/images/logo.png" className="h-20 w-20" />
          </div>

          <h1 className="text-xl font-bold text-center mb-6 text-gray-700">
            Administrator Login
          </h1>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <input
            placeholder="Email"
            type="email"
            className="border p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            placeholder="Password"
            type="password"
            className="border p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg w-full transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
