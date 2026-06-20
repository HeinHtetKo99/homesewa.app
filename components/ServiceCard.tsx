import Link from "next/link";

type ServiceCardProps = {
  image: string;
  title: string;
  desc: string;
  href?: string;
  showBook?: boolean;
  showLearnMore?: boolean;
  bookButtonVariant?: "filled" | "outline";
};

export default function ServiceCard({
  image,
  title,
  desc,
  href,
  showBook = true,
  showLearnMore = true,
  bookButtonVariant = "filled",
}: ServiceCardProps) {
  const bookButtonClass =
    bookButtonVariant === "outline"
      ? "px-4 py-1 text-teal-700 border border-teal-700 rounded-full bg-white text-sm font-semibold transition-transform duration-200 hover:scale-105"
      : "px-4 py-1.5 text-white bg-[#0E4541] border border-teal-900 rounded-full text-sm font-semibold hover:bg-teal-900 transition-transform hover:scale-105";
  return (
    <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-teal-100 flex flex-col h-full">
      <div className="h-56 overflow-hidden">
        {href ? (
          <Link href={href}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </Link>
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        )}
      </div>

      <div className="p-6 relative z-10 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-teal-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base flex-grow">{desc}</p>

        {showBook && showLearnMore && (
          <div className="flex flex-wrap gap-3 mt-5 justify-center">
            {href && (
              <Link
                href={href}
                className="px-4 py-1.5 text-teal-800 border border-teal-700 rounded-full bg-white text-sm font-semibold hover:bg-teal-50 transition-transform hover:scale-105"
              >
                Learn More
              </Link>
            )}
            <Link href="/book" className={bookButtonClass}>
              Book a Service
            </Link>
          </div>
        )}
      </div>

      {showBook && !showLearnMore && (
        <div className="pb-6 flex justify-center">
          <Link href="/book" className={`mt-4 ${bookButtonClass}`}>
            Book a Service
          </Link>
        </div>
      )}

      <div
        className={`absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 ${showLearnMore ? "group-hover:opacity-10" : "group-hover:opacity-20"}`}
      />
    </div>
  );
}
