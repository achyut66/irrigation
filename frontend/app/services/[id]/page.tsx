// export const metadata = {
//   title: "प्राष्ट्रिय सिँचाइ कार्यशाला - ज्वालामूखी ग्रामिण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बोर्ड",
//   description: "ज्वालामूखी ग्रामिण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बोर्ड",
// };

import { servicesData } from "../serviceData";
import Footer from "../../components/Footer";

export default async function Page({ params }: { params: { id: string } }) {
  // Unwrap dynamic param
  const { id } = await params;

  // Find service by ID
  const service = servicesData.find((s) => s.id === Number(id));

  // If no service → show message
  if (!service) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold text-red-600">Service Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto py-16 px-4">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 border-b-4 border-blue-500 inline-block pb-2">
          {service.title}
        </h1>

        {/* Image Grid */}
        {service.images && service.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
            {service.images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${service.title} - ${index + 1}`}
                className="rounded-xl shadow-lg border object-cover w-full h-64 transition-transform hover:scale-105 duration-300"
              />
            ))}
          </div>
        )}

        {/* Description */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: service.desc }}
        />
      </div>

      <Footer />
    </>
  );
}
