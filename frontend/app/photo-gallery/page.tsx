"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import Footer from "../components/Footer";

interface PhotoItem {
  id: number;
  photo_id: number;
  url: string;
}

export default function PhotoGalleryPage() {
  const [galleryImages, setGalleryImages] = useState<PhotoItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/photoesAll`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setGalleryImages(data.data);
        }
      })
      .catch((err) => console.error("Gallery fetch error:", err));
  }, []);

  const visibleImages = showAll
    ? galleryImages
    : galleryImages.slice(0, 8);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10 px-6 ml-4 md:px-20">

        {/* Header */}
        <div className="text-left mb-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3">
            फोटो ग्यालेरी
          </h1>
          <p className="text-gray-700 max-w-7xl">
          ज्वालामूखी ग्रामीण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बाेर्डमा सम्पन्न विभिन्न गतिविधि, कार्यक्रम,
            विकास निर्माण तथा समुदायसँग सम्बन्धित महत्वपूर्ण क्षणहरूको फोटो
            संग्रह ।
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleImages.map((item, index) => (
            <div
              key={index}
              className="relative w-full h-56 rounded-xl overflow-hidden shadow hover:shadow-lg cursor-pointer group"
            >
              {/* <Image
                src={item.url}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              /> */}
              <img
              src={item.url}
              alt="Gallery Image"
              className="object-cover group-hover:scale-110 w-200 transition-transform duration-300"
              />
              
            </div>
          ))}
        </div>

        {/* View More Button */}
        {!showAll && galleryImages.length > 8 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              थप फोटो हेर्नुहोस
            </button>
          </div>
        )}

        {/* Category Section */}
        <div className="mt-16 max-w-4xl mx-auto ml-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
            ग्यालेरी का प्रकार
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>विकास तथा निर्माण गतिविधिका फोटोहरू</li>
            <li>तालिम, बैठक तथा कार्यशालाका झलकहरू</li>
            <li>सामाजिक तथा सामुदायिक कार्यक्रमका फोटोहरू</li>
            <li>कृषि, सिँचाइ तथा प्राविधिक निरीक्षणका फोटोहरू</li>
          </ul>
        </div>

        {/* Note */}
        <p className="text-gray-600 mt-12 max-w-3xl">
          थप फोटोहरू चाँडै थपिनेछ । यदि तपाईंलाई कुनै फोटो छुटेको वा
          थप्नुपर्ने लाग्छ भने सूचना शाखा, ज्वालामूखी ग्रामीण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बाेर्ड सम्पर्क
          गर्नुहोस्।
        </p>
      </div>

      <Footer />
    </>
  );
}
