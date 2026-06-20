'use client';

import React from "react";
import Ribbon from "../../components/Ribbon";

const PrivacyPolicy = () => {
  return (
    <div className=" h-full">
      {/* Header / Ribbon */}
      <Ribbon name="Privacy Policy" showfont={false}/>

      {/* Content */}
      <div className="max-w-7xl  mx-auto px-4 md:px-8 mb-12 space-y-6">
        <section className="footer p-6 rounded-xl shadow-md space-y-6">

          <p className="text leading-relaxed">
            <span className="font-medium">Effective Date:</span> 1st June, 2025
          </p>

          <p className="about leading-relaxed">
            HomeSewa (also referred to as &quot;HomeSewa&quot;,
            &quot;us&quot;, &quot;we&quot; or &quot;our&quot;) operates the
            www.HomeSewa.app website and mobile application (the &ldquo;Service&rdquo;). 
            This Privacy Policy explains how we collect, use, and disclose 
            personal data when you use our Service.
          </p>

          <p className="about leading-relaxed">
            By using HomeSewa, you agree to the collection and use 
            of information in accordance with this Privacy Policy. Any terms 
            used here have the same meaning as in our Terms & Conditions unless 
            specified otherwise.
          </p>

          {/* SECTION 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Use and Collection of Information
            </h2>
            <p className="about leading-relaxed">
              We collect various types of information to provide and improve our 
              Service for you.
            </p>
          </div>

          {/* SECTION 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Types of Data Collected
            </h2>

            <h3 className="text-lg font-medium text-teal-600 mt-3">Personal Data</h3>
            <p className="about leading-relaxed">
              When creating an account, you may provide personally identifiable 
              information used to identify you and connect you with service providers:
            </p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Mobile Number</li>
              <li>Email Address</li>
              <li>First Name and Last Name</li>
              <li>Address, Province, City</li>
              <li>Cookies and Usage Data</li>
              <li>Skills and Expertise</li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">Usage Data</h3>
            <p className="about leading-relaxed">
              We may collect information such as your IP address, browser type, 
              pages visited, time spent, unique device identifiers, and other 
              diagnostic data.
            </p>
          </div>

          {/* SECTION 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Tracking & Cookies Data
            </h2>
            <p className="about leading-relaxed">
              We use cookies and similar tracking technologies to track activity 
              and store certain information.
            </p>

            <h3 className="text-lg font-medium text-teal-600 mt-4">Examples of cookies:</h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>Session Cookies</li>
              <li>Preference Cookies</li>
              <li>Security Cookies</li>
            </ul>
          </div>

          {/* SECTION 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Use of Data
            </h2>
            <ul className="list-disc list-inside about space-y-1">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes</li>
              <li>To allow participation in interactive features</li>
              <li>To provide customer care and support</li>
              <li>To monitor and analyze usage</li>
              <li>To detect, prevent, and address technical issues</li>
            </ul>
          </div>

          {/* SECTION 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Transfer of Data
            </h2>
            <p className="about leading-relaxed">
              Your personal data may be transferred to servers located in Nepal, 
              USA, or Nepal. By using our Service, you consent to this transfer. 
              We take reasonable steps to ensure your data is secure.
            </p>
          </div>

          {/* SECTION 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Disclosure of Data
            </h2>
            <p className="about leading-relaxed">We may disclose your data in good faith to:</p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Comply with legal obligations</li>
              <li>Protect HomeSewa’s rights or property</li>
              <li>Investigate wrongdoing</li>
              <li>Protect user safety</li>
              <li>Prevent legal liability</li>
            </ul>
          </div>

          {/* SECTION 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Security of Data
            </h2>
            <p className="about leading-relaxed">
              No method of online transmission is 100% secure. We strive to protect 
              your data but cannot guarantee absolute security.
            </p>
          </div>

          {/* SECTION 8 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Service Providers
            </h2>
            <p className="about leading-relaxed">
              Third-party companies may access public data only to perform tasks 
              on our behalf and are obligated not to misuse it.
            </p>
          </div>

          {/* SECTION 9 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Links to Other Sites
            </h2>
            <p className="about leading-relaxed">
              We may contain links to third-party sites. We are not responsible for 
              their content or privacy practices.
            </p>
          </div>

          {/* SECTION 10 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Children’s Privacy
            </h2>
            <p className="about leading-relaxed">
              We do not knowingly collect personal data from anyone under 18. 
              If discovered, we will remove such data.
            </p>
          </div>

          {/* SECTION 11 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Changes to This Privacy Policy
            </h2>
            <p className="about leading-relaxed">
              We may update this policy. Changes will be posted with an updated 
              “Effective Date.”
            </p>
          </div>

          {/* SECTION 12 */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              Contact Us
            </h2>
            <p className="about leading-relaxed mb-1">
              Email: <a href="mailto:support@HomeSewa.app" className="hover:underline">support@HomeSewa.app</a>
            </p>
            <p className="about leading-relaxed">
              Address: HomeSewa, Kathmandu, Nepal
            </p>
          </div>

        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
