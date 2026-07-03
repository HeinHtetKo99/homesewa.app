import type { Metadata } from "next";

export const SITE_URL = "https://homesewa.app";
export const SITE_NAME = "HomeSewa";
export const DEFAULT_OG_IMAGE = "/og/default.jpg";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageSeoInput = {
  title: string;
  description: string;
  /** Route path starting with "/", used for the canonical URL. */
  path: string;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
};

/**
 * Builds a consistent Metadata object with canonical URL, Open Graph, and
 * Twitter tags. The root layout's title template appends "| HomeSewa".
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  keywords,
  noindex,
}: PageSeoInput): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
