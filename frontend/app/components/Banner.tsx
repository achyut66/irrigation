"use client";

import { useState, useEffect } from "react";

export default function BannerCarousel() {
  const [slides, setSlides] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  const API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

  // Fetch banners
  useEffect(() => {
    fetch(`${API_URL}/api/banner`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status && Array.isArray(data.data)) {
          setSlides(data.data); // contains image_url + banner_desc
        }
      })
      .catch((err) => console.error("Banner fetch error:", err));
  }, [API_URL]);

  // Auto slide every 5 sec
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center bg-gray-200">
        Loading banners...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image_url}
            alt="Banner"
            className="w-full h-full object-cover"
          />

          {/* Text bottom */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-8">
            <h2 className="text-white text-3xl font-bold">
              {slide.banner_desc}
            </h2>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === i ? "bg-white" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
