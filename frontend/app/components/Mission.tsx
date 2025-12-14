export default function MissionSection() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT IMAGE */}
          <div>
            <img
              src="/images/irrigation.jpg"
              alt="Our Mission"
              className="w-full h-auto object-cover rounded-xl shadow-md"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-700 mb-8 border-b-4 border-blue-500 inline-block pb-1">
              हाम्रो उद्देश्य
            </h2>

            {/* Mission */}
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              उद्देश्य
            </h3>
            <p className="relative text-gray-700 mb-6 line-clamp-3">
              ज्वालामूखी नगरपालिका, धादिङमा आधुनिक र सुदृढ सिँचाइ संस्कृतिको विकास गर्ने हाम्रो उद्देश्य छ।
              यसका लागि सामुदायिक आधारित पानी व्यवस्थापन प्रणालीको विस्तार, साना तथा मध्यम सिँचाइ नहरहरूको सुधार,
              र किसानहरूलाई वर्षभरि भरपर्दो सिँचाइ सुविधा उपलब्ध गराउने कार्यहरूलाई प्राथमिकतापूर्वक अघि बढाइन्छ।
            </p>

            {/* Vision */}
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              परिकल्पना
            </h3>
            <p className="relative text-gray-700 mb-6 line-clamp-3">
              ज्वालामूखी गाउँपालिकालाई एक नमुना कृषि क्षेत्रका रूपमा रूपान्तरण गर्दै
              कार्यक्षम पानी वितरण, जलवायु–सहनीय सिँचाइ प्रणाली, तथा वातावरणमैत्री
              स्रोत व्यवस्थापन सुनिश्चित गर्नु हाम्रो लक्ष्य हो।
            </p>

            {/* Goal */}
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              लक्ष्य
            </h3>
            <p className="relative text-gray-700 mb-8 line-clamp-3">
              हाम्रो लक्ष्य प्रभावकारी कृषि योग्य भूमिमा सिँचाइ पहुँच विस्तार गर्नु,
              क्षतिग्रस्त कुलो सञ्जाल मर्मत गर्नु, र ड्रिप तथा स्प्रिंकलर जस्ता
              आधुनिक सिँचाइ प्रविधिको प्रयोगलाई प्रवर्द्धन गर्नु हो।
            </p>

            {/* Button */}
            <a
              href="/mission"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              See More
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
  