'use client'
import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const BANNER_DISMISS_KEY = 'rocketsingh-partner-banner-dismissed'

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(BANNER_DISMISS_KEY) === 'true') return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 59000);

    return () => clearTimeout(timer);
  }, []);

  const closeBanner = () => {
    setVisible(false);
    sessionStorage.setItem(BANNER_DISMISS_KEY, 'true');
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-[#074842] text-white">
      <div className="max-w-7xl mx-auto py-2.5 px-4 sm:px-5 flex items-center gap-3">
        <div className="flex flex-1 flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <p className="text-sm sm:text-[13px] lg:text-sm">
            RocketSingh is looking for Business Partners in India.
          </p>

          <a href="/partnership">
            <button className="text-sm italic hover:bg-[#ebebeb] hover:text-[#074842] border border-[#ebebeb] px-2 py-1 rounded-md">
              Apply Now
            </button>
          </a>
        </div>

        <button
          type="button"
          onClick={closeBanner}
          aria-label="Close banner"
          className="shrink-0 rounded-md p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default Navbar