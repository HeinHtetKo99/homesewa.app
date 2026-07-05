/**
 * Canonical service list from /services (servicesCatalog.ts).
 * Use this in forms and server validation — do not duplicate service names elsewhere.
 */
export {
  getAllServices,
  getCatalogServiceTitles,
  getServiceBySlug,
  MAX_JOIN_EXPERTISE_SELECTIONS,
} from "@/app/data/servicesCatalog";

import {
  getCatalogServiceTitles,
  getServiceBySlug,
} from "@/app/data/servicesCatalog";

/** Sorted titles exactly as shown on the website services page. */
export const WEBSITE_SERVICE_TITLES: readonly string[] =
  getCatalogServiceTitles();

export function isWebsiteServiceTitle(value: string): boolean {
  return WEBSITE_SERVICE_TITLES.includes(value.trim());
}

export function websiteServiceTitleFromSlug(
  slug: string,
): string | undefined {
  return getServiceBySlug(slug.trim().toLowerCase())?.title.trim();
}
