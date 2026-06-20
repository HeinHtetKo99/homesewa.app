"use client";

import ServiceCard from "../../components/ServiceCard";
import { serviceCategories } from "../data/servicesCatalog";

export default function ServicesPage() {
  return (
    <div className="bg-gradient-to-b from-white via-teal-50 to-white text-gray-800">
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-0">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-teal-900">Our Services</h1>
            <p className="text-gray-700 mt-4">Complete on-demand home services platform.</p>
          </div>

          {serviceCategories.map((category, index) => (
            <section key={category.title}>
              <h2 className="text-3xl font-bold text-center mb-10">{category.title}</h2>
              <div
                className={`grid gap-10 sm:grid-cols-2 lg:grid-cols-3 ${
                  index < serviceCategories.length - 1 ? "mb-20" : ""
                }`}
              >
                {category.services.map((service) => (
                  <ServiceCard
                    key={service.slug}
                    image={service.image}
                    title={service.title}
                    desc={service.desc}
                    href={`/services/${service.slug}`}
                    showLearnMore={true}
                    bookButtonVariant="outline"
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
