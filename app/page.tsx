import JsonLd from "../components/JsonLd";
import HomeClient from "./HomeClient";
import {
  DEFAULT_DESCRIPTION,
  SITE_ALTERNATE_NAMES,
  absoluteUrl,
  pageMetadata,
  SITE_NAME,
  SITE_URL,
} from "../lib/seo";

export const metadata = pageMetadata({
  title: "SuperFast On-Demand Home Services in Nepal",
  description: DEFAULT_DESCRIPTION,
  path: "/",
  keywords: [
    "HomeSewa",
    "homesewa",
    ...SITE_ALTERNATE_NAMES,
    "home services Nepal",
    "on demand home service Kathmandu",
    "cleaning services Nepal",
    "salon at home Kathmandu",
    "book home services online Nepal",
    "spa at home Kathmandu",
    "verified home professionals Nepal",
  ],
});

const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: `${SITE_NAME} | SuperFast On-Demand Home Services in Nepal`,
  description: DEFAULT_DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  primaryImageOfPage: absoluteUrl("/home/hero.jpg"),
  inLanguage: "en",
};

export default function Home() {
  return (
    <>
      <JsonLd data={homePageJsonLd} />
      <HomeClient />
    </>
  );
}
