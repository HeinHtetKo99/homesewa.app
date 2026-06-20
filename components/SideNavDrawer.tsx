'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import {
  BookOpen,
  Briefcase,
  Download,
  FolderKanban,
  Handshake,
  HelpCircle,
  Home,
  Info,
  Menu,
  MessageSquare,
  Users,
  Mail,
  Wrench,
  X,
} from 'lucide-react';
import BrandLogo from './BrandLogo';

type SideNavDrawerProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavLinkItem = {
  href: string;
  label: string;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
  isActive?: (path: string) => boolean;
};

const primaryNav: NavLinkItem[] = [
  { href: '/', label: 'Home', Icon: Home, isActive: (p) => p === '/' },
  { href: '/services', label: 'Services', Icon: Wrench, isActive: (p) => p.startsWith('/services') },
  { href: '/book', label: 'Book a Service', Icon: BookOpen, isActive: (p) => p === '/book' },
  { href: '/faq', label: 'FAQ', Icon: HelpCircle, isActive: (p) => p === '/faq' },
  { href: '/partnership', label: 'Partner', Icon: Handshake, isActive: (p) => p.startsWith('/partnership') },
];

const secondaryNav: NavLinkItem[] = [
  { href: '/about', label: 'About', Icon: Info },
  { href: '/projects', label: 'Projects', Icon: FolderKanban },
  { href: '/d', label: 'Download App', Icon: Download },
  { href: '/contact', label: 'Contact', Icon: Mail },
  { href: '/team', label: 'Team', Icon: Users },
  { href: '/feedback', label: 'Feedback', Icon: MessageSquare },
];

const socialLinks = [
  { href: 'https://www.facebook.com/', label: 'Facebook', icon: '/icons/facebook.svg' },
  { href: 'https://www.youtube.com/', label: 'YouTube', icon: '/icons/youtube.svg' },
  { href: 'https://www.x.com/', label: 'X', icon: '/icons/x.svg' },
  { href: 'https://www.linkedin.com/company/', label: 'LinkedIn', icon: '/icons/linkedin.svg' },
];

const SideNavDrawer: React.FC<SideNavDrawerProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeDrawer = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const linkClass = (active: boolean) =>
    `side-nav-drawer__link flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] font-medium transition md:py-3 ${
      active
        ? 'bg-teal-100 text-teal-900'
        : 'text-gray-700 hover:bg-gray-50 hover:text-teal-800'
    }`;

  return (
    <>
      <button
        type="button"
        onClick={toggleDrawer}
        className="flex h-10 w-10 items-center justify-center rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-teal-700 md:hidden"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <button
        type="button"
        onClick={toggleDrawer}
        className="hidden md:flex h-10 items-center justify-center gap-2 rounded-lg px-2 text-teal-800 hover:bg-teal-50 transition lg:px-3"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
        <span className="text-[15px] font-medium">Menu</span>
      </button>

      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={closeDrawer}
        aria-hidden={!isOpen}
      >
        <aside
          className={`side-nav-drawer absolute top-0 right-0 flex h-dvh max-h-dvh w-[min(85vw,320px)] flex-col bg-white shadow-2xl transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
          aria-label="Site menu"
        >
          <div className="side-nav-drawer__header flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3 md:py-4">
            <BrandLogo
              onClick={closeDrawer}
              imageClassName="side-nav-drawer__logo h-10 w-10"
              textClassName="side-nav-drawer__brand brand-name text-xl font-bold tracking-tight"
            />
            <button
              type="button"
              onClick={closeDrawer}
              className="side-nav-drawer__close flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="side-nav-drawer__nav min-h-0 flex-1 overflow-y-auto px-4 py-3 md:py-4">
            <p className="side-nav-drawer__label mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400 md:mb-2">
              Main
            </p>
            <div className="side-nav-drawer__section mb-3 flex flex-col gap-0.5 md:mb-4 md:gap-1">
              {primaryNav.map(({ href, label, Icon, isActive }) => {
                const active = isActive?.(pathname) ?? pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeDrawer}
                    className={linkClass(active)}
                  >
                    {Icon ? <Icon size={18} className="shrink-0 text-teal-600" /> : null}
                    {label}
                  </Link>
                );
              })}
            </div>

            <p className="side-nav-drawer__label mb-1.5 px-2 text-xs font-semibold uppercase tracking-wide text-gray-400 md:mb-2">
              More
            </p>
            <div className="side-nav-drawer__section flex flex-col gap-0.5 md:gap-1">
              {secondaryNav.map(({ href, label, Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeDrawer}
                    className={linkClass(active)}
                  >
                    {Icon ? <Icon size={18} className="shrink-0 text-teal-600" /> : null}
                    {label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="side-nav-drawer__footer flex shrink-0 flex-col gap-2 border-t border-gray-100 px-4 py-3 md:py-4">
            <Link
              href="/career"
              onClick={closeDrawer}
              className="side-nav-drawer__action flex w-full items-center justify-center gap-2 rounded-xl border border-teal-900 px-4 py-2.5 text-[15px] font-medium text-teal-900 hover:bg-teal-50 transition"
            >
              <Briefcase size={18} className="text-teal-700" />
              Career
            </Link>
            <Link
              href="/book"
              onClick={closeDrawer}
              className="side-nav-drawer__action flex w-full items-center justify-center gap-2 rounded-xl bg-teal-900 px-4 py-2.5 text-[15px] font-semibold text-white hover:bg-teal-800 transition"
            >
              <BookOpen size={18} />
              Book a Service
            </Link>

            <p className="side-nav-drawer__connect mb-2 pt-1 text-center text-xs font-medium text-gray-500 md:mb-3 md:pt-2">
              Connect With Us
            </p>
            <div className="side-nav-drawer__social-row flex justify-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="side-nav-drawer__social flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  aria-label={social.label}
                >
                  <img src={social.icon} alt="" className="side-nav-drawer__social-icon h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default SideNavDrawer;
