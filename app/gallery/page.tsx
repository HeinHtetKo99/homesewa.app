'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const captionTemplates = [
  "Professional deep cleaning delivering spotless floors and sanitized surfaces.",
  "Expert bathroom sanitization with eco-friendly products and thorough grout cleaning.",
  "Commercial office cleaning maintaining hygienic workspaces for staff and clients.",
  "Kitchen deep cleaning removing grease, grime, and bacteria from all surfaces.",
  "Carpet steam cleaning restoring freshness and removing embedded allergens.",
  "Post-construction cleanup making newly renovated spaces move-in ready.",
  "Hotel and hospitality cleaning meeting international hygiene standards.",
  "Hospital-grade disinfection for healthcare facilities across Kathmandu.",
  "Garden and outdoor space cleaning keeping landscapes neat and beautiful.",
  "AC cleaning and servicing improving air quality and cooling efficiency.",
  "Sofa and upholstery deep cleaning with fabric-safe professional methods.",
  "Move-in/move-out cleaning ensuring every corner is spotless for new occupants.",
  "Facade and exterior cleaning restoring building aesthetics and curb appeal.",
  "Event venue post-cleanup leaving spaces pristine after celebrations.",
  "Car interior detailing for luxury and everyday vehicles across Nepal.",
];

interface GalleryItem {
  id: number;
  imageUrl: string;
  altText: string;
  caption: string;
}

const cleaningProjects: GalleryItem[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  imageUrl: `/gallery/${i + 1}.jpg`,
  altText: `Cleaning project ${i + 1}`,
  caption: captionTemplates[i % captionTemplates.length],
}));

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="mb-40">
      <div className="h-[200px] bg-gray-100 flex flex-col items-center justify-center text-center px-6">
        <span className="text-gray-500">
          Home / <span className="text-teal-700 font-semibold">Gallery</span>
        </span>
        <h1 className="text-4xl font-bold text-teal-800 mt-2">Cleaning Projects</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          View our work quality across homes, offices, hotels, and commercial spaces in Nepal.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cleaningProjects.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-72 rounded-xl overflow-hidden shadow-md cursor-pointer group border border-teal-100"
              onClick={() => setSelectedImage(item)}
            >
              <Image src={item.imageUrl} alt={item.altText} fill className="object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute bottom-0 left-0 w-full px-4 py-3 bg-gradient-to-t from-teal-900/90 to-transparent text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl w-full p-4" onClick={(e) => e.stopPropagation()}>
            <Image src={selectedImage.imageUrl} alt={selectedImage.altText} width={1000} height={700} className="rounded-lg object-contain w-full h-auto" />
            <p className="text-white text-center mt-4">{selectedImage.caption}</p>
            <button className="absolute top-2 right-2 text-white text-2xl font-bold" onClick={() => setSelectedImage(null)}>
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="relative h-[300px] flex items-center justify-center text-white">
        <Image src="/gallery/1.jpg" alt="Cleaning background" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="mb-6">Visit our FAQ page to get answers to common service questions.</p>
          <Link href="/faq" className="bg-teal-600 px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition">
            View FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
