'use client';

import React from "react";

const testimonials = [
  { name: "Yogendra Bikram", feedback: "RocketSingh provided excellent home cleaning. Every corner was spotless. The team was punctual and professional, making my home fresh and inviting.", image: "/testimonials/1.png" },
  { name: "Sunita Karki", feedback: "I hired RocketSingh for our office. Staff were professional and efficient, cleaning desks, floors, and windows meticulously. The office is now hygienic and welcoming.", image: "/testimonials/2.png" },
  { name: "Anita Koirala", feedback: "After renovation, RocketSingh handled post-construction cleaning perfectly, removing dust and sanitizing every corner. Highly satisfied and recommendable.", image: "/testimonials/3.png" },
  { name: "Sanjay Poudel", feedback: "RocketSingh exceeded expectations. They cleaned every corner with eco-friendly products. My house looks fresh, and I will hire them for regular maintenance.", image: "/testimonials/4.png" },
  { name: "Pritesh Shrestha", feedback: "Impressed with RocketSingh. Staff were attentive and diligent, leaving every space sparkling. Highly recommended for reliable home cleaning.", image: "/testimonials/5.png" },
  { name: "Bikram Poddar", feedback: "RocketSingh provided professional office cleaning. Their team was thorough and precise, leaving the workspace spotless and hygienic.", image: "/testimonials/6.png" },
  { name: "Manshi Koirala", feedback: "Affordable and professional. Every detail was attended to, making my home immaculate. Flexible service and hassle-free experience. Highly recommended.", image: "/testimonials/7.png" },
  { name: "Rajan Shahi", feedback: "The RocketSingh team did an outstanding office cleaning job. Efficient, thorough, and professional. Our office now looks pristine.", image: "/testimonials/8.png" },
  { name: "Sameer Basnet", feedback: "RocketSingh exceeded expectations. Arrived on time, used eco-friendly products, and cleaned every area meticulously. Home feels fresh and organized.", image: "/testimonials/9.png" },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-teal-50 via-white to-teal-50">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-teal-900 mb-4">What Our Clients Say</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Trusted by homes, offices, hotels, and institutions across Chennai and India.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center flex flex-col items-center border border-teal-100"
          >
            <div className="w-24 h-24 mb-4 rounded-full overflow-hidden shadow-md ring-4 ring-teal-100">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-gray-700 mb-4 italic leading-relaxed">&ldquo;{t.feedback}&rdquo;</p>
            <h4 className="font-bold text-teal-800 text-lg">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
