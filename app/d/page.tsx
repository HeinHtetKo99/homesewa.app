import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Download the HomeSewa Mobile App",
  description:
    "Download the HomeSewa app on iOS or Android for superfast on-demand home service booking in Nepal.",
  path: "/d",
});

import { APP_STORE_URL, PLAY_STORE_URL } from "../../lib/app-links";

const storeButtonClass =
  "flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-white shadow-[0_4px_14px_rgba(15,23,42,0.1)] ring-1 ring-teal-200/90 transition-[transform,box-shadow] hover:scale-[1.04] hover:shadow-[0_8px_20px_rgba(15,23,42,0.12)] active:scale-[0.98]";
const storeButtonDisabledClass =
  "flex h-[52px] w-[52px] cursor-not-allowed items-center justify-center rounded-2xl bg-white opacity-60 shadow-[0_4px_14px_rgba(15,23,42,0.08)] ring-1 ring-teal-200/60";

export default function DownloadAppPage() {
  return (
    <div className="min-h-[calc(100dvh-12rem)] bg-gradient-to-b from-white via-teal-50 to-white pb-24 md:pb-16">
      <section className="bg-[#0E4541] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Download App</h1>
        <p className="text-base md:text-lg max-w-2xl mx-auto text-teal-50">
          Scan the QR code or use the store buttons below to get the HomeSewa app.
        </p>
      </section>

      <div className="flex flex-col items-center justify-center px-6 py-10 sm:py-14">
        <figure className="w-full max-w-[min(78vw,300px)] sm:max-w-[320px] p-4 sm:p-5">
          <Image
            src="/d/d.png"
            alt="Scan to download the HomeSewa app"
            width={1024}
            height={1024}
            priority
            className="h-auto w-full object-contain"
          />
        </figure>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            className={storeButtonClass}
          >
            <PlayStoreIcon className="h-7 w-7" />
          </a>
          {APP_STORE_URL ? (
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
              className={storeButtonClass}
            >
              <AppStoreIcon className="h-7 w-7 text-slate-900" />
            </a>
          ) : (
            <span
              className={storeButtonDisabledClass}
              role="img"
              aria-label="App Store — coming soon"
              title="Coming soon to the App Store"
            >
              <AppStoreIcon className="h-7 w-7 text-slate-500" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M3.6 1.86a1.5 1.5 0 0 0-.6 1.2v17.88c0 .48.21.93.57 1.2L13.2 12 3.6 1.86z" fill="#34A853" />
      <path d="M16.7 8.55 13.2 12l3.5 3.45 4.65-2.62a1.5 1.5 0 0 0 0-2.65l-4.65-2.63z" fill="#FBBC04" />
      <path d="M3 21.21c.3.23.71.27 1.07.07L16.7 15.45 13.2 12 3 21.21z" fill="#EA4335" />
      <path d="M4.07 1.78c-.36-.2-.77-.16-1.07.08L13.2 12l3.5-3.45L4.07 1.78z" fill="#4285F4" />
    </svg>
  );
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M17.564 12.602c-.022-2.314 1.89-3.422 1.977-3.477-1.077-1.575-2.755-1.79-3.355-1.815-1.428-.144-2.787.84-3.514.84-.728 0-1.842-.82-3.03-.797-1.56.024-3.001.906-3.804 2.297-1.622 2.812-.414 6.972 1.165 9.255.772 1.116 1.69 2.37 2.893 2.325 1.165-.046 1.605-.753 3.013-.753 1.407 0 1.803.753 3.03.728 1.252-.023 2.043-1.137 2.81-2.258.886-1.296 1.252-2.553 1.273-2.618-.028-.012-2.443-.937-2.458-3.727zM15.27 5.81c.643-.78 1.077-1.864.957-2.946-.926.038-2.05.617-2.717 1.397-.598.69-1.121 1.793-.98 2.853 1.034.08 2.097-.524 2.74-1.304z" />
    </svg>
  );
}
