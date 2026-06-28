import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import { FormPageTitle } from "../../components/FormPageLayout";

const VisitIcon = () => (
  <svg width="27" height="26" fill="none" stroke="#0D5D59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C7 2 3 6 3 11c0 7 9 13 9 13s9-6 9-13c0-5-4-9-9-9z" />
    <circle cx="12" cy="11" r="3" />
  </svg>
);

const EmailIcon = () => (
  <svg width="26" height="26" fill="none" stroke="#0D5D59" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="14" rx="2" ry="2" />
    <path d="M3 8l9 6 9-6" />
  </svg>
);

const quickContacts = [
  { name: "Ramesh Koirala", role: "Director", image: "/contact/1.png" },
  { name: "Sanjana Lama", role: "Operations Manager", image: "/contact/2.png" },
  { name: "Sudeep Basnet", role: "Customer Support Lead", image: "/contact/3.png" },
];

export const metadata = {
  title: "Contact | HomeSewa",
  description: "Contact HomeSewa for professional cleaning and home services in Nepal.",
};

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-24 text-gray-800 md:pb-10">
      <div className="shrink-0 border-b border-gray-100 px-4 py-3 text-center">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-1 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-semibold text-gray-800">Contact</span>
        </div>

        <FormPageTitle title="Contact HomeSewa" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-16 grid items-start gap-8 lg:grid-cols-2">
          <div className="rounded-lg shadow-md">
            <ContactForm />
          </div>

          <div className="flex justify-center lg:pt-4">
            <img
              src="/contact/remwork.jpg"
              alt="HomeSewa Office"
              className="h-[450px] w-full max-w-md rounded-2xl object-cover drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="mb-16 w-full rounded-2xl bg-gradient-to-b from-teal-50 via-white to-teal-50 py-16 shadow-inner">
          <div className="mx-auto mb-16 grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
            <div>
              <h2 className="mb-5 text-4xl font-extrabold text-teal-900">We Work Across Nepal</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Our team serves Kathmandu, Lalitpur, Bhaktapur and nearby regions with fast, reliable cleaning solutions for homes, offices, hotels, and commercial properties.
              </p>
            </div>
            <div className="h-[420px] overflow-hidden rounded-2xl border border-teal-400 shadow-[0_0_30px_rgba(13,93,89,0.2)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9798999999997!2d80.2345678!3d13.0412345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526766dfd86fb3%3A0x9dcda003383a79dc!2sT.%20Nagar%2C%20Kathmandu%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HomeSewa office location"
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
            <div className="group rounded-xl border-2 border-teal-900 bg-white p-4 text-center shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-2 flex justify-center"><VisitIcon /></div>
              <h3 className="mb-1 text-lg font-semibold text-teal-900">Visit Us</h3>
              <p className="text-sm leading-relaxed">Rem.Work, Kamalpokhari,<br />Kathmandu, Nepal</p>
            </div>
            <a
              href="mailto:HomeSewa@sriyog.com"
              className="group rounded-xl border-2 border-teal-900 bg-white p-4 text-center shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-2 flex justify-center"><EmailIcon /></div>
              <h3 className="mb-1 text-lg font-semibold text-teal-900">Email Us</h3>
              <p className="text-sm leading-relaxed">HomeSewa@sriyog.com</p>
            </a>
            <Link
              href="/book"
              className="group rounded-xl border-2 border-teal-900 bg-white p-4 text-center shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-2 flex justify-center"><EmailIcon /></div>
              <h3 className="mb-1 text-lg font-semibold text-teal-900">Book a Service</h3>
              <p className="text-sm leading-relaxed">Schedule online instantly</p>
            </Link>
          </div>
        </div>

        <section className="mx-auto w-full max-w-6xl px-6 py-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-teal-900">Quick Contact</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {quickContacts.map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-center rounded-xl border border-teal-50 bg-white p-6 text-center shadow-md transition hover:shadow-lg"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="mb-4 h-32 w-32 rounded-full object-cover ring-4 ring-teal-100"
                />
                <h3 className="mb-1 text-xl font-semibold">{person.name}</h3>
                <p className="mb-4 text-gray-600">{person.role}</p>
                <a
                  href="https://d.sriyog.com/homesewa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#0E4541] px-4 py-2 font-medium text-white transition hover:bg-teal-900"
                >
                  WhatsApp
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
