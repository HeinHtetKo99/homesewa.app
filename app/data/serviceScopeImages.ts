/** Scope card images live at /public/services/scope/{slug}/{filename} */

export type ScopeImageSet = {
  assessment: string;
  delivery: string;
  qualityCheck: string;
};

const scopeBase = (slug: string, file: string) => `/services/scope/${slug}/${file}`;

/** Default 3-step scope images used by most services */
export const defaultScopeFiles: Record<string, ScopeImageSet> = {
  "salon-at-home": {
    assessment: scopeBase("salon-at-home", "1.jpg"),
    delivery: scopeBase("salon-at-home", "2.jpg"),
    qualityCheck: scopeBase("salon-at-home", "3.jpg"),
  },
  "bridal-makeup": {
    assessment: scopeBase("bridal-makeup", "1.jpg"),
    delivery: scopeBase("bridal-makeup", "2.jpg"),
    qualityCheck: scopeBase("bridal-makeup", "3.jpg"),
  },
  "chef-at-home": {
    assessment: scopeBase("chef-at-home", "1.jpg"),
    delivery: scopeBase("chef-at-home", "2.jpg"),
    qualityCheck: scopeBase("chef-at-home", "3.jpg"),
  },
  "massage-therapy": {
    assessment: scopeBase("massage-therapy", "1.jpg"),
    delivery: scopeBase("massage-therapy", "2.jpg"),
    qualityCheck: scopeBase("massage-therapy", "3.jpg"),
  },
  physiotherapy: {
    assessment: scopeBase("physiotherapy", "1.jpg"),
    delivery: scopeBase("physiotherapy", "2.jpg"),
    qualityCheck: scopeBase("physiotherapy", "3.jpg"),
  },
  handyman: {
    assessment: scopeBase("handyman", "1.jpg"),
    delivery: scopeBase("handyman", "2.jpg"),
    qualityCheck: scopeBase("handyman", "3.jpg"),
  },
  carpentry: {
    assessment: scopeBase("carpentry", "1.jpg"),
    delivery: scopeBase("carpentry", "2.jpg"),
    qualityCheck: scopeBase("carpentry", "3.jpg"),
  },
  plumbing: {
    assessment: scopeBase("plumbing", "1.jpg"),
    delivery: scopeBase("plumbing", "2.jpg"),
    qualityCheck: scopeBase("plumbing", "3.jpg"),
  },
  "electrical-repairs": {
    assessment: scopeBase("electrical-repairs", "1.jpg"),
    delivery: scopeBase("electrical-repairs", "2.jpg"),
    qualityCheck: scopeBase("electrical-repairs", "3.jpg"),
  },
  tiling: {
    assessment: scopeBase("tiling", "1.jpg"),
    delivery: scopeBase("tiling", "2.jpg"),
    qualityCheck: scopeBase("tiling", "3.jpg"),
  },
  "washing-machine-repair": {
    assessment: scopeBase("washing-machine-repair", "1.jpg"),
    delivery: scopeBase("washing-machine-repair", "2.jpg"),
    qualityCheck: scopeBase("washing-machine-repair", "3.jpg"),
  },
  "home-automation": {
    assessment: scopeBase("home-automation", "1.jpg"),
    delivery: scopeBase("home-automation", "2.jpg"),
    qualityCheck: scopeBase("home-automation", "3.jpg"),
  },
  "ev-charger-installation": {
    assessment: scopeBase("ev-charger-installation", "1.jpg"),
    delivery: scopeBase("ev-charger-installation", "2.jpg"),
    qualityCheck: scopeBase("ev-charger-installation", "3.jpg"),
  },
  "ac-services": {
    assessment: scopeBase("ac-services", "1.jpg"),
    delivery: scopeBase("ac-services", "2.jpg"),
    qualityCheck: scopeBase("ac-services", "3.jpg"),
  },
  painting: {
    assessment: scopeBase("painting", "1.jpg"),
    delivery: scopeBase("painting", "2.jpg"),
    qualityCheck: scopeBase("painting", "3.jpg"),
  },
  "indoor-planting": {
    assessment: scopeBase("indoor-planting", "1.jpg"),
    delivery: scopeBase("indoor-planting", "2.jpg"),
    qualityCheck: scopeBase("indoor-planting", "3.jpg"),
  },
  "cctv-services": {
    assessment: scopeBase("cctv-services", "1.jpg"),
    delivery: scopeBase("cctv-services", "2.jpg"),
    qualityCheck: scopeBase("cctv-services", "3.jpg"),
  },
  "drywall-repair": {
    assessment: scopeBase("drywall-repair", "1.jpg"),
    delivery: scopeBase("drywall-repair", "2.jpg"),
    qualityCheck: scopeBase("drywall-repair", "3.jpg"),
  },
  "modular-kitchen": {
    assessment: scopeBase("modular-kitchen", "1.jpg"),
    delivery: scopeBase("modular-kitchen", "2.jpg"),
    qualityCheck: scopeBase("modular-kitchen", "3.jpg"),
  },
  parqueting: {
    assessment: scopeBase("parqueting", "1.jpg"),
    delivery: scopeBase("parqueting", "2.jpg"),
    qualityCheck: scopeBase("parqueting", "3.jpg"),
  },
  "home-renovation": {
    assessment: scopeBase("home-renovation", "1.jpg"),
    delivery: scopeBase("home-renovation", "2.jpg"),
    qualityCheck: scopeBase("home-renovation", "3.jpg"),
  },
  "ro-water-purifying": {
    assessment: scopeBase("ro-water-purifying", "1.jpg"),
    delivery: scopeBase("ro-water-purifying", "2.jpg"),
    qualityCheck: scopeBase("ro-water-purifying", "3.jpg"),
  },
  "garden-care": {
    assessment: scopeBase("garden-care", "1.jpg"),
    delivery: scopeBase("garden-care", "2.jpg"),
    qualityCheck: scopeBase("garden-care", "3.jpg"),
  },
  "pest-control": {
    assessment: scopeBase("pest-control", "1.jpg"),
    delivery: scopeBase("pest-control", "2.jpg"),
    qualityCheck: scopeBase("pest-control", "3.jpg"),
  },
  "masonry-repair": {
    assessment: scopeBase("masonry-repair", "1.jpg"),
    delivery: scopeBase("masonry-repair", "2.jpg"),
    qualityCheck: scopeBase("masonry-repair", "3.jpg"),
  },
  "deep-cleaning": {
    assessment: scopeBase("deep-cleaning", "1.jpg"),
    delivery: scopeBase("deep-cleaning", "2.jpg"),
    qualityCheck: scopeBase("deep-cleaning", "3.jpg"),
  },
  "packing-and-moving": {
    assessment: scopeBase("packing-and-moving", "1.jpg"),
    delivery: scopeBase("packing-and-moving", "2.jpg"),
    qualityCheck: scopeBase("packing-and-moving", "3.jpg"),
  },
  "airbnb-maintenance": {
    assessment: scopeBase("airbnb-maintenance", "1.jpg"),
    delivery: scopeBase("airbnb-maintenance", "2.jpg"),
    qualityCheck: scopeBase("airbnb-maintenance", "3.jpg"),
  },
  "refrigerator-repair": {
    assessment: scopeBase("refrigerator-repair", "1.jpg"),
    delivery: scopeBase("refrigerator-repair", "2.jpg"),
    qualityCheck: scopeBase("refrigerator-repair", "3.jpg"),
  },
  "spa-at-home": {
    assessment: scopeBase("spa-at-home", "1.jpg"),
    delivery: scopeBase("spa-at-home", "2.jpg"),
    qualityCheck: scopeBase("spa-at-home", "3.jpg"),
  },
};

export function getScopeImages(slug: string): ScopeImageSet {
  return (
    defaultScopeFiles[slug] ?? {
      assessment: scopeBase(slug, "1.jpg"),
      delivery: scopeBase(slug, "2.jpg"),
      qualityCheck: scopeBase(slug, "3.jpg"),
    }
  );
}
