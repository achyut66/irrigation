"use client";

import React, { useEffect, useState } from "react";
import { servicesData } from "./serviceData";


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
          setTeamData(data.data.slice(0, 4)); // LIMIT TO 3
        }
      })
      .catch((err) => console.error("Authority fetch error:", err));
  }, [API_URL]);  

  return (
    <div className="w-full py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-12 gap-8">

        {/* LEFT SIDE */}
        <div className="md:col-span-8">
          <div className="mb-6">
            <h4 className="text-3xl text-gray-500 font-semibold inline-block pb-2 border-b-4 border-blue-600">
              हाम्रा सेवाहरू
            </h4>
          </div>

          <div className="shadow-sm rounded-xl border-1 border-blue-100 p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData.map((item, i) => (
                  <a key={i} href={`/services/${item.id}`} className="group block rounded-lg">
                  <div className="w-full h-40 bg-gray-100 shadow-xl rounded-lg flex items-center justify-center overflow-hidden">
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
            <div key={member.id} className="rounded-lg p-2 shadow-xl hover:shadow-lg transition max-h-24">
              <div className="flex gap-4 max-h-20">
                <img
                  src={member.image_url}
                  alt={member.full_name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h5 className="text-lg font-semibold text-gray-600">{member.full_name}</h5>
                  <p className="text-sm text-gray-600">{member.position}</p>

                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-sm text-gray-600">📞 {member.mobile_no}</p>
                    <p className="text-sm text-gray-600">✉️ {member.email}</p>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
