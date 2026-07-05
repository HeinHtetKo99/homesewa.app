import { BOOKING_SERVICES } from "@/lib/book-form-options";

export type BookingService = (typeof BOOKING_SERVICES)[number];

const SERVICE_SLUG_TO_BOOKING: Record<string, BookingService> = {
  "salon-at-home": "Other",
  "bridal-makeup": "Other",
  "chef-at-home": "Other",
  "massage-therapy": "Other",
  "spa-at-home": "Other",
  physiotherapy: "Other",
  handyman: "Handyman / Small Repairs",
  carpentry: "Carpentry",
  plumbing: "Plumbing",
  "electrical-repairs": "Electrical Repairs",
  tiling: "Tile Installation & Repair",
  "washing-machine-repair": "Other",
  "home-automation": "Smart Home & Fixture Installations",
  "ev-charger-installation": "EV Charger Installation",
  "ac-services": "AC Maintenance & Servicing",
  painting: "Painting & Decorating",
  "indoor-planting": "Planting and Transplanting",
  "cctv-services": "Smart Home & Fixture Installations",
  "drywall-repair": "Drywall Repair & Installation",
  "modular-kitchen": "Other",
  parqueting: "Flooring & Surface Fixes",
  "home-renovation": "Other",
  "ro-water-purifying": "Other",
  "garden-care": "Garden Maintenance",
  "pest-control": "Pest Control",
  "masonry-repair": "Other",
  "deep-cleaning": "Deep Cleaning",
  "packing-and-moving": "Moving & Furniture Assembly",
  "airbnb-maintenance": "Airbnb Property Maintenance",
  "refrigerator-repair": "Other",
};

export function resolveBookingService(
  param: string | null | undefined,
): BookingService | null {
  if (!param) return null;

  const slug = param.trim().toLowerCase();
  if (SERVICE_SLUG_TO_BOOKING[slug]) {
    return SERVICE_SLUG_TO_BOOKING[slug];
  }

  const decoded = decodeURIComponent(param).trim();
  if ((BOOKING_SERVICES as readonly string[]).includes(decoded)) {
    return decoded as BookingService;
  }

  return null;
}

export function bookUrlForServiceSlug(slug: string): string {
  return `/book?service=${encodeURIComponent(slug)}`;
}

export function serviceSlugFromHref(href?: string): string | undefined {
  if (!href) return undefined;
  const match = href.match(/^\/services\/([^/?#]+)\/?$/);
  return match?.[1];
}
