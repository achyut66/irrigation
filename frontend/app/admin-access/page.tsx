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

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      // 🔥 STEP 1: GET CSRF COOKIE (MUST BE FIRST)
      await fetch("https://api.rwashmb.com/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",   // MUST HAVE
      });

      // 🔥 STEP 2: READ COOKIE (Laravel sets it automatically)
      const token = getCookie("XSRF-TOKEN");
      if (!token) {
        setError("Unable to get CSRF token");
        setLoading(false);
        return;
      }

      // 🔥 STEP 3: SEND LOGIN REQUEST
      const res = await fetch("https://api.rwashmb.com/login", {
        method: "POST",
        credentials: "include",   // VERY IMPORTANT
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(token),   // MUST SEND THIS
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      // 🔥 STEP 4: Redirect on success
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
            className="border p-3 rounded-lg w-full mb-3"
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
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
