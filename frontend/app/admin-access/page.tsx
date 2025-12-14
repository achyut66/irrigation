"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "../../utils/getCookie";
import Footer from "../components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e:any) => {
    e.preventDefault(); // 🔥 STOP PAGE REFRESH
    setLoading(true);
    setError("");
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      // 1️⃣ GET CSRF COOKIE
      await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: "GET",
        credentials: "include",
      });

      // 2️⃣ READ TOKEN
      const token = getCookie("XSRF-TOKEN");
      if (!token) {
        setError("Unable to get CSRF token");
        setLoading(false);
        return;
      }

      // 3️⃣ LOGIN
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(token),
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      // 4️⃣ REDIRECT
      router.push("/admin-dashboard/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-20 flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">

          <form onSubmit={handleLogin}>
            <div className="flex justify-center mb-4">
              <img src="/images/logo.png" className="h-20 w-20" />
            </div>

            <h1 className="text-xl font-bold text-center mb-6 text-gray-700">
              Administrator Login
            </h1>

            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <input
              placeholder="Email"
              type="email"
              className="border p-4 rounded-lg w-full mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Password"
              type="password"
              className="border p-3 rounded-lg w-full mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}