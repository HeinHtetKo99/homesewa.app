"use client";

import React, { useState } from "react";

const sections = {
  mission: {
    title: "Our Mission",
    desc: "To simplify access to reliable home services by leveraging AI, real-time technology, and trusted local professionals, delivering fast, convenient, and transparent solutions while empowering service providers to increase their income and grow sustainably.",
  },
  goals: {
    title: "Our Goals",
    desc: "HomeSewa aims to provide fast, reliable, and hassle-free home services across Nepal by building a nationwide network of verified and skilled service professionals. Through the use of AI and automation, the platform seeks to optimize service matching and enhance customer satisfaction.",
  },
  vision: {
    title: "Our Vision",
    desc: "To become Nepal's most trusted and innovative on-demand home service platform, transforming how households connect with skilled professionals through AI based technology, automation, and exceptional customer experiences with no middleman in between.",
  },
};

const values = [
  {
    title: "Safety",
    desc: "All services are performed following strict safety protocols to protect clients, technicians, and property while maintaining secure and well-organized work environments.",
    icon: (
      <svg className="w-8 h-8 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Community",
    desc: "We support communities by providing honest services, generating employment opportunities, and building strong relationships based on trust and mutual respect.",
    icon: (
      <svg className="w-8 h-8 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Sustainability",
    desc: "Our work focuses on eco-friendly products, minimizing waste, and applying responsible practices that support environmental balance and long-term efficiency.",
    icon: (
      <svg className="w-8 h-8 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    desc: "We operate with transparency and honesty, ensuring fair pricing, clear communication, and ethical service delivery without compromises or hidden conditions.",
    icon: (
      <svg className="w-8 h-8 text-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function About() {
  const [activeSection, setActiveSection] = useState("mission");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-b from-white via-teal-50 to-white py-20 px-6 sm:px-12 lg:px-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-900 mb-4 tracking-wide">About Us</h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            HomeSewa is Nepal’s superfast, on-demand home service platform, designed to instantly connect customers with trusted, verified professionals nearby. Powered by advanced AI-driven matching, HomeSewa ensures that service requests are matched with the right professionals quickly and efficiently.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {Object.keys(sections).map((key) => (
              <div
                key={key}
                className="group"
                onMouseEnter={() => setActiveSection(key)}
                onMouseLeave={() => setActiveSection("")}
              >
                <button
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg cursor-pointer ${
                    activeSection === key
                      ? "bg-[#0E4541] text-white shadow-xl"
                      : "bg-white border border-teal-100 text-teal-900 hover:border-teal-200 hover:shadow-md"
                  }`}
                >
                  {sections[key as keyof typeof sections].title}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-[2200ms] ease-out ${
                    activeSection === key ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 border-l-4 border-teal-600 pl-6 bg-white rounded-r-2xl shadow-sm py-5 px-6">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      {sections[key as keyof typeof sections].desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <img
                src="/about/about.png"
                alt="About HomeSewa"
                className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-8 border-white transition-all duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-24 text-center">
          <h2 className="text-3xl font-bold text-teal-800 mb-6">Internationally Trusted Standards</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-12">
            HomeSewa follows globally recognized standards to ensure safety, responsibility, and professionalism in every service we deliver.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-teal-100 rounded-2xl shadow-lg p-6 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4">{v.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-900">Message from the Director</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-teal-100">
          <img src="/about/director.png" alt="Ramesh Koirala" className="w-40 h-40 rounded-full object-cover shrink-0" />
          <div className="flex-1">
            <p className="text-gray-700 mb-4 leading-relaxed">
              &ldquo;At HomeSewa, our vision is to create cleaner, healthier living and working spaces for every client.
              Our team is committed to excellence, and we continually invest in training and modern equipment to ensure
              you receive the best service possible. Your satisfaction is our top priority.&rdquo;
            </p>
            <p className="font-semibold text-gray-800">– Ramesh Koirala, Director</p>
            <a href="https://www.linkedin.com/in/koiralaramesh/" target="_blank" rel="noopener noreferrer" className="inline-block mt-3">
              <img src="/icons/linkedin.svg" className="w-5 h-5 hover:opacity-75" alt="LinkedIn Profile" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
