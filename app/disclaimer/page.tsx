import React from "react";
import Ribbon from "../../components/Ribbon";

const Disclaimer = () => {
  return (
    <div className="h-full">
      <Ribbon name="Disclaimer" showfont={false} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 space-y-6">
        <section className="footer p-6 rounded-xl shadow-md space-y-6">
          <p className="about leading-relaxed">
            <span className="font-medium">Last Updated:</span> July 2, 2026
          </p>

          <p className="about leading-relaxed">
            This Disclaimer governs the use of the <span className="font-medium">HomeSewa</span> platform
            (&ldquo;Platform,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing or using the Platform, you
            acknowledge and agree to the terms outlined in this Disclaimer.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">1. General Information</h2>
            <p className="about leading-relaxed mb-2">
              HomeSewa is a technology-driven hyperlocal service marketplace that connects customers with
              independent service professionals.
            </p>
            <p className="about leading-relaxed">
              The Platform acts solely as an intermediary to facilitate discovery, communication, and booking
              of services. We do not directly provide most of the services listed unless explicitly stated.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">2. No Service Guarantee</h2>
            <p className="about leading-relaxed mb-2">HomeSewa does not guarantee:</p>
            <ul className="list-disc list-inside about space-y-1">
              <li>The quality of services provided by service professionals</li>
              <li>Timeliness or completion of services</li>
              <li>Accuracy of service descriptions provided by professionals</li>
              <li>Availability of any specific service provider</li>
            </ul>
            <p className="about leading-relaxed mt-2">
              All services are performed by independent third-party service professionals, and HomeSewa is
              not responsible for their actions, omissions, or performance.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">3. Independent Contractors</h2>
            <p className="about leading-relaxed mb-2">
              All service professionals listed on the Platform operate as independent contractors and not as
              employees, agents, or representatives of HomeSewa.
            </p>
            <p className="about leading-relaxed">
              HomeSewa does not supervise, control, or direct how services are performed. Any agreement for
              service delivery exists directly between the customer and the service professional.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">4. Limitation of Liability</h2>
            <p className="about leading-relaxed mb-2">
              To the fullest extent permitted by law, HomeSewa shall not be liable for:
            </p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Any damage to property</li>
              <li>Personal injury or harm</li>
              <li>Financial loss or business interruption</li>
              <li>Service delays or cancellations</li>
              <li>Poor quality or incomplete services</li>
              <li>Disputes between users and service professionals</li>
            </ul>
            <p className="about leading-relaxed mt-2">
              Users engage with service professionals at their own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">5. AI and Technology-Based Matching</h2>
            <p className="about leading-relaxed mb-2">
              The Platform uses Artificial Intelligence (AI), algorithms, and automation systems for:
            </p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Matching users with service professionals</li>
              <li>Allocating leads and service requests</li>
              <li>Ranking search results</li>
              <li>Providing recommendations</li>
            </ul>
            <p className="about leading-relaxed mt-2">
              While we aim for accuracy and efficiency, we do not guarantee that AI-based results will always
              be correct, optimal, or error-free.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">6. Third-Party Responsibility</h2>
            <p className="about leading-relaxed mb-2">HomeSewa may use or integrate third-party services such as:</p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Payment gateways</li>
              <li>Mapping and location services</li>
              <li>Communication tools</li>
              <li>Analytics platforms</li>
            </ul>
            <p className="about leading-relaxed mt-2">
              We are not responsible for the performance, policies, or actions of third-party providers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">7. User Responsibility</h2>
            <p className="about leading-relaxed mb-2">Users are responsible for:</p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Verifying the suitability of service professionals</li>
              <li>Ensuring safe access to service locations</li>
              <li>Providing accurate booking information</li>
              <li>Supervising work when necessary</li>
            </ul>
            <p className="about leading-relaxed mt-2">
              Customers should exercise their own judgment before engaging any service provider.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">8. No Professional Advice</h2>
            <p className="about leading-relaxed">
              Any information provided on the Platform (including service descriptions, recommendations, or
              support content) is for general informational purposes only and should not be considered
              professional, legal, financial, or technical advice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">9. External Links</h2>
            <p className="about leading-relaxed mb-2">
              The Platform may contain links to external websites or third-party services.
            </p>
            <p className="about leading-relaxed">
              HomeSewa does not control or endorse such websites and is not responsible for their content,
              policies, or practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">10. Service Availability</h2>
            <p className="about leading-relaxed mb-2">Service availability may vary based on:</p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Location</li>
              <li>Demand</li>
              <li>Availability of service professionals</li>
              <li>Operational limitations</li>
            </ul>
            <p className="about leading-relaxed mt-2">
              HomeSewa does not guarantee uninterrupted or error-free availability of services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">11. Changes to Disclaimer</h2>
            <p className="about leading-relaxed mb-2">
              We reserve the right to modify or update this Disclaimer at any time without prior notice.
            </p>
            <p className="about leading-relaxed">
              Continued use of the Platform after changes indicates acceptance of the updated Disclaimer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">12. Contact Information</h2>
            <p className="about leading-relaxed mb-2">
              For any questions regarding this Disclaimer, please contact:
            </p>
            <p className="about leading-relaxed mb-1 font-medium">HomeSewa Support</p>
            <p className="about leading-relaxed mb-1">
              Email: <a href="mailto:support@HomeSewa.app" className="hover:underline">support@HomeSewa.app</a>
            </p>
            <p className="about leading-relaxed mb-1">
              Website: <a href="https://homesewa.app" className="hover:underline">https://homesewa.app</a>
            </p>
            <p className="about leading-relaxed mb-1">Phone: +977-9852024365</p>
            <p className="about leading-relaxed">Address: Rem.Work, Kamalpokhari, Kathmandu, Nepal</p>
          </div>

          <p className="about leading-relaxed">
            By using HomeSewa, you acknowledge that you have read, understood, and agreed to this Disclaimer.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
