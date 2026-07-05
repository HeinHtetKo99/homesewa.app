"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { PLAY_STORE_URL } from "../lib/app-links";
const AUTO_HIDE_MS = 30_000;
const SCROLL_THRESHOLD = 8;

function isMobileBrowser() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

function isStandaloneApp() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
}

export default function SmartAppBanner() {
  const [visible, setVisible] = useState(false);
  const [hostname, setHostname] = useState("HomeSewa.app");

  useEffect(() => {
    if (isStandaloneApp()) return;
    if (!isMobileBrowser()) return;

    setHostname(window.location.hostname.replace(/^www\./, ""));
    setVisible(true);
    document.documentElement.dataset.smartBanner = "visible";

    let hidden = false;
    const hide = () => {
      if (hidden) return;
      hidden = true;
      setVisible(false);
      delete document.documentElement.dataset.smartBanner;
    };

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) hide();
    };

    const timer = window.setTimeout(hide, AUTO_HIDE_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      delete document.documentElement.dataset.smartBanner;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="smart-app-banner"
      role="region"
      aria-label="Install HomeSewa App"
    >
      <div className="smart-app-banner__card">
        <Image
          src="/logo/homesewa-logo.png"
          alt=""
          width={40}
          height={40}
          className="smart-app-banner__icon"
        />

        <div className="smart-app-banner__copy">
          <p className="smart-app-banner__title">Install HomeSewa App</p>
          <p className="smart-app-banner__domain">{hostname}</p>
        </div>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="smart-app-banner__install"
        >
          Install
        </a>
      </div>
    </div>
  );
}
