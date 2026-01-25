"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Member = {
  id: number;
  full_name: string;
  designation: string;
  email: string;
  address: string;
  mobile_no: string;
  image_url?: string | null;
};

const resolveApiUrl = () => {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) return process.env.NEXT_PUBLIC_BACKEND_URL;
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:8000";
  }
  return "http://127.0.0.1:8000";
};

export default function KaryasamitiPreview() {
  const [members, setMembers] = useState<Member[]>([]);
  const API_URL = resolveApiUrl();

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/karyasamiti`);
        const data = await res.json();
        if (res.ok && data?.status) {
          setMembers(data.data || []);
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadMembers();
  }, [API_URL]);

  const visibleMembers = members.slice(0, 6);

  return (
    <section className="bg-[#f4f8ff] py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 border-l-4 border-blue-600 pl-4 mb-10">
          कार्यसमिति सदस्यहरू
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
  {visibleMembers.map((member) => (
    <div
      key={member.id}
      className="group relative h-[360px] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500"
    >
      {/* Background Image */}
      <img
        src={member.image_url || "/avatar.png"}
        alt={member.full_name}
        className="absolute inset-0 w-full h-full object-cover 
                   transition duration-700 
                   group-hover:scale-110 group-hover:brightness-75"
      />

      {/* Bottom Overlay (Default State) */}
      <div className="
        absolute bottom-0 left-0 right-0 
        bg-gradient-to-t from-black/80 via-black/40 to-transparent
        p-5 
        transition-all duration-500
        group-hover:opacity-0 group-hover:translate-y-10
      ">
        <h3 className="text-lg font-semibold text-white">
          {member.full_name}
        </h3>
        <p className="text-blue-200 text-sm">
          {member.designation}
        </p>
      </div>

      {/* Center Overlay (Hover State) */}
      <div className="
        absolute inset-0 
        flex flex-col items-center justify-center text-center
        opacity-0 scale-95
        transition-all duration-500
        group-hover:opacity-100 group-hover:scale-100
      ">
        <h3 className="text-xl font-bold text-white mb-2">
          {member.full_name}
        </h3>

        <p className="text-blue-300 font-medium mb-4">
          {member.designation}
        </p>

        <div className="space-y-2 text-gray-200 text-sm">
          {member.mobile_no && <p>📞 {member.mobile_no}</p>}
          {member.email && <p>✉️ {member.email}</p>}
        </div>
      </div>
    </div>
  ))}
</div>


        {/* SEE MORE BUTTON */}
        {members.length > 6 && (
          <div className="text-center mt-10">
            <Link href="/karyasamiti">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                See More
              </button>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
