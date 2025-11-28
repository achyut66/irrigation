"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

type NavbarProps = {
  scrolled: boolean;
};

export default function HeaderNav({ scrolled }: NavbarProps) {
  const [lang, setLang] = useState("EN");
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // CHANGE LANGUAGE FUNCTION
  const changeLanguage = (code: string) => {
    setLang(code);
    setOpen(false);
  };

  // MAIN MENU
  const menus = [
    { name: "होमपेज", path: "/home" },
    { name: "हाम्रो बारेमा", path: "/about" },
    { name: "क्रियाकलाप", path: "/services" },
    { name: "जानकारीहरु", path: "/information" },
    { name: "फोटो ग्यालरी", path: "/photo-gallery" },
    { name: "सम्पर्क", path: "/contact-us" },
  ];

  // SUBMENUS
  const submenu: Record<string, { name: string; path: string }[]> = {
    "/about": [
      { name: "पृष्ठभूमि / परिचय", path: "/introduction" },
      { name: "लक्ष्य / उद्देश्य", path: "/mission" },
    ],
    "/services": [
      { name: "सिचाइ आयोजना", path: "/sinchai_ayojana" },
      { name: "तालिम तथा कार्यशाला", path: "/taalim" },
      { name: "प्राविधिक सहयोग", path: "/technical_support" },
    ],
    "/information": [
      { name: "सूचना", path: "/news-updates" },
      { name: "प्रतिवेदन", path: "/pratibedan" },
      { name: "कानुन तथा नीतिहरु", path: "/kanun-niti" },
    ],
  };

  return (
    <nav className="w-full bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* LEFT SECTION */}
        <div className="flex items-center space-x-6">

          {/* SCROLLED LOGO */}
          {scrolled && (
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-20 h-20 object-contain transition-opacity duration-500"
            />
          )}

          {/* MENU ITEMS */}
          <div className="flex space-x-8 text-lg font-medium font-sans relative">
            {menus.map((item) => {
              const isActive = pathname === item.path;
              const hasSubmenu = submenu[item.path];
              const showSubmenu = activeMenu === item.path;

              return (
                <div
                  key={item.path}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(item.path)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link href={item.path}>
                    <button
                      className={`relative flex items-center gap-1 transition ${
                        isActive ? "text-blue-600" : "text-gray-700"
                      } hover:text-blue-500`}
                    >
                      {item.name}

                      {hasSubmenu &&
                        (showSubmenu ? (
                          <ChevronUp size={16} className="transition duration-300" />
                        ) : (
                          <ChevronDown size={16} className="transition duration-300" />
                        ))}

                      <span
                        className={`absolute left-0 bottom-[-2px] h-[2px] bg-blue-500 rounded-full transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>
                  </Link>

                  {/* SUBMENU */}
                  {hasSubmenu && (
                    <div
                      className={`absolute left-0 mt-2 w-52 bg-white border border-gray-300 shadow-lg transition-all duration-300 z-50 ${
                        showSubmenu ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
                      }`}
                    >
                      {submenu[item.path].map((sub) => (
                        <Link key={sub.path} href={sub.path}>
                          <span className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-200 last:border-b-0 cursor-pointer">
                            {sub.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center space-x-3">

          {/* SEARCH */}
          <div className="flex items-center bg-transparent border border-gray-300 rounded-full px-3 py-1.5">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="खोज्नुहोस..."
              className="bg-transparent outline-none ml-2 placeholder-gray-500 text-gray-700"
            />
          </div>

          {/* LANGUAGE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-2 border rounded bg-white hover:bg-gray-100"
            >
              {lang}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg border border-gray-300 w-32 py-2 z-50">
                <button
                  onClick={() => changeLanguage("EN")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("NP")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Nepali
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </nav>
  );
}
