'use client';
import React, { useState } from 'react';
import Ribbon from '../../components/Ribbon';

export default function Glossary() {
    const [selectedLetter, setSelectedLetter] = useState<string>('A');

    type Term = {
        term: string;
        definition: string;
    }

    type TermsByLetter = {
        [key: string]: Term[];
    }

    const glossaryTerms: TermsByLetter = {
        A: [
            { "term": "Air Duct Cleaning", "definition": "The process of removing dust, debris, and allergens from heating, ventilation, and air conditioning (HVAC) ducts." },
            { "term": "Appliance Cleaning", "definition": "Cleaning household or commercial appliances such as ovens, refrigerators, and microwaves to remove grease, dust, and bacteria." },
            { "term": "Anti-Bacterial Cleaning", "definition": "The use of cleaning agents that specifically target and eliminate bacteria from surfaces." },
            { "term": "Air Purification", "definition": "The process of removing pollutants, dust, and allergens from the air within a building or room." },
            { "term": "Allergen Removal", "definition": "Techniques used to eliminate allergens such as dust mites, pollen, and pet dander from surfaces and air." },
            { "term": "Auto Detailing", "definition": "Comprehensive cleaning and restoration of a vehicle, both interior and exterior." },
            { "term": "Antimicrobial Treatment", "definition": "Applying chemicals or solutions to surfaces to prevent the growth of microbes, bacteria, or mold." },
            { "term": "Acid Cleaning", "definition": "Using acid-based solutions to remove tough stains, rust, or mineral deposits from surfaces like tiles and metals." },
            { "term": "Air Filter Replacement", "definition": "Replacing dirty or clogged air filters in HVAC systems to improve air quality and efficiency." },
            { "term": "Anti-Mold Cleaning", "definition": "Cleaning and treating areas prone to mold growth to prevent mold formation and contamination." },
            { "term": "Abrasive Cleaning", "definition": "Using abrasive materials or tools to scrub off tough dirt, rust, or stains from hard surfaces." },
            { "term": "Ambient Cleaning", "definition": "Maintaining the overall cleanliness of an environment, including air quality, surfaces, and floors." },
            { "term": "Appliance Sanitization", "definition": "Disinfecting household or commercial appliances to remove germs and bacteria." },
            { "term": "Asbestos Cleaning", "definition": "Specialized cleaning process for removing asbestos fibers safely from buildings or surfaces." },
            { "term": "All-Purpose Cleaning", "definition": "Using versatile cleaning agents suitable for a variety of surfaces, such as counters, floors, and walls." },
            { "term": "Air Quality Testing", "definition": "Assessing the cleanliness and safety of indoor air, including dust, allergens, and pollutants." },
            { "term": "Attic Cleaning", "definition": "Comprehensive cleaning and sanitization of attic spaces to remove dust, insulation debris, and pest contaminants." },
            { "term": "Aluminum Cleaning", "definition": "Specialized cleaning techniques for aluminum surfaces, fixtures, and frames to prevent oxidation and maintain shine." }
        ],
        B: [
            { "term": "Biohazard Cleanup", "definition": "Specialized cleaning for spaces contaminated with biological substances, such as blood, bodily fluids, or medical waste." },
            { "term": "Bathroom Sanitization", "definition": "Deep cleaning and disinfecting of toilets, sinks, showers, and other bathroom surfaces." },
            { "term": "Baseboards Cleaning", "definition": "Detailed cleaning of baseboards and trim to remove dust, dirt, and scuffs for a polished appearance." },
            { "term": "Brick Cleaning", "definition": "Removing dirt, algae, and stains from brick surfaces using specialized cleaning solutions and pressure washing." },
            { "term": "Blind Cleaning", "definition": "Thorough cleaning of window blinds and shutters to remove dust and restore their original appearance." },
            { "term": "Bleach Disinfection", "definition": "Using bleach-based solutions to effectively disinfect and sterilize high-touch surfaces and areas." },
            { "term": "Building Facade Cleaning", "definition": "Professional cleaning of exterior building surfaces including walls, windows, and architectural features." },
            { "term": "Bacteria Elimination", "definition": "Targeted removal of bacterial colonies from surfaces using approved antimicrobial cleaning solutions." },
            { "term": "Bed Cleaning", "definition": "Comprehensive cleaning of mattresses, bedding, and bed frames including sanitization and allergen removal." },
            { "term": "Biohazard Disposal", "definition": "Safe and legal disposal of biohazardous materials following proper protocols and regulations." },
            { "term": "Bottle Sterilization", "definition": "High-pressure cleaning and sterilization of bottles for food, beverage, or medical applications." },
            { "term": "Brushing and Scrubbing", "definition": "Manual cleaning technique using brushes to remove stubborn dirt and grime from various surfaces." },
            { "term": "Boardroom Cleaning", "definition": "Professional cleaning of conference rooms and boardrooms to maintain a professional appearance." },
            { "term": "Biodegradable Cleaners", "definition": "Environmentally friendly cleaning products that break down naturally without harming the ecosystem." },
            { "term": "Breakroom Sanitization", "definition": "Cleaning and disinfecting of employee breakroom areas including appliances, tables, and floors." },
            { "term": "Balcony Cleaning", "definition": "Thorough cleaning of balcony surfaces, railings, and outdoor areas to remove dirt and weathering." },
            { "term": "Basement Cleaning", "definition": "Complete cleaning and moisture management of basement areas to prevent mold and maintain freshness." },
            { "term": "Brass Polishing", "definition": "Specialized cleaning and polishing of brass fixtures, doorknobs, and decorative items to restore shine." }
        ],
        C: [
            { "term": "Carpet Cleaning", "definition": "The process of removing dirt, stains, and allergens from carpets using hot water extraction, steam, or dry cleaning methods." },
            { "term": "Commercial Cleaning", "definition": "Cleaning services for offices, hotels, restaurants, and other commercial spaces." },
            { "term": "COVID-19 Disinfection", "definition": "Sanitization procedures using hospital-grade disinfectants to prevent the spread of the coronavirus." },
            { "term": "Ceiling Cleaning", "definition": "Removal of dust, stains, and cobwebs from ceilings and light fixtures for a fresh appearance." },
            { "term": "Ceramic Tile Cleaning", "definition": "Deep cleaning of ceramic tiles using specialized grout cleaners and sealers for lasting protection." },
            { "term": "Chemical Disinfection", "definition": "Application of approved chemical disinfectants to eliminate pathogens and microorganisms." },
            { "term": "Chandelier Cleaning", "definition": "Careful cleaning of decorative chandeliers and light fixtures to restore brilliance and safety." },
            { "term": "Cupboard Cleaning", "definition": "Interior and exterior cleaning of cupboards, cabinets, and storage areas." },
            { "term": "Curtain/Drape Cleaning", "definition": "Professional cleaning of curtains and drapes including removal and laundering or in-place sanitization." },
            { "term": "Cabinet Sanitization", "definition": "Deep cleaning and disinfecting of kitchen and bathroom cabinets including hardware and interiors." },
            { "term": "Commercial Kitchen Cleaning", "definition": "Specialized cleaning of commercial kitchen equipment including grease traps, ovens, and ventilation systems." },
            { "term": "Concrete Floor Cleaning", "definition": "Power washing and chemical treatment of concrete floors to remove stains, oil, and buildup." },
            { "term": "Computer Equipment Cleaning", "definition": "Careful cleaning of computers, keyboards, monitors, and other electronic equipment." },
            { "term": "Cloudiness Removal", "definition": "Restoration of clarity to cloudy glass, lenses, and other transparent surfaces." },
            { "term": "Carpet Stain Removal", "definition": "Specialized treatment to remove specific stains including pet accidents, spills, and discoloration." },
            { "term": "Coil Cleaning", "definition": "Cleaning of air conditioning and heating coils to improve efficiency and air quality." },
            { "term": "Crawlspace Cleaning", "definition": "Thorough cleaning of crawlspaces to prevent moisture, mold, and pest infestations." },
            { "term": "Corrosion Removal", "definition": "Removal of rust and corrosion from metal surfaces using specialized cleaning solutions." }
        ],
        D: [
            { "term": "Deep Cleaning", "definition": "Intensive cleaning of surfaces, corners, and hard-to-reach areas to eliminate dirt and germs." },
            { "term": "Disinfection", "definition": "The process of killing or deactivating harmful microorganisms on surfaces using chemical agents." },
            { "term": "Duct Cleaning", "definition": "Clearing and sanitizing air distribution ducts to improve HVAC system efficiency." },
            { "term": "Deck Cleaning", "definition": "Pressure washing and treatment of wooden or composite deck surfaces to remove mold and stains." },
            { "term": "Dustmite Control", "definition": "Specialized cleaning to reduce dust mite populations and their allergens in upholstered furniture." },
            { "term": "Drain Cleaning", "definition": "Professional removal of blockages and buildup from drains, pipes, and sewer lines." },
            { "term": "Degreasing", "definition": "Removal of grease and oil buildup from kitchen surfaces, equipment, and exhaust hoods." },
            { "term": "Dental Office Cleaning", "definition": "Specialized sanitation of dental offices following health and safety regulations." },
            { "term": "Disinfectant Fogging", "definition": "Dispersal of fine disinfectant mist throughout a space for comprehensive microbial elimination." },
            { "term": "Dishwashing Service", "definition": "Professional washing, sanitizing, and drying of dishes, glassware, and cutlery." },
            { "term": "Dead Animal Removal", "definition": "Safe removal and decontamination of deceased animals from residential or commercial properties." },
            { "term": "Deodorizing Treatment", "definition": "Application of odor-neutralizing products to eliminate stubborn smells from carpets and furniture." },
            { "term": "Dumpster Area Cleaning", "definition": "Cleaning and disinfecting dumpster areas and trash receptacles to prevent pest attraction." },
            { "term": "Display Case Cleaning", "definition": "Professional cleaning of retail display cases and glass enclosures for optimal product visibility." },
            { "term": "Decorative Item Cleaning", "definition": "Careful cleaning of artwork, sculptures, and decorative items to preserve their condition." },
            { "term": "Doorway Disinfection", "definition": "Frequent sanitization of doorknobs, handles, and entry zones to prevent cross-contamination." },
            { "term": "Desktop Sanitization", "definition": "Regular cleaning and disinfecting of work desks and office furniture." },
            { "term": "Driveway Sealing", "definition": "Application of protective sealant to driveways after cleaning to prevent staining and deterioration." }
        ],
        E: [
            { "term": "Eco-Friendly Cleaning", "definition": "Cleaning practices that use environmentally safe products and methods." },
            { "term": "Exhaust Fan Cleaning", "definition": "Removing dust, grease, and buildup from exhaust fans to improve ventilation and hygiene." },
            { "term": "Electrostatic Disinfection", "definition": "Advanced spraying technology that applies charged disinfectant particles to all surfaces in a space." },
            { "term": "Emergency Cleanup", "definition": "Rapid response cleaning services for unexpected events, spills, or damage situations." },
            { "term": "Enzyme Cleaning", "definition": "Use of enzyme-based cleaners to break down organic matter and biological contaminants." },
            { "term": "Entry Way Cleaning", "definition": "Thorough cleaning of foyers, entrances, and vestibules for a welcoming appearance." },
            { "term": "Equipment Sanitization", "definition": "Professional cleaning and disinfecting of machinery, tools, and industrial equipment." },
            { "term": "Event Cleanup", "definition": "Post-event deep cleaning including removal of decorations, trash, and debris." },
            { "term": "Electrical Outlet Cleaning", "definition": "Safe cleaning of electrical outlets and switch plates to remove dust and maintain safety." },
            { "term": "Efflorescence Removal", "definition": "Removal of white mineral deposits from concrete, brick, and stone surfaces." },
            { "term": "Elevator Cleaning", "definition": "Regular sanitization of elevator cars, buttons, and handrails in multi-story buildings." },
            { "term": "Embroidered Fabric Cleaning", "definition": "Gentle cleaning of embroidered textiles and decorative fabrics without damaging stitching." },
            { "term": "End-of-Lease Cleaning", "definition": "Comprehensive cleaning to restore rental properties to pre-move-in condition." },
            { "term": "Enzyme Digesters", "definition": "Application of enzyme products to break down organic buildup in drains and septic systems." },
            { "term": "Exit Sign Cleaning", "definition": "Maintenance cleaning of exit signs and emergency lighting to ensure visibility." },
            { "term": "Exterior Power Washing", "definition": "High-pressure cleaning of building exterior, siding, and outdoor structures." },
            { "term": "Environmentally Certified", "definition": "Cleaning services using products certified safe for the environment and human health." },
            { "term": "Energy-Efficient Cleaning", "definition": "Cleaning methods designed to minimize water and energy consumption." }
        ],
        F: [
            { "term": "Floor Polishing", "definition": "Restoring shine and smoothness to tile, marble, wood, or concrete floors." },
            { "term": "Fogging Disinfection", "definition": "Using mist or fog to distribute disinfectant chemicals across large spaces for sterilization." },
            { "term": "Fabric Cleaning", "definition": "Professional cleaning of upholstered furniture, carpets, and fabric surfaces." },
            { "term": "Fluorescent Light Cleaning", "definition": "Removal of dust and discoloration from fluorescent fixtures for improved illumination." },
            { "term": "Fireplace Cleaning", "definition": "Deep cleaning of fireplace interiors, mantels, and surrounds to remove soot and ash." },
            { "term": "Fridge Defrost Cleaning", "definition": "Complete interior cleaning of refrigerators including removal of ice buildup and contamination." },
            { "term": "Faucet Disinfection", "definition": "Thorough cleaning and disinfecting of bathroom and kitchen faucets and fixtures." },
            { "term": "Floor Waxing", "definition": "Application of protective wax coatings to hardwood and tile floors for durability and shine." },
            { "term": "Furnace Filter Replacement", "definition": "Regular replacement and cleaning of furnace filters to maintain heating efficiency." },
            { "term": "Food Service Area Cleaning", "definition": "Specialized cleaning of food preparation and service areas meeting health code standards." },
            { "term": "Fence Cleaning", "definition": "Professional cleaning of wooden, metal, or vinyl fences to remove dirt, moss, and stains." },
            { "term": "Flooring Restoration", "definition": "Comprehensive treatment of damaged flooring including stripping, cleaning, and refinishing." },
            { "term": "Fabric Stain Removal", "definition": "Targeted treatment of specific stains on upholstered furniture and fabrics." },
            { "term": "Vent Filter Cleaning", "definition": "Cleaning and replacement of ventilation filters throughout HVAC systems." },
            { "term": "Foam Cleaning", "definition": "Application of foam-based cleaners for deep penetration and effective dirt removal." },
            { "term": "Food Equipment Sanitization", "definition": "Specialized cleaning of commercial food processing and storage equipment." },
            { "term": "Foundation Cleaning", "definition": "Cleaning of building foundations and basement walls to prevent mold and deterioration." },
            { "term": "Fabric Softening Treatment", "definition": "Application of fabric conditioning treatments to restore softness to cleaned upholstery." }
        ],
        G: [
            { "term": "Glass Cleaning", "definition": "Cleaning and polishing glass surfaces, windows, and mirrors for streak-free results." },
            { "term": "Green Cleaning", "definition": "Sustainable cleaning practices using non-toxic and biodegradable cleaning agents." },
            { "term": "Grout Cleaning", "definition": "Deep cleaning of grout lines between tiles using specialized brushes and cleaning solutions." },
            { "term": "Gutter Cleaning", "definition": "Removal of leaves, debris, and buildup from gutters and downspouts." },
            { "term": "Garage Cleaning", "definition": "Comprehensive cleaning of garage spaces including floor, walls, and storage organization." },
            { "term": "Graffiti Removal", "definition": "Professional removal of spray paint and graffiti from surfaces without damage." },
            { "term": "Granite Countertop Cleaning", "definition": "Safe cleaning and sealing of granite and natural stone countertops." },
            { "term": "Gift Wrapping Area Cleanup", "definition": "Cleaning of retail areas used for gift wrapping and packaging." },
            { "term": "Gasket Replacement", "definition": "Cleaning and replacement of door gaskets on refrigeration and heating equipment." },
            { "term": "Gym Equipment Sanitization", "definition": "Regular disinfecting of exercise equipment, mats, and gym facilities." },
            { "term": "Garden Furniture Cleaning", "definition": "Professional cleaning of outdoor furniture, benches, and garden structures." },
            { "term": "Glass Coating Application", "definition": "Application of protective coatings to glass surfaces for water repellency and easier cleaning." },
            { "term": "Group Facility Cleaning", "definition": "Cleaning services for large facilities with multiple areas and departments." },
            { "term": "Greenhouse Cleaning", "definition": "Specialized cleaning of greenhouse structures and interior surfaces." },
            { "term": "Grease Trap Cleaning", "definition": "Professional pumping and cleaning of grease traps in commercial kitchens." },
            { "term": "Ground Level Maintenance", "definition": "Regular cleaning and maintenance of ground-level areas, patios, and walkways." },
            { "term": "Germ Elimination", "definition": "Comprehensive removal of pathogenic microorganisms from high-touch surfaces." },
            { "term": "Glass Partition Cleaning", "definition": "Thorough cleaning of glass walls, partitions, and dividers in office spaces." }
        ],
        H: [
            { "term": "Hospital Cleaning", "definition": "Specialized cleaning and sanitization in hospitals and clinics to prevent infections." },
            { "term": "HVAC Sanitization", "definition": "Cleaning and disinfecting heating, ventilation, and air conditioning systems to maintain air quality." },
            { "term": "Home Renovation Cleanup", "definition": "Post-renovation cleaning to remove construction dust, debris, and materials." },
            { "term": "Hardwood Floor Cleaning", "definition": "Safe cleaning and maintenance of hardwood floors using appropriate solutions and techniques." },
            { "term": "Hand Rail Disinfection", "definition": "Frequent sanitization of handrails and stair railings in public buildings." },
            { "term": "Hood Exhaust Cleaning", "definition": "Professional cleaning of kitchen exhaust hoods and ventilation ducts." },
            { "term": "High-Touch Surface Disinfection", "definition": "Focused disinfection of frequently touched surfaces including doorknobs and light switches." },
            { "term": "Hazmat Cleanup", "definition": "Specialized removal and decontamination of hazardous materials following safety protocols." },
            { "term": "Hotel Room Cleaning", "definition": "Thorough daily cleaning and sanitization of hotel guest rooms and common areas." },
            { "term": "HVAC Coil Cleaning", "definition": "Cleaning of air conditioning and heating coils for improved efficiency and indoor air quality." },
            { "term": "Headboard Cleaning", "definition": "Specialized cleaning of bed headboards and upholstered wall coverings." },
            { "term": "Humidity Control", "definition": "Management of moisture levels and prevention of condensation-related mold growth." },
            { "term": "Hard-to-Reach Area Cleaning", "definition": "Specialized techniques and equipment for cleaning high angles, corners, and confined spaces." },
            { "term": "Hardware Cleaning", "definition": "Professional cleaning and polishing of door hardware, hinges, and decorative fittings." },
            { "term": "Herbal Treatment Cleaning", "definition": "Cleaning using herbal and natural product cleaning solutions." },
            { "term": "Hospital-Grade Disinfection", "definition": "Application of hospital-strength antimicrobial products in commercial non-medical settings." },
            { "term": "Hose Down Service", "definition": "High-pressure water spray cleaning of exterior surfaces and outdoor areas." },
            { "term": "Health Code Compliance", "definition": "Specialized cleaning and documentation to meet regulatory health and safety standards." }
        ],
        I: [
            { "term": "Industrial Cleaning", "definition": "Heavy-duty cleaning for factories, warehouses, and manufacturing plants." },
            { "term": "Infection Control", "definition": "Protocols to reduce or eliminate the risk of spreading infectious diseases in a facility." },
            { "term": "Interior Window Cleaning", "definition": "Thorough cleaning of interior window panes, sills, and frames." },
            { "term": "Iron Oxide Removal", "definition": "Specialized treatment to remove rust stains and oxidation from surfaces." },
            { "term": "Insulation Cleaning", "definition": "Careful cleaning and removal of contaminated insulation materials." },
            { "term": "Isolate Contamination", "definition": "Protective measures taken to prevent spread of contamination during cleaning." },
            { "term": "Industrial Equipment Degreasing", "definition": "Heavy-duty removal of grease and oil from industrial machinery and equipment." },
            { "term": "Intercom System Cleaning", "definition": "Disinfection of communication devices and speaker systems." },
            { "term": "Intake Vent Cleaning", "definition": "Cleaning of air intake vents to maintain proper airflow and efficiency." },
            { "term": "Island Cleaning", "definition": "Thorough cleaning of kitchen islands and central work surfaces." },
            { "term": "Insurance Restoration Cleaning", "definition": "Specialized cleaning following insurance claims for damage or contamination." },
            { "term": "Indoor Air Quality Improvement", "definition": "Comprehensive cleaning to enhance air quality and reduce airborne contaminants." },
            { "term": "Institutional Cleaning", "definition": "Cleaning services for schools, universities, and other institutional buildings." },
            { "term": "Icemaker Cleaning", "definition": "Professional sanitization of ice makers and ice storage areas." },
            { "term": "Ion Exchange Cleaning", "definition": "Advanced water filtration cleaning using ion exchange technology." },
            { "term": "In-Situ Cleaning", "definition": "Cleaning performed without removal or disassembly of equipment or surfaces." },
            { "term": "Incident Cleanup", "definition": "Professional cleaning and decontamination following accidents or incidents." },
            { "term": "Impact-Resistant Surface Cleaning", "definition": "Specialized cleaning of durable surfaces designed to withstand heavy use." }
        ],
        J: [
            { "term": "Janitorial Services", "definition": "Routine cleaning services for offices, schools, and commercial spaces including trash removal, sweeping, and surface cleaning." },
            { "term": "Jewelry Cleaning", "definition": "Professional ultrasonic and manual cleaning of jewelry to restore shine and brilliance." },
            { "term": "Joint Sealing", "definition": "Application of sealants to protect joints and grout lines from moisture and contamination." },
            { "term": "Jetway Cleaning", "definition": "Specialized cleaning of aircraft boarding bridges and airport terminal equipment." },
            { "term": "Jump Seat Cleaning", "definition": "Thorough cleaning and disinfection of aircraft jump seats and crew areas." },
            { "term": "Juice Stain Removal", "definition": "Specialized treatment for removing juice and organic stains from carpets and fabrics." },
            { "term": "Job Site Cleanup", "definition": "Post-project cleaning of construction sites and work areas." },
            { "term": "Junk Removal Service", "definition": "Professional removal and disposal of unwanted items and junk materials." },
            { "term": "Just-in-Time Cleaning", "definition": "Scheduled cleaning services that occur just before an event or meeting." },
            { "term": "Joint Repair Cleaning", "definition": "Cleaning before and after repair or re-sealing of joints and cracks." },
            { "term": "Journalist Workspace Cleaning", "definition": "Regular cleaning of media offices and broadcast studio spaces." },
            { "term": "Jaguar/Luxury Vehicle Detailing", "definition": "Premium cleaning and detailing services for luxury and high-end vehicles." },
            { "term": "Jib Crane Cleaning", "definition": "Industrial cleaning of overhead jib cranes and lifting equipment." },
            { "term": "Janitorial Supply Inventory", "definition": "Management and restocking of cleaning supplies and equipment." },
            { "term": "Job-Specific Deep Cleaning", "definition": "Customized cleaning services tailored to specific industry requirements." },
            { "term": "Joint Venture Cleaning Services", "definition": "Collaborative cleaning services for multi-facility operations." },
            { "term": "Joist and Beam Cleaning", "definition": "Removal of dust and debris from exposed structural beams and joists." },
            { "term": "Judicial Chamber Cleaning", "definition": "Specialized cleaning of courtrooms and judicial workspace areas." }
        ],
        K: [
            { "term": "Kitchen Sanitization", "definition": "Cleaning and disinfecting kitchen surfaces, appliances, and utensils to maintain food safety." },
            { "term": "Keyboard Cleaning", "definition": "Safe removal of dust and debris from computer keyboards and input devices." },
            { "term": "Kickboard Cleaning", "definition": "Thorough cleaning of baseboards and kickboards beneath cabinetry." },
            { "term": "Kennel Cleaning", "definition": "Professional sanitation of animal kennels, cages, and pet areas." },
            { "term": "Kilim Rug Cleaning", "definition": "Specialized gentle cleaning of delicate kilim and handwoven rugs." },
            { "term": "Kitchen Equipment Maintenance", "definition": "Regular cleaning and maintenance of commercial kitchen equipment." },
            { "term": "Knife Sanitization", "definition": "Professional cleaning and sterilization of kitchen knives and cutting tools." },
            { "term": "Knowledge Worker Area Cleaning", "definition": "Cleaning of office spaces used by technical and administrative staff." },
            { "term": "Kerosene Stain Removal", "definition": "Specialized treatment for removing kerosene and fuel stains from surfaces." },
            { "term": "Knob and Handle Disinfection", "definition": "Frequent sanitization of door knobs, handles, and switches." },
            { "term": "Kitchen Exhaust Filter Cleaning", "definition": "Removal of grease and buildup from kitchen exhaust hoods and filters." },
            { "term": "Kitchenette Sanitization", "definition": "Cleaning of small office kitchen areas including appliances and counters." },
            { "term": "Korean BBQ Grill Cleaning", "definition": "Specialized cleaning of tabletop grills and Korean restaurant cooking equipment." },
            { "term": "Ketchup and Condiment Residue Removal", "definition": "Cleaning of sticky residues from condiments and sauces." },
            { "term": "Kind Cleaning Services", "definition": "Eco-friendly cleaning using gentle and non-toxic products." },
            { "term": "Knock-Down Texture Ceiling Cleaning", "definition": "Careful cleaning of textured ceiling surfaces without damaging the texture." },
            { "term": "Kraft Paper Removal", "definition": "Professional removal of protective kraft paper and masking materials post-renovation." },
            { "term": "KitchenAid Appliance Cleaning", "definition": "Specialized cleaning of high-end kitchen appliances and equipment." }
        ],
        L: [
            { "term": "Laundry Services", "definition": "Professional washing, drying, and folding of linens, uniforms, or garments." },
            { "term": "Laminate Floor Cleaning", "definition": "Proper cleaning techniques for laminate flooring to avoid damage and maintain shine." },
            { "term": "Lighting Fixture Cleaning", "definition": "Removal of dust, bugs, and discoloration from ceiling and wall light fixtures." },
            { "term": "Latex Paint Cleanup", "definition": "Professional cleanup and disposal of latex paint materials and containers." },
            { "term": "Lobby Maintenance Cleaning", "definition": "Regular cleaning of building lobbies and entrance areas." },
            { "term": "Linoleum Floor Cleaning", "definition": "Safe cleaning and maintenance of linoleum flooring without damage." },
            { "term": "Luxury Hotel Cleaning", "definition": "Premium cleaning services for high-end hotels and resorts." },
            { "term": "Laboratory Cleaning", "definition": "Specialized sanitation of laboratory spaces meeting scientific standards." },
            { "term": "Leather Furniture Cleaning", "definition": "Specialized cleaning and conditioning of leather couches and chairs." },
            { "term": "Lawn Equipment Cleaning", "definition": "Professional cleaning of outdoor lawn care equipment and tools." },
            { "term": "Lipstick Stain Removal", "definition": "Specialized treatment for removing cosmetic stains from fabrics and surfaces." },
            { "term": "Lift Maintenance Cleaning", "definition": "Regular cleaning and maintenance of elevators and lift systems." },
            { "term": "Library Cleaning", "definition": "Specialized cleaning of library spaces including dust-sensitive book areas." },
            { "term": "Loading Dock Cleaning", "definition": "Heavy-duty cleaning of loading docks and warehouse receiving areas." },
            { "term": "Locksmith Service Cleaning", "definition": "Cleaning of locks and security hardware." },
            { "term": "Low-Pressure Cleaning", "definition": "Gentle cleaning method using reduced pressure to protect delicate surfaces." },
            { "term": "Latex Allergy Safe Cleaning", "definition": "Cleaning services using latex-free gloves and products for sensitive individuals." },
            { "term": "Laminated Document Protection Cleaning", "definition": "Safe cleaning of laminated surfaces and documents." }
        ],
        M: [
            { "term": "Mold Removal", "definition": "Elimination of mold and mildew from walls, ceilings, and other surfaces to improve health and safety." },
            { "term": "Medical Facility Cleaning", "definition": "Specialized cleaning in hospitals, clinics, and labs with strict hygiene standards." },
            { "term": "Marble Floor Cleaning", "definition": "Specialized techniques for cleaning and sealing marble flooring." },
            { "term": "Metal Polishing", "definition": "Restoration of shine to metal surfaces, fixtures, and decorative items." },
            { "term": "Microfiber Cleaning", "definition": "Specialized techniques for cleaning microfiber furniture and fabrics." },
            { "term": "Move-Out Cleaning", "definition": "Comprehensive cleaning of properties being vacated by tenants." },
            { "term": "Matting System Cleaning", "definition": "Cleaning and maintenance of entrance matting and anti-slip surfaces." },
            { "term": "Mattress Sanitization", "definition": "Deep cleaning and disinfection of mattresses to remove allergens and dust mites." },
            { "term": "Masonry Cleaning", "definition": "Professional cleaning of brick, stone, and masonry surfaces." },
            { "term": "Microwave Interior Cleaning", "definition": "Thorough cleaning of microwave interiors and removal of stuck-on residue." },
            { "term": "Museum Display Cleaning", "definition": "Expert cleaning of museum displays and artifact areas." },
            { "term": "Mineral Deposit Removal", "definition": "Removal of hard water stains and mineral buildup from surfaces." },
            { "term": "Mobile Office Cleaning", "definition": "Specialized cleaning services for mobile and modular office units." },
            { "term": "Medical Equipment Sterilization", "definition": "Professional sterilization of medical devices and equipment." },
            { "term": "Mildew Prevention Treatment", "definition": "Application of preventative treatments to stop mildew growth." },
            { "term": "Manufacturing Facility Cleaning", "definition": "Industrial cleaning for manufacturing plants and production areas." },
            { "term": "Mirror Restoration", "definition": "Cleaning and treatment to restore shine to mirrors and reflective surfaces." },
            { "term": "Municipal Facility Cleaning", "definition": "Large-scale cleaning of government and municipal buildings." }
        ],
        N: [
            { "term": "Non-Toxic Cleaning", "definition": "Using chemical-free or low-toxicity products for safer cleaning environments." },
            { "term": "NADCA Certified Duct Cleaning", "definition": "Professional air duct cleaning following NADCA (National Air Duct Cleaners Association) standards." },
            { "term": "Natural Product Cleaning", "definition": "Use of plant-based and natural cleaning agents such as vinegar and baking soda." },
            { "term": "Night Shift Cleaning", "definition": "After-hours cleaning services performed during evening and night time." },
            { "term": "Non-Abrasive Cleaning", "definition": "Gentle cleaning methods that won't scratch or damage delicate surfaces." },
            { "term": "Newsroom Cleaning", "definition": "Regular cleaning of media and news organization workspace areas." },
            { "term": "Narrow Space Cleaning", "definition": "Specialized techniques for cleaning confined and narrow areas." },
            { "term": "Nursery Disinfection", "definition": "Specialized sanitation of daycare and nursery facilities." },
            { "term": "Nail Salon Sanitation", "definition": "Professional cleaning and disinfection of nail salon equipment and workstations." },
            { "term": "Nylon Carpet Cleaning", "definition": "Specialized cleaning of nylon carpet fibers using appropriate methods." },
            { "term": "Nicotine Residue Removal", "definition": "Removal of smoke stains and nicotine residue from walls and surfaces." },
            { "term": "Navigational Equipment Cleaning", "definition": "Cleaning of GPS, radar, and navigation equipment in vehicles and aircraft." },
            { "term": "Nursing Home Cleaning", "definition": "Specialized cleaning and sanitization of senior care facilities." },
            { "term": "Nutrient Film Technique Cleaning", "definition": "Cleaning of hydroponic and vertical farming systems." },
            { "term": "Net Curtain Cleaning", "definition": "Delicate cleaning of lace and net curtain materials." },
            { "term": "Neon Sign Cleaning", "definition": "Professional cleaning of neon signs and lighting fixtures." },
            { "term": "Nose Cone Aircraft Cleaning", "definition": "Specialized cleaning of aircraft nose sections and cockpit windows." },
            { "term": "Nutrient Recycling Cleaning", "definition": "Cleaning systems that support nutrient recovery and waste minimization." }
        ],
        O: [
            { "term": "Odor Removal", "definition": "Techniques and products used to neutralize and remove unpleasant odors from rooms or surfaces." },
            { "term": "Office Equipment Cleaning", "definition": "Comprehensive cleaning of office copiers, printers, and other equipment." },
            { "term": "Oven Cleaning", "definition": "Deep cleaning of oven interiors and removal of baked-on grease and residue." },
            { "term": "Outdoor Furniture Sanitization", "definition": "Professional cleaning and disinfecting of outdoor seating and tables." },
            { "term": "Organic Residue Removal", "definition": "Removal of plant matter, algae, and biological growth from surfaces." },
            { "term": "Onsite Laundry Facility Cleaning", "definition": "Cleaning of washing machines, dryers, and laundry room equipment." },
            { "term": "Occupational Safety Compliance", "definition": "Cleaning services ensuring compliance with occupational safety standards." },
            { "term": "Oil Stain Removal", "definition": "Specialized treatment for removing oil and petroleum stains from floors and fabrics." },
            { "term": "Osmosis Cleaning System", "definition": "Use of osmotic water cleaning systems for streak-free window and glass cleaning." },
            { "term": "Opening Preparation Cleaning", "definition": "Pre-opening deep cleaning of new business establishments." },
            { "term": "Ortho-phthalaldehyde Disinfection", "definition": "Use of high-level disinfectant for medical equipment sterilization." },
            { "term": "Onboarding Area Cleaning", "definition": "Preparation and cleaning of employee onboarding and orientation spaces." },
            { "term": "Ornamental Iron Cleaning", "definition": "Professional cleaning and rust prevention for decorative iron work." },
            { "term": "Operating Room Sterilization", "definition": "Specialized surgical suite cleaning meeting strict medical standards." },
            { "term": "Off-Site Equipment Cleaning", "definition": "Mobile cleaning services for equipment cleaned away from the facility." },
            { "term": "Occluded Drain Cleaning", "definition": "Professional clearing of completely blocked or severely restricted drains." },
            { "term": "Ozoning Treatment", "definition": "Application of ozone gas to eliminate odors and disinfect spaces." },
            { "term": "Outlier Contamination Removal", "definition": "Cleaning of unusual or unexpected contamination sources." }
        ],
        P: [
            { "term": "Post-Construction Cleaning", "definition": "Deep cleaning after construction or renovation to remove dust, debris, and leftover materials." },
            { "term": "Polishing", "definition": "Buffing surfaces like metal, wood, or marble to restore shine and remove scratches." },
            { "term": "Pet Odor Removal", "definition": "Specialized treatment for removing pet-related odors and stains from carpets and furniture." },
            { "term": "Parking Lot Cleaning", "definition": "Pressure washing and sweeping of parking areas to remove dirt and debris." },
            { "term": "Paint Residue Cleanup", "definition": "Professional removal of paint splatters, drips, and residue from surfaces." },
            { "term": "Pharmaceutical Facility Cleaning", "definition": "Sterile cleaning of pharmaceutical manufacturing and storage areas." },
            { "term": "Parking Garage Maintenance", "definition": "Regular cleaning and maintenance of multi-level parking structures." },
            { "term": "Pet Cage Sanitization", "definition": "Professional cleaning and disinfection of animal cages and habitats." },
            { "term": "Plumbing Fixture Polishing", "definition": "Cleaning and polishing of faucets, pipes, and plumbing fixtures." },
            { "term": "Pool Area Cleaning", "definition": "Cleaning of pool decks, locker rooms, and aquatic facility areas." },
            { "term": "Plasma Air Purification", "definition": "Use of ionized air technology to purify and deodorize spaces." },
            { "term": "Professional Biohazard Disposal", "definition": "Safe and compliant disposal of biohazardous waste materials." },
            { "term": "Pressure Washing", "definition": "High-pressure water spray cleaning of exterior surfaces and structures." },
            { "term": "Personalized Cleaning Plans", "definition": "Customized cleaning schedules tailored to specific facility needs." },
            { "term": "Post-Event Sanitization", "definition": "Thorough cleaning and disinfection following large gatherings or events." },
            { "term": "Precision Medical Instrument Cleaning", "definition": "Expert cleaning of surgical and diagnostic medical instruments." },
            { "term": "Production Area Cleaning", "definition": "Regular sanitation of manufacturing and food production spaces." },
            { "term": "pH-Balanced Cleaning Solutions", "definition": "Use of cleaning products with balanced pH to protect surface integrity." }
        ],
        Q: [
            { "term": "Quaternary Ammonium Compounds (Quats)", "definition": "Chemical disinfectants commonly used for sanitizing surfaces in hospitals and food areas." },
            { "term": "Quality Assurance Inspection", "definition": "Verification of cleanliness standards and compliance with cleaning procedures." },
            { "term": "Quick Turnaround Cleaning", "definition": "Rapid cleaning services for fast room turnover and event preparation." },
            { "term": "Quarantine Area Disinfection", "definition": "Specialized cleaning and disinfection of isolated or quarantine spaces." },
            { "term": "Quartz Countertop Cleaning", "definition": "Safe cleaning and maintenance of engineered quartz surfaces." },
            { "term": "Quarterly Deep Cleaning", "definition": "Comprehensive seasonal cleaning performed four times per year." },
            { "term": "Quick Service Restaurant Cleaning", "definition": "Specialized cleaning for QSR (fast food) establishments." },
            { "term": "Queue Management Area Cleaning", "definition": "Cleaning of customer queue or waiting areas in retail and service locations." },
            { "term": "Quality Control Verification", "definition": "Post-cleaning inspection to ensure all cleaning standards are met." },
            { "term": "Quote-Based Services", "definition": "Custom cleaning proposals with itemized pricing for specific projects." },
            { "term": "Quicklime Surface Neutralization", "definition": "Treatment of surfaces affected by quicklime or caustic materials." },
            { "term": "Quantum-Dot Display Cleaning", "definition": "Specialized non-damaging cleaning of advanced display technologies." },
            { "term": "Quick-Change Linens Service", "definition": "Rapid replacement of bed linens and fabric materials." },
            { "term": "Quiet Zone Cleaning Schedule", "definition": "Off-peak cleaning times to minimize noise and disruption." },
            { "term": "Quinoa Processing Area Cleaning", "definition": "Specialized cleaning of food processing facilities." },
            { "term": "Quirky Stain Specialists", "definition": "Expert removal of unusual or difficult-to-identify stains." },
            { "term": "Questioning Contamination Sources", "definition": "Investigation and identification of contamination origins." },
            { "term": "Quality Environmental Certifications", "definition": "Achievement of environmental and sustainability certifications." }
        ],
        R: [
            { "term": "Residential Cleaning", "definition": "Cleaning services for homes, apartments, and condos including kitchens, bathrooms, and living areas." },
            { "term": "Restroom Sanitization", "definition": "Deep cleaning and disinfecting of public or private bathrooms to ensure hygiene." },
            { "term": "Restaurant Cleaning", "definition": "Specialized cleaning of food service establishments including kitchens and dining areas." },
            { "term": "Roof Cleaning", "definition": "Removal of algae, moss, and debris from roof surfaces and gutters." },
            { "term": "Retail Store Cleaning", "definition": "Daily cleaning of retail spaces including shelving, floors, and displays." },
            { "term": "Refrigeration Unit Cleaning", "definition": "Professional cleaning of commercial refrigerators and freezers." },
            { "term": "Rust Removal Treatment", "definition": "Specialized removal of rust from metal surfaces and fixtures." },
            { "term": "Reception Area Maintenance", "definition": "Regular cleaning of lobbies and reception spaces for professional appearance." },
            { "term": "Recycling Area Sanitization", "definition": "Cleaning and disinfection of recycling collection and sorting areas." },
            { "term": "Routine Maintenance Cleaning", "definition": "Regular scheduled cleaning to maintain facility standards." },
            { "term": "Reverse Osmosis System Cleaning", "definition": "Maintenance cleaning of water filtration systems." },
            { "term": "Rubber Floor Cleaning", "definition": "Safe cleaning techniques for rubber matting and flooring." },
            { "term": "Running Track Maintenance", "definition": "Specialized cleaning of athletic running tracks and sports surfaces." },
            { "term": "Rechargeable Equipment Disinfection", "definition": "Safe cleaning of battery-operated and electronic devices." },
            { "term": "Right-of-Way Cleaning", "definition": "Cleaning of public areas and right-of-way spaces." },
            { "term": "Rental Property Turnover Cleaning", "definition": "Complete cleaning between tenants in rental properties." },
            { "term": "Robotic Floor Cleaner Maintenance", "definition": "Servicing and cleaning of autonomous cleaning equipment." },
            { "term": "Regulatory Compliance Documentation", "definition": "Cleaning services with detailed compliance reporting and documentation." }
        ],
        S: [
            { "term": "Sanitization", "definition": "Reducing microbes on surfaces to safe levels using disinfectants and cleaning protocols." },
            { "term": "Surface Cleaning", "definition": "Removing dirt, dust, and contaminants from desks, counters, and tables." },
            { "term": "Sterilization", "definition": "Complete elimination of all microorganisms from a surface or object, often in medical settings." },
            { "term": "Steam Cleaning", "definition": "Use of high-temperature steam for deep cleaning and sanitization of surfaces." },
            { "term": "Shower Enclosure Cleaning", "definition": "Professional cleaning of glass shower doors and enclosures." },
            { "term": "Specialty Surface Treatment", "definition": "Customized cleaning for unusual materials and specialized surfaces." },
            { "term": "Septic System Cleaning", "definition": "Professional pumping and cleaning of residential septic systems." },
            { "term": "School Facility Cleaning", "definition": "Comprehensive cleaning of educational institutions and student areas." },
            { "term": "Solid Surface Restoration", "definition": "Cleaning and restoration of acrylic and engineered solid surfaces." },
            { "term": "Server Room Cleaning", "definition": "Specialized dust-free cleaning of computer server and data center spaces." },
            { "term": "Stainless Steel Polishing", "definition": "Professional cleaning and polishing of stainless steel appliances and fixtures." },
            { "term": "Spot Cleaning Service", "definition": "Quick targeted cleaning of specific stains or areas as needed." },
            { "term": "Swimming Pool Sanitization", "definition": "Chemical treatment and cleaning of pool equipment and facilities." },
            { "term": "Stucco Surface Cleaning", "definition": "Specialized cleaning of textured stucco exteriors." },
            { "term": "Smoking Residue Removal", "definition": "Elimination of tar and smoke stains from walls and ceilings." },
            { "term": "Sofa and Sectional Cleaning", "definition": "Deep cleaning of upholstered seating furniture." },
            { "term": "Supply Closet Organization", "definition": "Organization and inventory management of cleaning supplies." },
            { "term": "Satellite Office Cleaning", "definition": "Cleaning services for branch offices and satellite locations." }
        ],
        T: [
            { "term": "Tile Cleaning", "definition": "Removing grime, stains, and mold from ceramic or porcelain tiles." },
            { "term": "Trash Removal", "definition": "Collecting and disposing of garbage in a safe and hygienic manner." },
            { "term": "Toilet Sanitization", "definition": "Deep cleaning and disinfecting of toilet bowls and exterior surfaces." },
            { "term": "Terrazzo Floor Cleaning", "definition": "Specialized cleaning and sealing of terrazzo tile surfaces." },
            { "term": "Tennis Court Cleaning", "definition": "Professional cleaning of outdoor tennis courts and court surfaces." },
            { "term": "Theft Prevention Area Cleaning", "definition": "Maintaining security and cleaning perimeter zones." },
            { "term": "Textile Upholstery Treatment", "definition": "Specialized cleaning of delicate and valuable textiles." },
            { "term": "Test Lab Cleaning", "definition": "Sterile cleaning of testing and analysis laboratory spaces." },
            { "term": "Therapeutic Pool Cleaning", "definition": "Specialized maintenance of rehabilitation and therapy pools." },
            { "term": "Thermal Imaging Inspection", "definition": "Use of thermal technology to detect contamination and moisture." },
            { "term": "Ticket Counter Sanitation", "definition": "Frequent cleaning of public transaction counters and windows." },
            { "term": "Tree Sap Removal", "definition": "Specialized removal of tree sap and pollen from surfaces." },
            { "term": "Textile Floor Mat Cleaning", "definition": "Professional cleaning and disinfection of floor mats and entrance rugs." },
            { "term": "Temperature-Controlled Storage Cleaning", "definition": "Maintenance cleaning of climate-controlled storage areas." },
            { "term": "Theatrical Stage Cleaning", "definition": "Specialized cleaning of theatre stages and performance areas." },
            { "term": "Track and Trace Cleaning Audit", "definition": "Documentation of cleaning procedures for compliance verification." },
            { "term": "Truck Interior Detailing", "definition": "Comprehensive cleaning of commercial and personal truck interiors." },
            { "term": "Turnaround Cleaning Between Shifts", "definition": "Rapid cleaning services between operational shifts." }
        ],
        U: [
            { "term": "Ultraviolet (UV) Disinfection", "definition": "Using UV light to kill bacteria, viruses, and other pathogens on surfaces or in the air." },
            { "term": "Ultrasonic Cleaning", "definition": "Use of ultrasonic waves to clean delicate items and intricate surfaces deeply." },
            { "term": "Upholstered Wall Cleaning", "definition": "Professional cleaning of fabric-covered walls and wall treatments." },
            { "term": "Urethane Floor Coating Application", "definition": "Application of protective urethane coatings to floors for durability." },
            { "term": "Usage-Based Cleaning Frequency", "definition": "Customized cleaning schedules based on facility utilization patterns." },
            { "term": "Utility Room Sanitization", "definition": "Cleaning and organization of utility and mechanical rooms." },
            { "term": "Urban Facility Cleaning", "definition": "Specialized cleaning services for downtown and urban properties." },
            { "term": "Unpleasant Odor Elimination", "definition": "Targeted removal of strong odors from various sources." },
            { "term": "Uniform Cleaning Service", "definition": "Professional laundering of employee uniforms and work clothing." },
            { "term": "Universal Product Code Cleaning", "definition": "Cleaning of product scanners and retail equipment." },
            { "term": "Ultraviolet-Stable Surface Treatment", "definition": "Application of UV-protective coatings to outdoor surfaces." },
            { "term": "Unmanned Vehicle Decontamination", "definition": "Specialized cleaning of drones and robotic equipment." },
            { "term": "Upgrade Surface Treatment", "definition": "Application of improved protective treatments during regular cleaning." },
            { "term": "Upper Level Facility Access", "definition": "Specialized access and cleaning of high-level building areas." },
            { "term": "Urgent Response Sanitation", "definition": "Emergency cleaning services for immediate contamination issues." },
            { "term": "Upholstery Extraction Method", "definition": "Hot water extraction cleaning of carpets and upholstered items." },
            { "term": "Ultra-Microbe Elimination", "definition": "Cleaning targeting microscopic organisms and pathogens." },
            { "term": "Universal Biohazard Standards", "definition": "Adherence to international biohazard cleaning standards." }
        ],
        V: [
            { "term": "Vacuuming", "definition": "Using a vacuum cleaner to remove dust, dirt, and allergens from floors and carpets." },
            { "term": "Vinyl Floor Cleaning", "definition": "Safe cleaning and maintenance of vinyl sheet flooring without damage." },
            { "term": "Vehicle Interior Detailing", "definition": "Comprehensive cleaning of car and truck interiors including carpets and upholstery." },
            { "term": "Vent System Cleaning", "definition": "Professional cleaning and sanitization of ventilation ducts and vents." },
            { "term": "Vendor Sanitation Standards", "definition": "Vendor compliance with cleaning and sanitation protocols." },
            { "term": "Vertical Surface Cleaning", "definition": "Specialized cleaning of walls and vertical surfaces." },
            { "term": "Very High Frequency Disinfection", "definition": "Advanced sanitization using VHF technology." },
            { "term": "Vinyl Siding Cleaning", "definition": "Pressure washing of vinyl exterior siding without damage." },
            { "term": "Vandalism Cleanup", "definition": "Professional removal of graffiti and vandalism damage." },
            { "term": "Vehicle Fleet Sanitation", "definition": "Cleaning services for multiple vehicles in corporate fleets." },
            { "term": "Virus Elimination Protocol", "definition": "Comprehensive procedures for viral pathogen removal." },
            { "term": "Veterinary Facility Cleaning", "definition": "Specialized sanitation of animal medical facilities." },
            { "term": "Video Screen Cleaning", "definition": "Safe cleaning of monitors, televisions, and display screens." },
            { "term": "Vinyl Record Cleaning", "definition": "Specialized gentle cleaning of vinyl records and memorabilia." },
            { "term": "Vapor Phase Disinfection", "definition": "Use of vaporized hydrogen peroxide for deep sterilization." },
            { "term": "Vibration-Assisted Cleaning", "definition": "Use of vibration technology to enhance cleaning effectiveness." },
            { "term": "Verification and Documentation", "definition": "Cleanliness verification with photographic documentation." },
            { "term": "Volatile Organic Compound Removal", "definition": "Cleaning to reduce off-gassing and improve indoor air quality." }
        ],
        W: [
            { "term": "Window Cleaning", "definition": "Cleaning exterior and interior windows for streak-free clarity." },
            { "term": "Waste Management", "definition": "Organizing, collecting, and disposing of waste safely and responsibly." },
            { "term": "Wall Washing", "definition": "Thorough cleaning of wall surfaces to remove dirt, stains, and marks." },
            { "term": "Wood Floor Cleaning", "definition": "Specialized cleaning and care for hardwood and wood flooring." },
            { "term": "Water Damage Restoration Cleaning", "definition": "Professional cleanup following flooding or water damage incidents." },
            { "term": "Warehouse Sanitation", "definition": "Large-scale cleaning of warehouse and storage facilities." },
            { "term": "Watermark Removal", "definition": "Specialized removal of water stains from surfaces." },
            { "term": "Wellness Center Cleaning", "definition": "Specialized cleaning of spa, sauna, and wellness facility areas." },
            { "term": "Weekly Maintenance Cleaning", "definition": "Scheduled routine cleaning performed weekly." },
            { "term": "Whiteboard Cleaning", "definition": "Safe cleaning of dry-erase boards without damage." },
            { "term": "Wine Stain Removal", "definition": "Specialized treatment for wine and beverage stains." },
            { "term": "Whole Building Disinfection", "definition": "Comprehensive sanitization of all building areas." },
            { "term": "Wide-Angle Cleaning", "definition": "Systematic cleaning of large open spaces." },
            { "term": "Water-Soluble Coating Removal", "definition": "Removal of water-based protective coatings." },
            { "term": "Weathered Surface Restoration", "definition": "Cleaning and restoration of weather-damaged exterior surfaces." },
            { "term": "Work Station Sanitation", "definition": "Regular disinfection of employee workstations and desks." },
            { "term": "Washroom Supply Replenishment", "definition": "Restocking of paper towels, soap, and other washroom supplies." },
            { "term": "Workplace Safety Compliance Cleaning", "definition": "Cleaning procedures ensuring workplace safety standards." }
        ],
        X: [
            { "term": "X-Ray Equipment Cleaning", "definition": "Specialized cleaning of medical X-ray machines and diagnostic equipment." },
            { "term": "Xerox Machine Cleaning", "definition": "Professional cleaning of copier and multifunction printer equipment." },
            { "term": "X-Axis Precision Cleaning", "definition": "Precision-based industrial equipment cleaning along X-axis dimensions." },
            { "term": "Xenon Lamp Sanitization", "definition": "Cleaning of xenon-based lighting equipment and fixtures." },
            { "term": "X-Height Surface Treatment", "definition": "Cleaning of specialized height-defined surfaces." },
            { "term": "X-Chromosomal Analysis Clean Room", "definition": "Sterile cleaning of genetic analysis laboratory spaces." },
            { "term": "X-Ray Protective Equipment Cleaning", "definition": "Safe cleaning of lead aprons and radiation protective gear." },
            { "term": "Xenobiotic Contamination Removal", "definition": "Removal of foreign chemical contamination from surfaces." },
            { "term": "X-Linked Facility Protocols", "definition": "Specialized cleaning protocols for interconnected facility systems." },
            { "term": "Xerophyte Garden Cleaning", "definition": "Specialized cleaning of drought-resistant plant areas." },
            { "term": "X-Circuit Board Cleaning", "definition": "Precision cleaning of electronic circuit boards and components." },
            { "term": "X-Maximum Performance Cleaning", "definition": "Premium cleaning services achieving maximum cleanliness standards." },
            { "term": "X-Ray Darkroom Cleaning", "definition": "Light-sealed space sanitization for photographic development." },
            { "term": "X-Factor Stain Removal", "definition": "Specialized removal of unidentified or unique stains." },
            { "term": "X-Grade Sanitization", "definition": "Highest grade professional sanitization protocols." },
            { "term": "X-Generation Facility Cleaning", "definition": "Cleaning services for next-generation facilities and equipment." },
            { "term": "X-Position Vertical Cleaning", "definition": "Specialized vertical surface cleaning at specific positions." },
            { "term": "X-Specifications Compliance", "definition": "Cleaning services meeting exact facility specifications." }
        ],
        Y: [
            { "term": "Yard Waste Removal", "definition": "Professional collection and disposal of leaves, branches, and yard debris." },
            { "term": "Yoga Studio Sanitization", "definition": "Specialized cleaning of yoga studios and meditation spaces." },
            { "term": "Yacht Interior Cleaning", "definition": "Premium detailing and cleaning of luxury yacht interiors." },
            { "term": "Year-Round Facility Maintenance", "definition": "Continuous cleaning and maintenance throughout all seasons." },
            { "term": "Yeast and Mold Removal", "definition": "Specialized removal of fungal growth in food preparation areas." },
            { "term": "Young Children Area Cleaning", "definition": "Extra-safe sanitization of nursery and daycare spaces." },
            { "term": "Yield Area Sanitation", "definition": "Cleaning of agricultural processing and storage areas." },
            { "term": "Yogurt Processing Facility Cleaning", "definition": "Specialized cleaning of food processing equipment and facilities." },
            { "term": "Yard Furniture Cleaning", "definition": "Professional cleaning of outdoor yard furniture and structures." },
            { "term": "Yearly Deep Cleaning", "definition": "Comprehensive annual cleaning of facility interiors." },
            { "term": "Youth Center Cleaning", "definition": "Specialized cleaning for youth recreation and community centers." },
            { "term": "Yarn and Textile Storage Cleaning", "definition": "Cleaning of textile storage and manufacturing areas." },
            { "term": "Y-Beam Installation Cleaning", "definition": "Post-installation cleaning of structural components." },
            { "term": "Yellow Stain Removal", "definition": "Treatment for yellowing and discoloration on surfaces." },
            { "term": "Yielding Surface Care", "definition": "Cleaning methods that protect flexible and yielding surfaces." },
            { "term": "Yard Maintenance Debris Disposal", "definition": "Removal of landscaping and yard maintenance debris." },
            { "term": "Yearlong Cleaning Contract", "definition": "Annual cleaning service agreements with scheduled maintenance." },
            { "term": "Yeasted Product Area Cleaning", "definition": "Specialized sanitation of bakery and fermentation areas." }
        ],
        Z: [
            { "term": "Zero-Waste Cleaning Protocol", "definition": "Environmentally conscious cleaning minimizing waste generation." },
            { "term": "Zenith Window Cleaning", "definition": "Professional cleaning of highest windows and overhead glass." },
            { "term": "Zone-Based Cleaning", "definition": "Systematic cleaning of facility zones on rotating schedules." },
            { "term": "Zoonotic Disease Prevention", "definition": "Specialized sanitation to prevent animal-to-human disease transmission." },
            { "term": "Zinc Oxide Surface Cleaning", "definition": "Specialized removal of zinc-based coatings and oxidation." },
            { "term": "Zest Scent Fragrance", "definition": "Application of citrus-based fragrances post-cleaning for freshness." },
            { "term": "Zoning Compliance Cleaning", "definition": "Facility cleaning meeting specific zoning requirements." },
            { "term": "Zentrum Facility Cleaning", "definition": "Specialized care for central/main facility areas." },
            { "term": "Zero Cross-Contamination Protocol", "definition": "Advanced procedures preventing contamination spread between areas." },
            { "term": "Zephyr Air Purification", "definition": "Advanced air circulation and purification systems." },
            { "term": "Zero-Gravity Surface Cleaning", "definition": "Specialized cleaning applicable to aeronautical equipment." },
            { "term": "Zigzag Pressure Washing Pattern", "definition": "Systematic pressure washing using optimized patterns." },
            { "term": "Zone Isolation Sanitization", "definition": "Cleaning with containment of contaminated zones." },
            { "term": "Zero-Defect Cleaning Standards", "definition": "Highest quality cleaning with no acceptable defects." },
            { "term": "Zippered Area Cleaning", "definition": "Specialized cleaning of sealed and protected areas." },
            { "term": "Zoological Facility Sanitation", "definition": "Professional cleaning of zoo and animal facility areas." },
            { "term": "Zymosis Prevention Cleaning", "definition": "Specialized sanitation to prevent fermentation and decay." },
            { "term": "Zero-Residue Rinse Method", "definition": "Advanced rinsing techniques leaving no cleaning product residue." }
        ]
    };

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const availableLetters = Object.keys(glossaryTerms);

    return (
        <div className="h-full">
            <Ribbon name="Glossary" showfont={false} />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                {/* Alphabet Navigation */}
                <div className="card rounded-lg py-4 px-6 mb-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {alphabet.map((letter) => (
                            <button
                                key={letter}
                                onClick={() => availableLetters.includes(letter) && setSelectedLetter(letter)}
                                className={`w-8 h-8 flex items-center justify-center font-bold text-sm rounded transition-all ${
                                    availableLetters.includes(letter)
                                        ? selectedLetter === letter
                                            ? 'bg-teal-700 text-white'
                                            : 'bg-white text-gray-800 hover:bg-teal-100'
                                        : 'text-gray-400 cursor-not-allowed'
                                }`}
                                disabled={!availableLetters.includes(letter)}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Terms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {glossaryTerms[selectedLetter]?.map((item, index) => (
                        <div
                            key={index}
                            className="footer border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-bold mb-3">{item.term}</h3>
                            <p className="text-sm leading-relaxed text-gray-700">{item.definition}</p>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {!glossaryTerms[selectedLetter]?.length && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No terms available for letter {selectedLetter}</p>
                    </div>
                )}
            </div>
        </div>
    );
}