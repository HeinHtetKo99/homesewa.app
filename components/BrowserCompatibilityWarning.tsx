'use client'
import React, { useState, useEffect } from "react";

const BrowserCompatibilityWarning = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("browserWarningDismissed");

    if (!dismissed && isBrowserOutdated()) {
      setVisible(true);
    }
  }, []);

  /** 
   * Modern + Reliable OUTDATED Browser Detection
   * Uses:
   * - UA detection for legacy browsers
   * - Feature detection for old engines
  */
  const isBrowserOutdated = () => {
    const ua = navigator.userAgent;

    // ❌ Internet Explorer
    if (/MSIE|Trident/.test(ua)) return true;

    // ❌ Legacy EdgeHTML (Old Edge, before Chromium)
    if (/Edge\/\d+/.test(ua) && !/Edg\//.test(ua)) return true;

    // ❌ Feature check - missing essential APIs
    const missingFeatures =
      !window.fetch ||
      !window.Promise ||
      !window.URL ||
      !window.crypto ||
      !Object.assign;

    if (missingFeatures) return true;

    // ✔ Optional version-based checks
    const checks = [
      { name: "Chrome", min: 150, regex: /Chrome\/(\d+)/ },
      { name: "Firefox", min: 100, regex: /Firefox\/(\d+)/ },
      { name: "Safari", min: 14, regex: /Version\/(\d+).*Safari/ },
      { name: "Edge", min: 100, regex: /Edg\/(\d+)/ },
    ];

    for (const browser of checks) {
      const match = ua.match(browser.regex);
      if (match && parseInt(match[1]) < browser.min) return true;
    }

    return false;
  };

  const dismiss = () => {
    localStorage.setItem("browserWarningDismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bg-yellow-100 border-b border-yellow-400 px-6 py-4 animate-slideDown shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <img
            src="/icons/error.svg"
            alt="Warning"
            className="w-6 h-6 shrink-0"
          />
          <div>
            <p className="font-semibold text-yellow-800 text-sm sm:text-base">
              Your browser may not be fully supported
            </p>
            <p className="text-yellow-700 text-xs sm:text-sm">
              Some features might not work correctly. Please consider updating:
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { name: "Chrome", url: "https://www.google.com/chrome/" },
            { name: "Firefox", url: "https://www.mozilla.org/firefox/" },
            { name: "Edge", url: "https://www.microsoft.com/edge" },
          ].map((browser) => (
            <a
              key={browser.name}
              href={browser.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm bg-white text-yellow-800 px-3 py-1.5 rounded-md font-medium border border-yellow-300 hover:bg-yellow-50 transition"
            >
              {browser.name}
            </a>
          ))}

          {/* Dismiss Button */}
          <button
            onClick={dismiss}
            aria-label="Dismiss browser warning"
            className="p-2 hover:bg-yellow-200 rounded-md transition"
          >
            <img src="/icons/cross.svg" alt="Close" className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default BrowserCompatibilityWarning;
