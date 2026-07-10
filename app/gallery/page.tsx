'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface GalleryItem {
  id: number;
  imageUrl: string;
  altText: string;
  caption: string;
}

const cleaningProjects: GalleryItem[] = [
  { id: 1, imageUrl: "/gallery/1.jpg", altText: "Professional hair blow-drying service", caption: "Professional hair blow-drying and styling at home." },
  { id: 2, imageUrl: "/gallery/2.jpg", altText: "Salon hair styling service", caption: "Expert salon-style hair drying and finishing." },
  { id: 3, imageUrl: "/gallery/3.jpg", altText: "Clean modern bedroom", caption: "Bedroom deep cleaning leaving spaces fresh and tidy." },
  { id: 4, imageUrl: "/gallery/4.jpg", altText: "Living room interior", caption: "Living room cleaning and home interior upkeep." },
  { id: 5, imageUrl: "/gallery/5.jpg", altText: "Brick wall restoration work", caption: "Masonry and brick wall restoration services." },
  { id: 6, imageUrl: "/gallery/6.jpg", altText: "Spa massage therapy", caption: "Relaxing massage and wellness therapy at home." },
  { id: 7, imageUrl: "/gallery/7.jpg", altText: "Herringbone wooden floor", caption: "Hardwood floor cleaning and polishing for parquet surfaces." },
  { id: 8, imageUrl: "/gallery/8.jpg", altText: "Aged herringbone floor", caption: "Floor restoration and care for worn wooden flooring." },
  { id: 9, imageUrl: "/gallery/9.jpg", altText: "Modern bathroom with laundry", caption: "Bathroom and laundry area deep cleaning and sanitization." },
  { id: 10, imageUrl: "/gallery/10.jpg", altText: "Modern kitchen appliances", caption: "Kitchen cleaning including appliances, cabinets, and countertops." },
  { id: 11, imageUrl: "/gallery/11.jpg", altText: "Bridal beauty styling", caption: "Bridal makeup and beauty services for special occasions." },
  { id: 12, imageUrl: "/gallery/12.jpg", altText: "Modern city apartment bedroom", caption: "Apartment bedroom and living space cleaning." },
  { id: 13, imageUrl: "/gallery/13.jpg", altText: "Indoor potted plants", caption: "Indoor plant care and home greenery maintenance." },
  { id: 14, imageUrl: "/gallery/14.jpg", altText: "Traditional bridal styling", caption: "Traditional bridal grooming and beauty preparation." },
  { id: 15, imageUrl: "/gallery/15.jpg", altText: "Bridal makeup application", caption: "Professional bridal makeup application at home." },
  { id: 16, imageUrl: "/gallery/16.jpg", altText: "Woodworking and carpentry", caption: "Carpentry and custom woodwork repair services." },
  { id: 17, imageUrl: "/gallery/17.jpg", altText: "Home repair tools", caption: "General handyman and home repair services." },
  { id: 18, imageUrl: "/gallery/18.jpg", altText: "Modern black and white kitchen", caption: "Modern kitchen deep cleaning with tile backsplash care." },
  { id: 19, imageUrl: "/gallery/19.jpg", altText: "Luxury marble living and dining area", caption: "Marble floor and interior surface cleaning for luxury homes." },
  { id: 20, imageUrl: "/gallery/20.jpg", altText: "Water purifier in kitchen", caption: "Water purifier installation and maintenance services." },
  { id: 21, imageUrl: "/gallery/21.jpg", altText: "Bluewater purifier on countertop", caption: "Kitchen water filtration system setup and servicing." },
  { id: 22, imageUrl: "/gallery/22.jpg", altText: "Packed moving boxes in a room", caption: "Move-in and move-out packing and cleaning support." },
  { id: 23, imageUrl: "/gallery/23.jpg", altText: "Carpenter measuring wood beams", caption: "Carpentry and construction measurement for home projects." },
  { id: 24, imageUrl: "/gallery/24.jpg", altText: "Lawn mower maintenance", caption: "Outdoor equipment servicing and garage-area upkeep." },
  { id: 25, imageUrl: "/gallery/25.jpg", altText: "Window shutter cleaning", caption: "Window and shutter cleaning for a streak-free finish." },
  { id: 26, imageUrl: "/gallery/26.jpg", altText: "Porch cleaning with hose", caption: "Porch and exterior deck washing and maintenance." },
  { id: 27, imageUrl: "/gallery/27.jpg", altText: "Garden plant care", caption: "Garden care and plant treatment for healthy outdoor spaces." },
  { id: 28, imageUrl: "/gallery/28.jpg", altText: "Electric vehicle charging", caption: "EV charging setup and electrical home services." },
  { id: 29, imageUrl: "/gallery/29.jpg", altText: "EV charging port close-up", caption: "Electric vehicle charger installation and support." },
  { id: 30, imageUrl: "/gallery/30.jpg", altText: "Ornate tiled hallway floor", caption: "Tile floor cleaning and restoration for patterned surfaces." },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="mb-40">
      <div className="h-[200px] bg-gray-100 flex flex-col items-center justify-center text-center px-6">
        <span className="text-gray-500">
          Home / <span className="text-teal-700 font-semibold">Gallery</span>
        </span>
        <h1 className="text-4xl font-bold text-teal-800 mt-2">HomeSewa Services</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          HomeSewa bridges the gap between customers and skilled professionals, making it easier than ever to find trusted local services.
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
