"use client";

import { useState } from "react";
import Footer from "../components/Footer";

type FormDataType = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-22">

      <h1 className="text-2xl text-gray-600 md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3">
        सम्पर्क गर्नुहोस्
      </h1>

      <div className="grid md:grid-cols-2 gap-10 mt-10">

        {/* LEFT: Contact Form */}
        <div className="bg-white shadow-md rounded-xl p-6 md:p-10 h-fit">
  
          {/* Intro Text */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">हामीसँग सम्पर्क गर्नुहोस्</h2>

            <p className="text-gray-600"> हामी तपाईंको जानकारी संकलन गर्ने प्रक्रियालाई अझ सहज र व्यवस्थित बनाउन चाहन्छौँ। त्यसका लागि तलको <strong>Google Form</strong>
            मार्फत आवश्यक विवरणहरू पठाउन सकिने व्यवस्था गरिएको छ। कृपया फारममा मागिएका सबै विवरणहरू ध्यानपूर्वक भरि पठाइदिनुहोस्, जसले गर्दा 
            हामीले तपाईंको जानकारीलाई छिटो र प्रभावकारी ढङ्गले प्रक्रिया गर्न सक्छौँ। </p> 
            <p className="text-gray-600"> यो प्रणालीमार्फत पठाइने सबै जानकारी सुरक्षित रहन्छ र केवल सम्बन्धित व्यवस्थापन कार्यका लागि मात्र प्रयोग गरिनेछ। तपाईंले पठाएको विवरणको 
            आधारमा हामी आवश्यक प्रमाणीकरण, अभिलेख व्यवस्थापन तथा अन्य आवश्यक प्रशासकीय कार्यहरू सम्पन्न गर्नेछौँ। यदि तपाईंले फारम भर्दा कुनै 
            समस्या वा अस्पष्टता महसुस गर्नुभयो भने, हामीलाई सम्पर्क गर्न सक्नुहुन्छ। </p> <p className="text-gray-600"> कृपया तल दिइएको लिंकमा क्लिक गरी Google Form खोल्नुहोस्
            र सबै चरण पूरा गर्नुहोस्। फारम सफलतापूर्वक बुझाइएपछि तपाईंलाई पुष्टि सन्देश पनि प्राप्त हुनेछ। </p> 
            <p className="font-semibold text-gray-600"> धन्यवाद — तपाईंको सहयोगले सेवा प्रवाहलाई अझ सरल र प्रभावकारी बनाउन मद्दत गर्छ। </p>

            {/* Google Form Button */}
            <a
              href="https://forms.gle/wNn7uKoYpbjESTs69" 
              target="_blank"
              className="inline-block mt-5 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Google Form भर्नुहोस्
            </a>
          </div>

          {/* Contact Information */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-3">सम्पर्क विवरण</h2>

            <p className="text-gray-700 mb-2">
              <strong>ठेगाना:</strong> ज्वालामूखी ग्रामीण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बोर्ड, ज्वालामूखी, धादिङ
            </p>

            <p className="text-gray-700 mb-2">
              <strong>फोन:</strong> ९७७-९८४१०६४४६१
            </p>

            <p className="text-gray-700 mb-2">
              <strong>ईमेल:</strong> jwalamukhi.rwashmb@gmail.com
            </p>
          </div>
        </div>

        {/* RIGHT: Google Map */}
        <div className="w-full h-[600px] md:h-full rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.948650673394!2d84.989!3d27.7717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39bebc7bfbb8f7d3%3A0x98e93e4a5ed28bb7!2sJwalamukhi%20Rural%20Municipality!5e0!3m2!1sen!2snp!4v1700000000000"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          ></iframe>
        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
}
