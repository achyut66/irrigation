"use client";

import { useState,useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { toNepaliNumber } from "../../utils/numberToNepali";
import Link from "next/link";
import { adToBs } from "../../utils/adToBs";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // const date1 = "2025-03-12";
  // const date2 = adToBs(date1);

  // console.log(date2);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
  
      // CORRECT: pass Y, M, D separately
      const new_date = adToBs(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
      );
  
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour12: false,
      });
  
      setDate(new_date);
      setTime(formattedTime);
    };
  
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <header className="w-full shadow-sm sticky text-white top-0 z-50 relative bg-[#0B2A4A]">
  <nav className="container mx-auto max-w-7xl flex items-center justify-between py-4 px-1">

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
        <p>ज्वालामूखी, धादिङ </p>
      </div>
    </div>


    {/* RIGHT SIDE */}
    <div className="hidden md:flex items-center gap-10 px-6 py-4 ml-[50px] rounded-md">
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
      </div>
    </div>
  </nav>

  {/* MOBILE DROPDOWN PANEL */}
  {mobileOpen && (
    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="w-64 h-full bg-white p-4">
      </div>
    </div>
  )}
</header>


  );
}
