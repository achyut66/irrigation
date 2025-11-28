export default function MissionSection() {
    return (
      <section className="py-4 px-6 max-w-9xl ml-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT IMAGE */}
          <div className="w-full">
            <img
              src="../images/irrigation.jpg" // change image file path
              alt="Our Mission"
              className="w-full h-100 object-cover rounded-xl shadow-md"
            />
          </div>
  
          {/* RIGHT CONTENT */}
          <div>
  {/* Heading */}
  <h2 className="text-3xl font-bold mb-12 border-b-4 border-blue-500 inline-block pb-1">
  हाम्रो उद्देश्य
  </h2>

  {/* Mission */}
  <h3 className="text-xl font-semibold text-blue-600">उद्देश्य</h3>
  <p className="relative text-gray-700 mt-2 mb-6 line-clamp-3 overflow-hidden">
    ज्वालामुखी नगरपालिका, धादिङमा आधुनिक र सुदृढ सिँचाइ संस्कृतिको विकास गर्ने हाम्रो उद्देश्य छ।
    यसका लागि सामुदायिक आधारित पानी व्यवस्थापन प्रणालीको विस्तार, साना तथा मध्यम सिँचाइ नहरहरूको सुधार, र किसानहरूलाई वर्षभरि भरपर्दो सिँचाइ सुविधा उपलब्ध गराउने कार्यहरूलाई प्राथमिकतापूर्वक अघि बढाइन्छ।
    हाम्रो मिशन स्थानीय कृषि प्रणालीलाई सुदृढ बनाउने, उत्पादनशीलता वृद्धि गर्ने, र आधुनिक सिँचाइ प्रविधि तथा वैज्ञानिक पानी–व्यवस्थापन अभ्यासहरूको प्रयोगमार्फत दिगो जीविकोपार्जनको विकास गर्नेमा केन्द्रित छ।
    <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent block"></span>
  </p>

  {/* Vision */}
  <h3 className="text-xl font-semibold text-blue-600">परिकल्पना</h3>
  <p className="relative text-gray-700 mt-2 mb-6 line-clamp-3 overflow-hidden">
    ज्वालामुखी गाउँपालिकालाई एक नमुना कृषि क्षेत्रका रूपमा रूपान्तरण गर्दै
    कार्यक्षम पानी वितरण, जलवायु–सहनीय सिँचाइ प्रणाली, तथा वातावरणमैत्री
    स्रोत व्यवस्थापन सुनिश्चित गर्नु हाम्रो लक्ष्य हो। यो दृष्टिकोणले हरेक
    किसान परिवारलाई भरपर्दो सिँचाइ सुविधामा पहुँच दिलाई स्थानीय अर्थतन्त्र
    मजबुत बनाउने, खाद्य सुरक्षा सुनिश्चित गर्ने र दीर्घकालीन ग्रामीण
    विकासलाई प्रवर्द्धन गर्ने उद्देश्य राख्छ।
    <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent block"></span>
  </p>

  {/* Goal */}
  <h3 className="text-xl font-semibold text-blue-600">लक्ष्य</h3>
  <p className="relative text-gray-700 mt-2 mb-8 line-clamp-3 overflow-hidden">
    हाम्रो लक्ष्य हालको करिब ४२–४८% प्रभावकारी कृषि योग्य भूमि (हालका स्थानीय
    डाटा प्रवृत्तिहरूका आधारमा) भन्दा बढी क्षेत्रमा सिँचाइ पहुँच विस्तार गर्नु,
    मनसुनका कारण क्षतिग्रस्त भएका कुलो सञ्जाल मर्मत तथा सुधार गर्नु, र
    दिगो कृषि उत्पादनका लागि ड्रिप/स्प्रिंकलर जस्ता आधुनिक सिँचाइ प्रविधिको
    प्रयोगलाई प्रवर्द्धन गर्नु हो। साथै, किसान सहकारी संस्थाहरूलाई सुदृढ बनाउने,
    पानी शासन व्यवस्थालाई प्रभावकारी बनाउने, र स्रोत योजनाका लागि डिजिटल
    मोनिटरिङ प्रणाली कार्यान्वयन गर्ने हाम्रो उद्देश्य छ।
    <span className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent block"></span>
  </p>

  {/* SEE MORE BUTTON */}
  <a
    href="/mission"
    className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
  >
    See More
  </a>
</div>

        </div>
      </section>
    );
  }
  