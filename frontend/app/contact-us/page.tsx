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
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-12">

      <h1 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-blue-600 pl-3">
        सम्पर्क गर्नुहोस्
      </h1>

      <div className="grid md:grid-cols-2 gap-10 mt-10">

        {/* LEFT: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 md:p-10 h-fit"
        >
          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">पुरा नाम</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="तपाईंको नाम"
              required
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">ईमेल</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">फोन नम्बर</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">संदेश</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="यहाँ आफ्नो संदेश लेख्नुहोस्..."
              rows={4}
              required
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            पठाउनुहोस्
          </button>

          {/* Contact Info */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-3">सम्पर्क विवरण</h2>
            <p className="text-gray-700 mb-2">
              <strong>ठेगाना:</strong> ज्वालामुखी गाउँपालिका, धादिङ
            </p>
            <p className="text-gray-700 mb-2">
              <strong>फोन:</strong> 010-1234567
            </p>
            <p className="text-gray-700 mb-2">
              <strong>ईमेल:</strong> info@jwalamukhigaupalika.gov.np
            </p>
          </div>
        </form>

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
