"use client";

import { useState, useEffect } from "react";

export default function BannerCarousel() {
  const slides = [
    {
      image: "../images/banner/1.jpg",
      title: "Explore the Beauty of Nepal",
      subtitle: "Adventure, Culture & History Await",
    },
    {
      image: "../images/banner/2.jpg",
      title: "Find Your Next Destination",
      subtitle: "Travel With Us",
    },
    {
      image: "../images/banner/3.jpg",
      title: "Experience the Mountains",
      subtitle: "Feel the Nature",
    },
  ];

  const [current, setCurrent] = useState(0);

  // auto change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt="Banner"
            className="w-full h-full object-cover"
          />

          {/* Text Content Bottom */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-8">
            <h2 className="text-white text-3xl font-bold">{slide.title}</h2>
            <p className="text-gray-200 text-lg mt-1">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Dots indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              current === i ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
