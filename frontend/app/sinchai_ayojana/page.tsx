import Image from "next/image";
import Footer from "../components/Footer";

export default function SinchaiAyojanaPage() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 py-10 ml-5 px-6 md:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6 border-l-4 border-blue-600 pl-3">
        जल तथा सिँचाइ आयोजना – ज्वालामुखी गाउँपालिका
      </h1>

      <p className="text-gray-700 leading-relaxed mb-6 max-w-7xl">
        ज्वालामुखी गाउँपालिकामा सिँचाइ पूर्वाधार विकासलाई प्राथमिकता दिइँदै आएको छ। 
        स्थानीय कृषकहरूको उत्पादनशीलता वृद्धि, नेतृत्व विकास, र पानीको समान तथा 
        प्रभावकारी प्रयोग सुनिश्चित गर्न विभिन्न सिँचाइ आयोजनाहरू सञ्चालनमा छन्। 
        यस पेजमा गाउँपालिकामा संचालनमा रहेका प्रमुख सिँचाइ परियोजनाहरू, तिनका 
        उद्देश्य, उपलब्धि तथा आगामी योजनाहरू प्रस्तुत गरिएको छ।
      </p>

      <div className="grid md:grid-cols-2 gap-8 my-10">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            प्रमुख उद्देश्य
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>कृषि उत्पादन बढाउने र किसानको आय वृद्धिमा योगदान पुर्‍याउने।</li>
            <li>पानी स्रोतहरूको दिगो उपयोग सुनिश्चित गर्ने।</li>
            <li>स्थानीय किसान समूह (WUG) लाई सशक्त बनाउने।</li>
            <li>सिँचाइ व्यवस्थापनलाई प्रविधिमैत्री बनाउँदै विकास गर्ने।</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            आगामी योजना
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>सूक्ष्म सिँचाइ प्रणाली (Drip, Sprinkler) विस्तार।</li>
            <li>क्यानाल सुधार तथा लाइनिङ कार्य।</li>
            <li>पम्पिङ तथा ट्यांकी निर्माण विस्तार।</li>
            <li>डिजिटल सिँचाइ व्यवस्थापन प्रणाली लागू गर्ने।</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mt-10 mb-4 border-l-4 border-blue-600 pl-3">
        आयोजनाको फोटोहरु
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative w-full h-52 rounded-xl overflow-hidden shadow">
          <Image src="/images/sinchai1.jpg" alt="Sinchai Project 1" fill className="object-cover" />
        </div>
        <div className="relative w-full h-52 rounded-xl overflow-hidden shadow">
          <Image src="/images/sinchai2.jpg" alt="Sinchai Project 2" fill className="object-cover" />
        </div>
        <div className="relative w-full h-52 rounded-xl overflow-hidden shadow">
          <Image src="/images/sinchai3.jpg" alt="Sinchai Project 3" fill className="object-cover" />
        </div>
      </div>

      <p className="text-gray-600 mt-10 max-w-3xl">
        थप विवरणका लागि ज्वालामुखी गाउँपालिकाको कृषि तथा सिँचाइ शाखालाई सम्पर्क गर्नुहोस्।
      </p>
    </div>
    <Footer/>
    </>
  );
}