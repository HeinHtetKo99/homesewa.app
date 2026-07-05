"use client";

import Link from "next/link";
import React, { useState } from "react";
import { bookUrlForServiceSlug } from "@/lib/service-booking-map";

export type ServiceFaq = {
  id: number;
  question: string;
  answer: string;
};

export type ServiceScopeItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type ServicePageLayoutProps = {
  serviceName: string;
  serviceSlug?: string;
  heroImage: string;
  heroTitle: string;
  heroDescription: string;
  bookLabel: string;
  introTitle: string;
  introParagraphs: string[];
  scopeTitle?: string;
  scopeItems?: ServiceScopeItem[];
  faqs: ServiceFaq[];
};

export default function ServicePageLayout({
  serviceName,
  serviceSlug,
  heroImage,
  heroTitle,
  heroDescription,
  bookLabel,
  introTitle,
  introParagraphs,
  scopeTitle = "Scope of Works",
  scopeItems = [],
  faqs,
}: ServicePageLayoutProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <section className="relative flex w-full items-center justify-center text-white">
        <img
          src={heroImage}
          alt={heroTitle}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-black/60" />
        <div className="relative z-20 w-full max-w-4xl px-4 py-8 text-center sm:px-6 sm:py-12 lg:py-14">
          <div className="mb-3 flex w-full items-center justify-center text-xs text-white/90 sm:mb-4 sm:text-sm">
            Home &gt; Services &gt;{" "}
            <span className="ml-1 font-semibold">{serviceName}</span>
          </div>
          <h1 className="mb-3 text-2xl font-bold leading-tight text-white sm:mb-4 sm:text-4xl lg:text-[52px]">
            {heroTitle}
          </h1>
          <p className="mx-auto mb-6 max-w-3xl text-sm leading-relaxed text-white sm:text-base md:text-lg">
            {heroDescription}
          </p>
          <Link href={serviceSlug ? bookUrlForServiceSlug(serviceSlug) : "/book"}>
            <button className="rounded-lg bg-[#0E4541] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-900 sm:px-6 sm:py-3 sm:text-base">
              {bookLabel}
            </button>
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pt-6 pb-6 text-center sm:px-6 sm:pt-8">
        <h2 className="mb-4 text-2xl font-bold text-teal-900 sm:text-3xl">
          {introTitle}
        </h2>
        <div className="space-y-4 text-left sm:text-center">
          {introParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm leading-relaxed text-gray-700 sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {scopeItems.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-4 pt-2 pb-6 sm:px-6 sm:pb-8">
          <h2 className="mb-5 text-center text-2xl font-bold text-teal-900 sm:mb-6 sm:text-3xl">
            {scopeTitle}
          </h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {scopeItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 text-center shadow-md sm:p-5"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="mb-3 h-40 w-full rounded-lg object-cover sm:mb-4 sm:h-48"
                />
                <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-4xl px-4 pt-2 pb-4 sm:px-6">
        <h2 className="mb-5 text-center text-2xl font-bold text-teal-800 sm:mb-6 sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(faq.id)}
                className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 sm:px-5 sm:py-4 sm:text-base"
              >
                <span className="min-w-0 flex-1">{faq.question}</span>
                <span className="shrink-0 text-lg leading-none text-gray-500">
                  {openFAQ === faq.id ? "–" : "+"}
                </span>
              </button>
              {openFAQ === faq.id && (
                <div className="border-t border-gray-200 px-4 py-3.5 text-sm leading-relaxed text-gray-700 sm:px-5 sm:py-4 sm:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
