"use client";

import React, { useState } from "react";

const sections = {
  about: {
    title: "About RocketSingh",
    desc: "RocketSingh is an A-grade professional cleaning company delivering solutions for home cleaning, office sanitization, carpet care, AC cleaning, and post-construction cleanup with consistent quality and dependable service standards.",
  },
  mission: {
    title: "Our Mission",
    desc: "Our mission is to offer complete cleaning and facility care services under one trusted platform, eliminating the need to search multiple providers for different household and commercial requirements.",
  },
  goals: {
    title: "Our Goals",
    desc: "We aim to simplify everyday maintenance by delivering efficient deep cleaning, sanitization, and facility care that enhance comfort, hygiene, and long-term value for every client across India.",
  },
  vision: {
    title: "Our Vision",
    desc: "Our vision is to build a trusted cleaning brand recognized for professionalism, accessibility, and service excellence through long-term client relationships and consistent work quality.",
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
  const [activeSection, setActiveSection] = useState("about");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-b from-white via-teal-50 to-white py-20 px-6 sm:px-12 lg:px-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-900 mb-4 tracking-wide">About Us</h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            Deep cleaning, AC sanitization, and post-construction cleanup require not only effort but skill.
            That&apos;s where our team comes in — to take the burden off your shoulders.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {Object.keys(sections).map((key) => (
              <div key={key} className="relative">
                <button
                  onMouseEnter={() => setActiveSection(key)}
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left px-5 py-3 rounded-lg transition-all duration-300 font-semibold text-lg ${
                    activeSection === key
                      ? "bg-gradient-to-r from-teal-800 via-teal-700 to-teal-600 text-white shadow-md"
                      : "bg-white border border-teal-100 text-teal-900 hover:bg-teal-50"
                  }`}
                >
                  {sections[key as keyof typeof sections].title}
                </button>
                {activeSection === key && (
                  <div className="mt-3 ml-2 border-l-4 border-teal-500 pl-4 bg-white rounded-r-xl shadow-sm py-3 px-2 animate-fadeIn">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      {sections[key as keyof typeof sections].desc}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <img
              src="/about/about.png"
              alt="About RocketSingh"
              className="rounded-2xl shadow-xl w-full max-w-md object-cover border-4 border-teal-100"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-24 text-center">
          <h2 className="text-3xl font-bold text-teal-800 mb-6">Internationally Trusted Standards</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-12">
            RocketSingh follows globally recognized standards to ensure safety, responsibility, and professionalism in every service we deliver.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-left hover:shadow-md transition">
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
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white rounded-2xl shadow-md p-8 border border-teal-50">
          <img src="/about/director.png" alt="Ramesh Koirala" className="w-40 h-40 rounded-full object-cover shrink-0" />
          <div className="flex-1">
            <p className="text-gray-700 mb-4 leading-relaxed">
              &ldquo;At RocketSingh, our vision is to create cleaner, healthier living and working spaces for every client.
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

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-in-out; }
      `}</style>
    </main>
  );
}
