"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import api from "../../lib/axios";  
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
      // STEP 1: Get CSRF cookie
      // await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`, {
      //   method: "GET",
      //   credentials: "include",
      // });
      await fetch('https://api.rwashmb.com/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include'
      });
  
      // STEP 2: Read the XSRF token
      const xsrf = getCookie("XSRF-TOKEN");
      const decodedToken = xsrf ? decodeURIComponent(xsrf) : "";
  
      // STEP 3: Login request
      // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
      //   method: "POST",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "X-XSRF-TOKEN": decodedToken,
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      const res = await fetch('https://api.rwashmb.com/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: 'you@example.com', password: 'secret' })
      });
  
      // STEP 4: Check response
      if (!res.ok) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }
  
      // (Optional) const data = await res.json();
  
      // STEP 5: Redirect after login success
      router.push("/admin-dashboard/dashboard");
  
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
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
