import React from "react";
import Ribbon from "../../components/Ribbon";

const Disclaimer = () => {
  return (
    <div className="h-full">
      {/* Header / Ribbon */}
      <Ribbon name="Disclaimer" showfont={false}/>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 space-y-6">
        <section className="footer p-6 rounded-xl shadow-md space-y-6">

          <p className="about leading-relaxed">
            <span className="font-medium">Effective Date:</span> 1st June, 2025
          </p>

          <p className="about leading-relaxed">
            HomeSewa (also referred to as &ldquo;us&rdquo;, &ldquo;we&rdquo; or &ldquo;our&rdquo;) operates the
            www.HomeSewa.app website and mobile application (the &ldquo;Service&rdquo;). This Disclaimer 
            describes our policies regarding the collection, use, and disclosure of personal data 
            while using the Service.
          </p>

          <p className="about leading-relaxed">
            By using HomeSewa.app, you agree to the collection and use of information as described 
            in this Privacy Policy. Terms defined here have the same meaning as in our Terms & 
            Conditions unless otherwise redefined.
          </p>

          {/* Section: Uses and Collection of Information */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Uses and Collection of Information</h2>
            <p className="about leading-relaxed">
              We collect different types of information for various purposes to improve our services for you.
            </p>
          </div>

          {/* Section: Types of Collected Data */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Types of Collected Data</h2>

            <h3 className="text-lg font-medium text-teal-600 mt-3">Personal Information</h3>
            <p className="about leading-relaxed">
              To create your identity, you may provide personally identifiable information that we use to analyze and improve our services, including for marketing purposes. This includes:
            </p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Mobile Number</li>
              <li>Email Address</li>
              <li>First Name and Last Name</li>
              <li>Address, Province, City</li>
              <li>Cookies and Usage Data</li>
              <li>Skills and Expertise</li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">Usage Information</h3>
            <p className="about leading-relaxed">
              We may collect Usage Data, including IP address, browser details, pages visited, time spent, engagements, and unique device identifiers (UDIDs).
            </p>
          </div>

          {/* Section: Tracking and Cookies Data */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Tracking and Cookies Data</h2>
            <p className="about leading-relaxed">
              We use cookies and similar tracking technologies to track activity and store certain information. Cookies may include anonymous unique identifiers. You can refuse cookies via your browser, but some services may not function properly.
            </p>

            <h3 className="text-lg font-medium text-teal-600 mt-4">Examples of Cookies</h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>Session Cookies – used to operate our services</li>
              <li>Preference Cookies – used to remember preferences and settings</li>
              <li>Security Cookies – used for security purposes</li>
            </ul>
          </div>

          {/* Section: Uses of Data */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Uses of Data</h2>
            <ul className="list-disc list-inside about space-y-1">
              <li>Providing and maintaining the service</li>
              <li>Notifying you about changes to the service</li>
              <li>Allowing participation in interactive features</li>
              <li>Providing customer care and support</li>
              <li>Providing analysis or valuable information to improve the service</li>
              <li>Monitoring service usage</li>
              <li>Detecting, preventing, and addressing technical issues</li>
            </ul>
          </div>

          {/* Section: Transfer of Data */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Transfer of Data</h2>
            <p className="about leading-relaxed">
              Your information may be transferred and maintained on servers. By submitting data, you consent to its transfer to servers in Nepal. We take necessary steps to ensure data security.
            </p>
          </div>

          {/* Section: Disclosure of Data */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Disclosure of Data</h2>
            <p className="about leading-relaxed">HomeSewa may disclose your data in good faith to:</p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Comply with legal obligations</li>
              <li>Protect and defend the rights or property of HomeSewa</li>
              <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>Protect the personal safety of users or the public</li>
              <li>Protect against legal liability</li>
            </ul>
          </div>

          {/* Section: Security of Data */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Security of Data</h2>
            <p className="about leading-relaxed">
              While we work to protect your data, no method of online transmission or electronic storage is 100% secure.
            </p>
          </div>

          {/* Section: Service Providers */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Service Providers</h2>
            <p className="about leading-relaxed">
              Third-party companies and individuals may provide services on our behalf. They may access personal data but are obligated not to misuse it.
            </p>
          </div>

          {/* Section: Other Sites */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Other Sites</h2>
            <p className="about leading-relaxed">
              Our Service may contain links to third-party websites. We are not responsible for their content, privacy policies, or practices.
            </p>
          </div>

          {/* Section: Children’s Privacy */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Children’s Privacy</h2>
            <p className="about leading-relaxed">
              We do not knowingly collect personal data from anyone under 18. If discovered, we will remove such data.
            </p>
          </div>

          {/* Section: Changes to This Privacy Policy */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Changes to This Privacy Policy</h2>
            <p className="about leading-relaxed">
              We may update this Privacy Policy and will notify you via email or prominent notice before changes take effect. The updated effective date will also be posted.
            </p>
          </div>

          {/* Section: Contact Us */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Contact Us</h2>
            <p className="about leading-relaxed">
              Email: <a href="mailto:support@HomeSewa.app" className="hover:underline">support@HomeSewa.app</a>
            </p>
          </div>

        </section>
      </div>
    </div>
  );
};

export default Disclaimer;
