import Image from "next/image";
import Footer from "../components/Footer";

export default function TalimKaryashalaPage() {
  return (
    <>
      <div className="min-h-screen bg-white ml-4 py-12 px-6 md:px-20">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 border-l-4 border-green-600 pl-3">
          तालिम तथा कार्यशाला – ज्वालामुखी गाउँपालिका
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-700 leading-relaxed mb-10 max-w-7xl">
          ज्वालामुखी गाउँपालिकाले कृषक, महिला समूह, युवा तथा स्थानीय समुदायको क्षमता अभिवृद्धि गर्न
          विभिन्न तालिम तथा कार्यशालाहरू सञ्चालन गर्दै आएको छ। व्यवहारिक सीप, आधुनिक कृषि प्रविधि,
          व्यवस्थापन सीप तथा आयमूलक कार्यक्रमहरूलाई प्रभावकारी बनाउन यी तालिमहरूले महत्वपूर्ण योगदान
          पुर्‍याएका छन्।
        </p>

        {/* Section: Left text, right image */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b-2 border-green-500 inline-block pb-1">
              तालिमका उद्देश्य
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>स्थानीय कृषकहरूको प्राविधिक क्षमता विकास गर्ने।</li>
              <li>आधुनिक तथा दिगो कृषि प्रविधिको प्रयोग सिकाउने।</li>
              <li>महिला तथा युवा समूहलाई स्वरोजगारमुखी सीप प्रदान गर्ने।</li>
              <li>समुदायमा सहकार्य, नेतृत्व तथा व्यवस्थापन सीप बढाउने।</li>
            </ul>
          </div>

          <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/talim1.jpg"
              alt="Training Session 1"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Section: Right text, left image */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg md:order-1 order-2">
            <Image
              src="/images/talim2.jpg"
              alt="Workshop Session"
              fill
              className="object-cover"
            />
          </div>

          <div className="md:order-2 order-1">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b-2 border-green-500 inline-block pb-1">
              प्रमुख कार्यशाला गतिविधिहरू
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>कृषि प्रविधि डेमो तथा प्रयोगात्मक सत्रहरू।</li>
              <li>समूहकार्य र नेतृत्व अभिवृद्धिका विशेष सत्र।</li>
              <li>महिला लक्षित उद्यम तथा आयमूलक तालिमहरू।</li>
              <li>डिजिटल तथा स्मार्ट कृषि उपकरण प्रयोग तालिम।</li>
            </ul>
          </div>
        </div>

        {/* Gallery Section */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-6 border-l-4 border-green-600 pl-3">
          तालिम तथा कार्यशालाका फोटोहरू
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="relative w-full h-52 rounded-xl overflow-hidden shadow">
            <Image src="/images/talim3.jpg" alt="Training Photo 1" fill className="object-cover" />
          </div>
          <div className="relative w-full h-52 rounded-xl overflow-hidden shadow">
            <Image src="/images/talim4.jpg" alt="Training Photo 2" fill className="object-cover" />
          </div>
          <div className="relative w-full h-52 rounded-xl overflow-hidden shadow">
            <Image src="/images/talim5.jpg" alt="Training Photo 3" fill className="object-cover" />
          </div>
        </div>

        <p className="text-gray-600 max-w-3xl pb-10">
          थप जानकारीका लागि ज्वालामुखी गाउँपालिकाको कृषि, महिला तथा सामुदायिक विकास शाखामा सम्पर्क गर्नुहोस्।
        </p>
      </div>

      <Footer />
    </>
  );
}