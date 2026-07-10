'use client';
import React, { useState } from 'react';
import Ribbon from '../../components/Ribbon';
import JsonLd from '../../components/JsonLd';

export default function Faq() {
  const faqs = [
    { id: 1, question: "When was HomeSewa established?", answer: "HomeSewa was founded on June 14, 2018, in Kathmandu, Nepal." },
    { id: 2, question: "Where is HomeSewa located?", answer: "Kamalpokhari, Kathmandu, Nepal." },
    { id: 3, question: "Does HomeSewa have a mobile app?", answer: "Yes, HomeSewa has a dedicated mobile app for service booking and management." },
    { id: 4, question: "Which industries does HomeSewa serve?", answer: "We serve residential, commercial, healthcare, hospitality, and tourism sectors in Kathmandu and nearby regions." },
    { id: 5, question: "Who leads the technology team?", answer: "A group of industry experts leads of HomeSewa." },
    { id: 6, question: "What makes HomeSewa unique?", answer: "We offer professional, customized, and eco-friendly cleaning solutions with modern technology support." },
    { id: 7, question: "Difference between deep cleaning and regular cleaning?", answer: "Regular cleaning maintains cleanliness, while deep cleaning involves thorough sanitization of hard-to-reach areas." },
    { id: 8, question: "What services are included in commercial cleaning?", answer: "Office cleaning, floor maintenance, window washing, restroom sanitation, and facility upkeep." },
    { id: 9, question: "Does HomeSewa provide residential cleaning?", answer: "Yes, including full house cleaning, kitchen, bathroom, living areas, and carpet/floor treatment." },
    { id: 10, question: "Is eco-friendly cleaning available?", answer: "Absolutely, we use environmentally safe products for both residential and commercial spaces." },
    { id: 11, question: "Does HomeSewa handle events and post-event cleaning?", answer: "Yes, we manage pre-event setup cleaning and post-event deep cleaning services." },
    { id: 12, question: "How can I book a cleaning service?", answer: "You can book via our website, mobile app, or by contacting our office in Kathmandu." },
    { id: 13, question: "Does HomeSewa offer emergency cleaning services?", answer: "Yes, urgent cleaning requests can be accommodated on the same day depending on availability." },
    { id: 14, question: "Are the cleaning staff trained?", answer: "All cleaning personnel undergo professional training and background verification." },
    { id: 15, question: "Do you provide specialized healthcare facility cleaning?", answer: "Yes, we follow strict hygiene protocols for hospitals, clinics, and labs." },
    { id: 16, question: "Does HomeSewa offer ongoing maintenance contracts?", answer: "Yes, businesses can opt for weekly, bi-weekly, or monthly maintenance packages." },
    { id: 17, question: "What are the charges for cleaning services?", answer: "Pricing depends on service type, area, and frequency. Contact us for a detailed quote." },
    { id: 18, question: "Who are some of HomeSewa’s notable clients?", answer: "Clients include hospitals, hotels, offices, schools, and residential societies across Kathmandu." },
    { id: 21, question: "Are cleaning products provided by HomeSewa?", answer: "Yes, we supply all necessary eco-friendly cleaning products and equipment." },
    { id: 22, question: "Is HomeSewa insured?", answer: "Yes, we maintain comprehensive insurance coverage for staff and property during service." },
    { id: 23, question: "Can HomeSewa handle large commercial projects?", answer: "Yes, our team is equipped for large-scale office complexes, hotels, and event venues." },
    { id: 24, question: "How do I provide feedback after a service?", answer: "Feedback can be submitted via our website, app, or directly to support@HomeSewa.app." },
  ];

  const faq1 = faqs.slice(0, Math.ceil(faqs.length / 2));
  const faq2 = faqs.slice(Math.ceil(faqs.length / 2));

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className='footer'>
      <JsonLd data={faqJsonLd} />
      {/* Ribbon/Header */}
      <Ribbon name="Frequently Asked Questions" showfont={false}/>

      <div className="px-5 py-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Column */}
          <div className='w-full lg:w-1/2 space-y-3'>
            {faq1.map((faq) => (
              <div key={faq.id} className="rounded-md overflow-hidden group border-none">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center py-5 px-6 transition card text2"
                >
                  <h2 className="text-md font-semibold">{faq.question}</h2>
                  <span className="text-2xl font-bold">
                    {openIndex === faq.id ? 
                      <div className='w-[15px] h-0.5 rounded-full bg-black'></div> 
                      : <img src='/icons/plus.svg' alt='' className='w-[19px] h-[19px]' />
                    }
                  </span>
                </button>

                <div className={`transition-all duration-300 ease-in-out overflow-hidden card2 ${openIndex === faq.id ? 'max-h-96 opacity-100 translate-y-0 p-6' : 'max-h-0 opacity-0'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className='w-full lg:w-1/2 space-y-3'>
            {faq2.map((faq) => (
              <div key={faq.id} className="rounded-md overflow-hidden group border-none">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center py-5 px-6 transition card text2"
                >
                  <h2 className="text-md font-semibold">{faq.question}</h2>
                  <span className="text-2xl font-bold">
                    {openIndex === faq.id ? 
                      <div className='w-[15px] h-0.5 rounded-full bg-black'></div> 
                      : <img src='/icons/plus.svg' alt='' className='w-[19px] h-[19px]' />
                    }
                  </span>
                </button>

                <div className={`transition-all duration-300 ease-in-out overflow-hidden card2 ${openIndex === faq.id ? 'max-h-96 opacity-100 translate-y-0 p-6' : 'max-h-0 opacity-0'}`}>
                  {faq.id === 24 ? (
                    <>Feedback can be submitted via our website, app, or directly to <a href="mailto:support@HomeSewa.app" className="underline">support@HomeSewa.app</a>.</>
                  ) : faq.answer}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}