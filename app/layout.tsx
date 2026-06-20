// app/layout.js
import './globals.css';
import Script from 'next/script';
import LayoutChrome from '../components/LayoutChrome';
import GoogleAnalytics from '../components/GoogleAnalytics';
import { OneSignalInit } from './OneSignal';
import { Suspense } from 'react';


export const metadata = {
  metadataBase: new URL("https://homesewa.app"),
  title: "HomeSewa | SuperFast Service",
  description: "HomeSewa is a superfast on demand home service.",
  keywords: "HomeSewa, SuperFast Service, On Demand Home Service, Nepal",
  authors: [{ name: "HomeSewa" }],
  openGraph: {
    title: "HomeSewa | SuperFast Service",
    description: "HomeSewa is a superfast on demand home service.",
    url: "https://homesewa.app",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "HomeSewa | SuperFast Service",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeSewa | SuperFast Service",
    description: "HomeSewa is a superfast on demand home service.",
    images: ["/og/default.png"],
  },
};

export default function RootLayout({ children }:Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon/favicon.png" />
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
