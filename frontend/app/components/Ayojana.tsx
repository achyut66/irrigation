"use client";

import Image from "next/image";
import Link from "next/link";

export default function NationalProjects() {
  const projects = [
    {
      title: "सुनकोशी मरिन डाइभर्सन बहुउद्देश्यीय आयोजना",
      link: "#",
      img: "/images/ayojana/1.jpg",
    },
    {
      title: "बबई सिँचाइ आयोजना",
      link: "#",
      img: "/images/ayojana/2.jpg",
    },
    {
      title: "सिक्टा सिँचाइ आयोजना",
      link: "#",
      img: "/images/ayojana/3.jpg",
    },
    {
      title: "महाकाली सिँचाइ आयोजना",
      link: "#",
      img: "/images/ayojana/4.jpg",
    },
    {
      title: "रानी जमरा कुलरिया सिँचाइ आयोजना",
      link: "#",
      img: "/images/ayojana/5.gif",
    },
    {
      title: "भेरी बबई डाइभर्सन बहुउद्देश्यीय आयोजना",
      link: "#",
      img: "/images/ayojana/6.png",
    },
  ];

  return (
    <div className="bg-[#f4f8ff] py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3">
          पालिकास्तर गौरवका आयोजनाहरू
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((p, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">

              {/* Image */}
              <Link href={p.link}>
                <Image
                  src={p.img}
                  alt={p.title}
                  width={500}
                  height={300}
                  className="w-full h-40 object-cover"
                />
              </Link>

              {/* Title */}
              <div className="p-4">
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  <Link href={p.link}>{p.title}</Link>
                </h3>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
