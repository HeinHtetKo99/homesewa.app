"use client";

import React from "react";

type Project = {
  title: string;
  description: string;
  image: string;
};

const projects: Project[] = [
  { title: "Solatee Westend", description: "Comprehensive corporate and facility cleaning services for a spotless guest experience.", image: "/projects/1.jpg" },
  { title: "Bajeko Sekuwa", description: "Deep kitchen and dining area sanitization for hygienic restaurant operations.", image: "/projects/2.jpg" },
  { title: "Sudarshan Resort", description: "Full resort cleaning including guest rooms, lobby, and common areas.", image: "/projects/3.jpg" },
  { title: "Mumbai Airport", description: "Terminal and restroom cleaning ensuring safe and hygienic spaces for travelers.", image: "/projects/4.jpg" },
  { title: "Gokarna Forest Resort", description: "Garden, lobby, and room cleaning for a pristine natural retreat.", image: "/projects/5.jpg" },
  { title: "Ncell", description: "Office and corporate space cleaning, including desks, conference rooms, and common areas.", image: "/projects/6.jpg" },
  { title: "Dusit Thani Himalaya Resort", description: "Post-construction and daily maintenance cleaning for luxury accommodation.", image: "/projects/7.jpg" },
  { title: "Club Himalaya", description: "Event cleaning, lobby and facility sanitation for guest comfort and hygiene.", image: "/projects/8.jpg" },
  { title: "Hotel Bhadgaon", description: "Complete hotel cleaning and housekeeping services for guest satisfaction.", image: "/projects/9.jpg" },
  { title: "Kavya Himalayas", description: "Corporate and residential cleaning services for office and lounge areas.", image: "/projects/10.jpg" },
  { title: "Mercure Kathmandu", description: "Room, lobby, and kitchen cleaning maintaining international hospitality standards.", image: "/projects/11.jpg" },
  { title: "Kathmandu Guest House", description: "Regular and deep cleaning services for a safe and comfortable stay.", image: "/projects/12.jpg" },
  { title: "Sankha Park", description: "Public space cleaning including pathways, lawns, and restrooms.", image: "/projects/13.jpg" },
  { title: "Hotel Aikawa, Sauraha", description: "Comprehensive guest room, lobby, and kitchen cleaning services.", image: "/projects/14.jpg" },
  { title: "The British School", description: "Classroom, corridor, and office cleaning ensuring a healthy learning environment.", image: "/projects/15.jpg" },
  { title: "Ramesh Corp", description: "Corporate office cleaning and desk sanitization services for employees’ safety.", image: "/projects/16.jpg" },
  { title: "Nabil Bank", description: "Bank branch cleaning including ATMs, counters, and customer areas.", image: "/projects/17.jpg" },
  { title: "Budhanilkantha School", description: "Classroom, playground, and restroom sanitization for students’ health.", image: "/projects/18.jpg" },
  { title: "Shankhamul Park", description: "Park and public area cleaning including pathways, benches, and playgrounds.", image: "/projects/19.jpg" },
  { title: "Ullens School", description: "Professional classroom, library, and cafeteria cleaning services.", image: "/projects/20.jpg" },
  { title: "Alice Receptions", description: "Event venue cleaning before and after functions for spotless celebrations.", image: "/projects/21.jpg" },
  { title: "Grande International Hospital", description: "Hospital and patient area cleaning, including high-touch surface disinfection.", image: "/projects/22.jpg" },
  { title: "Silver Oak Banquet", description: "Comprehensive banquet cleaning for weddings and corporate events.", image: "/projects/23.jpg" },
  { title: "The British College", description: "Classrooms, hallways, and administrative office cleaning services.", image: "/projects/24.jpg" },
  { title: "Rani Mahal Banquet", description: "Pre- and post-event cleaning services for a hygienic and polished venue.", image: "/projects/25.jpg" },
  { title: "Mediciti Hospital", description: "Patient room, lobby, and critical area cleaning with sanitization.", image: "/projects/26.jpg" },
  { title: "Frontline Hospital", description: "Hospital-grade cleaning and disinfection services for safety and hygiene.", image: "/projects/27.jpg" },
  { title: "Waterfront Resort", description: "Full resort cleaning including rooms, dining, and outdoor areas.", image: "/projects/28.jpg" },
  { title: "Rupy’s International School", description: "Comprehensive school cleaning including classrooms, labs, and playgrounds.", image: "/projects/29.jpg" },
  { title: "Norvic Hospital", description: "Patient care area cleaning and sanitation for a safe hospital environment.", image: "/projects/30.jpg" },
  { title: "Fortune Resort", description: "Full cleaning services including guest rooms, lobby, and banquet halls.", image: "/projects/31.jpg" },
  { title: "Kathmandu Premium Hotel", description: "Daily housekeeping and deep cleaning for premium hotel rooms.", image: "/projects/32.jpg" },
  { title: "Tribhuwan Park", description: "Public park cleaning including lawns, pathways, and seating areas.", image: "/projects/33.jpg" },
  { title: "Basundhara Park", description: "Professional cleaning services for recreational spaces, pathways, and greenery.", image: "/projects/34.jpg" },
  { title: "Garden of Dreams", description: "Historical garden and public area cleaning ensuring a pleasant visitor experience.", image: "/projects/35.jpg" },
  { title: "Rem.Work", description: "Indoor office cleaning and workspace sanitization to maintain a productive environment.", image: "/projects/36.jpg" },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Banner */}
      <section className="bg-[#0E4541] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our Projects
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          HomeSewa’s portfolio of beautifully maintained gardens, resorts, hotels, schools, and corporate spaces across Nepal.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-68 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}