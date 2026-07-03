import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Company Timeline",
  description:
    "Explore HomeSewa's journey from our founding in 2018 to becoming a leading on-demand home services platform in Nepal.",
  path: "/timeline",
});

export default function Timeline() {

  const events = [
    {
      year: "2018",
      title: "Company Founded",
      description: "HomeSewa was established in Kathmandu with a mission to provide reliable and professional cleaning services for homes and businesses.",
    },
    {
      year: "2019",
      title: "Initial Service Launch",
      description: "Started core services including home cleaning, office cleaning, and basic sanitation services, building trust among early customers.",
    },
    {
      year: "2020",
      title: "Service Expansion",
      description: "Expanded into deep cleaning, post-construction cleaning, and move-in/move-out services to meet growing market demand.",
    },
    {
      year: "2021",
      title: "Commercial Projects",
      description: "Successfully handled large-scale commercial cleaning projects for offices, apartments, and business complexes across Kathmandu.",
    },
    {
      year: "2022",
      title: "Team Growth",
      description: "Expanded the workforce with trained professionals and introduced structured training programs to improve service quality and consistency.",
    },
    {
      year: "2023",
      title: "Equipment Upgrade",
      description: "Invested in modern cleaning tools, machinery, and eco-friendly products to enhance efficiency and safety standards.",
    },
    {
      year: "2024",
      title: "Digital Transformation",
      description: "Launched online booking, customer management systems, and improved service tracking for a better client experience.",
    },
    {
      year: "2025",
      title: "Brand Strengthening",
      description: "Strengthened brand presence across Kathmandu through digital marketing, partnerships, and consistent service excellence.",
    },
    {
      year: "2026",
      title: "Innovation & Future Growth",
      description: "Focused on smart cleaning solutions, eco-friendly practices, and expanding services to new cities across Nepal.",
    },
  ];

  return (
    <div>
      {/* Header */}
      

      {/* Timeline Container */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 relative">

        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-16 bottom-16 md:-translate-x-1/2 w-1 bg-teal-600 rounded-full"></div>

        {/* Timeline Items */}
        <div className="space-y-10 md:space-y-16 mt-16 md:mt-24">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={index} className="relative flex items-start md:items-center">

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 border-2 header rounded-full shadow-md bg-white"></div>

                {/* Card */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 px-4 md:px-0
                  ${isLeft ? "md:pr-12 md:mr-auto" : "md:pl-12 md:ml-auto"}`}
                >
                  <div className="rounded-xl shadow-lg p-5 md:p-6 border card hover:shadow-xl transition-all">
                    <span className="text-sm font-semibold">
                      {event.year}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold mt-1">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      <div className="h-24"></div>
    </div>
  );
}