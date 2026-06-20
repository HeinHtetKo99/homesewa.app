'use client'
import { useState, useEffect } from "react";

const COOKIE_STORAGE_KEY = "cookie-consent-v1"; // new key so old data is ignored

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);

      // Show banner ONLY if no valid value is stored yet
      if (consent !== "accepted" && consent !== "declined") {
        setVisible(true);
      }
    } catch (err) {
      // If localStorage is blocked, at least still show the banner
      console.error("CookieConsent localStorage error:", err);
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, "accepted");
    } catch (err) {
      console.error("Error saving cookie consent:", err);
    }
    setVisible(false);
  };

  const declineCookies = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, "declined");
    } catch (err) {
      console.error("Error saving cookie consent:", err);
    }
    setVisible(false);
  };

  // 👇 Important: hide component when NOT visible
  if (!visible) return null;

    return (
    <div className={`fixed bottom-5 left-5 z-50 w-[320px] rounded-xl p-5 text-white shadow-xl fade-in`}
         style={{ backgroundColor: "#0D5D59" }}>
      {/* <button onClick={()=>setVisible(false)} className="absolute right-2 top-2 p-px cursor-pointer bg-white rounded-full">
        <svg fill="#2a2a2a" width="17px" height="17px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
        </svg>
      </button> */}
      <p className="text-sm leading-relaxed  ">
        We use cookies to improve your experience. By continuing to use this site,
        you agree to our use of cookies.
      </p>

      <div className="mt-4 flex w-full items-center justify-end gap-3">
        <button
          className="rounded-lg bg-white px-4 py-2 text-sm transition hover:bg-gray-100 text-black"
          onClick={declineCookies}
        >
          Decline
        </button>

        <button
          className="rounded-lg bg-white text-black px-4 py-2 text-sm transition hover:bg-gray-200"
          onClick={acceptCookies}
        >
          Accept
        </button>
      </div>
    </div>
  );

}
