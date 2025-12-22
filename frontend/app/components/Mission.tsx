export default function MissionSection() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-20">
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
             ध्येय (Mission)
            </h3>
            <p className="relative text-gray-700 mb-6 line-clamp-3">
            “एक घर, एक धारा” अवधारणामा आधारित खानेपानी आयोजनाहरूको दिगो निर्माण, विस्तार तथा
            प्रभावकारी व्यवस्थापनमार्फत सुरक्षित र पर्याप्त खानेपानी, सरसफाइ तथा स्वच्छता सेवा सुनिश्चित गर्नु।
            </p>

            {/* Vision */}
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
            परिकल्पना (Vision)
            </h3>
            <p className="relative text-gray-700 mb-6 line-clamp-3">
            ज्वालामुखी गाउँपालिकाभित्र सबै नागरिकका लागि सहज, सुरक्षित र गुणस्तरीय खानेपानी, सरसफाइ तथा
            स्वच्छता सेवाको दिगो सुनिश्चितता ।
            </p>

            {/* Goal */}
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
            लक्ष्य (Goal)
            </h3>
            <p className="relative text-gray-700 mb-8 line-clamp-3">
            गाउँपालिकाभित्रका सबै नागरिकलाई सुरक्षित, पर्याप्त र गुणस्तरीय खानेपानी सेवा सुनिश्चित गर्नु।
            </p>

            {/* Button */}
            <a
              href="/mission"
              className="inline-block bg-blue-600 !text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              See More
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
  