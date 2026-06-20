export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
};

function postContent(intro: string, sections: { heading: string; body: string }[]): string {
  const extra = sections
    .map((s) => `<h2>${s.heading}</h2><p>${s.body}</p>`)
    .join("");
  return `<p>${intro}</p>${extra}`;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "bathroom-cleaning",
    title: "Expert Bathroom Cleaning Services in Nepal",
    description:
      "Bathrooms are one of the most frequently used areas in any home. HomeSewa specializes in professional bathroom cleaning services across Nepal, ensuring sparkling, sanitized spaces every time.",
    image: "/blog/bathroom-cleaning.jpg",
    category: "Residential",
    date: "January 15, 2026",
    readTime: "4 min read",
    content: postContent(
      "Bathrooms are one of the most frequently used areas in any home. HomeSewa specializes in professional bathroom cleaning services across Nepal, ensuring sparkling, sanitized spaces every time. Our deep cleaning removes soap scum, grime, and harmful bacteria, even in difficult areas like behind toilets and tile grout.",
      [
        { heading: "Why Professional Bathroom Cleaning Matters", body: "Regular bathroom cleaning prevents mold, mildew, and bacteria buildup that can affect your family's health. Our trained professionals use eco-friendly products safe for children and pets." },
        { heading: "What We Clean", body: "We deep clean tiles, sinks, toilets, showers, mirrors, faucets, and grout lines. Hard water stains and soap scum are removed using specialized techniques and equipment." },
        { heading: "Book Your Service", body: "Schedule a bathroom cleaning service in Kathmandu, Bengaluru, or Mumbai through our website or mobile app. Same-day appointments may be available depending on availability." },
      ]
    ),
  },
  {
    slug: "kitchen-cleaning",
    title: "Professional Kitchen Cleaning Services in Nepal",
    description:
      "A clean kitchen is essential for a healthy home. HomeSewa offers expert kitchen cleaning, including countertops, sinks, stovetops, ovens, and floors.",
    image: "/blog/kitchen-cleaning.jpg",
    category: "Residential",
    date: "January 12, 2026",
    readTime: "4 min read",
    content: postContent(
      "A clean kitchen is essential for a healthy home. HomeSewa offers expert kitchen cleaning across Kathmandu, Mumbai, and Bengaluru, sanitizing surfaces and removing grease and stubborn stains.",
      [
        { heading: "Deep Kitchen Sanitization", body: "We clean countertops, cabinets, sinks, stovetops, ovens, and floors. Our professionals prevent food contamination and maintain a hygienic cooking environment." },
        { heading: "Eco-Friendly Products", body: "We use environmentally safe cleaning solutions that are effective against grease and bacteria without leaving harmful residues on food preparation surfaces." },
        { heading: "Flexible Scheduling", body: "Book one-time deep cleaning or recurring maintenance weekly or monthly to keep your kitchen spotless year-round." },
      ]
    ),
  },
  {
    slug: "home-cleaning",
    title: "Reliable Home Cleaning Services in Nepal",
    description:
      "Maintaining a clean home can be challenging. HomeSewa provides complete home cleaning services across Nepal, covering bedrooms, living areas, kitchens, bathrooms, floors, windows, and furniture.",
    image: "/blog/home-cleaning.jpg",
    category: "Residential",
    date: "January 10, 2026",
    readTime: "5 min read",
    content: postContent(
      "HomeSewa provides complete home cleaning services across Nepal with trained professionals and eco-friendly solutions for a hygienic, fresh, and comfortable home.",
      [
        { heading: "Comprehensive Coverage", body: "Our home cleaning includes bedrooms, living areas, kitchens, bathrooms, floors, windows, and furniture. We tailor services to apartments, houses, and villas." },
        { heading: "Deep vs Regular Cleaning", body: "Regular cleaning maintains daily tidiness while deep cleaning targets hidden grime, allergens, and hard-to-reach areas for a thorough refresh." },
        { heading: "Trusted Professionals", body: "All staff undergo training and background verification. We bring our own equipment and eco-friendly products to every job." },
      ]
    ),
  },
  {
    slug: "carpet-cleaning",
    title: "Top Carpet Cleaning Services in Nepal",
    description:
      "Carpets can harbor dust, dirt, and allergens. HomeSewa offers professional carpet cleaning in Nepal using vacuuming, stain treatment, steam cleaning, and quick drying methods.",
    image: "/blog/carpet-cleaning.jpg",
    category: "Residential",
    date: "January 8, 2026",
    readTime: "4 min read",
    content: postContent(
      "Professional carpet cleaning removes allergens, extends carpet life, and keeps your home healthy and fresh with vacuuming, stain treatment, steam cleaning, and quick drying.",
      [
        { heading: "Steam Cleaning Benefits", body: "Steam cleaning penetrates deep into carpet fibers to remove embedded dirt, dust mites, and allergens that regular vacuuming cannot reach." },
        { heading: "Stain Removal", body: "Our technicians treat stubborn stains from spills, pets, and foot traffic using fabric-safe solutions that restore your carpet's appearance." },
        { heading: "Improved Air Quality", body: "Clean carpets reduce airborne allergens and improve indoor air quality, especially important for families with allergies or asthma." },
      ]
    ),
  },
  {
    slug: "sofa-upholstery-cleaning",
    title: "Professional Sofa & Upholstery Cleaning",
    description:
      "Your sofas and upholstered furniture accumulate dust, stains, and odors. HomeSewa provides professional sofa and upholstery cleaning in Nepal using deep steam cleaning and fabric-safe solutions.",
    image: "/blog/sofa-upholstery-cleaning.jpg",
    category: "Residential",
    date: "January 5, 2026",
    readTime: "4 min read",
    content: postContent(
      "Restore furniture hygiene, protect its lifespan, and maintain a fresh home environment with our professional sofa and upholstery cleaning services across Nepal.",
      [
        { heading: "Fabric-Safe Methods", body: "We use appropriate cleaning methods for fabric, leather, and microfiber upholstery to avoid damage while achieving deep cleanliness." },
        { heading: "Odor and Stain Removal", body: "Deep steam cleaning removes embedded odors, pet stains, and everyday spills that accumulate over time." },
        { heading: "Extend Furniture Life", body: "Regular professional cleaning protects upholstery fibers and keeps your furniture looking and feeling new for years." },
      ]
    ),
  },
  {
    slug: "move-in-out-cleaning",
    title: "Move-In & Move-Out Cleaning Services in Nepal",
    description:
      "Moving can be stressful. HomeSewa ensures every corner of your home is spotless with move-in and move-out cleaning services across Nepal.",
    image: "/blog/move-in-move-out-cleaning.jpg",
    category: "Residential",
    date: "January 3, 2026",
    readTime: "5 min read",
    content: postContent(
      "Deep cleaning, bathroom and kitchen sanitization, and debris removal make relocation seamless and hygienic with HomeSewa's move-in and move-out services.",
      [
        { heading: "Move-Out Cleaning", body: "Leave your previous property in excellent condition for landlords and new tenants. We clean every room, appliance, and fixture thoroughly." },
        { heading: "Move-In Cleaning", body: "Start fresh in your new home with sanitized bathrooms, kitchens, floors, and closets ready for your belongings." },
        { heading: "Post-Renovation Ready", body: "We remove construction dust and debris so your newly renovated space is safe and comfortable from day one." },
      ]
    ),
  },
  {
    slug: "sanitization",
    title: "Trusted Disinfection and Sanitization Services",
    description:
      "Maintain a germ-free environment with HomeSewa's professional disinfection services for homes, offices, and commercial spaces.",
    image: "/blog/disinfection-sanitization-services.jpg",
    category: "Commercial",
    date: "December 28, 2025",
    readTime: "4 min read",
    content: postContent(
      "Surface disinfection, high-touch area sanitization, and eco-friendly disinfectants keep homes, offices, and commercial spaces healthier and safer.",
      [
        { heading: "High-Touch Surfaces", body: "We focus on door handles, switches, desks, restrooms, and shared equipment where germs spread most easily." },
        { heading: "Healthcare Standards", body: "Our protocols meet strict hygiene requirements for hospitals, clinics, offices, and hospitality venues across Nepal." },
        { heading: "Eco-Friendly Disinfectants", body: "We use effective yet safe disinfectants that protect people and the environment without harsh chemical residues." },
      ]
    ),
  },
  {
    slug: "ac-cleaning",
    title: "Air Conditioner Cleaning Services in Nepal",
    description:
      "Dirty AC units circulate dust and reduce efficiency. HomeSewa provides AC cleaning services in Nepal to remove dust, allergens, and bacteria.",
    image: "/blog/ac-cleaning.jpg",
    category: "Residential",
    date: "December 25, 2025",
    readTime: "4 min read",
    content: postContent(
      "Improve air quality and cooling efficiency with professional AC cleaning that removes dust, allergens, and bacteria from filters, coils, and ducts.",
      [
        { heading: "Filter and Coil Cleaning", body: "Clean filters and coils improve airflow and reduce energy consumption by up to 15%, lowering your electricity bills." },
        { heading: "Better Indoor Air", body: "Regular AC maintenance prevents mold and bacteria from circulating through your home or office ventilation system." },
        { heading: "Extend AC Lifespan", body: "Professional servicing twice a year can extend your unit's life by years and prevent costly breakdowns during peak summer months." },
      ]
    ),
  },
  {
    slug: "laptop-cleaning",
    title: "Laptop Cleaning Services in Nepal",
    description:
      "Protect your devices with HomeSewa's professional laptop cleaning services across Nepal.",
    image: "/blog/laptop-cleaning.jpg",
    category: "Office",
    date: "December 20, 2025",
    readTime: "3 min read",
    content: postContent(
      "We remove dust from vents, clean screens, and safely sanitize components to prevent overheating and hardware issues.",
      [
        { heading: "Vent and Fan Cleaning", body: "Dust buildup in vents causes overheating and performance issues. Our technicians safely clean internal components without damaging hardware." },
        { heading: "Screen and Keyboard", body: "Professional screen and keyboard cleaning removes fingerprints, bacteria, and debris for a hygienic workspace." },
        { heading: "Office Packages", body: "We offer bulk laptop cleaning for offices, schools, and co-working spaces across Kathmandu and nearby regions." },
      ]
    ),
  },
  {
    slug: "desktop-cleaning",
    title: "Professional Desktop Cleaning Services in Nepal",
    description:
      "Clean workstations improve productivity and hygiene. HomeSewa provides desktop cleaning services across Nepal for offices and home workstations.",
    image: "/blog/desktop-cleaning.jpg",
    category: "Office",
    date: "December 18, 2025",
    readTime: "3 min read",
    content: postContent(
      "Dusting, sanitizing, and organizing cables keep your desktop and workstation clean, productive, and hygienic.",
      [
        { heading: "Complete Workstation Care", body: "We clean monitors, keyboards, mice, desks, and CPU units using safe methods that protect electronics." },
        { heading: "Office Hygiene", body: "Regular desktop cleaning reduces germ spread in shared offices and improves employee health and productivity." },
        { heading: "Scheduled Maintenance", body: "Weekly or monthly desktop cleaning packages are available for corporate clients across Nepal." },
      ]
    ),
  },
  {
    slug: "aircraft-cleaning",
    title: "Aeroplane & Helicopter Cleaning Services in Nepal",
    description:
      "Aircraft interiors require professional cleaning for hygiene and passenger comfort. HomeSewa provides thorough aeroplane and helicopter cleaning services across Nepal.",
    image: "/blog/helicopter-cleaning.jpg",
    category: "Specialized",
    date: "December 15, 2025",
    readTime: "5 min read",
    content: postContent(
      "Cabin sanitization and upholstery care for aircraft interiors meet strict aviation hygiene and safety standards.",
      [
        { heading: "Cabin Sanitization", body: "We deep clean seats, overhead bins, galleys, and lavatories using aviation-approved products and procedures." },
        { heading: "Upholstery Care", body: "Fabric and leather seat cleaning restores appearance and removes allergens for passenger comfort." },
        { heading: "Safety Compliance", body: "Our team follows strict safety protocols for aircraft cleaning operations across Nepal's aviation sector." },
      ]
    ),
  },
  {
    slug: "reserve-tank",
    title: "Safe Reserve Tank Cleaning Services in Nepal",
    description:
      "Water storage tanks can accumulate dirt and bacteria. HomeSewa provides professional reserve tank cleaning services across Nepal.",
    image: "/blog/reserve-tank-cleaning.jpg",
    category: "Residential",
    date: "December 12, 2025",
    readTime: "4 min read",
    content: postContent(
      "Scrubbing, sediment removal, and sanitization ensure safe, clean water for homes and offices.",
      [
        { heading: "Sediment Removal", body: "Over time, tanks accumulate sludge and sediment that contaminate water supply. Professional cleaning removes these deposits completely." },
        { heading: "Sanitization", body: "After physical cleaning, we sanitize tank interiors to eliminate bacteria and ensure water safety for your household." },
        { heading: "Preventive Maintenance", body: "We recommend tank cleaning every 6–12 months depending on usage and water quality in your area." },
      ]
    ),
  },
  {
    slug: "marble-tile",
    title: "Marble & Tile Cleaning Services in Nepal",
    description:
      "Marble and tiles enhance a home's beauty but require regular maintenance. HomeSewa offers professional cleaning for sparkling floors and grout.",
    image: "/blog/marble-tile-cleaning.jpg",
    category: "Residential",
    date: "December 10, 2025",
    readTime: "4 min read",
    content: postContent(
      "Stain removal, grout cleaning, and polishing using eco-friendly products restore the beauty of marble and tile surfaces.",
      [
        { heading: "Grout Deep Cleaning", body: "Grout lines trap dirt and discolor over time. Our specialized cleaning restores original color and prevents mold growth." },
        { heading: "Marble Polishing", body: "Professional polishing removes scratches and restores shine without damaging delicate marble surfaces." },
        { heading: "Long-Term Protection", body: "We apply protective treatments where appropriate to help floors resist stains and maintain their finish longer." },
      ]
    ),
  },
  {
    slug: "post-construction",
    title: "Post-Construction Cleaning Services in Nepal",
    description:
      "After construction or renovation, spaces are left dusty and messy. HomeSewa provides post-construction cleaning across Nepal.",
    image: "/blog/post-construction-cleaning.jpg",
    category: "Commercial",
    date: "December 8, 2025",
    readTime: "5 min read",
    content: postContent(
      "Floor cleaning, surface wiping, and bathroom/kitchen sanitization ensure your property is ready for use after construction.",
      [
        { heading: "Dust and Debris Removal", body: "Construction leaves fine dust on every surface. We remove debris from floors, walls, windows, and fixtures systematically." },
        { heading: "Final Touch Cleaning", body: "Before handover or move-in, we deliver a spotless finish including polished floors, clean windows, and sanitized wet areas." },
        { heading: "Commercial Projects", body: "We handle post-construction cleaning for hotels, offices, schools, and residential complexes across Nepal." },
      ]
    ),
  },
  {
    slug: "garden-cleaning",
    title: "Garden Cleaning Services in Nepal",
    description:
      "A well-maintained garden enhances your home's appeal. HomeSewa offers expert garden cleaning services across Nepal.",
    image: "/blog/garden-cleaning.jpg",
    category: "Outdoor",
    date: "December 5, 2025",
    readTime: "4 min read",
    content: postContent(
      "Trimming, sweeping, leaf removal, and pathway sanitization keep outdoor spaces neat and beautiful.",
      [
        { heading: "Seasonal Maintenance", body: "Regular garden cleaning prevents overgrowth, pest habitats, and unsightly debris accumulation throughout the year." },
        { heading: "Pathway and Patio Care", body: "We clean walkways, patios, and outdoor seating areas for safe and inviting outdoor living spaces." },
        { heading: "Eco-Friendly Approach", body: "Our garden cleaning uses environmentally responsible methods that protect plants and local ecosystems." },
      ]
    ),
  },
  {
    slug: "garage-cleaning",
    title: "Garage Cleaning Services in Nepal",
    description:
      "Garages can quickly become cluttered. HomeSewa organizes, sweeps, and removes oil stains and debris.",
    image: "/blog/garage-cleaning.jpg",
    category: "Residential",
    date: "December 3, 2025",
    readTime: "3 min read",
    content: postContent(
      "Keep your garage clean, safe, and efficient for storage or vehicle use with professional garage cleaning services.",
      [
        { heading: "Decluttering Support", body: "We help organize tools, equipment, and stored items while cleaning floors and surfaces thoroughly." },
        { heading: "Oil Stain Treatment", body: "Specialized cleaning removes oil and grease stains from garage floors for a safer, cleaner environment." },
        { heading: "Pest Prevention", body: "A clean garage reduces pest attraction and makes your home's storage areas more hygienic." },
      ]
    ),
  },
  {
    slug: "air-duct",
    title: "Air Duct & Vent Cleaning Services in Nepal",
    description:
      "Air ducts and vents collect dust and allergens over time. HomeSewa improves indoor air quality with professional HVAC cleaning.",
    image: "/blog/air-duct-vent-cleaning.jpg",
    category: "Commercial",
    date: "November 30, 2025",
    readTime: "4 min read",
    content: postContent(
      "Professional duct cleaning, sanitization, and HVAC inspection keep homes and offices healthy.",
      [
        { heading: "Allergen Reduction", body: "Clean ducts reduce dust, pollen, and allergens circulating through your ventilation system." },
        { heading: "Energy Efficiency", body: "Unobstructed airflow improves HVAC efficiency and can lower heating and cooling costs." },
        { heading: "Regular Inspection", body: "We recommend duct inspection and cleaning every 2–3 years or after renovations." },
      ]
    ),
  },
  {
    slug: "event-cleaning",
    title: "Event Cleaning Services in Nepal",
    description:
      "HomeSewa ensures stress-free post-event cleanup across Nepal including trash removal and restroom sanitization.",
    image: "/blog/post-event-cleaning.jpg",
    category: "Commercial",
    date: "November 28, 2025",
    readTime: "4 min read",
    content: postContent(
      "Post-event cleanup leaves your venue spotless and ready for the next use with trash removal, surface cleaning, and restroom sanitization.",
      [
        { heading: "Wedding and Banquet Cleanup", body: "We handle large-scale post-event cleaning for wedding venues, banquet halls, and reception spaces across Kathmandu." },
        { heading: "Corporate Events", body: "Conference and seminar cleanup includes seating areas, catering zones, and restroom facilities." },
        { heading: "Fast Turnaround", body: "Our teams work efficiently to restore venues overnight or within hours of event completion." },
      ]
    ),
  },
  {
    slug: "car-cleaning",
    title: "Professional Car Cleaning Services in Nepal",
    description:
      "A clean car enhances both appearance and hygiene. HomeSewa provides exterior washing, polishing, and interior vacuuming across Nepal.",
    image: "/blog/car-interior-cleaning.jpg",
    category: "Automotive",
    date: "November 25, 2025",
    readTime: "4 min read",
    content: postContent(
      "Interior vacuuming, upholstery cleaning, and exterior polishing keep your vehicle gleaming and hygienic.",
      [
        { heading: "Interior Deep Clean", body: "We vacuum seats, carpets, and mats; clean dashboards, vents, and windows for a fresh cabin environment." },
        { heading: "Exterior Care", body: "Professional washing and polishing protect paint and restore your vehicle's showroom appearance." },
        { heading: "Luxury Vehicles", body: "We specialize in detailed cleaning for luxury and premium vehicles with fabric-safe products." },
      ]
    ),
  },
  {
    slug: "facade-cleaning",
    title: "Facade Cleaning Services in Nepal",
    description:
      "Building facades are exposed to dust and pollution. HomeSewa offers professional facade cleaning across Nepal.",
    image: "/blog/facade-cleaning.jpg",
    category: "Commercial",
    date: "November 22, 2025",
    readTime: "5 min read",
    content: postContent(
      "Pressure washing, window cleaning, and exterior polishing maintain your property's aesthetics and value.",
      [
        { heading: "Pressure Washing", body: "High-pressure cleaning removes accumulated pollution, algae, and grime from building exteriors safely." },
        { heading: "Window Cleaning", body: "Professional window cleaning for multi-story buildings improves appearance and natural light." },
        { heading: "Property Value", body: "Regular facade maintenance protects building materials and enhances curb appeal for commercial and residential properties." },
      ]
    ),
  },
  {
    slug: "parquet-chair",
    title: "Parquet & Chair Cleaning Services in Nepal",
    description:
      "Wooden floors and chairs require regular care. HomeSewa provides parquet and chair cleaning using eco-friendly products.",
    image: "/blog/parquet-cleaning.jpg",
    category: "Commercial",
    date: "November 20, 2025",
    readTime: "4 min read",
    content: postContent(
      "Deep cleaning, polishing, and eco-friendly products restore shine and hygiene to wooden floors and office chairs.",
      [
        { heading: "Parquet Floor Care", body: "Specialized cleaning and polishing protect wooden floors from scratches and maintain their natural beauty." },
        { heading: "Office Chair Cleaning", body: "Fabric and leather chair cleaning removes stains, odors, and allergens from high-use office seating." },
        { heading: "Corporate Packages", body: "Monthly maintenance packages available for offices, schools, and institutions across Nepal." },
      ]
    ),
  },
  {
    slug: "septic-cleaning",
    title: "Drainage & Septic Tank Cleaning Services in Nepal",
    description:
      "Clogged drains and dirty septic tanks pose health hazards. HomeSewa provides professional drainage and septic tank cleaning.",
    image: "/blog/drainage-cleaning.jpg",
    category: "Residential",
    date: "November 18, 2025",
    readTime: "4 min read",
    content: postContent(
      "Unclogging, sanitization, and preventive maintenance keep drainage systems and septic tanks functioning safely.",
      [
        { heading: "Drain Unclogging", body: "Professional equipment clears blockages in kitchen, bathroom, and main drainage lines efficiently." },
        { heading: "Septic Tank Maintenance", body: "Regular septic cleaning prevents overflows, odors, and contamination of surrounding soil and water." },
        { heading: "Emergency Service", body: "Same-day drainage and septic services may be available for urgent situations in Kathmandu and nearby areas." },
      ]
    ),
  },
  {
    slug: "lift-cleaning",
    title: "Lift & Elevator Cleaning Services in Nepal",
    description:
      "Elevators are high-touch areas. HomeSewa ensures safe and sanitized rides with professional lift cleaning across Nepal.",
    image: "/blog/lift-elevator-cleaning.jpg",
    category: "Commercial",
    date: "November 15, 2025",
    readTime: "3 min read",
    content: postContent(
      "Handrail sanitization and regular maintenance keep elevators clean and safe for daily use in offices and residential buildings.",
      [
        { heading: "High-Touch Sanitization", body: "Buttons, handrails, and door panels are disinfected to reduce germ transmission in shared elevators." },
        { heading: "Floor and Mirror Cleaning", body: "Interior floors and mirrors are cleaned and polished for a professional appearance." },
        { heading: "Building Maintenance Contracts", body: "Weekly or monthly elevator cleaning packages available for apartment complexes and commercial towers." },
      ]
    ),
  },
  {
    slug: "corporate-cleaning",
    title: "Corporate & Monthly Cleaning Services in Nepal",
    description:
      "Maintaining clean corporate spaces is vital. HomeSewa offers regular office cleaning and monthly deep cleaning packages.",
    image: "/blog/monthly-cleaning.jpg",
    category: "Commercial",
    date: "November 12, 2025",
    readTime: "5 min read",
    content: postContent(
      "Regular office cleaning, common area sanitization, and monthly deep cleaning packages keep commercial spaces spotless and professional.",
      [
        { heading: "Daily Office Cleaning", body: "Desk sanitization, floor maintenance, restroom cleaning, and trash removal for productive workspaces." },
        { heading: "Monthly Deep Cleaning", body: "Comprehensive deep cleaning of carpets, windows, air ducts, and hard-to-reach areas on a scheduled basis." },
        { heading: "Custom Contracts", body: "Flexible weekly, bi-weekly, or monthly contracts tailored to your office size and requirements." },
      ]
    ),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
