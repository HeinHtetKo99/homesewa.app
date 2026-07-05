import { getCatalogServiceTitles } from "@/app/data/servicesCatalog";

export const BOOKING_CITY = "Kathmandu" as const;

export const Kathmandu_AREAS = [
  "Asan",
  "Balaju",
  "Baluwatar",
  "Baneshwor",
  "Basundhara",
  "Bhaisepati",
  "Bhaktapur",
  "Bouddha",
  "Budhanilkantha",
  "Chabahil",
  "Changunarayan",
  "Chundevi",
  "Dhapasi",
  "Durbar Marg",
  "Ekantakuna",
  "Gaushala",
  "Godawari",
  "Gongabu",
  "Gwarko",
  "Gyaneshwor",
  "Harisiddhi",
  "Imadol",
  "Jawalakhel",
  "Jorpati",
  "Kalanki",
  "Kalimati",
  "Kamalbinayak",
  "Kamalpokhari",
  "Kirtipur",
  "Koteshwor",
  "Khusibu",
  "Kupondole",
  "Lagankhel",
  "Lazimpat",
  "Machhapokhari",
  "Maharajgunj",
  "Mangal Bazar",
  "Naikap",
  "Nayabazar",
  "New Baneshwor",
  "New Road",
  "Patan",
  "Pulchowk",
  "Putalisadak",
  "Ranibari",
  "Samakhusi",
  "Sanepa",
  "Satdobato",
  "Sitapaila",
  "Sinamangal",
  "Sukedhara",
  "Sundhara",
  "Suryabinayak",
  "Swayambhu",
  "Teku",
  "Thamel",
  "Thaiba",
  "Thankot",
  "Thimi",
  "Tokha",
  "Tripureshwor",
] as const;

export const PROPERTY_TYPES = [
  "High-rise apartments",
  "Low-rise / walk-up apartments",
  "Condominiums (condos)",
  "Detached houses",
  "Victorian / Edwardian homes",
  "Modern / contemporary homes",
  "Duplex / Triplex / Fourplex",
  "Small apartment buildings",
  "Townhouses",
  "Luxury Properties / Villas",
  "Airbnb / vacation rentals",
  "Co-living spaces",
] as const;

/** Matches /services page — same list as Join as a Professional expertise field. */
export const BOOKING_SERVICES: readonly string[] = getCatalogServiceTitles();

export const BOOKING_SHIFTS = [
  "Morning",
  "Day",
  "Afternoon",
  "Night",
] as const;

export const BUDGET_OPTIONS = [
  "Below 1 Lakh",
  "Below 5 Lakh",
  "Below 10 Lakh",
  "Below 25 Lakh",
  "Above 25 Lakh",
] as const;

export const BOOKING_PRIORITIES = ["Urgent", "Normal"] as const;

export const REFERRAL_SOURCES = [
  "Google Search",
  "Google Maps",
  "Yelp",
  "Facebook",
  "Instagram",
  "TikTok",
  "YouTube",
  "Nextdoor",
  "Referral from Friend/Family",
  "Referral from Neighbor",
  "Property Manager",
  "Real Estate Agent",
  "Previous Customer",
  "Flyer / Door Hanger",
  "Vehicle Signage",
  "Local Event / Community Event",
  "Online Advertisement",
  "Email Newsletter",
  "WhatsApp",
  "Craigslist",
  "Thumbtack",
  "Angi (Angie's List)",
  "HomeAdvisor",
  "Search Engine Ads",
  "Blog or Article",
  "BIRATINFO",
  "TACKLES Handyman",
  "Other",
] as const;

/** Exact Airtable Booking column name (attachment field). */
export const BOOKING_PHOTO_FIELD = "Add photos/ picture";

export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export const MAX_PHOTOS = 5;
