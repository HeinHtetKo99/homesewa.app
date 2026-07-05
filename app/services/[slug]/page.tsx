import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import ServicePageLayout from "../../../components/ServicePageLayout";
import { SITE_NAME, SITE_URL, absoluteUrl } from "../../../lib/seo";
import { getAllServiceDetailSlugs, getServiceDetail } from "../../data/serviceDetails";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceDetailSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return { title: "Service Not Found" };

  const path = `/services/${slug}`;
  const title = `${service.title} in Kathmandu, Nepal`;
  return {
    title,
    description: service.heroDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: service.heroDescription,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: service.image, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description: service.heroDescription,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();

  const serviceUrl = absoluteUrl(`/services/${slug}`);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.heroDescription,
    url: serviceUrl,
    image: absoluteUrl(service.image),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Nepal" },
  };

  const faqJsonLd = service.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.title, item: serviceUrl },
    ],
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />
      <ServicePageLayout
        serviceName={service.title}
        serviceSlug={slug}
        heroImage={service.image}
        heroTitle={service.heroTitle}
        heroDescription={service.heroDescription}
        bookLabel={service.bookLabel}
        introTitle={service.introTitle}
        introParagraphs={service.introParagraphs}
        scopeTitle={service.scopeTitle}
        scopeItems={service.scopeItems}
        faqs={service.faqs}
      />
    </>
  );
}
