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
    .map(
      (s) =>
        `<section class="blog-section"><h2>${s.heading}</h2><p>${s.body}</p></section>`
    )
    .join("");
  return `<p class="blog-lead">${intro}</p>${extra}`;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "spa-at-home",
    title: "Spa at Home: Wellness Delivered to Your Doorstep",
    description:
      "Enjoy massages, body treatments, and skincare without visiting a spa. HomeSewa connects you with verified therapists who bring professional wellness services to your home in Kathmandu.",
    image: "/home/blog/spa-at-home.jpg",
    category: "Health & Wellness",
    date: "March 15, 2026",
    readTime: "4 min read",
    content: postContent(
      "Modern life in Kathmandu is busy, and finding time for self-care can be difficult. HomeSewa's spa at home service brings trained therapists to your doorstep for massages, body treatments, skincare, and relaxation therapies — so you can unwind without traffic or waiting rooms.",
      [
        { heading: "What Spa at Home Includes", body: "Our professionals offer Swedish and deep tissue massages, aromatherapy sessions, body scrubs, and facial treatments using quality products. Every session is tailored to your preferences and comfort level in the privacy of your own home." },
        { heading: "Why Choose Home-Based Spa Services", body: "You save travel time, enjoy a familiar environment, and can schedule sessions around your routine. HomeSewa therapists are background-checked, rated by customers, and equipped with portable tools for a salon-quality experience." },
        { heading: "Book Your Session", body: "Select spa at home on our booking page, choose a date and time, and a verified therapist will arrive at your location. Same-day appointments may be available depending on availability in Kathmandu and nearby areas." },
      ]
    ),
  },
  {
    slug: "bridal-makeup",
    title: "Bridal Makeup at Home: Look Perfect on Your Special Day",
    description:
      "Professional bridal makeup artists visit your home or venue to create a customized look that complements your dress, skin tone, and wedding style — booked easily through HomeSewa.",
    image: "/home/blog/bridal-makeup.jpg",
    category: "Home Services",
    date: "March 12, 2026",
    readTime: "5 min read",
    content: postContent(
      "Your wedding day deserves a flawless look that lasts from the ceremony through every celebration. HomeSewa's bridal makeup service sends experienced artists to your location with premium products and techniques suited to Nepali weddings and diverse skin tones.",
      [
        { heading: "Preparing for Bridal Makeup", body: "Schedule a trial session if possible, share reference photos with your artist, and ensure good lighting at your getting-ready location. Hydrated skin and a simple skincare routine in the days before help makeup apply smoothly and last longer." },
        { heading: "What to Expect on the Day", body: "Your artist typically arrives early to prep skin, apply long-wear foundation and eye makeup, and finish with setting spray. Many artists also style hair or coordinate with your salon team for a complete bridal look." },
        { heading: "Book Through HomeSewa", body: "Browse bridal makeup on our platform, check artist profiles and ratings, and confirm your wedding date and venue. Transparent pricing and verified professionals give you peace of mind on one of the most important days of your life." },
      ]
    ),
  },
  {
    slug: "salon-at-home",
    title: "Salon at Home: Hair, Skin & Beauty Without the Salon Visit",
    description:
      "Get haircuts, styling, skincare, and makeup from verified beauty professionals who visit your home — convenient, private, and professional salon services on demand.",
    image: "/home/blog/salon-at-home.jpg",
    category: "Home Services",
    date: "March 10, 2026",
    readTime: "4 min read",
    content: postContent(
      "Salon at home is one of HomeSewa's most popular services in Kathmandu. A skilled beauty professional comes to you with tools and products for haircuts, blow-drys, facials, threading, and everyday makeup — ideal for busy families, new parents, and anyone who values convenience.",
      [
        { heading: "Services You Can Book", body: "From basic trims and hair coloring to party makeup and skincare treatments, our professionals cover a wide range of beauty needs. Specify your requirements when booking so the right specialist is assigned." },
        { heading: "Safe & Hygienic Practices", body: "HomeSewa professionals use sanitized tools and follow hygiene standards. You can request a specific gender preference or product type when booking for added comfort." },
        { heading: "Perfect for Regular Maintenance", body: "Set up recurring appointments for monthly haircuts or seasonal skincare. Booking through the HomeSewa app makes rescheduling and tracking your service history simple." },
      ]
    ),
  },
  {
    slug: "chef-at-home",
    title: "Chef at Home: Custom Meals Cooked in Your Kitchen",
    description:
      "Hire a professional chef to prepare meals at your home based on your taste, dietary needs, and occasion — from everyday family dinners to special gatherings.",
    image: "/home/blog/chef-at-home.jpg",
    category: "Home Services",
    date: "March 8, 2026",
    readTime: "4 min read",
    content: postContent(
      "Whether you need help with daily cooking, want to impress guests at a dinner party, or require meals tailored to dietary restrictions, HomeSewa's chef at home service brings experienced cooks to your kitchen with fresh ingredients and proven recipes.",
      [
        { heading: "How Chef at Home Works", body: "Share your menu preferences, number of guests, and any allergies when booking. Your assigned chef shops for ingredients (or uses yours), prepares meals on-site, and can leave your kitchen tidy after service." },
        { heading: "Ideal Occasions", body: "Chef at home is popular for festival feasts, birthday parties, small corporate lunches, and busy households that want home-cooked food without the daily effort. Many families book weekly meal-prep sessions." },
        { heading: "Book a Chef Today", body: "Select chef at home on HomeSewa, describe your requirements, and pick a date. Verified chefs across Kathmandu are ready to deliver restaurant-quality food in the comfort of your dining room." },
      ]
    ),
  },
  {
    slug: "massage-therapy",
    title: "Massage Therapy at Home: Relief for Body and Mind",
    description:
      "Professional massage therapy at home helps reduce stress, ease muscle tension, and support recovery — delivered by trained therapists through HomeSewa.",
    image: "/home/blog/massage-therapy.jpg",
    category: "Health & Wellness",
    date: "March 5, 2026",
    readTime: "4 min read",
    content: postContent(
      "Long hours at a desk, physical labor, or post-workout soreness can take a toll on your body. HomeSewa's massage therapy service connects you with therapists who offer relaxation, deep tissue, and therapeutic massages in your own space.",
      [
        { heading: "Types of Massage Available", body: "Choose from relaxation massages for stress relief, deep tissue work for chronic tension, and sports-focused therapy for active individuals. Discuss your needs with your therapist before the session begins." },
        { heading: "Health Benefits", body: "Regular massage can improve circulation, reduce anxiety, support better sleep, and help manage back and neck pain. Home-based sessions let you rest immediately afterward without commuting." },
        { heading: "Scheduling Made Easy", body: "Book a single session or a package through HomeSewa. Evening and weekend slots are available for professionals who need recovery time after work." },
      ]
    ),
  },
  {
    slug: "physiotherapy",
    title: "Physiotherapy at Home: Recovery Without the Clinic Wait",
    description:
      "Get professional rehabilitation and mobility support at home — ideal after injury, surgery, or for ongoing pain management with HomeSewa's verified physiotherapists.",
    image: "/home/blog/physiotherapy.jpg",
    category: "Health & Wellness",
    date: "March 3, 2026",
    readTime: "5 min read",
    content: postContent(
      "Recovering from an injury or managing chronic pain often requires consistent physiotherapy. HomeSewa brings licensed physiotherapists to your home for assessments, exercises, and treatment plans tailored to your condition and living environment.",
      [
        { heading: "Who Benefits from Home Physiotherapy", body: "Post-surgery patients, seniors with mobility challenges, athletes in recovery, and anyone with back, knee, or shoulder issues can benefit. Home visits are especially helpful when travel to a clinic is difficult." },
        { heading: "What Sessions Include", body: "Your physiotherapist evaluates movement, prescribes exercises, may use manual therapy techniques, and teaches you a home routine to maintain progress between visits." },
        { heading: "Start Your Recovery", body: "Book physiotherapy through HomeSewa and describe your condition briefly. We'll match you with a qualified professional and help you schedule regular sessions for the best outcomes." },
      ]
    ),
  },
  {
    slug: "handyman",
    title: "Handyman Services: Fix It All in One Visit",
    description:
      "From furniture assembly to minor repairs and installations, HomeSewa's handyman service handles multiple small jobs around your home efficiently in a single appointment.",
    image: "/home/blog/handyman.jpg",
    category: "Home Repair & Maintenance",
    date: "February 28, 2026",
    readTime: "4 min read",
    content: postContent(
      "That loose door handle, wobbly shelf, and dripping tap don't need three different contractors. HomeSewa's handyman service covers a wide range of repair and maintenance tasks so you can clear your to-do list in one visit.",
      [
        { heading: "Common Handyman Jobs", body: "Our professionals handle furniture assembly, curtain rod installation, door and window adjustments, minor wall repairs, picture hanging, and general fix-it tasks that keep your home running smoothly." },
        { heading: "Why Use a Verified Handyman", body: "HomeSewa handymen are skill-assessed and customer-rated. You get transparent pricing upfront and the convenience of booking online instead of searching for reliable help through word of mouth." },
        { heading: "Book Multiple Tasks at Once", body: "List all the jobs you need done when booking. Your handyman will bring the right tools and allocate enough time to complete everything in one efficient visit." },
      ]
    ),
  },
  {
    slug: "plumbing",
    title: "Plumbing Services: Leaks, Clogs & Installations Fixed Fast",
    description:
      "Expert plumbers for dripping faucets, clogged drains, pipe repairs, and bathroom installations — available on demand through HomeSewa in Kathmandu.",
    image: "/home/blog/plumbing.jpg",
    category: "Home Repair & Maintenance",
    date: "February 25, 2026",
    readTime: "4 min read",
    content: postContent(
      "Plumbing problems worsen quickly if ignored. A small leak can damage walls and raise water bills, while blocked drains disrupt daily life. HomeSewa connects you with experienced plumbers for fast, reliable repairs across Kathmandu.",
      [
        { heading: "Services Our Plumbers Provide", body: "We handle leak detection and repair, drain unclogging, faucet and fixture replacement, toilet repairs, geyser connections, and new bathroom or kitchen plumbing installations." },
        { heading: "Prevent Costly Water Damage", body: "Schedule regular plumbing checks for older homes. Early detection of worn pipes and slow leaks saves money and prevents mold and structural damage over time." },
        { heading: "Emergency & Scheduled Visits", body: "Book a plumber through HomeSewa for planned installations or urgent issues. Same-day service may be available for emergencies depending on technician availability in your area." },
      ]
    ),
  },
  {
    slug: "electrical-repairs",
    title: "Electrical Repair Services: Safe Wiring & Power Solutions",
    description:
      "Trained electricians for faulty switches, power outages, wiring issues, and safe electrical installations — protecting your home from hazards with HomeSewa.",
    image: "/home/blog/electrical-repairs.jpg",
    category: "Home Repair & Maintenance",
    date: "February 22, 2026",
    readTime: "4 min read",
    content: postContent(
      "Electrical issues should never be DIY experiments. Flickering lights, tripping breakers, and dead outlets signal problems that need a qualified electrician. HomeSewa sends verified professionals to diagnose and fix electrical concerns safely.",
      [
        { heading: "When to Call an Electrician", body: "Contact a professional for burning smells, warm outlets, frequent breaker trips, new appliance wiring, ceiling fan installation, and any work involving your main panel or outdoor connections." },
        { heading: "Safety First", body: "Our electricians follow safety codes and use proper equipment. Never ignore warning signs — faulty wiring is a leading cause of home fires and can damage expensive appliances." },
        { heading: "Book an Electrician", body: "Describe your issue on the HomeSewa booking page and select electrical repairs. A skilled technician will arrive with tools to resolve the problem and advise on preventive maintenance." },
      ]
    ),
  },
  {
    slug: "home-automation",
    title: "Home Automation: Smarter, Safer Living in Kathmandu",
    description:
      "Integrate smart lighting, CCTV, and automation systems into your home with professional installation and setup through HomeSewa's smart home experts.",
    image: "/home/blog/home-automation.jpg",
    category: "Smart Home Services",
    date: "February 18, 2026",
    readTime: "5 min read",
    content: postContent(
      "Smart home technology is becoming more accessible in Nepal. HomeSewa's home automation service helps you install and configure systems that improve security, convenience, and energy efficiency — from smart switches to integrated surveillance.",
      [
        { heading: "What You Can Automate", body: "Popular options include smart lighting controls, automated curtains, voice-assisted devices, security cameras with remote monitoring, and unified control panels for your entire home." },
        { heading: "Professional Installation Matters", body: "Proper wiring, network setup, and device placement ensure reliable performance. Our technicians configure systems, test connectivity, and walk you through mobile app controls before leaving." },
        { heading: "Upgrade Your Home", body: "Start with a consultation through HomeSewa. Whether you want a single-room setup or whole-home automation, our experts design a solution that fits your budget and lifestyle." },
      ]
    ),
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning: A Thorough Refresh for Your Home",
    description:
      "Go beyond daily tidying with HomeSewa's deep cleaning service — scrubbing kitchens, sanitizing bathrooms, dusting hard-to-reach areas, and refreshing your entire home.",
    image: "/home/blog/deep-cleaning.jpg",
    category: "Home Enhancement",
    date: "February 15, 2026",
    readTime: "4 min read",
    content: postContent(
      "Regular cleaning keeps surfaces tidy, but deep cleaning targets the grime, allergens, and bacteria that build up over time. HomeSewa's deep cleaning crews use eco-friendly products and a room-by-room checklist for a complete home reset.",
      [
        { heading: "When to Schedule Deep Cleaning", body: "Ideal before festivals like Dashain and Tihar, after renovations, when moving in or out, or every few months for families with pets and children. A deep clean improves air quality and creates a healthier living environment." },
        { heading: "What's Included", body: "Our team cleans behind appliances, scrubs tile grout, sanitizes bathrooms and kitchens, dusts ceiling fans and vents, wipes baseboards, and refreshes upholstery and floors throughout your home." },
        { heading: "Book Your Deep Clean", body: "Select deep cleaning on HomeSewa, specify your home size, and choose a date. Trained crews arrive with equipment and supplies for a thorough, satisfaction-guaranteed service." },
      ]
    ),
  },
  {
    slug: "home-renovation",
    title: "Home Renovation: Transform Your Living Space",
    description:
      "From kitchen and bathroom makeovers to complete interior updates, HomeSewa connects you with renovation professionals who deliver quality results on time and on budget.",
    image: "/home/blog/home-renovation.jpg",
    category: "Home Enhancement",
    date: "February 12, 2026",
    readTime: "5 min read",
    content: postContent(
      "Renovating your home is a major investment that should improve both comfort and property value. HomeSewa's home renovation service brings together skilled contractors for kitchen upgrades, bathroom remodels, flooring, and full interior redesigns.",
      [
        { heading: "Planning Your Renovation", body: "Start with a clear scope and budget. Our professionals assess your space, recommend materials suited to Kathmandu's climate, and provide transparent timelines before work begins." },
        { heading: "Quality Workmanship", body: "From demolition to finishing touches, HomeSewa renovation teams coordinate plumbing, electrical, tiling, and painting work so you have a single point of contact throughout the project." },
        { heading: "Get a Consultation", body: "Book a home renovation consultation through HomeSewa. Share photos and ideas, and our team will help you plan a transformation that matches your vision and lifestyle." },
      ]
    ),
  },
  {
    slug: "pest-control",
    title: "Pest Control: Protect Your Home from Unwanted Guests",
    description:
      "Professional pest inspection, treatment, and prevention for insects and rodents — keeping your Kathmandu home safe and comfortable with HomeSewa.",
    image: "/home/blog/pest-control.jpg",
    category: "Home Enhancement",
    date: "February 8, 2026",
    readTime: "4 min read",
    content: postContent(
      "Cockroaches, termites, mosquitoes, and rodents are common challenges in urban Nepal. HomeSewa's pest control service provides thorough inspection, targeted treatment, and follow-up prevention to protect your family and property.",
      [
        { heading: "Our Treatment Approach", body: "Technicians identify pest types and entry points, apply safe and effective treatments, and recommend sealing gaps and improving sanitation to prevent recurrence. We use methods appropriate for homes with children and pets." },
        { heading: "Seasonal Prevention", body: "Monsoon season increases mosquito and termite activity. Schedule preventive treatments before peak seasons and after discovering early signs of infestation to avoid costly structural damage." },
        { heading: "Book Pest Control", body: "Select pest control on HomeSewa, describe the issue, and schedule an inspection. Fast response helps contain infestations before they spread throughout your home." },
      ]
    ),
  },
  {
    slug: "packing-and-moving",
    title: "Packing & Moving: Stress-Free Relocation in Nepal",
    description:
      "Professional packing, transport, and unloading for home relocations — HomeSewa helps you move safely and efficiently across Kathmandu and beyond.",
    image: "/home/blog/packing-and-moving.jpg",
    category: "Additional Services",
    date: "February 5, 2026",
    readTime: "4 min read",
    content: postContent(
      "Moving to a new home is exciting but exhausting. HomeSewa's packing and moving service handles the heavy lifting — literally — with trained crews who pack fragile items carefully, transport belongings securely, and unload at your new address.",
      [
        { heading: "Full-Service Moving", body: "Our teams provide boxes and packing materials, disassemble furniture when needed, load trucks efficiently, and place items in designated rooms at your destination. You focus on settling in while we handle the logistics." },
        { heading: "Tips for a Smooth Move", body: "Book at least a week in advance during peak seasons. Label boxes by room, keep essentials in a separate bag, and inform building management about elevator access and parking for the moving truck." },
        { heading: "Get a Moving Quote", body: "Enter your current and new addresses, home size, and move date on HomeSewa. You'll receive transparent pricing and can schedule a team that fits your timeline." },
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
