import type { ServiceFaq, ServiceScopeItem } from "../../components/ServicePageLayout";
import {
  getAllServices,
  getServiceBySlug,
  type CatalogService,
} from "./servicesCatalog";
import { getScopeImages } from "./serviceScopeImages";
export type ServiceDetailContent = {
  heroTitle: string;
  heroDescription: string;
  bookLabel: string;
  introTitle: string;
  introParagraphs: string[];
  scopeTitle?: string;
  scopeItems: ServiceScopeItem[];
  faqs: ServiceFaq[];
};

type ServiceOverride = Partial<ServiceDetailContent>;

type ServiceCopy = {
  introTitle: string;
  introParagraph2: string;
  bookLabel: string;
  assessmentDescription: string;
  deliveryDescription: string;
  faqIncludeQuestion: string;
  faqBookQuestion: string;
  faqBookAnswer: string;
};

function getServiceCopy(service: CatalogService, category: string): ServiceCopy {
  const name = service.title;
  const atHomeMatch = name.match(/^(.+?) at [Hh]ome$/);

  if (atHomeMatch) {
    const base = atHomeMatch[1];
    const baseLower = base.toLowerCase();

    return {
      introTitle: `Trusted ${base} Services at Home with HomeSewa`,
      introParagraph2: `HomeSewa connects you with verified ${baseLower} professionals who visit your home and provide the service on-site. As part of our ${category} lineup, every visit includes transparent pricing, quality materials where needed, and a satisfaction-first approach.`,
      bookLabel: `Book ${base} at Home`,
      assessmentDescription: `A HomeSewa professional reviews your requirements and prepares to provide ${baseLower} services at your home.`,
      deliveryDescription: `Your assigned professional delivers ${baseLower} services at your home using industry-standard tools and proven techniques.`,
      faqIncludeQuestion: `What's included when a professional provides ${baseLower} services at my home?`,
      faqBookQuestion: `How do I book ${baseLower} services at home?`,
      faqBookAnswer: `Click "Book a Service" on this page or visit our booking page, select ${baseLower} services at home, pick a date, and confirm your appointment.`,
    };
  }

  const nameLower = name.toLowerCase();

  return {
    introTitle: `Trusted ${name} with HomeSewa`,
    introParagraph2: `HomeSewa sends verified professionals to your location to provide ${nameLower}. As part of our ${category} lineup, every visit includes transparent pricing, quality materials where needed, and a satisfaction-first approach.`,
    bookLabel: `Book ${name}`,
    assessmentDescription: `A HomeSewa professional reviews your space and requirements before providing ${nameLower}.`,
    deliveryDescription: `Skilled professionals deliver ${nameLower} at your location using proven methods and industry-standard tools.`,
    faqIncludeQuestion: `What does ${name} include?`,
    faqBookQuestion: `How do I book ${name}?`,
    faqBookAnswer: `Click "Book a Service" on this page or visit our booking page to choose ${nameLower}, pick a date, and confirm your appointment.`,
  };
}

function buildDefaultDetail(
  service: CatalogService,
  category: string
): ServiceDetailContent {
  const name = service.title;
  const images = getScopeImages(service.slug);
  const copy = getServiceCopy(service, category);

  return {
    heroTitle: `${name} in Kathmandu`,
    heroDescription: service.desc,
    bookLabel: copy.bookLabel,
    introTitle: copy.introTitle,
    introParagraphs: [
      service.desc,
      copy.introParagraph2,
      `Whether you need a one-time appointment or ongoing support, our team makes booking simple — schedule online in minutes and track your service from confirmation to completion.`,
    ],
    scopeTitle: "What's Included",
    scopeItems: [
      {
        title: "On-Site Assessment",
        description: copy.assessmentDescription,
        image: images.assessment,
        imageAlt: `${name} assessment`,
      },
      {
        title: "Expert Service Delivery",
        description: copy.deliveryDescription,
        image: images.delivery,
        imageAlt: `${name} delivery`,
      },
      {
        title: "Final Quality Check",
        description: `We walk through the completed work with you to ensure everything meets HomeSewa quality standards.`,
        image: images.qualityCheck,
        imageAlt: `${name} quality check`,
      },
    ],
    faqs: [
      {
        id: 1,
        question: copy.faqIncludeQuestion,
        answer: service.desc,
      },
      {
        id: 2,
        question: copy.faqBookQuestion,
        answer: copy.faqBookAnswer,
      },
      {
        id: 3,
        question: "Are HomeSewa professionals verified?",
        answer:
          "Yes. Every professional on our platform is background-checked, skill-assessed, and rated by customers after each job.",
      },
      {
        id: 4,
        question: "Which cities do you serve?",
        answer:
          "HomeSewa provides home services in Kathmandu and nearby areas.",
      },
      {
        id: 5,
        question: "What if I am not satisfied with the service?",
        answer:
          "Contact us within 24 hours of your appointment. HomeSewa will review the issue and arrange a re-visit or resolution at no extra cost where applicable.",
      },
    ],
  };
}

const serviceOverrides: Record<string, ServiceOverride> = {
  "deep-cleaning": {
    heroTitle: "Deep Cleaning Services for Homes & Offices",
    heroDescription:
      "A thorough top-to-bottom clean that targets grime, bacteria, and hard-to-reach areas — leaving your space fresh, sanitized, and move-in ready.",
    introTitle: "Complete Deep Cleaning by HomeSewa",
    introParagraphs: [
      "Regular cleaning keeps surfaces tidy, but deep cleaning goes further. HomeSewa's deep cleaning service scrubs kitchens, sanitizes bathrooms, dusts ceiling fans and vents, cleans behind appliances, and refreshes upholstery and floors.",
      "Ideal before festivals, after renovations, or when moving in or out, our trained crews use eco-friendly products and a room-by-room checklist so nothing is missed.",
      "Book once for a full reset, or schedule periodic deep cleans to maintain a healthier home environment year-round.",
    ],
    scopeTitle: "Deep Cleaning Checklist",
    scopeItems: (() => {
      const img = getScopeImages("deep-cleaning");
      return [
      {
        title: "Kitchen Deep Clean",
        description: "Degreasing counters, cabinets, appliances, sinks, and backsplash areas.",
        image: img.assessment,
        imageAlt: "Kitchen deep cleaning",
      },
      {
        title: "Bathroom Sanitization",
        description: "Scrubbing tiles, fixtures, mirrors, and disinfecting all touch surfaces.",
        image: img.delivery,
        imageAlt: "Bathroom sanitization",
      },
      {
        title: "Living & Bedroom Refresh",
        description: "Dusting, vacuuming, mopping, and cleaning fans, windows, and furniture.",
        image: img.qualityCheck,
        imageAlt: "Living room deep cleaning",
      },
    ];
    })(),
    faqs: [
      {
        id: 1,
        question: "How is deep cleaning different from regular cleaning?",
        answer:
          "Deep cleaning covers areas often skipped in routine cleans — behind appliances, inside cabinets, grout lines, ceiling fans, and detailed bathroom sanitization.",
      },
      {
        id: 2,
        question: "How long does a deep clean take?",
        answer:
          "A standard 2–3 BHK home typically takes 4–8 hours depending on size, condition, and add-ons like upholstery or balcony cleaning.",
      },
      {
        id: 3,
        question: "Do I need to provide cleaning supplies?",
        answer:
          "No. HomeSewa professionals arrive with equipment and products. Let us know if you prefer specific brands or have allergy concerns.",
      },
      {
        id: 4,
        question: "Is deep cleaning suitable before moving in?",
        answer:
          "Yes. Move-in and move-out deep cleaning is one of our most popular bookings — we ensure every corner is sanitized before you settle in.",
      },
      {
        id: 5,
        question: "Can I combine deep cleaning with other services?",
        answer:
          "Absolutely. Many customers pair deep cleaning with AC servicing, pest control, or garden care in a single visit.",
      },
    ],
  },
  handyman: {
    heroTitle: "Reliable Handyman Services at Your Doorstep",
    heroDescription:
      "From minor repairs to furniture assembly and fixture installations — one visit, multiple fixes, done right the first time.",
    introTitle: "Your Go-To Handyman in Kathmandu",
    introParagraphs: [
      "Small home issues add up fast — a loose handle, a dripping tap, a shelf that won't stay level. HomeSewa handyman services tackle multiple tasks in a single visit so you don't coordinate different contractors for every little job.",
      "Our handymen are equipped for general repairs, mounting, assembly, caulking, and basic maintenance across apartments, villas, and commercial spaces.",
      "Save time and avoid DIY frustration. Book a handyman and get your to-do list cleared efficiently.",
    ],
    scopeTitle: "Common Handyman Tasks",
    scopeItems: (() => {
      const img = getScopeImages("handyman");
      return [
      {
        title: "Repairs & Fixes",
        description: "Doors, hinges, locks, drywall patches, and general wear-and-tear repairs.",
        image: img.assessment,
        imageAlt: "Home repairs",
      },
      {
        title: "Assembly & Installation",
        description: "Furniture assembly, TV mounting, curtain rods, shelves, and light fixtures.",
        image: img.delivery,
        imageAlt: "Furniture assembly",
      },
      {
        title: "Maintenance Checks",
        description: "Identify issues early and fix them before they become costly problems.",
        image: img.qualityCheck,
        imageAlt: "Home maintenance",
      },
    ];
    })(),
  },
  "spa-at-home": {
    heroTitle: "Luxury Spa Treatments in the Comfort of Your Home",
    heroDescription:
      "A trained spa therapist visits your home to provide massages, facials, and wellness treatments — relaxation without leaving your door.",
    introTitle: "Spa Services at Home with HomeSewa",
    introParagraphs: [
      "Skip the traffic and waiting rooms. A HomeSewa spa professional comes to your home and provides massages, body scrubs, facials, and aromatherapy sessions with premium products.",
      "Perfect for busy professionals, new parents, or anyone who wants a private wellness session delivered at home by a verified therapist.",
      "Choose individual treatments or curated spa packages for couples and special occasions.",
    ],
    scopeTitle: "Popular Spa Treatments",
    scopeItems: (() => {
      const img = getScopeImages("spa-at-home");
      return [
      {
        title: "Relaxation Massage",
        description: "Swedish and aromatherapy massages to relieve stress and improve circulation.",
        image: img.assessment,
        imageAlt: "Relaxation massage at home",
      },
      {
        title: "Body Treatments",
        description: "Scrubs, wraps, and detox treatments for smoother, refreshed skin.",
        image: img.delivery,
        imageAlt: "Body spa treatment",
      },
      {
        title: "Facial & Skincare",
        description: "Deep cleansing, hydration, and glow facials tailored to your skin type.",
        image: img.qualityCheck,
        imageAlt: "Facial at home",
      },
    ];
    })(),
  },
  "salon-at-home": {
    heroTitle: "Professional Salon Services at Your Home",
    heroDescription:
      "A verified beauty professional visits your home for haircuts, styling, skincare, and makeup — salon-quality service without the salon visit.",
    introTitle: "Salon Services at Home with HomeSewa",
    introParagraphs: [
      "HomeSewa connects you with skilled beauty professionals who come to your home and provide salon services on-site. From haircuts and blowouts to skincare and makeup, the service is delivered by an individual expert at your location.",
      "No need to travel or wait at a salon. Book a time that suits you, and a verified professional arrives with the tools and products needed to complete your service at home.",
      "Ideal for busy schedules, family appointments, or anyone who prefers personal care in the comfort of their own space.",
    ],
    scopeTitle: "What's Included",
    scopeItems: (() => {
      const img = getScopeImages("salon-at-home");
      return [
        {
          title: "On-Site Assessment",
          description:
            "Your assigned professional reviews your requirements and prepares to provide salon services at your home.",
          image: img.assessment,
          imageAlt: "Salon service assessment at home",
        },
        {
          title: "Expert Service Delivery",
          description:
            "A beauty professional provides haircut, styling, skincare, or makeup services at your home using industry-standard tools.",
          image: img.delivery,
          imageAlt: "Salon service provided at home",
        },
        {
          title: "Final Quality Check",
          description:
            "We confirm you are satisfied with the service before the professional completes the visit.",
          image: img.qualityCheck,
          imageAlt: "Salon service quality check",
        },
      ];
    })(),
    faqs: [
      {
        id: 1,
        question: "What's included when a professional provides salon services at my home?",
        answer:
          "A verified beauty professional visits your home and provides services such as haircuts, styling, skincare, and makeup. They bring the tools and products needed to complete the service at your location.",
      },
      {
        id: 2,
        question: "How do I book salon services at home?",
        answer:
          'Click "Book Salon at Home" on this page or visit our booking page, select salon services at home, pick a date, and confirm your appointment.',
      },
      {
        id: 3,
        question: "Are HomeSewa professionals verified?",
        answer:
          "Yes. Every professional on our platform is background-checked, skill-assessed, and rated by customers after each job.",
      },
      {
        id: 4,
        question: "Which cities do you serve?",
        answer: "HomeSewa provides home services in Kathmandu and nearby areas.",
      },
      {
        id: 5,
        question: "What if I am not satisfied with the service?",
        answer:
          "Contact us within 24 hours of your appointment. HomeSewa will review the issue and arrange a re-visit or resolution at no extra cost where applicable.",
      },
    ],
  },
  plumbing: {
    heroTitle: "Expert Plumbing Services — Leaks, Installs & Repairs",
    heroDescription:
      "Fast response for dripping taps, blocked drains, pipe leaks, and bathroom installations across Kathmandu.",
    introTitle: "Professional Plumbing You Can Trust",
    introParagraphs: [
      "Plumbing problems don't wait. HomeSewa connects you with licensed plumbers who diagnose issues accurately and fix them with durable parts.",
      "From emergency leak repairs to new fixture installations, we handle residential and small commercial plumbing with transparent upfront quotes.",
      "Prevent water damage and high bills — schedule a plumber before a small drip becomes a major repair.",
    ],
    scopeTitle: "Plumbing Services We Handle",
    scopeItems: (() => {
      const img = getScopeImages("plumbing");
      return [
      {
        title: "Leak & Pipe Repairs",
        description: "Fixing leaks, burst pipes, and corroded fittings before damage spreads.",
        image: img.assessment,
        imageAlt: "Pipe repair",
      },
      {
        title: "Drain & Blockage Clearing",
        description: "Unclogging sinks, toilets, and main lines with proper tools and techniques.",
        image: img.delivery,
        imageAlt: "Drain clearing",
      },
      {
        title: "Fixture Installation",
        description: "Taps, showers, geysers, and bathroom accessories installed correctly.",
        image: img.qualityCheck,
        imageAlt: "Fixture installation",
      },
    ];
    })(),
  },
  "ac-services": {
    heroTitle: "AC Servicing, Repair & Maintenance",
    heroDescription:
      "Keep your air conditioner running efficiently with filter cleaning, coil maintenance, gas checks, and seasonal tune-ups.",
    introTitle: "Complete AC Care by HomeSewa",
    introParagraphs: [
      "A poorly maintained AC drives up electricity bills and circulates dust and allergens. HomeSewa AC services cover split, window, and central units for homes and offices.",
      "Our technicians clean filters and coils, check refrigerant levels, inspect electrical components, and optimize cooling performance.",
      "We recommend servicing at least twice a year — before summer peak and after heavy use season.",
    ],
    scopeTitle: "AC Service Scope",
    scopeItems: (() => {
      const img = getScopeImages("ac-services");
      return [
      {
        title: "Filter & Coil Cleaning",
        description: "Remove dust buildup to restore airflow and cooling efficiency.",
        image: img.assessment,
        imageAlt: "AC filter cleaning",
      },
      {
        title: "Performance Check",
        description: "Test cooling, thermostat, and electrical connections for safe operation.",
        image: img.delivery,
        imageAlt: "AC performance check",
      },
      {
        title: "Repair & Gas Top-Up",
        description: "Fix common faults and recharge refrigerant when needed.",
        image: img.qualityCheck,
        imageAlt: "AC repair",
      },
    ];
    })(),
  },
};

function mergeDetail(
  base: ServiceDetailContent,
  override?: ServiceOverride
): ServiceDetailContent {
  if (!override) return base;
  return {
    ...base,
    ...override,
    introParagraphs: override.introParagraphs ?? base.introParagraphs,
    scopeItems: override.scopeItems ?? base.scopeItems,
    faqs: override.faqs ?? base.faqs,
  };
}

export function getServiceDetail(slug: string) {
  const service = getServiceBySlug(slug);
  if (!service) return undefined;

  const base = buildDefaultDetail(service, service.category);
  const detail = mergeDetail(base, serviceOverrides[slug]);

  return { ...service, ...detail };
}

export function getAllServiceDetailSlugs(): string[] {
  return getAllServices().map((service) => service.slug);
}
