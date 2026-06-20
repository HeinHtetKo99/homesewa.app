'use client';

import Ribbon from "../../components/Ribbon";

const teamMembers = [
  { id: 1, name: "Ramesh Koirala", role: "Director", image: "/team/1.png" },
  { id: 2, name: "Sanjana Lama", role: "Operations Manager", image: "/team/2.png" },
  { id: 3, name: "Bikash Gurung", role: "Client Relations", image: "/team/3.png" },
  { id: 4, name: "Pramit Shrestha", role: "Senior Cleaning Supervisor", image: "/team/4.png" },
  { id: 5, name: "Dipesh Thapa", role: "Training & Quality", image: "/team/5.png" },
  { id: 6, name: "Anju Karki", role: "Logistics Coordinator", image: "/team/6.png" },
  { id: 7, name: "Sudeep Basnet", role: "Customer Support Lead", image: "/team/7.png" },
  { id: 8, name: "Mina Sharma", role: "Field Supervisor", image: "/team/8.png" },
  { id: 9, name: "Niranjan Bhattarai", role: "Field Supervisor", image: "/team/9.png" },
  { id: 10, name: "Rakesh Thapa", role: "Driver", image: "/team/10.png" },
];

const OurTeam = () => {
  return (
    <div className="about-w-full">
      <Ribbon name="Our Team" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* DIRECTOR SECTION */}
        <div className="rounded-lg card p-6 md:p-10 mb-12">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="flex flex-col items-center">
              <img
                src="/team/1.png"
                className="w-48 h-48 rounded-full object-cover shadow-lg"
                alt="Ramesh Koirala"
              />
              <h2 className="text-[1.3em] md:text-[1.8em] font-bold mt-4 text-center">
                Ramesh Koirala
              </h2>
              <p className="text-[1em] mt-1 text-center">Director</p>
            </div>

            <div className="flex-1 space-y-5 leading-relaxed">
              <h1 className="text-[1.6em] md:text-[1.9em] font-semibold">About Ramesh</h1>
              <p className="text-[1em]">
                Ramesh Koirala leads his family legacy of Cleaning Services using latest technologies under HomeSewa as Director, ensuring top-quality cleaning services across Kathmandu. He focuses on efficiency, customer satisfaction, and eco-friendly solutions for homes and offices.
              </p>
              <p className="text-[1em]">
                With years of experience in operations and team management, Ramesh guarantees every cleaning service is executed professionally and reliably.
              </p>

              <div className="mt-4">
                <p className="font-normal text-base md:text-[1em]">Follow Ramesh on social media:</p>
                <div className="flex gap-3 mt-2">
                  {/* <img src="/icons/x.svg" className="w-5 h-5 cursor-pointer hover:opacity-75" /> */}
                  <a 
                  href="https://www.linkedin.com/in/koiralaramesh/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img 
                    src="/icons/linkedin.svg" 
                    className="w-5 h-5 cursor-pointer hover:opacity-75" 
                    alt="LinkedIn Profile"
                  />
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.slice(1).map((member) => (
            <div
              key={member.id}
              className="card rounded-lg p-6 flex flex-col items-center hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-full object-cover shadow"
              />
              <h3 className="font-semibold mt-4 text-[1.2em]">{member.name}</h3>
              <p className="text-sm mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;