"use client";

import { usePathname } from "next/navigation";
import StickyLayout from "./StickeyLayout";

const HIDDEN_PREFIXES = ["/admin-dashboard"];

export default function StickyLayoutGuard() {
  const pathname = usePathname();
  const shouldHide = HIDDEN_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (shouldHide) {
    return null;
  }

  return <StickyLayout />;
}

