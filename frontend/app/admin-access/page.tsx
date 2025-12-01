"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
       const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
      
      // 1️⃣ Get Sanctum CSRF cookie
      const csrfResponse = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!csrfResponse.ok) {
        console.error("CSRF cookie response status:", csrfResponse.status);
        throw new Error("Failed to get CSRF cookie");
      }

      // Check response headers for Set-Cookie
      const setCookieHeader = csrfResponse.headers.get("Set-Cookie");
      console.log("Set-Cookie header:", setCookieHeader);

      // Extract CSRF token from cookies
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          const token = parts.pop()?.split(';').shift();
          return token ? decodeURIComponent(token) : null;
        }
        return null;
      };

      // Wait a bit for cookie to be set
      await new Promise(resolve => setTimeout(resolve, 200));

      // Try to get token - check all possible cookie names
      let csrfToken = getCookie('XSRF-TOKEN') || getCookie('xsrf-token') || getCookie('laravel_session');
      
      // If still not found, log all cookies for debugging
      if (!csrfToken) {
        console.error("All cookies:", document.cookie);
        console.error("CSRF cookie response headers:", Object.fromEntries(csrfResponse.headers.entries()));
        
        // Try to get token from response if available
        const responseText = await csrfResponse.text();
        console.log("CSRF cookie response:", responseText);
      }
      
      if (!csrfToken) {
        throw new Error("CSRF token not found. Make sure both frontend and backend use 'localhost' (not 127.0.0.1).");
      }

      console.log("CSRF Token found:", csrfToken.substring(0, 20) + "...");

      // 2️⃣ Login API call (Laravel route: /api/login)
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-XSRF-TOKEN": csrfToken,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Invalid credentials" }));
        setError(errorData.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      const data = await res.json();
      // alert("Logged in successfully!");
      router.push("/admin-dashboard/dashboard");

    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
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
