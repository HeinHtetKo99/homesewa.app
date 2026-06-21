'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import BrandLogo from "./BrandLogo";
import SideNavDrawer from "./SideNavDrawer";

const PHONE_HREF = "tel:+918190074189";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkIcon, setDarkIcon] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("Theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkIcon(false);
    } else {
      document.body.classList.remove("dark");
      setDarkIcon(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerTheme = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      localStorage.setItem("Theme", "light");
      setDarkIcon(true);
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("Theme", "dark");
      setDarkIcon(false);
    }
  };

  return (
    <header
      className={`header sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md py-2" : "shadow-sm py-3"
      }`}
    >
      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6">
        <div className="flex items-center">
          <BrandLogo />
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-[16px] hover:text-teal-700">Home</Link>
            <Link href="/about" className="text-[16px] hover:text-teal-700">About</Link>
            <Link href="/services" className="text-[16px] hover:text-teal-700">Services</Link>
            <Link href="/projects" className="text-[16px] hover:text-teal-700">Projects</Link>
            <Link href="/contact" className="text-[16px] hover:text-teal-700">Contact</Link>

            

            <Link href="/book">
              <button className="bg-teal-900 cursor-pointer text-[16px] border border-teal-900 text-white px-4 py-1 rounded hover:bg-teal-800">
                Book a Service
              </button>
            </Link>
          </div>

          <div className="hidden sm:block lg:ml-2">
            <button
              onClick={triggerTheme}
              className={`text-2xl cursor-pointer rounded-full h-8 w-8 flex items-center justify-center ${
                darkIcon ? "bg-black text-white rotate-45" : "bg-white text-black"
              }`}
              aria-label="Toggle Dark Mode"
            >
              {darkIcon ? "☽" : "☀︎"}
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <a
              href={PHONE_HREF}
              className="p-2 text-gray-700 hover:text-teal-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Call Us"
            >
              <Phone size={20} />
            </a>
          </div>

          <SideNavDrawer setIsOpen={setIsOpen} isOpen={isOpen} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
