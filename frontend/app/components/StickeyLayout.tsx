"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import NewsTicker from "./NewsTicker";
import HeaderNav from "./Header";
import ScrollToTop from "./ScrollToUp";

export default function StickyLayout() {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navHeight, setNavHeight] = useState(120);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);

  // Measure navbar height on first render
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  // Scroll logic
  useEffect(() => {
    let lastY = window.scrollY;
  
    const handleScroll = () => {
      const current = window.scrollY;
  
      setScrolled(current > 50);
      setHideNavbar(current > lastY && current > 50);
  
      lastY = current;
    };
  
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  return (
    <div className="w-full bg-gray-100">

      {/* NAVBAR */}
      <div
  ref={navRef}
  className={`fixed top-0 left-0 w-full z-50 bg-gray-100 transition-all duration-500
    ${hideNavbar ? "-translate-y-full" : "translate-y-0"}
  `}
>

        <Navbar />
      </div>

      {/* HEADER NAV */}
      <div
  className="fixed left-0 w-full z-40 bg-gray-100 transition-all duration-500"
  style={{ top: hideNavbar ? 0 : navHeight }}
>

        <HeaderNav scrolled={scrolled} />
      </div>

      {/* NEWS TICKER */}
      <div
  className="fixed left-0 w-full z-30 bg-gray-100 transition-all duration-500"
  style={{ top: hideNavbar ? 60 : navHeight + 60 }}
>

        <NewsTicker />
      </div>
      <ScrollToTop/>

      {/* PUSH PAGE CONTENT DOWN */}
      <main
  className="bg-gray-100"
  style={{ paddingTop: hideNavbar ? 140 : navHeight + 120 }}
>
  {/* Page Content */}
</main>

    </div>
  );
}
