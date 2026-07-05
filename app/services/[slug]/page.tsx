import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import ServicePageLayout from "../../../components/ServicePageLayout";
import {
  absoluteUrl,
  buildBreadcrumbList,
  pageMetadata,
  SITE_URL,
} from "../../../lib/seo";
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
  return pageMetadata({
    title,
    description: service.heroDescription,
    path,
    image: service.image,
    keywords: [
      `${service.title} Kathmandu`,
      `${service.title} Nepal`,
      `book ${service.title.toLowerCase()} Kathmandu`,
      "HomeSewa services",
    ],
  });
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

  const breadcrumbJsonLd = buildBreadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${slug}` },
  ]);

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
