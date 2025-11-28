"use client";

import { useEffect, useState } from "react";

export default function NewsTicker() {
  const messages = [
    "Here is some important notice for all users.",
    "New trekking packages have been launched for 2025!",
    "Office will remain closed tomorrow due to a national holiday.",
    "Please make sure to submit your documents before the deadline.",
  ];

  const [index, setIndex] = useState(0);

  // Auto-change message every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gray-200 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-3 px-6 py-2 text-sm">

        {/* Notice Label */}
        <span className="font-semibold bg-blue-200 font-sans text-black px-4 py-1 rounded">
          समाचार:
        </span>

        {/* Animated Text */}
        <div className="relative h-6 text-gray-900 overflow-hidden font-sans flex items-center w-full">
          <p
            key={index}
            className="animate-slide whitespace-nowrap"
          >
            {messages[index]}
          </p>
        </div>

      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-slide {
          animation: slide-in 0.6s ease forwards;
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
