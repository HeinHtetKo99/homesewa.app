import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';
import LayoutChrome from '../components/LayoutChrome';
import GoogleAnalytics from '../components/GoogleAnalytics';
import JsonLd from '../components/JsonLd';
import { OneSignalInit } from './OneSignal';
import { THEME_STORAGE_KEY } from '../lib/theme';
import { ROADBLOCK_BOOT_SCRIPT } from '../lib/roadblock-boot-script';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_ALTERNATE_NAMES,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildBrandJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from '../lib/seo';

const defaultTitle = "HomeSewa | SuperFast On-Demand Home Services in Nepal";
const defaultDescription = DEFAULT_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  keywords: [
    "HomeSewa",
    "homesewa",
    ...SITE_ALTERNATE_NAMES,
    "home services Nepal",
    "on demand home service Kathmandu",
    "cleaning services Nepal",
    "salon at home Kathmandu",
    "professional cleaning Kathmandu",
    "book home services online Nepal",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

const organizationJsonLd = buildOrganizationJsonLd();
const brandJsonLd = buildBrandJsonLd();
const webSiteJsonLd = buildWebSiteJsonLd();

export default function RootLayout({ children }:Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var c=document.cookie.match(/(?:^|; )homesewa_roadblock=([^;]*)/);var d=new Date();var key=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");if(!c||decodeURIComponent(c[1])!==key){document.documentElement.classList.add("hs-roadblock-active");var s=document.createElement("style");s.id="hs-roadblock-lock";s.textContent="html.hs-roadblock-active{overflow:hidden!important}html.hs-roadblock-active body{overflow:hidden!important;visibility:hidden}#homesewa-roadblock,html.hs-roadblock-active body>#homesewa-roadblock{visibility:visible!important}";document.documentElement.appendChild(s)}}catch(e){}})();`,
          }}
        />
        <link rel="manifest" href="/manifest.json" />

        <OneSignalInit />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','YOUR-GTM-ID');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: ROADBLOCK_BOOT_SCRIPT,
          }}
        />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={brandJsonLd} />
        <JsonLd data={webSiteJsonLd} />
        <GoogleAnalytics />

        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=YOUR-GTM-ID"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Facebook Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
          />
        </noscript>
        
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
