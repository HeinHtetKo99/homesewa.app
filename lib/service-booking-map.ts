import { getCatalogServiceTitles, getServiceBySlug } from "@/app/data/servicesCatalog";

export type BookingService = string;

export function resolveBookingService(
  param: string | null | undefined,
): BookingService | null {
  if (!param) return null;

  const slug = param.trim().toLowerCase();
  const fromSlug = getServiceBySlug(slug);
  if (fromSlug) return fromSlug.title.trim();

  const decoded = decodeURIComponent(param).trim();
  if (getCatalogServiceTitles().includes(decoded)) {
    return decoded;
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
