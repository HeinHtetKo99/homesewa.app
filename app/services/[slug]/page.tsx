import { notFound } from "next/navigation";
import ServicePageLayout from "../../../components/ServicePageLayout";
import { getAllServiceDetailSlugs, getServiceDetail } from "../../data/serviceDetails";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceDetailSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) return { title: "Service Not Found | RocketSingh" };

  return {
    title: `${service.title} | RocketSingh`,
    description: service.heroDescription,
    openGraph: {
      title: `${service.title} | RocketSingh`,
      description: service.heroDescription,
      images: [{ url: `https://www.rocketsingh.app${service.image}` }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();

  return (
    <ServicePageLayout
      serviceName={service.title}
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
  );
}
