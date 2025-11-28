"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#0B2A4A] text-white mt-10 pt-10">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT — Logo & Office Info */}
         {/* LEFT — Logo & Office Info */}
            <div>
            <div className="flex gap-3 items-center">   {/* UPDATED */}
                <div className="relative w-28 h-28 flex-shrink-0">  {/* UPDATED SIZE */}
                <Image
                    src="/images/Nepalg.png"
                    alt="Nepal Emblem"
                    fill
                    className="object-contain"
                />
                </div>

                <div>
                <p className="text-sm leading-tight">
                    ज्वालामुखी ग्रामिण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बोर्ड
                </p>
                <h4 className="text-lg font-bold leading-tight">
                    जलस्रोत तथा सिँचाइ विभाग
                </h4>
                <p className="text-sm mt-1 leading-tight">ज्वालामुखी, धादिंग</p>
                </div>
            </div>

            {/* Social Icons Under Logo */}
            <div className="flex gap-4 text-2xl mt-4 pl-1">
                <Link href="https://facebook.com" className="hover:text-blue-300">
                <FaFacebookF />
                </Link>

                <Link href="https://instagram.com" className="hover:text-blue-300">
                <FaInstagram />
                </Link>

                <Link href="https://youtube.com" className="hover:text-blue-300">
                <FaYoutube />
                </Link>

                <Link href="mailto:support@jwalamukhi.gov.np" className="hover:text-blue-300">
                <FaEnvelope />
                </Link>
            </div>
            </div>


          {/* MIDDLE — Office Hours */}
          <div>
            <h4 className="text-lg font-semibold border-b border-gray-400 pb-1">
              कार्यालय समय
            </h4>

            <div className="mt-3">
              <h5 className="font-semibold">जाडो (कार्तिक १६ – माघ १५)</h5>

              <div className="flex justify-between text-sm mt-1">
                <span>आइतबार – बिहीबार</span>
                <span>१०:०० – ०४:००</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>शुक्रबार</span>
                <span>१०:०० – ०३:००</span>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="font-semibold">गर्मी (माघ १६ – कार्तिक १५)</h5>

              <div className="flex justify-between text-sm mt-1">
                <span>आइतबार – बिहीबार</span>
                <span>१०:०० – ०५:००</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>शुक्रबार</span>
                <span>१०:०० – ०३:००</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Important Links */}
          <div>
            <h4 className="text-lg font-semibold border-b border-gray-400 pb-1">
              महत्त्वपूर्ण लिङ्कहरू
            </h4>

            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="https://moewri.gov.np" className="hover:text-blue-300">
                ऊर्जा, जलस्रोत तथा सिंचाइ मन्त्रालय
              </a></li>

              <li><a href="https://mof.gov.np/" className="hover:text-blue-300">
                अर्थ मन्त्रालय
              </a></li>

              <li><a href="https://www.opmcm.gov.np/" className="hover:text-blue-300">
                प्रधानमन्त्री तथा मन्त्रिपरिषद्को कार्यालय
              </a></li>

              <li><a href="https://npc.gov.np/" className="hover:text-blue-300">
                राष्ट्रिय योजना आयोग
              </a></li>

              <li><a href="http://www.wecs.gov.np/" className="hover:text-blue-300">
                जल तथा ऊर्जा आयोग सचिवालय
              </a></li>

              <li><a href="https://www.dhm.gov.np/" className="hover:text-blue-300">
                जल तथा मौसम विज्ञान विभाग
              </a></li>

              <li><a href="https://ciaa.gov.np/" className="hover:text-blue-300">
                अख्तियार दुरुपयोग अनुसन्धान आयोग
              </a></li>

              <li><a href="http://rajpatra.dop.gov.np/" className="hover:text-blue-300">
                नेपाल राजपत्र
              </a></li>
            </ul>
          </div>
        </div>

        {/* Contact Bottom Section */}
        <div className="mt-10 border-t border-gray-600 pt-5 flex flex-col md:flex-row justify-between gap-5">
          <ul className="text-sm space-y-1">
            <li className="flex gap-2">📍 ज्वालामुखी, धादिंग</li>
            <li className="flex gap-2">✉ support@jwalamukhi.gov.np</li>
          </ul>
        </div>

        <div className="text-center text-xs text-gray-400 mt-6 pb-4">
          © {new Date().getFullYear()} ज्वालामुखी ग्रामिण खानेपानी, सरसफाई तथा स्वच्छता व्यवस्थापन बोर्ड।
        </div>
      </div>
    </footer>
  );
}
