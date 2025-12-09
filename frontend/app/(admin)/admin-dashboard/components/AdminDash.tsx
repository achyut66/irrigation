"use client";
import Image from "next/image";

export default function AdminDashboard() {
  return (
    <>
    <div className="relative min-h-full min-w-full flex flex-col items-center justify-center p-6 overflow-y-auto">

    {/* BACKGROUND IMAGE (Watermark Style) */}
    {/* <div
      className="absolute w-300 inset-0 bg-cover bg-center bg-no-repeat opacity-20"
      style={{ backgroundImage: "url('/images/facebook.jpg')" }}
    ></div>
   */}
    {/* CONTENT (kept above background) */}
    <div className="relative z-10 flex flex-col items-center text-center">
  
        {/* LOGO */}
        <Image
          src="/images/logo.png"
          width={170}
          height={170}
          alt="Logo"
          className="mb-3"
        />

        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
            ज्वालामूखी ग्रामीण खानेपानी,
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mt-2">
            सरसफाई तथा स्वच्छता व्यवस्थापन बोर्ड
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mt-2">
            ज्वालामुखी, धादिंग
          </p>
        </div>

      </div>
  </div>
</>
  
  );
}
