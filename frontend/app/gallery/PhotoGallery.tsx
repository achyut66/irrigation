"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function GallerySection() {
  const [galleries, setGalleries] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/photoes`) // your API route
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setGalleries(data.data);
        }
      });
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-2xl text-gray-500 md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3">
          फोटोहरु
        </h2>
        <p className="text-gray-600 mb-8">
          यहाँ विभिन्न कार्यक्रम तथा गतिविधिहरुको झलक हेर्न सक्नुहुन्छ।
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {galleries.map((gallery: any) => (
            <Link key={gallery.id} href={`/gallery/${gallery.id}`}>
              <div className="group shadow-xl rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition duration-300 cursor-pointer">

                {/* Main Image */}
                <div className="relative w-full h-52 overflow-hidden">
                
                  <img
                        src={gallery.image_url ?? "/placeholder.jpg"}
                        className="object-cover w-200 group-hover:scale-105 transition duration-500"
                        alt="highlight"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition">
                    {gallery.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {gallery.count} तस्वीरहरू
                  </p>

                  <button className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-800">
                    हेर्नुहोस् →
                  </button>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
