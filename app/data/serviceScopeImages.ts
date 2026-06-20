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
    assessment: scopeBase("salon-at-home", "01-assessment.jpg"),
    delivery: scopeBase("salon-at-home", "02-delivery.jpg"),
    qualityCheck: scopeBase("salon-at-home", "03-quality-check.jpg"),
  },
  "bridal-makeup": {
    assessment: scopeBase("bridal-makeup", "01-assessment.jpg"),
    delivery: scopeBase("bridal-makeup", "02-delivery.jpg"),
    qualityCheck: scopeBase("bridal-makeup", "03-quality-check.jpg"),
  },
  "chef-at-home": {
    assessment: scopeBase("chef-at-home", "01-assessment.jpg"),
    delivery: scopeBase("chef-at-home", "02-delivery.jpg"),
    qualityCheck: scopeBase("chef-at-home", "03-quality-check.jpg"),
  },
  "massage-therapy": {
    assessment: scopeBase("massage-therapy", "01-assessment.jpg"),
    delivery: scopeBase("massage-therapy", "02-delivery.jpg"),
    qualityCheck: scopeBase("massage-therapy", "03-quality-check.jpg"),
  },
  physiotherapy: {
    assessment: scopeBase("physiotherapy", "01-assessment.jpg"),
    delivery: scopeBase("physiotherapy", "02-delivery.jpg"),
    qualityCheck: scopeBase("physiotherapy", "03-quality-check.jpg"),
  },
  handyman: {
    assessment: scopeBase("handyman", "01-repairs-fixes.jpg"),
    delivery: scopeBase("handyman", "02-assembly-installation.jpg"),
    qualityCheck: scopeBase("handyman", "03-maintenance-checks.jpg"),
  },
  carpentry: {
    assessment: scopeBase("carpentry", "01-assessment.jpg"),
    delivery: scopeBase("carpentry", "02-delivery.jpg"),
    qualityCheck: scopeBase("carpentry", "03-quality-check.jpg"),
  },
  plumbing: {
    assessment: scopeBase("plumbing", "01-leak-pipe-repairs.jpg"),
    delivery: scopeBase("plumbing", "02-drain-clearing.jpg"),
    qualityCheck: scopeBase("plumbing", "03-fixture-installation.jpg"),
  },
  "electrical-repairs": {
    assessment: scopeBase("electrical-repairs", "01-assessment.jpg"),
    delivery: scopeBase("electrical-repairs", "02-delivery.jpg"),
    qualityCheck: scopeBase("electrical-repairs", "03-quality-check.jpg"),
  },
  tiling: {
    assessment: scopeBase("tiling", "01-assessment.jpg"),
    delivery: scopeBase("tiling", "02-delivery.jpg"),
    qualityCheck: scopeBase("tiling", "03-quality-check.jpg"),
  },
  "washing-machine-repair": {
    assessment: scopeBase("washing-machine-repair", "01-assessment.jpg"),
    delivery: scopeBase("washing-machine-repair", "02-delivery.jpg"),
    qualityCheck: scopeBase("washing-machine-repair", "03-quality-check.jpg"),
  },
  "home-automation": {
    assessment: scopeBase("home-automation", "01-assessment.jpg"),
    delivery: scopeBase("home-automation", "02-delivery.jpg"),
    qualityCheck: scopeBase("home-automation", "03-quality-check.jpg"),
  },
  "ev-charger-installation": {
    assessment: scopeBase("ev-charger-installation", "01-assessment.jpg"),
    delivery: scopeBase("ev-charger-installation", "02-delivery.jpg"),
    qualityCheck: scopeBase("ev-charger-installation", "03-quality-check.jpg"),
  },
  "ac-services": {
    assessment: scopeBase("ac-services", "01-filter-coil-cleaning.jpg"),
    delivery: scopeBase("ac-services", "02-performance-check.jpg"),
    qualityCheck: scopeBase("ac-services", "03-repair-gas-topup.jpg"),
  },
  painting: {
    assessment: scopeBase("painting", "01-assessment.jpg"),
    delivery: scopeBase("painting", "02-delivery.jpg"),
    qualityCheck: scopeBase("painting", "03-quality-check.jpg"),
  },
  "indoor-planting": {
    assessment: scopeBase("indoor-planting", "01-assessment.jpg"),
    delivery: scopeBase("indoor-planting", "02-delivery.jpg"),
    qualityCheck: scopeBase("indoor-planting", "03-quality-check.jpg"),
  },
  "cctv-services": {
    assessment: scopeBase("cctv-services", "01-assessment.jpg"),
    delivery: scopeBase("cctv-services", "02-delivery.jpg"),
    qualityCheck: scopeBase("cctv-services", "03-quality-check.jpg"),
  },
  "drywall-repair": {
    assessment: scopeBase("drywall-repair", "01-assessment.jpg"),
    delivery: scopeBase("drywall-repair", "02-delivery.jpg"),
    qualityCheck: scopeBase("drywall-repair", "03-quality-check.jpg"),
  },
  "modular-kitchen": {
    assessment: scopeBase("modular-kitchen", "01-assessment.jpg"),
    delivery: scopeBase("modular-kitchen", "02-delivery.jpg"),
    qualityCheck: scopeBase("modular-kitchen", "03-quality-check.jpg"),
  },
  parqueting: {
    assessment: scopeBase("parqueting", "01-assessment.jpg"),
    delivery: scopeBase("parqueting", "02-delivery.jpg"),
    qualityCheck: scopeBase("parqueting", "03-quality-check.jpg"),
  },
  "home-renovation": {
    assessment: scopeBase("home-renovation", "01-assessment.jpg"),
    delivery: scopeBase("home-renovation", "02-delivery.jpg"),
    qualityCheck: scopeBase("home-renovation", "03-quality-check.jpg"),
  },
  "ro-water-purifying": {
    assessment: scopeBase("ro-water-purifying", "01-assessment.jpg"),
    delivery: scopeBase("ro-water-purifying", "02-delivery.jpg"),
    qualityCheck: scopeBase("ro-water-purifying", "03-quality-check.jpg"),
  },
  "garden-care": {
    assessment: scopeBase("garden-care", "01-assessment.jpg"),
    delivery: scopeBase("garden-care", "02-delivery.jpg"),
    qualityCheck: scopeBase("garden-care", "03-quality-check.jpg"),
  },
  "pest-control": {
    assessment: scopeBase("pest-control", "01-assessment.jpg"),
    delivery: scopeBase("pest-control", "02-delivery.jpg"),
    qualityCheck: scopeBase("pest-control", "03-quality-check.jpg"),
  },
  "masonry-repair": {
    assessment: scopeBase("masonry-repair", "01-assessment.jpg"),
    delivery: scopeBase("masonry-repair", "02-delivery.jpg"),
    qualityCheck: scopeBase("masonry-repair", "03-quality-check.jpg"),
  },
  "deep-cleaning": {
    assessment: scopeBase("deep-cleaning", "01-kitchen-deep-clean.jpg"),
    delivery: scopeBase("deep-cleaning", "02-bathroom-sanitization.jpg"),
    qualityCheck: scopeBase("deep-cleaning", "03-living-room-refresh.jpg"),
  },
  "packing-and-moving": {
    assessment: scopeBase("packing-and-moving", "01-assessment.jpg"),
    delivery: scopeBase("packing-and-moving", "02-delivery.jpg"),
    qualityCheck: scopeBase("packing-and-moving", "03-quality-check.jpg"),
  },
  "airbnb-maintenance": {
    assessment: scopeBase("airbnb-maintenance", "01-assessment.jpg"),
    delivery: scopeBase("airbnb-maintenance", "02-delivery.jpg"),
    qualityCheck: scopeBase("airbnb-maintenance", "03-quality-check.jpg"),
  },
  "refrigerator-repair": {
    assessment: scopeBase("refrigerator-repair", "01-assessment.jpg"),
    delivery: scopeBase("refrigerator-repair", "02-delivery.jpg"),
    qualityCheck: scopeBase("refrigerator-repair", "03-quality-check.jpg"),
  },
  "spa-at-home": {
    assessment: scopeBase("spa-at-home", "01-relaxation-massage.jpg"),
    delivery: scopeBase("spa-at-home", "02-body-treatments.jpg"),
    qualityCheck: scopeBase("spa-at-home", "03-facial-skincare.jpg"),
  },
};

export function getScopeImages(slug: string): ScopeImageSet {
  return (
    defaultScopeFiles[slug] ?? {
      assessment: scopeBase(slug, "01-assessment.jpg"),
      delivery: scopeBase(slug, "02-delivery.jpg"),
      qualityCheck: scopeBase(slug, "03-quality-check.jpg"),
    }
  );
}
