import React from 'react'
import Ribbon from '../../components/Ribbon'

const cookiePolicy = () => {
  return (
     <div className="h-full">
      {/* Header / Ribbon */}
      <Ribbon name="Cookie Policy" showfont={false}/>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 space-y-6">
        <section className="footer p-6 rounded-xl shadow-md space-y-6">
          <p className="about leading-relaxed">
            At <span className="font-medium">HomeSewa</span>, we value your privacy and are committed
            to ensuring a transparent and secure browsing experience. This Cookie
            Policy explains how and why cookies are used on our website, what types
            of cookies we employ, and the choices you have to manage or disable them.
          </p>
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Introduction</h2>
            <p className="about leading-relaxed mb-2">
             HomeSewa uses cookies and similar tracking 
             technologies on https://homesewa.app to improve your experience and to 
             operate our services effectively. This Cookie Policy explains what cookies
             are, how we use them, the types of cookies we use, and how you can manage
             or disable them if you prefer.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">What are Cookies & Tracking Technologies</h2>
            <ul className="list-disc list-inside about space-y-1">
              <li>Cookies are small text files placed on your device by your web browser
                 when you visit the Website. They store small amounts of data such as
                  unique identifiers, preference settings, session information, and tracking data.</li>
              <li>We may also use other tracking technologies (like scripts or similar) that have
                 the same function as cookies (storing or accessing information on a device).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">How We Use Cookies</h2>
            <p className="about leading-relaxed mb-2">
              We use cookies and tracking technologies for the following purposes:
            </p>
            <ul className="list-disc list-inside about space-y-1">
              <li>To provide and maintain our services (e.g., user login, session management, navigation).</li>
              <li>To remember your preferences and settings (e.g., language, display settings, session state).</li>
              <li>To monitor and analyze how users use our Website (traffic, page views, performance, errors), in order to improve the Website and our services.</li>
              <li>For security and fraud prevention (e.g., ensuring session integrity, preventing malicious activity).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Consent and Cookie Settings</h2>
            <ul className="list-disc list-inside about space-y-1">
              <li>When you first visit our Website, you may see a “cookie banner” or notice asking for your consent (depending on region and the types of cookies used).</li>
              <li>If you consent, cookies beyond strictly necessary ones may be set (performance, preferences, analytics, etc.).</li>
              <li>You can manage or disable cookies via your browser settings.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Third-Party Services & Cookies</h2>
            <p className="about leading-relaxed">
                We may use third-party services — such as analytics tools, marketing/advertising
                 services, or integrations — which may set cookies on your device. These cookies
                  are not under our direct control and are governed by each provider’s policy.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Changes to this Cookie Policy</h2>
            <p className="about leading-relaxed">
                We may update this Cookie Policy from time to time. When we do,
                 we will revise the “Last updated” date above.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Contact Us</h2>
            <p className="about leading-relaxed mb-1">Email: <a href="mailto:support@HomeSewa.app" className="hover:underline">support@HomeSewa.app</a></p>
            <p className="about leading-relaxed mb-1">Phone: +977-9852024365</p>
            <p className="about leading-relaxed">Address: Rem.Work, Kamalpokhari, Kathmandu, Nepal</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default cookiePolicy