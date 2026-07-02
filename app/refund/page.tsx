'use client';

import React from "react";
import Ribbon from "../../components/Ribbon";

export default function RefundPolicy() {
  return (
    <div className="h-full">
      {/* Header / Ribbon */}
      <Ribbon name="Refund Policy" showfont={false} />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 space-y-6">
        <section className="footer p-6 rounded-xl shadow-md space-y-6">
          <p className="about leading-relaxed">
            At <span className="font-medium">HomeSewa</span>, we are committed to providing top-quality cleaning services in Kathmandu. This Refund Policy explains when refunds may be issued and how you can request them.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Eligibility for Refunds</h2>
            <p className="about leading-relaxed mb-2">
              Refunds may be granted in the following cases:
            </p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Scheduled cleaning service was not performed as agreed.</li>
              <li>Service quality did not meet the standards promised.</li>
              <li>Double charges or payment errors occurred during booking.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Non-Refundable Cases</h2>
            <p className="about leading-relaxed mb-2">
              Refunds will not be issued in the following situations:
            </p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Customer changes their mind after the service has been completed.</li>
              <li>Services fully delivered and accepted by the customer.</li>
              <li>Damage caused by improper use or negligence on the customer’s part.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Refund Process</h2>
            <p className="about leading-relaxed mb-2">
              To request a refund, contact our support team at <a href="mailto:support@HomeSewa.app" className="font-medium hover:underline">support@HomeSewa.app</a> within 3 days of the service date. Provide your booking details, reason for the refund, and any supporting photos or documentation.
            </p>
            <p className="about leading-relaxed">
              Once reviewed, our team will respond within 3–5 business days. Approved refunds will be issued to the original payment method within 5–7 business days.
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
  );
}