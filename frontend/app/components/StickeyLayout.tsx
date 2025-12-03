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
    const handleScroll = () => {
      const current = window.scrollY;

      // Show logo when scrolled down 50px
      setScrolled(current > 50);

      // Hide navbar when scrolling down
      if (current > lastScrollY && current > 50) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }

      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="w-full">

      {/* NAVBAR */}
      <div
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
          ${hideNavbar ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        <Navbar />
      </div>

      {/* HEADER NAV */}
      <div
        className="fixed left-0 w-full z-40 transition-all duration-500"
        style={{
          top: hideNavbar ? 0 : navHeight,
        }}
      >
        <HeaderNav scrolled={scrolled} />
      </div>

      {/* NEWS TICKER */}
      <div
        className="fixed left-0 w-full z-30 transition-all duration-500"
        style={{
          top: hideNavbar ? 60 : navHeight + 60,
        }}
      >
        <NewsTicker />
      </div>
      <ScrollToTop/>

      {/* PUSH PAGE CONTENT DOWN */}
      <div style={{ paddingTop: hideNavbar ? 140 : navHeight + 120 }}>
        {/* Page Content */}
      </div>
    </div>
  );
}
