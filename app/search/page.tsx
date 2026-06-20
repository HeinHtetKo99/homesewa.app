"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SearchItem {
  id: number;
  title: string;
  content: string;
  category: string;
  url: string;
}

const Search: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const performSearch = (searchTerm: string): void => {
    setLoading(true);

    const allContent: SearchItem[] = [
      // Home Page
      {
        id: 1,
        title: "Home - Welcome to Our Website",
        content:
          "Welcome to our website. Discover our services, meet our team, explore career opportunities, read latest notices and announcements. Find all the information you need about our company.",
        category: "Page",
        url: "/",
      },

      // About Page
      {
        id: 2,
        title: "About Us - Our Story",
        content:
          "Learn about our company history, mission, vision, and values. We are committed to excellence and innovation. Our journey started with a passion to deliver the best services to our clients.",
        category: "Page",
        url: "/about",
      },

      // Services
      {
        id: 3,
        title: "Our Services",
        content:
          "Professional services including web development, mobile app development, consulting, digital solutions, SEO optimization, UI/UX design, cloud services, and IT consulting.",
        category: "Services",
        url: "/services",
      },
      {
        id: 4,
        title: "Web Development Services",
        content:
          "Custom web development using React, JavaScript, Node.js, and modern technologies. Responsive design, fast performance, and user-friendly interfaces.",
        category: "Services",
        url: "/services",
      },
      {
        id: 5,
        title: "Mobile App Development",
        content:
          "iOS and Android mobile application development. Native and cross-platform solutions using React Native and Flutter.",
        category: "Services",
        url: "/services",
      },

      // Contact
      {
        id: 6,
        title: "Contact Us",
        content:
          "Get in touch with us. Email, phone, address, contact form. We are here to help and answer any questions you may have. Customer support available.",
        category: "Page",
        url: "/contact",
      },

      // Team
      {
        id: 7,
        title: "Our Team - Meet the Experts",
        content:
          "Meet our amazing team of professionals, developers, designers, managers, and consultants dedicated to delivering the best results. Experienced professionals passionate about technology.",
        category: "Page",
        url: "/team",
      },

      // Career
      {
        id: 8,
        title: "Careers - Join Our Team",
        content:
          "Join our team and grow your career. Job openings, internship opportunities, employee benefits, work culture, career growth, training programs. We offer exciting opportunities and great benefits.",
        category: "Page",
        url: "/career",
      },
      {
        id: 9,
        title: "Job Openings - Full Stack Developer",
        content:
          "Looking for experienced Full Stack Developer. Required skills: React, Node.js, MongoDB, JavaScript, TypeScript. Competitive salary and benefits.",
        category: "Job",
        url: "/career",
      },
      {
        id: 10,
        title: "Job Openings - UI/UX Designer",
        content:
          "Seeking creative UI/UX Designer. Skills needed: Figma, Adobe XD, user research, wireframing, prototyping. Portfolio required.",
        category: "Job",
        url: "/career",
      },

      // Notice
      {
        id: 11,
        title: "Latest Notices and Announcements",
        content:
          "Important announcements, company updates, news, events, holiday schedule. Stay informed with latest news and updates from our company.",
        category: "Page",
        url: "/notice",
      },
      {
        id: 12,
        title: "Office Holiday Notice",
        content:
          "Office will be closed on upcoming holidays. Holiday schedule, working hours, emergency contact information.",
        category: "Notice",
        url: "/notice",
      },
      {
        id: 13,
        title: "New Product Launch Announcement",
        content:
          "Exciting new product launch. Features, benefits, pricing, availability. Register for early access and special discounts.",
        category: "Notice",
        url: "/notice",
      },

      // Feedback
      {
        id: 14,
        title: "Customer Feedback",
        content:
          "We value your feedback and reviews. Share your thoughts, suggestions, complaints, testimonials. Help us improve our services and products.",
        category: "Page",
        url: "/feedback",
      },

      // Additional searchable content
      {
        id: 15,
        title: "Technologies We Use",
        content:
          "React, JavaScript, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, Bootstrap, Git, AWS, Docker, Python, Java.",
        category: "Technology",
        url: "/services",
      },
      {
        id: 16,
        title: "Client Testimonials",
        content:
          "Read what our clients say about us. Five star reviews, success stories, client satisfaction, quality service, professional team.",
        category: "Testimonial",
        url: "/feedback",
      },
      {
        id: 17,
        title: "Company Values and Culture",
        content:
          "Innovation, integrity, teamwork, customer focus, continuous learning, work-life balance, diversity and inclusion, sustainability.",
        category: "About",
        url: "/about",
      },
      {
        id: 18,
        title: "Support and Help Center",
        content:
          "FAQ, documentation, tutorials, guides, troubleshooting, technical support, customer service, help desk.",
        category: "Support",
        url: "/contact",
      },
    ];

    const searchLower = searchTerm.toLowerCase();

    const filtered = allContent.filter((item) =>
      item.title.toLowerCase().includes(searchLower) ||
      item.content.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower)
    );

    const sorted = filtered.sort((a, b) => {
      const aMatch = a.title.toLowerCase().includes(searchLower);
      const bMatch = b.title.toLowerCase().includes(searchLower);
      return Number(bMatch) - Number(aMatch);
    });

    setTimeout(() => {
      setResults(sorted);
      setLoading(false);
    }, 500);
  };

  const highlightText = (
    text: string,
    searchTerm: string | null
  ): React.ReactNode => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark
          key={index}
          className="bg-yellow-200 dark:bg-yellow-600 px-1"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold dark:text-white mb-6">
          Search Results
        </h1>

        {loading ? (
          <p className="text-center">Searching...</p>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {results.map((result) => (
              <Link
                key={result.id}
                href={result.url}
                className="block p-6 rounded-lg border hover:border-teal-500"
              >
                <span className="text-xs font-semibold text-teal-600">
                  {result.category}
                </span>

                <h2 className="text-2xl font-semibold mt-2">
                  {highlightText(result.title, query)}
                </h2>

                <p className="mt-2">
                  {highlightText(result.content, query)}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>No results found for "{query}"</p>
            <Link href="/" className="text-teal-600 mt-4 inline-block">
              Go Back Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
