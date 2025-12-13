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
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // mobile nav

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);


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

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  
    if (value.trim().length < 2) {
      setResults(null);
      return;
    }
  
    const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(value)}`);
    const payload = await res.json();
  
    if (payload.status) {
      setResults(payload.data);
    }
  };
  

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
      { name: "सिचाइ आयोजना", path: "/plan/allplans" },
      { name: "तालिम तथा कार्यशाला", path: "/taalim" },
      { name: "प्राविधिक सहयोग", path: "/technical_support" },
    ],
    "/information": [
      { name: "सूचना", path: "/highlightnews/highlight-page" },
      { name: "प्रतिवेदन", path: "/pratibedan" },
      { name: "कानुन तथा नीतिहरु", path: "/kanun-niti" },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "ne",
            includedLanguages: "en,ne",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
        clearInterval(interval);
      }
    }, 300);
  
    return () => clearInterval(interval);
  }, []);
  

  
  return (
    <nav className="w-full bg-gray-100 shadow-sm text-gray-800">
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
          {/* <div className="flex space-x-8 text-lg font-medium font-sans relative"> */}
          <div className="hidden md:flex space-x-8 text-lg font-medium text-gray-800 font-sans relative">
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
          <div className="relative">
            <div className="flex items-center bg-transparent border border-gray-300 rounded-full px-3 py-1.5">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="खोज्नुहोस..."
                className="bg-transparent outline-none ml-2 placeholder-gray-500 text-gray-700"
                value={search}
                onChange={handleSearch}
              />
            </div>

            {/* SEARCH RESULTS DROPDOWN */}
            {results && (
              <div className="absolute left-10 mt-2 w-80 max-h-80 overflow-y-auto bg-white shadow-lg border rounded p-3 z-50">

                {/* ---- NEWS ---- */}
                {results.news.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 border-b pb-1">समाचार</h3>
                    {results.news.map((item: any) => (
                      <Link key={item.id} href={`/news/${item.id}`}>
                        <p className="py-1 text-gray-700 hover:text-blue-600 cursor-pointer">
                          {item.heading}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}

                {/* ---- PLANNING ---- */}
                {results.planning.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-sm font-semibold text-gray-600 border-b pb-1">योजना</h3>
                    {results.planning.map((item: any) => (
                      <Link key={item.id} href={`/plan/${item.id}`}>
                        <p className="py-1 text-gray-700 hover:text-blue-600 cursor-pointer">
                          {item.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}

                {/* ---- HIGHLIGHT ---- */}
                {results.highlight.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-sm font-semibold text-gray-600 border-b pb-1">सूचना</h3>
                    {results.highlight.map((item: any) => (
                      <Link key={item.id} href={`/highlight/${item.id}`}>
                        <p className="py-1 text-gray-700 hover:text-blue-600 cursor-pointer">
                          {item.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}

                {/* ---- LAWS ---- */}
                {results.lawsrules.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-sm font-semibold text-gray-600 border-b pb-1">कानुन तथा निती</h3>
                    {results.lawsrules.map((item: any) => (
                      <Link key={item.id} href={`/kanun-niti/${item.id}`}>
                        <p className="py-1 text-gray-700 hover:text-blue-600 cursor-pointer">
                          {item.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}

                {/* NO RESULTS */}
                {results.news.length === 0 &&
                  results.planning.length === 0 &&
                  results.highlight.length === 0 &&
                  results.lawsrules.length === 0 && (
                    <p className="text-gray-500 text-sm">कुनै नतिजा फेला परेन।</p>
                )}

              </div>
            )}
          </div>
        </div>

        {/* mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200"
        >
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>

        <div className="relative">
          <div id="google_translate_element" className="google-translate-btn relative" />
        </div>

      </div>
      {/* mobile sub-menu */}
      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">

            {menus.map((item) => {
              const hasSubmenu = submenu[item.path];
              const isOpen = mobileSubmenu === item.path;

              return (
                <div key={item.path}>
                  <div
                    className="flex justify-between items-center text-gray-800 font-medium"
                    onClick={() =>
                      hasSubmenu
                        ? setMobileSubmenu(isOpen ? null : item.path)
                        : setMobileOpen(false)
                    }
                  >
                    <Link href={item.path}>{item.name}</Link>
                    {hasSubmenu && (
                      <ChevronDown
                        size={18}
                        className={`transition ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>

                  {/* MOBILE SUBMENU */}
                  {hasSubmenu && isOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      {submenu[item.path].map((sub) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          onClick={() => setMobileOpen(false)}
                          className="block text-gray-600"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>
      )}

    </nav>
  );
}
