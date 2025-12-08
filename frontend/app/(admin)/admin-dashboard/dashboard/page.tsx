export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Sidebar from "../components/Sidebar";
import DashboardBody from "../components/AdminDash";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <DashboardBody />
    </div>
  );
}
