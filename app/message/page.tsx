import type { Metadata } from "next";
import Ribbon from "../../components/Ribbon";
import Image from "next/image";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "A Message from HomeSewa",
  description:
    "A message from the HomeSewa team about our commitment to reliable, professional, and superfast home services in Nepal.",
  path: "/message",
});

const Message = () => {
  return (
    <div className="message-page">
      {/* Full-width Teal Ribbon Header */}
      <Ribbon name="Message from Director" showfont={false} />

      {/* Main Content */}
      <main className="py-14 px-4 md:px-10 lg:px-16">
        <div className="card rounded-2xl p-10 md:p-14 max-w-5xl mx-auto">
         
          {/* Message Paragraphs */}
          <section className="space-y-6 text-justify leading-relaxed mb-10">
            <p>
              At HomeSewa, our mission has always been to provide top-quality cleaning services with integrity, professionalism, and care. 
              Since our establishment in 2018, we have focused on building strong teams, efficient processes, and adopting modern cleaning techniques to deliver excellent results for our clients.
            </p>

            <p>
              Our teams have been dedicated to ensuring every home, office, and facility we serve receives exceptional attention and service. 
              Each project contributes to our continuous growth and commitment to raising industry standards in Kathmandu and across Nepal.
            </p>

            <p>
              We take pride in fostering a culture of reliability, innovation, and excellence. 
              Our goal is not just cleaning, but transforming spaces into safe, hygienic, and welcoming environments for everyone.
            </p>

            <p>
              Through consistent effort and dedication, HomeSewa has grown into a trusted partner for both residential and commercial clients, strengthening our reputation and long-term success in the cleaning industry.
            </p>
          </section>

          {/* Two Paragraphs + Image */}
          <section className="flex flex-wrap md:flex-nowrap items-start gap-10 mb-12">
            {/* Left Text */}
            <div className="w-full md:w-3/5 space-y-6 text-justify leading-relaxed">
              <p>
                Our commitment extends beyond cleaning; we strive to create environments that inspire comfort, health, and productivity. 
                At HomeSewa, every client and every space matters, and every team member contributes to our shared mission of excellence.
              </p>

              <p>
                We continue to adopt modern tools, eco-friendly products, and smart cleaning methods to ensure our services are effective, safe, and environmentally responsible.
                Your trust is our greatest achievement, and we are proud to serve you with the highest standards.
              </p>

              {/* Contact Info */}
              <footer className="mt-10 text-left">
                <p className="text-xl font-bold">Ramesh Koirala</p>
                <p className="text-sm mb-2">Director</p>
                <p className="font-medium mb-4"><a href="mailto:support@HomeSewa.app" className="hover:underline">support@HomeSewa.app</a></p>

                {/* Social Icons */}
                <div className="flex gap-4 mt-3">
                  <Image height={600} width={800} src="/icons/x.svg" alt="Twitter" className="w-5 h-5" />
                  <Image height={600} width={800} src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                </div>
              </footer>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-2/5 flex justify-center md:justify-end">
              <div className="w-auto md:w-full max-h-[400px] md:h-full flex items-center justify-center rounded-full overflow-hidden shadow-md bg-gray-200">
                <Image
                  height={600}
                  width={800}
                  src="/message/1.png"
                  alt="Director Ramesh Koirala"
                  className="w-auto md:w-full max-h-[400px] md:h-full object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Message;