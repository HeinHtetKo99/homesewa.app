'use client';

import React from 'react';
import BacktoTop from './BacktoTop';

const Sidekick: React.FC = () => {
  return (
    <>
      <div className="fixed right-4 z-50 bottom-[calc(11.5rem+env(safe-area-inset-bottom))] md:bottom-[11rem]">
        <BacktoTop />
      </div>

      <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-4 z-50 flex flex-col items-center gap-4 md:bottom-4">
        {/* Call */}
        <div className="relative group flex items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
          <a
            href="tel:+918190074189"
            className="relative fab-btn flex h-12 w-12 items-center justify-center rounded-full p-3 transition duration-200 touch-manipulation"
            aria-label="Call Us"
          >
            <img src="/icons/phone.svg" alt="" aria-hidden="true" className="h-6 w-6" />
          </a>
          <span className="pointer-events-none absolute right-14 hidden opacity-0 transition duration-200 group-hover:opacity-100 sm:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Call Us
          </span>
        </div>

        {/* WhatsApp */}
        <div className="relative group flex items-center justify-center">
          <a
            href="https://b.broadpress.org/HomeSewa"
            target="_blank"
            rel="noopener noreferrer"
            className="fab-btn flex h-12 w-12 items-center justify-center rounded-full p-3 transition duration-200 animate-bounce touch-manipulation"
            aria-label="Chat on WhatsApp"
          >
            <img src="/icons/whatsapp.svg" alt="" aria-hidden="true" className="h-6 w-6" />
          </a>
          <span className="pointer-events-none absolute right-14 hidden opacity-0 transition duration-200 group-hover:opacity-100 sm:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidekick;
