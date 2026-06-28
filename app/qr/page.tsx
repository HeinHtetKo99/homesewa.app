'use client'
import Ribbon from "../../components/Ribbon";

const cardData = [
  {
    id: 1,
    title: "Website",
    image: "/qr/website.png",
    description: "Scan to visit our website and explore services.",
  },
  {
    id: 2,
    title: "WhatsApp",
    image: "/qr/whatsapp.png",
    description: "Connect with us on WhatsApp for updates and support.",
  },
  {
    id: 3,
    title: "Google Reviews",
    image: "/qr/google.jpg",
    description: "Check reviews and feedback from our satisfied clients.",
  },
  {
    id: 4,
    title: "Career",
    image: "/qr/career.png",
    description: "Apply or inquire about career opportunities with us.",
  },
  {
    id: 7,
    title: "Partnership",
    image: "/qr/partnership.png",
    description: "Partner with HomeSewa and grow your business with us.",
  },
  {
    id: 5,
    title: "Book a Service",
    image: "/qr/book.png",
    description: "Schedule and manage your service bookings online.",
  },
  {
    id: 6,
    title: "Location Map",
    image: "/qr/location.jpg",
    description: "Locate our office easily via Google Maps.",
  },
];

function Qr() {
  return (
    <div>
      <Ribbon name="QR Codes" showfont={false} />

      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-8">
          {cardData.map((card) => (
            <a
              key={card.id}
              target="_blank"
              rel="noopener noreferrer"
              className="card rounded-lg border border-gray-200 overflow-hidden w-full max-w-xs hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="flex flex-col">
                {card.image && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-auto object-contain mb-4 border border-gray-200 rounded-t-md"
                  />
                )}
                <h3 className="text-2xl font-semibold px-4 mb-2">{card.title}</h3>
                <p className="text-sm px-4 pb-4 pt-3">{card.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Qr;
