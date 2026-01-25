"use client";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";


type Member = {
  id: number;
  full_name: string;
  designation: string;
  address: string;
  email: string;
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

export default function KaryasamitiPage() {
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

  return (
    <>
    <section className="bg-[#f9fbff] py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center underline">
          सम्पूर्ण कार्यसमिति सदस्य विवरण
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-center pt-6">
                <img
                  src={member.image_url || "/avatar.png"}
                  alt={member.full_name}
                  className="w-42 h-42 rounded-full object-cover border-4 border-blue-100"
                />
              </div>

              <div className="p-5 text-center">
                <h3 className="font-semibold text-gray-800">
                  {member.full_name}
                </h3>
                <p className="text-blue-600 text-sm mt-1">
                  {member.designation}
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  {member.email}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  📍 {member.address}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  📞 {member.mobile_no}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    <Footer/>
    </>
  );
}
