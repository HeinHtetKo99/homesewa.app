/** Scope card images live at /public/services/{folder}/{filename} */

export type ScopeImageSet = {
  assessment: string;
  delivery: string;
  qualityCheck: string;
};

/** Slug -> folder name when they differ */
const scopeFolderOverrides: Record<string, string> = {
  plumbing: "plumbing-repair",
  "electrical-repairs": "electrical-repair",
  "home-renovation": "handyman/home-renovation",
};

const scopePath = (slug: string, file: string) =>
  `/services/${scopeFolderOverrides[slug] ?? slug}/${file}`;

const numbered = (slug: string): ScopeImageSet => ({
  assessment: scopePath(slug, "1.jpg"),
  delivery: scopePath(slug, "2.jpg"),
  qualityCheck: scopePath(slug, "3.jpg"),
});

const descriptive = (slug: string): ScopeImageSet => ({
  assessment: scopePath(slug, "01-assessment.jpg"),
  delivery: scopePath(slug, "02-delivery.jpg"),
  qualityCheck: scopePath(slug, "03-quality-check.jpg"),
});

const custom = (
  slug: string,
  assessment: string,
  delivery: string,
  qualityCheck: string
): ScopeImageSet => ({
  assessment: scopePath(slug, assessment),
  delivery: scopePath(slug, delivery),
  qualityCheck: scopePath(slug, qualityCheck),
});

/** Per-service scope images keyed by catalog slug */
export const defaultScopeFiles: Record<string, ScopeImageSet> = {
  "salon-at-home": descriptive("salon-at-home"),
  "bridal-makeup": numbered("bridal-makeup"),
  "chef-at-home": numbered("chef-at-home"),
  "massage-therapy": descriptive("massage-therapy"),
  physiotherapy: descriptive("physiotherapy"),
  handyman: custom(
    "handyman",
    "01-repairs-fixes.jpg",
    "02-assembly-installation.jpg",
    "03-maintenance-checks.jpg"
  ),
  carpentry: numbered("carpentry"),
  plumbing: custom(
    "plumbing",
    "01-leak-pipe-repairs.jpg",
    "02-drain-clearing.jpg",
    "03-fixture-installation.jpg"
  ),
  "electrical-repairs": descriptive("electrical-repairs"),
  tiling: descriptive("tiling"),
  "washing-machine-repair": descriptive("washing-machine-repair"),
  "home-automation": descriptive("home-automation"),
  "ev-charger-installation": descriptive("ev-charger-installation"),
  "ac-services": numbered("ac-services"),
  painting: descriptive("painting"),
  "indoor-planting": descriptive("indoor-planting"),
  "cctv-services": numbered("cctv-services"),
  "drywall-repair": numbered("drywall-repair"),
  "modular-kitchen": descriptive("modular-kitchen"),
  parqueting: descriptive("parqueting"),
  "home-renovation": descriptive("home-renovation"),
  "ro-water-purifying": descriptive("ro-water-purifying"),
  "garden-care": descriptive("garden-care"),
  "pest-control": descriptive("pest-control"),
  "masonry-repair": descriptive("masonry-repair"),
  "deep-cleaning": numbered("deep-cleaning"),
  "packing-and-moving": descriptive("packing-and-moving"),
  "airbnb-maintenance": numbered("airbnb-maintenance"),
  "refrigerator-repair": descriptive("refrigerator-repair"),
  "spa-at-home": custom(
    "spa-at-home",
    "01-relaxation-massage.jpg",
    "02-body-treatments.jpg",
    "03-facial-skincare.jpg"
  ),
};

export function getScopeImages(slug: string): ScopeImageSet {
  return defaultScopeFiles[slug] ?? descriptive(slug);
}
