import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const API = process.env.NEXT_PUBLIC_BACKEND_URL;

  const res = await fetch(`${API}/api/user`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    redirect("/admin-access");
  }

  const user = await res.json();

  if (!user?.isAdmin) {
    redirect("/admin-access");
  }

  return <>{children}</>;
}
