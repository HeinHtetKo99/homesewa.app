export type CatalogService = {
  title: string;
  slug: string;
  image: string;
  desc: string;
};

export type ServiceCategory = {
  title: string;
  services: CatalogService[];
};

export function getAllServices(): (CatalogService & { category: string })[] {
  return serviceCategories.flatMap((category) =>
    category.services.map((service) => ({ ...service, category: category.title }))
  );
}

export function getServiceBySlug(slug: string): (CatalogService & { category: string }) | undefined {
  return getAllServices().find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return getAllServices().map((service) => service.slug);
}

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Home Services",
    services: [
      {
        title: "Salon at Home",
        slug: "salon-at-home",
        image: "/services/salon-at-home.jpg",
        desc: "A verified beauty professional visits your home to provide salon services — haircuts, styling, skincare, and makeup — delivered on-site by a skilled individual, not a salon setup.",
      },
      
      {
        title: "Bridal Makeup",
        slug: "bridal-makeup",
        image: "/services/bridal-makeup.jpg",
        desc: "Professional bridal makeup artists visit your location to provide customized looks for your special day — enhancing your natural beauty to complement your dress and style.",
      },
      
      {
        title: "Chef at Home",
        slug: "chef-at-home",
        image: "/services/chef-at-home.jpg",
        desc: "A professional chef visits your home and prepares meals based on your preferences and dietary needs — cooking service delivered at your location, not a restaurant setup.",
      },
      
    ],
  },

  {
    title: "Health & Wellness Services",
    services: [
      
      {
        title: "Massage Therapy",
        slug: "massage-therapy",
        image: "/services/massage-therapy.jpg",
        desc: "Massage therapy services help relieve stress, reduce muscle tension, and promote overall wellness. This includes relaxation massages, deep tissue therapy, and therapeutic treatments tailored to individual needs.",
      },
      {
        title: "Spa at Home",
        slug: "spa-at-home",
        image: "/services/spa-at-home.jpg",
        desc: "A trained spa therapist visits your home to provide massages, body treatments, skincare, and relaxation therapies — wellness services delivered on-site by a verified professional.",
      },
      {
        title: "Physiotherapy",
        slug: "physiotherapy",
        image: "/services/physiotherapy.jpg",
        desc: "Physiotherapy services provide professional rehabilitation and recovery support. From injury treatment to fitness enhancement, our experts help you regain mobility and improve overall well-being.",
      },
    ],
  },


  {
    title: "Home Repair & Maintenance",
    services: [
      {
        title: "Handyman",
        slug: "handyman",
        image: "/services/handyman.jpg",
        desc: "Handyman services cover a wide range of small repair and maintenance tasks around your home. From fixing doors and windows to assembling furniture and minor installations, this service ensures everything functions properly. It saves time and effort by addressing multiple issues in one visit.",
      },
      {
        title: "Carpentry",
        slug: "carpentry",
        image: "/services/carpentry.jpg",
        desc: "Carpentry services include custom woodwork, furniture repair, and installation tasks. Whether you need cabinets, shelves, doors, or wooden fixtures, skilled carpenters ensure precision and durability. This service enhances both functionality and aesthetics of your space.",
      },
      {
        title: "Plumbing",
        slug: "plumbing",
        image: "/services/plumbing-repair.jpg",
        desc: "Plumbing services handle everything from fixing leaks to installing pipes and fixtures. Whether it's a dripping faucet, clogged drain, or bathroom installation, expert plumbers ensure smooth water flow and proper drainage. Timely plumbing maintenance prevents water damage and costly repairs.",
      },
      {
        title: "Electrical Repairs",
        slug: "electrical-repairs",
        image: "/services/electrical-repair.jpg",
        desc: "Electrical repair services ensure your home's wiring, outlets, and power systems function safely and efficiently. From fixing faulty switches to resolving power issues, trained professionals handle all electrical concerns. Proper repairs reduce risks such as short circuits and fire hazards.",
      },
      {
        title: "Tiling",
        slug: "tiling",
        image: "/services/tiling.jpg",
        desc: "Tiling services involve installing, repairing, or replacing tiles in various areas of your home. Whether it's bathroom tiling, kitchen backsplashes, or floor tiling, skilled professionals ensure a seamless and durable finish. This service enhances the visual appeal and functionality of your space.",
      },
      {
        title: "Washing Machine Repair",
        slug: "washing-machine-repair",
        image: "/services/washing-machine-repair.jpg",
        desc: "Washing machine repair services diagnose and fix issues such as leaks, noise, and poor performance. Skilled technicians ensure your appliance runs efficiently, saving time and energy. Regular maintenance extends the lifespan of your machine and prevents costly replacements.",
      },

      
    ],
  },
  {
    title: "Smart Home Services",
    services: [
      {
        title: "Home Automation",
        slug: "home-automation",
        image: "/services/home-automation.jpg",
        desc: "Home automation integrates modern technology into your living space, including CCTV, automation systems, and smart devices. This service enhances security, convenience, and energy efficiency. Control lighting, appliances, and surveillance remotely for a seamless experience.",
      },
      {
        title: "EV Charger Installation",
        slug: "ev-charger-installation",
        image: "/services/ev-charger-installation.jpg",
        desc: "EV charger installation provides a reliable and convenient solution for charging electric vehicles at home. Experts ensure proper setup, safety compliance, and efficient power usage. This service supports sustainable living while offering the ease of charging your vehicle anytime.",
      },
      {
        title: "AC Services",
        slug: "ac-services",
        image: "/services/ac-service.jpg",
        desc: "AC servicing ensures your cooling system operates efficiently and reliably. This service includes cleaning filters, checking components, and optimizing performance. Regular maintenance improves air quality, reduces energy consumption, and prevents breakdowns.",
      },
    ],
  },
  {
    title: "Home Improvement",
    services: [
      {
        title: "Painting",
        slug: "painting",
        image: "/services/painting.jpg",
        desc: "Painting services refresh your home with high-quality interior and exterior finishes. Professionals ensure smooth application, proper color selection, and long-lasting results. Whether renovating or updating, painting enhances appearance and protects surfaces.",
      },
      {
        title: "Indoor Planting",
        slug: "indoor-planting",
        image: "/services/indoor-planting.jpg",
        desc: "Indoor planting services help you create a lush, green environment inside your home. From selecting the right plants to providing care instructions, our experts ensure your indoor garden thrives.",
      },
      {
        title: "CCTV Services",
        slug: "cctv-services",
        image: "/services/cctv-services.jpg",
        desc: "CCTV services provide comprehensive surveillance solutions for homes and businesses. Our experts install, maintain, and optimize security systems to ensure peace of mind. From camera placement to remote monitoring, we deliver reliable protection for your property.",
      },
      {
        title: "Drywall Repair",
        slug: "drywall-repair",
        image: "/services/drywall-repair.jpg",
        desc: "Drywall repair fixes cracks, holes, and damaged wall surfaces. This service restores smoothness and prepares walls for painting or decoration. Professional repairs ensure durability and a seamless finish.",
      },
      
      {
        title: "Modular Kitchen",
        slug: "modular-kitchen",
        image: "/services/modular-kitchen.jpg",
        desc: "Modular kitchen services offer complete kitchen solutions with pre-fabricated units. This includes design, installation, and customization options. Professional services ensure a seamless integration of functionality and aesthetics for your modern kitchen.",
      },
      {
        title: "Parqueting",
        slug: "parqueting",
        image: "/services/parqueting.jpg",
        desc: "Parqueting services involve installing and repairing wooden floors. Skilled professionals ensure precise fitting, durability, and aesthetic appeal. This service enhances the visual beauty and functionality of your space.",
      },
    ],
  },
  {
    title: "Home Enhancement Services",
    services: [
      
      {
        title: "Home Renovation ",
        slug: "home-renovation",
        image: "/services/home-renovation.jpg",
        desc: "Home renovation services transform your living space with modern updates and improvements. From kitchen and bathroom makeovers to complete interior redesigns, our professionals deliver quality results that enhance comfort and style.",
      },
      {
        title: "RO Water Purifying",
        slug: "ro-water-purifying",
        image: "/services/ro-water-purifying.jpg",
        desc: "RO (Reverse Osmosis) water purifying systems provide clean, safe drinking water by removing impurities, contaminants, and harmful substances. ",
      },
      {
        title: "Garden Care",
        slug: "garden-care",
        image: "/services/garden-care.jpg",
        desc: "Garden care includes planting, pruning, and maintaining flowers and plants. This service keeps your garden vibrant and healthy. It enhances outdoor beauty and creates a peaceful, natural environment for relaxation and enjoyment.",
      },
      {
        title: "Pest Control",
        slug: "pest-control",
        image: "/services/pest-control.jpg",
        desc: "Pest control services manage and eliminate unwanted insects and rodents. This includes inspection, treatment, and prevention strategies. Professional pest control ensures a safe and comfortable living environment while protecting your property from damage.",
      },
      {
        title: "Masonry Repair",
        slug: "masonry-repair",
        image: "/services/masonry-repair.jpg",
        desc: "Masonry repair services fix damaged or deteriorated stone, brick, and concrete structures. This includes addressing cracks, leaks, and structural issues. Professional repairs ensure durability and maintain the aesthetic appeal of your property.",
      },
      {
        title: "Deep Cleaning",
        slug: "deep-cleaning",
        image: "/services/deep-cleaning.jpg",
        desc: "Deep cleaning provides a thorough and detailed cleaning of your entire home, targeting hidden dirt, grime, and bacteria. It includes scrubbing floors, sanitizing kitchens and bathrooms, dusting hard-to-reach areas, and refreshing upholstery.",
      },
    ],
  },
  {
    title: "Additional Services",
    services: [
      {
        title: "Packing & Moving",
        slug: "packing-and-moving",
        image: "/services/packing-and-moving.jpg",
        desc: "Moving services assist with safe and efficient relocation of your belongings. Professionals handle packing, transport, and unloading. This service reduces stress and ensures your items reach their destination securely and on time.",
      },
      {
        title: "Airbnb Maintenance",
        slug: "airbnb-maintenance",
        image: "/services/airbnb-maintenance.jpg",
        desc: "Airbnb maintenance ensures your rental property remains clean, functional, and guest-ready. Regular inspections, repairs, and cleaning maintain high standards. This service improves guest satisfaction and helps maximize bookings.",
      },
      {
        title: "Refrigerator Repair",
        slug: "refrigerator-repair",
        image: "/services/refrigerator-repair.jpg",
        desc: "Refrigerator repair services fix issues with your appliance, ensuring it operates efficiently. From minor maintenance to major repairs, our technicians provide reliable solutions to keep your refrigerator functioning at its best.",
      },
    ],
  },
  
];
