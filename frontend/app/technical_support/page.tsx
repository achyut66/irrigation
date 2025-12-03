import Image from "next/image";
import Footer from "../components/Footer";

export default function TechnicalHelpPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20 ml-4">

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 border-l-4 border-indigo-600 pl-3">
          प्राविधिक सहयोग तथा सहायता – ज्वालामूखी ग्रामीण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बाेर्ड
        </h1>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed max-w-7xl mb-12">
        ज्वालामूखी ग्रामीण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बाेर्डले कृषि, सिँचाइ, प्रविधि, निर्माण तथा प्राविधिक क्षेत्रका
          समस्याहरू समाधान गर्न स्थानीय नागरिक तथा कृषकलाई आवश्यक प्राविधिक सहयोग
          प्रदान गर्दै आएको छ। दक्ष प्राविधिक टोलीद्वारा निरीक्षण, परामर्श, उपकरणको
          जाँच तथा समस्या समाधानको सेवा उपलब्ध गराइन्छ।
        </p>

        {/* Feature blocks */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-indigo-500">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">
              कृषि प्राविधिक सहयोग
            </h3>
            <p className="text-gray-600">
              बाली व्यवस्थापन, रोग–कीरा नियन्त्रण, आधुनिक कृषि प्रविधि तथा बीउ–बिजन
              सम्बन्धी परामर्श।
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-indigo-500">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">
              सिँचाइ तथा मेकानिकल सहयोग
            </h3>
            <p className="text-gray-600">
              मोटर, पाइपलाइन, क्यानाल, पम्पिङ तथा सिँचाइ उपकरणहरूको निरीक्षण र मर्मत
              सहयोग।
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-indigo-500">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">
              फिल्ड निरीक्षण सेवा
            </h3>
            <p className="text-gray-600">
              प्राविधिक टोलीद्वारा खेत, पानी स्रोत, परियोजनास्थल तथा निर्माण क्षेत्रको
              प्रत्यक्ष निरीक्षण।
            </p>
          </div>
        </div>

        {/* Section 1 – Left text, right image */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4 border-b-2 border-indigo-500 inline-block pb-1">
              उपलब्ध प्राविधिक सेवाहरू
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>कृषि परामर्श तथा बाली व्यवस्थापन सहायता</li>
              <li>सिँचाइ उपकरणको समस्या पहिचान र समाधान</li>
              <li>मोटर, पम्प तथा लाइनको जाँच</li>
              <li>तोकिएका स्थानमा फिल्ड अवलोकन</li>
              <li>डिजिटल तथा आधुनिक उपकरण प्रयोग मार्गदर्शन</li>
            </ul>
          </div>

          <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/technical.jpeg"
              alt="Technical Field Visit"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Section 2 – Right text, left image */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg md:order-1 order-2">
            <Image
              src="/images/help.png"
              alt="Irrigation Technical Assistance"
              fill
              className="object-cover"
            />
          </div>

          <div className="md:order-2 order-1">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4 border-b-2 border-indigo-500 inline-block pb-1">
              कसरी सहयोग प्राप्त गर्ने?
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>ज्वालामूखी ग्रामीण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बाेर्ड प्राविधिक शाखामा निवेदन दिनुहोस्।</li>
              <li>आवश्यक कागजात तथा विवरण बुझाउनुहोस्।</li>
              <li>प्राविधिक टोलीबाट फिल्ड अवलोकन तय हुन्छ।</li>
              <li>समस्या पहिचानपछि समाधानका उपायहरू प्रदान गरिन्छ।</li>
            </ul>
          </div>
        </div>

        {/* Contact Box */}
        <div className="bg-indigo-100 rounded-xl p-6 shadow mb-10 max-w-3xl">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            प्राविधिक शाखा सम्पर्क
          </h3>
          <p className="text-gray-700">ज्वालामूखी ग्रामीण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बाेर्ड प्राविधिक तथा सिँचाइ शाखा</p>
          <p className="text-gray-700">फोन: ९८०३०७९८६८, ९७४१७३४३९३, ९८६११७७८५५, ९८६२७०५५७६</p>
          <p className="text-gray-700">इमेल: jwlamukhi.rwashm@gmail.com</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
