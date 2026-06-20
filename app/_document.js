import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon and manifest */}
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />

        {/* Primary Meta Tags */}
        <meta name="title" content="RocketSingh | SuperFast Service" />
        <meta name="description" content="RocketSingh is a superfast on demand home service." />
        <meta name="keywords" content="RocketSingh, SuperFast Service, On Demand Home Service, India" />
        <meta name="author" content="RocketSingh" />

        {/* Open Graph */}
        <meta property="og:url" content="https://rocketsingh.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="RocketSingh | SuperFast Service" />
        <meta property="og:description" content="RocketSingh is a superfast on demand home service." />
        <meta property="og:image" content="https://rocketsingh.app/og/default.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="rocketsingh.app" />
        <meta property="twitter:url" content="https://rocketsingh.app" />
        <meta name="twitter:title" content="RocketSingh | SuperFast Service" />
        <meta name="twitter:description" content="RocketSingh is a superfast on demand home service." />
        <meta name="twitter:image" content="https://rocketsingh.app/og/default.png" />
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
