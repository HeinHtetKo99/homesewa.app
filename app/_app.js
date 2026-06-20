// pages/_app.js
import Script from 'next/script';
import '../styles/globals.css'; // if you have global styles

export default function MyApp({ Component, pageProps }) {
  return (
    <>
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

      {/* Optional: Other global scripts like Facebook Pixel or OneSignal */}

      <Component {...pageProps} />
    </>
  );
}
