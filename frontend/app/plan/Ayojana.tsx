"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PlanItem = {
  id: number;
  title: string;
  image_url?: string | null;
};

const resolveApiUrl = () => {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }

  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:8000";
  }

  return "http://127.0.0.1:8000";
};

export default function NationalProjects() {
  const [projects, setProjects] = useState<PlanItem[]>([]);

  const API_URL = resolveApiUrl();

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch(`${API_URL}/api/plan`);
        const data = await res.json();

        if (res.ok && data?.status) {
          setProjects(data.data ?? []);
        } else {
          console.error("Failed to load plans:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    loadPlans();
  }, [API_URL]);

  const visibleProjects = projects.slice(0, 6);

  return (
    <div className="bg-[#f4f8ff] py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Title */}
        <h2 className="text-2xl text-gray-500 md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3">
          बोर्डस्तर गौरवका आयोजनाहरू
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleProjects.map((p: any, index: number) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">

              {/* Image */}
              <Link href={`/plan/${p.id}`}>
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full h-40 object-cover"
                />

                {/* Title */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold hover:text-blue-600">
                    {p.title}
                  </h3>
                </div>
              </Link>

            </div>
          ))}
        </div>

        {/* SEE MORE BUTTON */}
        {projects.length > 6 && (
          <div className="text-center mt-8">
            <Link href="/plans">
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                See More
              </button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
