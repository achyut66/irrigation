"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "../globals.css";

export default function NewsTicker() {
  const [messages, setMessages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch news from Laravel API
  useEffect(() => {
    if (!API_URL) {
      console.error("❌ Backend URL is missing! Set NEXT_PUBLIC_BACKEND_URL in .env");
      return;
    }

    axios
      .get(`${API_URL}/api/news`, { withCredentials: true })
      .then((res) => {
        if (res.data?.status && Array.isArray(res.data.data)) {
          const headings = res.data.data.map((item: any) => item.news);
          setMessages(headings);
        }
      })
      .catch((err) => console.error(err));
  }, [API_URL]);

  // Auto-slide effect
  useEffect(() => {
    if (messages.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="relative h-10 mt-2 text-gray-900 overflow-hidden font-sans flex items-center w-[85%] mx-auto">
      {/* Label */}
      <div className="bg-blue-600 text-white py-1 px-3 rounded-l-lg font-semibold">
        समाचार:
      </div>

      {/* Sliding text */}
      <div className="ml-3 overflow-hidden w-full">
        {messages.length > 0 && (
          <p key={index} className="animate-slide whitespace-nowrap text-blue-800 font-bold text-sm">
            {messages[index]}
          </p>
        )}
      </div>
    </div>
  );
}
