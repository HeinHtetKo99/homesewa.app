"use client";

import ServicePageLayout from "../../../components/ServicePageLayout";

export default function AcCleaning() {
  return (
    <ServicePageLayout
      serviceName="A/C Cleaning"
      serviceSlug="ac-services"
      heroImage="/services/ac-cleaning.jpg"
      heroTitle="Air Conditioner Cleaning Services in Kathmandu"
      heroDescription="Professional AC cleaning to remove dust, allergens, and bacteria, improving air quality and cooling efficiency for your home or office."
      bookLabel="Book AC Cleaning Service"
      introTitle="Professional AC Cleaning & Maintenance"
      introParagraphs={[
        "Dirty AC units circulate dust and reduce efficiency. HomeSewa provides comprehensive AC cleaning in Kathmandu including filter cleaning, coil maintenance, and duct sanitization.",
        "Regular AC maintenance extends your unit's life, lowers energy bills, and keeps indoor air healthy — we recommend servicing at least twice a year.",
      ]}
      scopeItems={[
        { title: "Filter Cleaning", description: "Remove dust and debris from filters to restore airflow and efficiency.", image: "/services/ac-cleaning.jpg", imageAlt: "AC Filter Cleaning" },
        { title: "Coil Maintenance", description: "Clean evaporator and condenser coils for optimal cooling performance.", image: "/services/ac-cleaning.jpg", imageAlt: "AC Coil Maintenance" },
        { title: "Duct Sanitization", description: "Sanitize air ducts to prevent mold and bacteria circulation.", image: "/services/air-duct-vent-cleaning.jpg", imageAlt: "Duct Sanitization" },
      ]}
      faqs={[
        { id: 1, question: "Why does AC maintenance matter?", answer: "Regular maintenance keeps energy bills low and extends your unit's life by 5–10 years while improving indoor air quality." },
        { id: 2, question: "How often should AC filters be cleaned?", answer: "During heavy use months, check filters every 2–4 weeks. A clean filter can reduce energy consumption by 5–15%." },
        { id: 3, question: "Do you service split and central AC units?", answer: "Yes, we service residential and commercial split, window, and central AC systems across Kathmandu and nearby regions." },
        { id: 4, question: "What warning signs need immediate attention?", answer: "Strange noises, unusual smells, uneven cooling, or higher electricity bills indicate your AC needs professional servicing." },
        { id: 5, question: "How can I book AC cleaning?", answer: "Book online through our website or contact HomeSewa for fast scheduling in Kathmandu." },
      ]}
    />
  );
}
