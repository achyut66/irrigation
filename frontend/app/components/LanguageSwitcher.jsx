"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher({ lang }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLang = () => {
    const newLang = lang === "ne" ? "en" : "ne";

    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLang}
      className="px-3 py-1 bg-blue-600 text-white rounded"
    >
      {lang === "ne" ? "English" : "नेपाली"}
    </button>
  );
}
