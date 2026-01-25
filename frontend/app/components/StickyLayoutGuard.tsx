"use client";

import { usePathname } from "next/navigation";
import StickyLayout from "./StickeyLayout";

const HIDDEN_PREFIXES = ["/admin-dashboard"];

export default function StickyLayoutGuard() {
  const pathname = usePathname();

  // If pathname is null (happens on first render), just return nothing
  if (!pathname) return null;

  const shouldHide = HIDDEN_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (shouldHide) return null;

  return <StickyLayout />;
}
