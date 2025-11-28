"use client";

import { useState } from "react";
import { login } from "../../lib/auth";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      alert("Successfully Logged In!");
    } catch (err: any) {
      setError("Invalid email or password");
    }

    setLoading(false);
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
          className="border p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-3 rounded-lg w-full mb-4 focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg w-full transition-all"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}
