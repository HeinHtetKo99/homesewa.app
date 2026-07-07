import type { Metadata } from "next";

export const SITE_URL = "https://www.homesewa.app";
export const SITE_NAME = "HomeSewa";
export const SITE_ALTERNATE_NAMES = ["homesewa", "Home Sewa", "home sewa", "homesewa.app"] as const;
export const DEFAULT_OG_IMAGE = "/og/default.jpg";
export const DEFAULT_DESCRIPTION =
  "HomeSewa connects you with verified professionals for cleaning, salon at home, spa, massage, repairs, and 50+ on-demand home services in Kathmandu and across Nepal. Book online in minutes.";

export const SOCIAL_PROFILES = [
  "https://biratinfo.com/author/HomeSewa",
  "https://play.google.com/store/apps/details?id=com.pracasinfosys.sriyog.com",
] as const;

export const BUSINESS_PHONE = "+977-9852024365";
export const BUSINESS_EMAIL = "support@homesewa.app";

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
  /** Open Graph type — defaults to "website". */
  ogType?: "website" | "article";
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
  ogType = "website",
}: PageSeoInput): Metadata {
  const ogImage = absoluteUrl(image);

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
      type: ogType,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildBrandJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${SITE_URL}/#brand`,
    name: SITE_NAME,
    alternateName: [...SITE_ALTERNATE_NAMES],
    url: SITE_URL,
    logo: absoluteUrl("/logo/homesewa-logo.png"),
    sameAs: [...SOCIAL_PROFILES],
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [...SITE_ALTERNATE_NAMES],
    legalName: SITE_NAME,
    url: SITE_URL,
    brand: { "@id": `${SITE_URL}/#brand` },
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo/homesewa-logo.png"),
      width: 1000,
      height: 1000,
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: DEFAULT_DESCRIPTION,
    email: BUSINESS_EMAIL,
    telephone: BUSINESS_PHONE,
    foundingDate: "2018-06-14",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kamalpokhari",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati Province",
      postalCode: "44600",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 27.7089,
      longitude: 85.3206,
    },
    areaServed: [
      { "@type": "City", name: "Kathmandu" },
      { "@type": "City", name: "Lalitpur" },
      { "@type": "City", name: "Bhaktapur" },
      { "@type": "Country", name: "Nepal" },
    ],
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_PHONE,
      email: BUSINESS_EMAIL,
      contactType: "customer service",
      areaServed: "NP",
      availableLanguage: ["English", "Nepali"],
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: [...SITE_ALTERNATE_NAMES],
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildItemListJsonLd(
  name: string,
  items: { name: string; url: string; description?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}
