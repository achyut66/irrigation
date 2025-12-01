"use client";

import React, { useEffect, useState } from "react";

const servicesData = [
  {
    title: "राष्ट्रिय सिँचाइ कार्यशाला",
    img: "https://giwmscdnone.gov.np/media/members/profile_20250728123620_glvwpol.jpg",
    link: "#",
  },
  {
    title: "जलस्रोत व्यवस्थापन",
    img: "https://giwmscdnone.gov.np/media/members/profile_20250728123725_j2qw4zo.jpg",
    link: "#",
  },
  {
    title: "अनुसन्धान तथा विकास",
    img: "https://giwmscdnone.gov.np/media/members/profile_20250728123737_5yys30v.jpg",
    link: "#",
  },
  {
    title: "जल उपभोक्ता समूहहरू",
    img: "https://giwmscdnone.gov.np/media/members/profile_20250728123756_f9pkzwh.jpg",
    link: "#",
  },
  {
    title: "सिँचनीय क्षेत्रफल विस्तार",
    img: "https://giwmscdnone.gov.np/media/members/profile_20250728123816_hnw26iw.jpg",
    link: "#",
  },
  {
    title: "भूगर्भीय जल सिँचाइ",
    img: "https://giwmscdnone.gov.np/media/members/profile_20250728123839_mwtnyfb.jpg",
    link: "#",
  },
];

export default function ServicesAndTeam() {
  const [teamData, setTeamData] = useState<any[]>([]);

  const API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  // Fetch personnel data
  useEffect(() => {
    fetch(`${API_URL}/api/authority`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.status && Array.isArray(data.data)) {
          setTeamData(data.data);
        }
      })
      .catch((err) => console.error("Authority fetch error:", err));
  }, [API_URL]);

  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-12 gap-8">

        {/* LEFT SIDE */}
        <div className="md:col-span-8">
          <div className="mb-6">
            <h4 className="text-2xl font-semibold inline-block pb-2 border-b-4 border-blue-600">
              हाम्रा सेवाहरू
            </h4>
          </div>

          <div className="border rounded-xl p-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData.map((item, i) => (
                <a key={i} href={item.link} className="group block rounded-lg">
                  <div className="w-full h-40 bg-blue-200 border-2 border-blue-300 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="mt-3 font-medium text-gray-800 transition-colors group-hover:text-blue-600">
                    {item.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — FETCHED TEAM DATA */}
        <div className="md:col-span-4 space-y-6 mt-18">

          {teamData.length === 0 && (
            <p className="text-gray-500">Loading personnel...</p>
          )}

          {teamData.map((member) => (
            <div key={member.id} className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition">
              <div className="flex gap-4">
                <img
                  src={member.image_url}
                  alt={member.full_name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h5 className="text-lg font-semibold">{member.full_name}</h5>
                  <p className="text-sm text-gray-600">{member.position}</p>

                  <p className="text-sm mt-2">📞 {member.mobile_no}</p>
                  <p className="text-sm">✉️ {member.email}</p>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
