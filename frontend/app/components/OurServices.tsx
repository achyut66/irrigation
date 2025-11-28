"use client";
import React from "react";

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

const teamData = [
  {
    name: "Mitra Baral",
    position: "Director General",
    phone: "०१-५४३७१३६",
    email: "director_general@dwri.gov.np",
    img: "https://giwmscdnone.gov.np/media/albums/DG_photo_vyDrMRf6SR_m3sqvza.jpg",
  },
  {
    name: "Ram Prasad Paudel",
    position: "Under Secretary (Information Officer)",
    phone: "०१-५४३७३०८, ९८५१२३६४०४",
    email: "administration@dwri.gov.np",
    img: "https://giwmscdnone.gov.np/media/albums/20250421094538_Xm9m5rYcVN_12p10qe.jpg",
  },
];

export default function ServicesAndTeam() {
  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-12 gap-8">

        {/* LEFT SIDE */}
        <div className="md:col-span-8">

          {/* TITLE WITH THICK UNDERLINE */}
          <div className="mb-6">
            <h4 className="text-2xl font-semibold inline-block pb-2 border-b-4 border-blue-600">
            हाम्रा सेवाहरू
            </h4>
          </div>

          {/* OUTER BORDER CONTAINER */}
          <div className="border rounded-xl p-5">

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className="group block rounded-lg"
              >
                {/* OUTER BORDER BOX */}
                <div className="w-full h-40 bg-blue-200 border-2 border-blue-300 rounded-lg flex items-center justify-center overflow-hidden">
                  
                  {/* IMAGE (centered) */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* TEXT ANIMATION */}
                <h3 className="mt-3 font-medium text-gray-800 transition-colors group-hover:text-blue-600">
                  {item.title}
                </h3>
              </a>
            ))}
          </div>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="md:col-span-4 space-y-6 mt-18">

          {teamData.map((member, i) => (
            <div key={i} className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition">
              <div className="flex gap-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h5 className="text-lg font-semibold">{member.name}</h5>
                  <p className="text-sm text-gray-600">{member.position}</p>

                  <p className="text-sm mt-2">📞 {member.phone}</p>
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
