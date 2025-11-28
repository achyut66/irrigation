"use client";

import Image from "next/image";

export default function GallerySection() {
  const galleries = [
    {
      id: 1,
      title: "सिँचाइ दिवस, २०८१",
      image: "/frontend/assets/images/banners/pic4.jpg",
      count: 14,
    },
    {
      id: 2,
      title: "तालिम तथा कार्यशाला",
      image: "/frontend/assets/images/banners/pic5.jpg",
      count: 20,
    },
    {
      id: 3,
      title: "समुदायमैत्री सिँचाइ",
      image: "/frontend/assets/images/banners/pic6.jpg",
      count: 10,
    },
    {
      id: 4,
      title: "कृषि अनुगमन",
      image: "/frontend/assets/images/banners/pic7.jpg",
      count: 18,
    },
    {
      id: 5,
      title: "पानी स्रोत संरक्षण",
      image: "/frontend/assets/images/banners/pic8.jpg",
      count: 12,
    },
    {
      id: 6,
      title: "सिँचाइ पूर्वाधार",
      image: "/frontend/assets/images/banners/pic9.jpg",
      count: 22,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3">
          फोटोहरु
        </h2>
        <p className="text-gray-600 mb-8">
          यहाँ विभिन्न कार्यक्रम तथा गतिविधिहरुको झलक हेर्न सक्नुहुन्छ।
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="group border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={gallery.image}
                  alt={gallery.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition">
                  {gallery.title}
                </h3>

                <p className="text-sm text-gray-600">{gallery.count} तस्वीरहरू</p>

                <button className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-800">
                  हेर्नुहोस् →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
