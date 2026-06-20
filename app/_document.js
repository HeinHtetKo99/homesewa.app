import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon and manifest */}
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />

        {/* Primary Meta Tags */}
        <meta name="title" content="HomeSewa | SuperFast Service" />
        <meta name="description" content="HomeSewa is a superfast on demand home service." />
        <meta name="keywords" content="HomeSewa, SuperFast Service, On Demand Home Service, Nepal" />
        <meta name="author" content="HomeSewa" />

        {/* Open Graph */}
        <meta property="og:url" content="https://homesewa.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="HomeSewa | SuperFast Service" />
        <meta property="og:description" content="HomeSewa is a superfast on demand home service." />
        <meta property="og:image" content="https://homesewa.app/og/default.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="HomeSewa.app" />
        <meta property="twitter:url" content="https://homesewa.app" />
        <meta name="twitter:title" content="HomeSewa | SuperFast Service" />
        <meta name="twitter:description" content="HomeSewa is a superfast on demand home service." />
        <meta name="twitter:image" content="https://homesewa.app/og/default.png" />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=YOUR-GTM-ID"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
