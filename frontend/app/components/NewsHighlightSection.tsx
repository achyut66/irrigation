"use client";

import Link from "next/link";

export default function NewsHighlightSection() {
  const highlights = [
    {
      id: 1,
      title: "नाम परिवर्तन तथा स्थानान्तर भएका आयोजना कार्यालयमा कामकाजमा खटाइएको ।",
      date: "३० असोज, २०८२",
      link: "/content/170/the-project-s-office-has-been-assigned-to/",
    },
    {
      id: 2,
      title: "कामकाजमा खटाइएको सम्बन्धमा (सरुवा)",
      date: "३० असोज, २०८२",
      link: "/content/169/in-relation-to-the-relationship-assigned-to/",
    },
    {
      id: 3,
      title:
        "MMOB/SQ/GOODS/01/2082-83 - मालसामान खरिद सम्बन्धी सिलबन्दी दरभाउपत्र आह्वानको सूचना",
      date: "२२ भदौ, २०८२",
      link: "/content/168/mmob-sq-goods-01-2082-83--/",
    },
    {
      id: 4,
      title:
        "सूचनाको हक सम्बन्धी ऐन, २०६४ अनुसार प्रस्तुत गरिएको सार्वजनिक विवरण",
      date: "८ साउन, २०८२",
      link: "/content/112/magh-chatrya-2081/",
    },
    {
      id: 5,
      title: "सिँचाइ सेमिनार २०८२ - पोस्टर प्रस्तुतीकरण",
      date: "८ साउन, २०८२",
      link: "/content/113/irrigation-seminar-2082---poster-presentation/",
    },
    {
      id: 6,
      title: "सिँचाइ वार्षिक पुस्तिका, आ.ब.२०८०/८१",
      date: "८ साउन, २०८२",
      link: "/content/29/irrigation-annual-book--a-b-2080---81/",
    },
  ];

  const latestNews = [
    {
      id: 1,
      title: "राष्ट्रिय सिँचाइ गोष्ठी कार्यवाही, २०८२",
      pdf: "https://giwmscdnone.gov.np/media/pdf_upload/Seminar%20book_qubg2ov.pdf",
      link: "/content/167/national-irrigation-conflicts-act--2082/",
    },
    {
      id: 2,
      title: "कन्टिन्जेन्सी रकम खर्च गर्ने सम्बन्धि कार्यविधि, २०८१",
      pdf: "https://giwmscdnone.gov.np/media/pdf_upload/%E0%A4%95%E0%A4%A8%E0%A5%8D%E0%A4%9F%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%9C%E0%A5%87%E0%A4%A8%E0%A5%8D%E0%A4%B8%E0%A5%80_2081_yazeovo.pdf",
      link: "/content/5/act--2081-relating-to-expenditure-of-contingency/",
    },
    {
      id: 3,
      title:
        "मतादाता नामावली संकलन तथा अद्यावधिक कार्य कार्तिक ३० गते सम्म रहेको व्यहोरा",
      date: "२५ कात्तिक, २०८२",
      link: "/content/174/voter-list/",
    },
  ];

  return (
    <section className="py-12 bg-[#F4F8FF]">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">

        {/* LEFT — Highlights */}
        <div>
          <h4 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3 text-gray-400">
            <a href="/category/highlights-content">हाइलाइटहरू</a>
          </h4>

          <div className="space-y-5">
            {highlights.map((item) => (
              <div
                key={item.id}
                className="border-l-4 border-blue-600 pb-3 hover:bg-blue-50 px-2 rounded transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                  <a href={item.link}>{item.title}</a>
                </h3>
                <div className="text-sm text-gray-600 mt-1">{item.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Latest News */}
        <div>
          <h4 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3 text-gray-400">
            <a href="javascript:void(0);">ताजा समाचार</a>
          </h4>

          <div className="space-y-6">
            {latestNews.map((news) => (
              <div
                key={news.id}
                className="border rounded-lg p-4 bg-gray-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex gap-4">

                  {/* Removed IMAGE — Added placeholder box */}
                  <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-xs text-gray-600 border">
                    No Image
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                      <a href={news.link}>{news.title}</a>
                    </h3>
                    {news.date && (
                      <p className="text-sm text-gray-600 mt-1">{news.date}</p>
                    )}
                  </div>
                </div>

                {/* PDF Button */}
                {news.pdf && (
                  <div className="mt-3">
                    <a
                      href={news.pdf}
                      className="inline-block bg-blue-600 text-white px-4 py-1.5 text-sm rounded hover:bg-blue-700 transition"
                    >
                      📥 डाउनलोड
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
