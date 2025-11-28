import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

export default function NewsUpdatesPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20 ml-4">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 border-l-4 border-red-600 pl-3">
          समाचार तथा सूचनाहरू – ज्वालामुखी गाउँपालिका
        </h1>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed mb-10 max-w-7xl">
          ज्वालामुखी गाउँपालिकाबाट प्रकाशित ताजा सूचना, कार्यक्रम अपडेट, सार्वजनिक जानकारी
          तथा महत्वपूर्ण घोषणाहरू यहाँ उपलब्ध छन्। सबै समाचारहरू समय–समयमा अद्यावधिक गरिनेछ।
        </p>

        {/* NEWS LIST */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-48">
              <Image src="/images/news1.jpg" alt="News Image" fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                सिँचाइ क्यानाल मर्मत कार्य सुरु
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                ज्वालामुखी–३ मा क्यानाल सुधार र सिँचाइ लाइनिङ कार्य सुरु गरिएको बारेमा सूचना।
              </p>
              <Link href="#" className="text-red-600 font-semibold hover:underline">
                थप पढ्नुहोस् →
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-48">
              <Image src="/images/news2.jpg" alt="News Image" fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                कृषक प्रशिक्षण कार्यक्रम सम्पन्न
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                ५-दिने आधुनिक कृषि प्रविधि तालिम सफलतापूर्वक सम्पन्न भएको जानकारी।
              </p>
              <Link href="#" className="text-red-600 font-semibold hover:underline">
                थप पढ्नुहोस् →
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-48">
              <Image src="/images/news3.jpg" alt="News Image" fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                पम्प सेट वितरणको सूचना
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                आर्थिक वर्ष अनुसार पात्रता प्राप्त कृषकलाई पम्प सेट वितरण कार्यक्रम।
              </p>
              <Link href="#" className="text-red-600 font-semibold hover:underline">
                थप पढ्नुहोस् →
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-48">
              <Image src="/images/news4.jpg" alt="News Image" fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                कार्यालय बन्द हुने सम्बन्धी सूचना
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                सार्वजनिक बिदाका दिन गाउँपालिका कार्यालय बन्द रहने सम्बन्धमा जानकारी।
              </p>
              <Link href="#" className="text-red-600 font-semibold hover:underline">
                थप पढ्नुहोस् →
              </Link>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-48">
              <Image src="/images/news5.jpg" alt="News Image" fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                सिपमूलक तालिमका लागि आवेदन खुला
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                आगामी महिनाबाट सिपमूलक तालिम सञ्चालन हुने भएकाले आवेदन खुला गरिएको छ।
              </p>
              <Link href="#" className="text-red-600 font-semibold hover:underline">
                थप पढ्नुहोस् →
              </Link>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-48">
              <Image src="/images/news6.jpg" alt="News Image" fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                कृषि सामग्री वितरण कार्यक्रम सम्पन्न
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                ग्रामीण कृषकलाई बीउ, खात, उपकरण वितरण कार्यक्रम सफलतापूर्वक सम्पन्न।
              </p>
              <Link href="#" className="text-red-600 font-semibold hover:underline">
                थप पढ्नुहोस् →
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-red-100 rounded-xl p-6 shadow max-w-3xl mb-12">
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            सूचना तथा प्रकाशन शाखा – सम्पर्क
          </h3>
          <p className="text-gray-700">फोन: ०१०-५५५५५५</p>
          <p className="text-gray-700">इमेल: info@jwalamukhimun.gov.np</p>
          <p className="text-gray-700">समय: आइत–शुक्र, १०:०० – ४:००</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
