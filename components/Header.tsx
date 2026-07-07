'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Moon, Phone, Sun } from "lucide-react";
import BrandLogo from "./BrandLogo";
import SideNavDrawer from "./SideNavDrawer";
import { initThemeFromStorage, toggleTheme } from "@/lib/theme";

const PHONE_HREF = "tel:+9779852024365";

const navLinks = [
  { href: "/", label: "Home", isActive: (path: string) => path === "/" },
  { href: "/about", label: "About", isActive: (path: string) => path === "/about" || path.startsWith("/about/") },
  { href: "/services", label: "Services", isActive: (path: string) => path.startsWith("/services") },
  { href: "/projects", label: "Projects", isActive: (path: string) => path === "/projects" || path.startsWith("/projects/") },
  { href: "/contact", label: "Contact", isActive: (path: string) => path === "/contact" || path.startsWith("/contact/") },
] as const;

const navLinkClass = (active: boolean) =>
  `text-[16px] rounded-md px-2 py-0.5 transition-colors ${
    active
      ? "bg-teal-100 text-teal-900 font-semibold"
      : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
  }`;

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [darkIcon, setDarkIcon] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    initThemeFromStorage();
    setDarkIcon(!document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerTheme = () => {
    const next = toggleTheme();
    setDarkIcon(next === "light");
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
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map(({ href, label, isActive }) => (
              <Link
                key={href}
                href={href}
                className={navLinkClass(isActive(pathname))}
                aria-current={isActive(pathname) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}

            <Link href="/book">
              <button
                className={`cursor-pointer text-[16px] border px-4 py-1 rounded transition-colors ${
                  pathname === "/book"
                    ? "bg-teal-800 border-teal-800 text-white"
                    : "bg-teal-900 border-teal-900 text-white hover:bg-teal-800"
                }`}
              >
                Book a Service
              </button>
            </Link>
          </div>

          <div className="hidden sm:block lg:ml-2">
            <button
              type="button"
              onClick={triggerTheme}
              className={`theme-toggle-btn ${
                darkIcon ? "theme-toggle-btn--moon" : "theme-toggle-btn--sun"
              }`}
              aria-label={darkIcon ? "Switch to dark mode" : "Switch to light mode"}
            >
              {darkIcon ? <Moon size={17} strokeWidth={2.25} /> : <Sun size={17} strokeWidth={2.25} />}
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
