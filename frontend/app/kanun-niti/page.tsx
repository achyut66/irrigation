"use client";

import Link from "next/link";
import Footer from "../components/Footer";

export default function KaanunNitiPage() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20 ml-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 border-l-4 border-blue-600 pl-3">
        कानुन तथा नीतिहरू
      </h1>

      <p className="text-gray-700 leading-relaxed max-w-7xl mb-8">
        ज्वालामुखी गाउँपालिकाले प्रभावकारी स्थानीय शासन, सेवा प्रवाह, विकास निर्माण एवं सुशासनलाई 
        सुदृढ बनाउन विभिन्न कानुन, निर्देशिका, कार्यविधि र नीतिहरू निर्माण तथा कार्यान्वयन गर्दै आएको छ।
        यस पृष्ठमा गाउँपालिकाद्वारा पारित, जारी वा प्रयोगमा रहेका प्रमुख कानुन तथा नीतिहरू सूचीबद्ध गरिएको छ।
      </p>

      {/* Categories */}
      <div className="grid md:grid-cols-3 gap-6 my-10">
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-600">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">स्थानीय कानुन</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>गाउँसभा तथा कार्यपालिका सम्बन्धी कानुन</li>
            <li>वित्तीय विनियोजन तथा बजेट व्यवस्थापन कानुन</li>
            <li>भौतिक पूर्वाधार व्यवस्थापन कानुन</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">नीतिहरू</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>कृषि तथा सिँचाइ नीति</li>
            <li>सूचना प्रविधि तथा डिजिटलाइजेशन नीति</li>
            <li>शिक्षा, स्वास्थ्य तथा सामाजिक विकास नीति</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-red-600">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">निर्देशिका तथा कार्यविधि</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>कार्यसम्पादन मूल्यांकन कार्यविधि</li>
            <li>समुदाय विकास कार्यक्रम निर्देशिका</li>
            <li>अनुदान वितरण तथा व्यवस्थापन कार्यविधि</li>
          </ul>
        </div>
      </div>

      {/* Downloads Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-12 mb-5 border-l-4 border-blue-600 pl-3">
        डाउनलोडयोग्य कानुन, नीति तथा निर्देशिका
      </h2>

      <div className="space-y-4 max-w-7xl">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow"
          >
            <div>
              <p className="text-gray-800 font-medium">
                कानुन/नीति/निर्देशिका शीर्षक {i}
              </p>
              <p className="text-gray-500 text-sm">प्रकाशित मिति: २०७९/०३/{10 + i}</p>
            </div>
            <Link
              href="#"
              className="text-blue-600 font-semibold underline hover:text-blue-800"
            >
              डाउनलोड
            </Link>
          </div>
        ))}
      </div>

      <p className="text-gray-600 mt-12 max-w-3xl">
        थप जानकारीका लागि प्रशासन तथा कानुनी शाखा, ज्वालामुखी गाउँपालिका सम्पर्क
        गर्नुहोस्।
      </p>
    </div>
        <Footer/>
    </>
  );
}
