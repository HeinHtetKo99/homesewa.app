"use client";

import Header from "./Header";
import Footer from "./Footer";
import Sidekick from "./Sidekick";
import Navbar from "./Navbar";
import RoadBlock from "./Roadblock";
import CookieConsent from "./CookieConsent";
import SmartAppBanner from "./SmartAppBanner";
import { Suspense, type ReactNode } from "react";

type LayoutChromeProps = {
  children: ReactNode;
};

export default function LayoutChrome({ children }: LayoutChromeProps) {
  return (
    <>
      <SmartAppBanner />
      <CookieConsent />
      <RoadBlock />
      <Navbar />
      <Header />
      <Sidekick />
      <main>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Footer />
    </>
  );
}
