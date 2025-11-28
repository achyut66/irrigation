"use client";

import Image from "next/image";
import Footer from "../components/Footer";

export default function PratibedanPage() {
  return (
    <>
    <div className="w-full min-h-screen bg-gray-50 py-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 text-left mb-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3">प्रतिवेदन</h1>
        <p className="text-gray-700 text-lg">
          ज्वालामुखी गाउँपालिकामा सम्पन्न विभिन्न कार्यक्रम, परियोजना, मूल्यांकन तथा अन्य आधिकारिक अध्ययन प्रतिवेदनहरू ।
        </p>
      </div>

      {/* Reports Section */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 mb-16 max-w-7xl">
        {/* Report Card 1 */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row gap-4 hover:shadow-lg transition-all max-w-7xl">
          <Image
            src="/images/report1.jpg"
            alt="Report Image"
            width={500}
            height={350}
            className="rounded-lg object-cover w-full md:w-1/3"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              वार्षिक विकास कार्यक्रम प्रतिवेदन २०८१/८२
            </h3>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              गाउँपालिकामा चालु आर्थिक वर्षमा सम्पन्न विकास तथा निर्माण कार्यक्रमहरूको समग्र प्रतिवेदन । यसमा आर्थिक विवरण, प्रगति अवस्था र आगामी योजनाहरू समावेश छन् ।
            </p>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              डाउनलोड गर्नुहोस्
            </button>
          </div>
        </div>

        {/* Report Card 2 */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row gap-4 hover:shadow-lg transition-all">
          <Image
            src="/images/report2.jpg"
            alt="Report Image"
            width={500}
            height={350}
            className="rounded-lg object-cover w-full md:w-1/3"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              सामाजिक सुरक्षा कार्यक्रम मूल्यांकन प्रतिवेदन
            </h3>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              वृद्धभत्ता, अपाङ्गता भत्ता, बाल संरक्षण भत्ता लगायत सामाजिक सुरक्षा योजनाहरूको प्रभावकारिता, पहुँच र वितरण प्रणालीको मूल्यांकन प्रतिवेदन ।
            </p>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              डाउनलोड गर्नुहोस्
            </button>
          </div>
        </div>
      </div>

      {/* Additional Reports List */}
      <div className="max-w-5xl mx-auto px-4 mb-20 max-w-7xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">अन्य प्रकाशित प्रतिवेदनहरू</h2>

        <ul className="space-y-4 text-gray-800">
          <li className="p-4 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer">
            ✔ सार्वजनिक निर्माण कार्यको प्रगति प्रतिवेदन २०८१
          </li>
          <li className="p-4 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer">
            ✔ कृषि तथा पशुपालन कार्यक्रम प्रतिवेदन
          </li>
          <li className="p-4 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer">
            ✔ जोखिम न्युनिकरण तथा विपद् व्यवस्थापन प्रतिवेदन
          </li>
          <li className="p-4 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer">
            ✔ पर्यटन विकास सम्भाव्यता अध्ययन प्रतिवेदन
          </li>
        </ul>
      </div>
    </div>
    <Footer/>
    </>
  );
}