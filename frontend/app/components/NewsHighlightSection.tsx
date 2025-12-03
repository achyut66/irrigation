"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type HighlightItem = {
  id: number;
  title: string;
  highlight_news: string;
  created_at: string,
  image_url?: string | null;
};

type NewsItem = {
  id: number;
  heading: string;
  news: string;
  created_at: string,
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

export default function HighlightAndNews() {
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  const API_URL = resolveApiUrl();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [highlightRes, newsRes] = await Promise.all([
          fetch(`${API_URL}/api/highlight`),
          fetch(`${API_URL}/api/news`),
        ]);

        const highlightPayload = await highlightRes.json();
        const newsPayload = await newsRes.json();


        if (highlightRes.ok && highlightPayload?.status) {
          // LIMIT HIGHLIGHTS TO 5
          setHighlights((highlightPayload.data ?? []).slice(0, 4));
        } else {
          console.error("Error fetching highlights:", highlightPayload);
        }
        
        if (newsRes.ok && newsPayload?.status) {
          // LIMIT NEWS TO 5
          setNews((newsPayload.data ?? []).slice(0, 4));
        } else {
          console.error("Error fetching news:", newsPayload);
        }
      } catch (error) {
        console.error("Error fetching highlight/news:", error);
      }
    };

    loadData();
  }, [API_URL]);

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

    {/* LEFT — HIGHLIGHTS */}
    <div>
      <h2 className="text-2xl md:text-3xl text-gray-500 font-bold mb-6 border-l-4 border-blue-600 pl-3">
        Highlights (सूचना / हाईलाइट)
      </h2>

      <ul className="space-y-4">
        {highlights.map((item) => (
          <li
            key={item.id}
            className="p-4 rounded-xl shadow-xl bg-white"
          >
            {/* Title */}
            <Link
              href={`/highlightnews/${item.id}`}
              className="text-lg font-bold hover:underline hover:text-blue-600"
            >
              {item.title}
            </Link>

            {/* DATE */}
            {item.created_at && (
              <p className="text-xs text-gray-500 mt-2">
                {new Date(item.created_at).toLocaleString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>

    {/* RIGHT — NEWS */}
    <div>
  <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 text-gray-500 border-blue-600 pl-3">
    Latest News (ताजा समाचार)
  </h2>

  <ul className="space-y-4">
    {news.map((item) => (
      <li
        key={item.id}
        className="p-4 rounded-xl shadow-xl bg-white flex gap-4"
      >
        {/* IMAGE SMALL */}
        {item.image_url && (
          <img
            src={item.image_url}
            alt="News Image"
            className="w-24 h-20 object-cover rounded border"
          />
        )}

        {/* RIGHT SIDE: TEXT */}
        <div className="flex flex-col justify-center">
          <Link
            href={`/news/${item.id}`}
            className="text-lg font-semibold hover:text-blue-600 hover:underline"
          >
            {item.heading}
          </Link>

          {item.created_at && (
            <p className="text-xs text-gray-500 mt-1">
              {new Date(item.created_at).toLocaleString()}
            </p>
          )}
        </div>
      </li>
    ))}
  </ul>
</div>


  </div>
</div>



  );
}
