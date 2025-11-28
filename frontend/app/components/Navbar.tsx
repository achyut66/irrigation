"use client";

import { useState,useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { toNepaliNumber } from "../../utils/numberToNepali";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Date format: YYYY-MM-DD
      const formattedDate = now.toLocaleDateString("en-CA"); // 2025-11-26 form

      // Time format: HH:mm:ss
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour12: false,
      });

      setDate(formattedDate);
      setTime(formattedTime);
    };

    updateDateTime(); // initial call
    const interval = setInterval(updateDateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <header className="w-full shadow-sm sticky text-white top-0 z-50 relative bg-[#0B2A4A]">
  <nav className="container mx-auto flex items-center justify-between py-4 px-1">

    {/* LEFT SIDE (Logo Section) */}
    <div className="flex items-center gap-2">
      <Link href="/home">
      <img
        src="../images/logo.png"
        alt="Logo"
        className="w-28 h-28 md:w-28 md:h-28 object-contain  filter invert"
      />
      </Link>
      <div className="text-white font-semibold text-sm md:text-base">
        <p>ज्वालामूखी ग्रामीण खानेपानी,</p>
        <p>सरसफाई तथा स्वच्छता व्यवस्थापन बाेर्ड</p>
        <p>ज्वालामुखी, धादिंग</p>
      </div>
    </div>

    {/* MOBILE HAMBURGER */}
    {/* <button
      className="md:hidden flex text-xl"
      onClick={() => setMobileOpen(true)}
    >
      ☰
    </button> */}

    {/* RIGHT SIDE */}
    <div className="hidden md:flex items-center gap-10 px-6 py-4 ml-[50px] rounded-md">

      {/* Important Message */}
      {/* <div className="important_message mr-auto whitespace-nowrap pl-[50px]">
        महत्वपूर्ण खबर | : "बागमती प्रदेशको नया नियम !!!"
      </div> */}

      {/* Icons */}
      <div className="flex items-center gap-6">

        {/* Language Dropdown */}
        <div className="relative text-white color-white">
        <img
        src="../images/falg.gif"
        alt="Logo"
        className="w-20 h-20 md:w-28 md:h-28 object-contain"
      />
          
        </div>
        <div className="text-white font-semibold text-sm md:text-base">
        <p>वि.स : {toNepaliNumber(date)} , {toNepaliNumber(time)} </p>
        <p>नेपाल सम्बत : {toNepaliNumber(1146)}</p>
      </div>
        {/* Search */}
        {/* <button className="hover:text-red-600">🔍</button> */}
      </div>
    </div>
  </nav>

  {/* MOBILE DROPDOWN PANEL */}
  {mobileOpen && (
    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="w-64 h-full bg-white p-4">

        {/* Close button */}
        {/* <button
          className="text-xl mb-6"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button> */}

        {/* Important Message */}
        {/* <div className="bg-blue-100 p-2 mb-6 rounded">
          महत्वपूर्ण खबर : "बागमती प्रदेशको नया नियम !!!"
        </div> */}

        {/* Mobile Menu */}
        {/* <ul className="flex flex-col gap-4 text-gray-800 text-lg">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About Us</li>
          <li className="cursor-pointer">Teachers</li>
          <li className="cursor-pointer">Circular</li>
          <li className="cursor-pointer">Gallery</li>
          <li className="cursor-pointer">Blogs</li>
        </ul> */}

        {/* Language & Search */}
        {/* <div className="mt-8 flex flex-col gap-4">
          <button className="w-full border py-2 rounded">🌐 Language</button>
          <button className="w-full border py-2 rounded">🔍 Search</button>
        </div> */}
      </div>
    </div>
  )}
</header>


  );
}
