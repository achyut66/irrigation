"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

type HighlightItem = {
  id: number;
  title: string;
  created_at: string;
  image_url?: string | null;
};

const resolveApiUrl = () => {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) return process.env.NEXT_PUBLIC_BACKEND_URL;
  if (window.location.hostname === "localhost")
    return "http://localhost:8000";
  return "http://127.0.0.1:8000";
};

export default function AllHighlights() {
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const API_URL = resolveApiUrl();

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`${API_URL}/api/highlight`);
      const payload = await res.json();
      if (payload?.status) setHighlights(payload.data);
    };
    loadData();
  }, [API_URL]);

  const visibleHighlights = highlights.slice(0, visibleCount);

  return (
    <>
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 border-l-4 text-gray-600 border-blue-600 pl-3">
        All Highlights (सबै सूचना / हाईलाइट)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleHighlights.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-5 border hover:shadow-lg transition"
          >
            {item.image_url && (
              <img
                src={item.image_url}
                className="w-full h-40 object-cover rounded mb-3"
                alt=""
              />
            )}

            <h2 className="text-lg font-bold mb-2">
            <Link href={`/highlightnews/${item.id}`} className="hover:text-blue-600">
              <span className="text-gray-600">
                {item.title}
              </span>
            </Link>

            </h2>

            <p className="text-sm text-gray-500">
              {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {visibleCount < highlights.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount(visibleCount + 6)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            See More (थप हेर्नुहोस्)
          </button>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
