"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

import Footer from "../../components/Footer";

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

export default function PlansPage() {
  const [projects, setProjects] = useState<PlanItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

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

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <>
    <div className="bg-[#f4f8ff] py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <h2 className="text-3xl font-bold mb-10 border-l-4 border-blue-600 pl-4">
          बोर्ड आयोजनाहरू
        </h2>

        {/* Plans Grid */}
        {projects.length === 0 ? (
          <p className="text-center py-20 text-gray-600">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleProjects.map((p, index) => (
              <Link href={`/plan/${p.id}`} key={index}>

                <div className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden group cursor-pointer">

                  {/* Image */}
                  <img
                    src={p.image_url ?? "/placeholder.jpg"}
                    alt={p.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Title */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {p.title}
                    </h3>
                  </div>

                </div>

              </Link>
            ))}
          </div>
        )}

        {/* SEE MORE BUTTON */}
        {projects.length > visibleCount && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}
