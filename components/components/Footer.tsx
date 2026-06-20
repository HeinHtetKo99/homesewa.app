import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">Home Cleaning Nepal</h3>
          <p className="text-gray-400 text-sm">
            Professional home cleaning services in Nepal. Keeping your home and office spotless and hygienic.
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#services" className="text-gray-300 hover:text-white transition">
            Services
          </a>
          <a href="#testimonials" className="text-gray-300 hover:text-white transition">
            Testimonials
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white transition">
            Contact
          </a>
          <a href="#newsletter" className="text-gray-300 hover:text-white transition">
            Newsletter
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-center md:text-right text-gray-400 text-sm">
          © {new Date().getFullYear()} Home Cleaning Nepal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}