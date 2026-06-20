// app/components/Roadblock.tsx
"use client";

import React, { useEffect, useState } from "react";

const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export default function Roadblock() {
  const [show, setShow] = useState(false);
  const [bannerSrc, setBannerSrc] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [closeEnabled, setCloseEnabled] = useState(false);

  useEffect(() => {
    const today = new Date();
    const monthName = monthNames[today.getMonth()];
    const day = today.getDate();

    const todayBanner = `/roadblock/${monthName}/${day}.jpg`;

    // Preload today's banner
    const img = new Image();
    img.src = todayBanner;

    img.onload = () => {
      setBannerSrc(todayBanner);
      setShow(true);

      // Countdown for showing close button
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setCloseEnabled(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };
    // If image doesn't exist, don't show roadblock
    img.onerror = () => setShow(false);
  }, []);

  // Auto-close 10 seconds after close button appears
  useEffect(() => {
    let autoCloseTimeout: NodeJS.Timeout;
    if (closeEnabled) {
      autoCloseTimeout = setTimeout(() => {
        setShow(false);
      }, 10000);
    }
    return () => clearTimeout(autoCloseTimeout);
  }, [closeEnabled]);

  if (!show || !bannerSrc) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative w-full max-w-3xl mx-4 md:mx-0">
        <img
          src={bannerSrc}
          alt="Roadblock Banner"
          className="w-full h-auto rounded-lg shadow-lg"
        />
        {closeEnabled ? (
          <button
            onClick={() => setShow(false)}
            className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-white text-black text-2xl font-bold hover:bg-gray-200 transition"
          >
            &times;
          </button>
        ) : (
          <div className="absolute top-3 right-3 text-white text-lg font-semibold bg-black bg-opacity-50 px-3 py-1 rounded">
            {countdown}
          </div>
        )}
      </div>
    </div>
  );
}