"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
// import {}

/* ---------------------- Small Excel SVG Icon ---------------------- */
function ExcelIcon({ className = "inline-block" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="1" y="1" width="22" height="22" rx="3" fill="#217346"/>
      <path d="M6 6h7v4H6z" fill="#fff" opacity="0.15" />
      <path d="M7 9h5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12l3 3 3-3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
// end
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // example: http://localhost:8000

export default function PratibedanPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/report`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          setReports(data.data);
        }
      })
      .catch((err) => console.error("Report fetch error:", err));
  }, []);

  // Filter reports from last 5 days
  const recentReports = reports.filter((report: any) => {
    const created = new Date(report.created_at);
    const now = new Date();
    const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 5;
  });

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 py-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 text-left mb-12">
          <h1 className="text-3xl text-gray-600 md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3">
            योजना तथा कार्यक्रम (प्रतिवेदन)
          </h1>
          <p className="text-gray-700 text-lg">
            ज्वालामुखी ग्रामिण खानेपानी बोर्डमा सम्पन्न विभिन्न कार्यक्रम, परियोजना तथा अन्य
            अध्ययन प्रतिवेदनहरू ।
          </p>
        </div>

        {/* All Reports Section */}
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 mb-16 max-w-7xl">
          {reports.length === 0 && (
            <p className="text-gray-500 text-center col-span-2">कुनै प्रतिवेदन उपलब्ध छैन ।</p>
          )}

          {reports.map((report: any) => (
            <div
              key={report.id}
              className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row gap-4 hover:shadow-lg transition-all"
            >
              {/* Excel Icon */}
              <div className="w-32 h-32 flex items-center justify-center bg-green-50 rounded-lg">
                <ExcelIcon className="w-20 h-20" />
              </div>
            

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-600 mb-2 hover:text-blue-500 hover:underline">
                  {report.title}
                </h3>

                <button
                  onClick={() => window.open(report.file_url, "_blank")}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  डाउनलोड गर्नुहोस्
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Reports (Last 5 Days) */}
        <div className="max-w-5xl mx-auto px-4 mb-20 max-w-7xl">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">
            अन्य प्रकाशित प्रतिवेदनहरू
          </h2>

          {recentReports.length === 0 ? (
            <p className="text-gray-500">हालसालै प्रकाशित प्रतिवेदन उपलब्ध छैन ।</p>
          ) : (
            <ul className="space-y-4 text-gray-800">
              {recentReports.map((report: any) => (
                <li
                  key={report.id}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer flex justify-between items-center"
                >
                  ✔ {report.title}

                  <button
                    onClick={() => window.open(report.file_url, "_blank")}
                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    डाउनलोड
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
