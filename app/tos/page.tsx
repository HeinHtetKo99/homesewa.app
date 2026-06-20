'use client';

import React from "react";
import Ribbon from "../../components/Ribbon";

const TermsofServices = () => {
  return (
    <div className=" min-h-screen">
      {/* Header / Ribbon */}
      <Ribbon name="Terms of Services" showfont={false}/>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 space-y-6">
        <section className="footer p-6 rounded-xl shadow-md space-y-6">

          <p className="about leading-relaxed">
            <span className="font-medium">Last updated:</span> 1st June, 2025
          </p>

          <p className="about leading-relaxed">
            Welcome to RocketSingh. Please read these Terms and Conditions (“Terms”, 
            “Terms and Conditions”) carefully before using the website, mobile application, 
            or social media platforms (the &ldquo;Service&rdquo;) operated by RocketSingh
            (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;).
          </p>

          <p className="about leading-relaxed">
            By accessing or using the Service, you agree to be bound by these Terms. If you 
            disagree with any part of the terms, please immediately stop using the Service.
          </p>

          {/* Section: Eligibility/Age */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Eligibility / Age</h2>
            <p className="about leading-relaxed">
              Anyone under the age of 18 is not authorized to provide or receive services on RocketSingh.
            </p>
          </div>

          {/* Section: Accounts */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Accounts</h2>
            <p className="about leading-relaxed">
              You must provide accurate, complete, and current information when creating an account. 
              Misleading information may result in termination of your account.
            </p>
            <p className="about leading-relaxed">
              You are responsible for safeguarding your account details, including username and password. 
              Notify us immediately if your account is compromised.
            </p>
          </div>

          {/* Section: Understanding of our Platform */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Understanding of Our Platform</h2>
            <p className="about leading-relaxed">
              Established on June 14, 2018, RocketSingh is a premier professional cleaning services provider 
              based in Chennai, India. We specialize in innovative IT solutions but do not endorse or guarantee 
              the services provided by users.
            </p>
            <p className="about leading-relaxed">
              You agree not to hold us responsible for any issues or defaults arising from the services provided 
              by independent providers. Complaints can be submitted to terminate providers violating our guidelines.
            </p>
          </div>

          {/* Section: Links to Other Web Sites */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Links to Other Web Sites</h2>
            <p className="about leading-relaxed">
              Our Service may contain links to third-party websites. We are not responsible for their content, 
              privacy policies, or practices. Users should review their terms and policies before use.
            </p>
          </div>

          {/* Section: Delivery/Payment */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Delivery / Payment</h2>
            <p className="about leading-relaxed">
              RocketSingh does not deliver services or accept fees on behalf of users. Providers and service seekers 
              are responsible for their own agreements, payments, and documents.
            </p>
          </div>

          {/* Section: Copyrights/Intellectual Property */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Copyrights / Intellectual Property</h2>
            <p className="about leading-relaxed">
              All content on our platform is protected under copyright laws. Users shall not copy, modify, or distribute content 
              that does not belong to them.
            </p>
          </div>

          {/* Section: Termination */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Termination</h2>
            <p className="about leading-relaxed">
              Breach of Terms may lead to immediate suspension or termination of your account. Voluntary termination can be 
              done by discontinuing use or contacting us.
            </p>
          </div>

          {/* Section: Governing Law */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Governing Law</h2>
            <p className="about leading-relaxed">
              These Terms are governed by the laws of India. If any part is held invalid, the remaining provisions remain effective.
            </p>
          </div>

          {/* Section: Amendments */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Amendments</h2>
            <p className="about leading-relaxed">
              RocketSingh reserves the right to amend Terms at its discretion. Changes will be notified at least 15 days 
              in advance. Continued use constitutes acceptance of revised Terms.
            </p>
          </div>

        </section>
      </div>
    </div>
  );
};

export default TermsofServices;
