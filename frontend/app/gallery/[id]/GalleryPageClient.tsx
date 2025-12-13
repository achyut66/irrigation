"use client";

import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

interface GalleryItem {
  id: number;
  title: string;
  images: string[];
}

export default function GalleryPageClient({ id }: { id: string }) {
  const [gallery, setGallery] = useState<GalleryItem | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/api/photoes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setGallery(data.data);
        }
      });
  }, [id]);

  if (!gallery) {
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <>
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3 text-gray-600">
          {gallery.title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.images.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-64 bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
            >
              <img
                        src={img}
                        className="object-cover w-200"
                        alt="highlight"
                  />
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
