"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* =======================
   Types
======================= */
type HighlightItem = {
  id: number;
  title: string;
  highlight_news: string;
  created_at: string;
  image_url?: string | null;
};

type NewsItem = {
  id: number;
  heading: string;
  news: string;
  created_at: string;
  image_url?: string | null;
};

/* =======================
   API URL Resolver
======================= */
const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }

  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:8000";
  }

  return "http://127.0.0.1:8000";
};

/* =======================
   Component
======================= */
export default function HighlightAndNews() {
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  const API_URL = getApiUrl();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [highlightRes, newsRes] = await Promise.all([
          fetch(`${API_URL}/api/highlight`),
          fetch(`${API_URL}/api/news`),
        ]);

        const highlightData = await highlightRes.json();
        const newsData = await newsRes.json();

        if (highlightRes.ok && highlightData?.status) {
          setHighlights((highlightData.data ?? []).slice(0, 4));
        }

        if (newsRes.ok && newsData?.status) {
          setNews((newsData.data ?? []).slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load highlight/news data:", err);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <section className="py-10 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* =======================
            Highlights
        ======================= */}
        <div>
          <h2 className="mb-6 text-2xl md:text-3xl font-bold text-gray-600 border-l-4 border-blue-600 pl-3">
            Highlights (सूचना / हाईलाइट)
          </h2>

          <ul className="space-y-4">
            {highlights.map((item) => (
              <li
                key={item.id}
                className="p-4 rounded-xl shadow-xl bg-gray-100"
              >
                <Link
                  href={`/highlightnews/${item.id}`}
                  className="text-lg font-bold"
                >
                  <span className="text-gray-600 hover:text-blue-600 hover:underline">
                  {item.title}
                  </span>
                </Link>

                {item.created_at && (
                  <p className="mt-2 text-xs text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* =======================
            Latest News
        ======================= */}
        <div>
          <h2 className="mb-6 text-2xl md:text-3xl font-bold text-gray-600 border-l-4 border-blue-600 pl-3">
            Latest News (ताजा समाचार)
          </h2>

          <ul className="space-y-4">
            {news.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 p-4 rounded-xl shadow-xl bg-gray-100"
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.heading}
                    className="w-24 h-20 object-cover rounded border"
                  />
                )}

                <div className="flex flex-col justify-center">
                  <Link
                    href={`/highlightnews/${item.id}`}
                    className="text-lg font-bold"
                  >
                    <span className="text-gray-600 hover:text-blue-600 hover:underline">
                    {item.heading}
                    </span>
                  </Link>

                  {item.created_at && (
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
