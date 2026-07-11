import type { Metadata } from "next";
import Ribbon from "../../components/Ribbon";
import { pageMetadata } from "../../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Usage Policy",
  description:
    "Read HomeSewa's Artificial Intelligence Usage Policy covering voice transcription, service matching, personalised suggestions, chatbot booking, dispatch, and data privacy in Nepal.",
  path: "/aipolicy",
});

const AIUsagePolicy = () => {
  return (
    <div className="min-h-screen">
      <Ribbon name="Artificial Intelligence Usage Policy" showfont={false} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 space-y-6">
        <section className="footer p-6 rounded-xl shadow-md space-y-6">

          <p className="about leading-relaxed">
            <span className="font-medium">Version 1.2</span> |{" "}
            <span className="font-medium">Effective Date:</span> July 2026
          </p>

          {/* Section 1: Purpose */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">1. Purpose</h2>
            <p className="about leading-relaxed">
              This policy sets out how HomeSewa designs, deploys and governs artificial
              intelligence (AI) across its hyperlocal home services platform. It applies to
              all AI-driven and AI-assisted features used by customers, service providers
              (workers/vendors) and internal staff, and is intended to guide product,
              engineering and operations decisions as the platform scales across Nepal.
            </p>
          </div>

          {/* Section 2: Scope */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">2. Scope</h2>
            <p className="about leading-relaxed">This policy covers:</p>
            <ul className="list-disc list-inside about space-y-1">
              <li>Voice-to-message conversion in Nepali within the booking form</li>
              <li>AI-based service request matching with service providers</li>
              <li>Personalised service suggestions based on booking history</li>
              <li>Custom offers generated from those suggestions</li>
              <li>Seasonal service recommendations</li>
              <li>Conversational chatbot for booking</li>
              <li>Smart worker matching and dispatch</li>
              <li>Basic DIY helpdesk AI automation</li>
              <li>Multilingual communication and content-to-voice conversion</li>
            </ul>
          </div>

          {/* Section 3: Guiding Principles */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">3. Guiding Principles</h2>
            <ul className="list-disc list-inside about space-y-2">
              <li>
                <span className="font-medium">Human oversight</span> – AI recommends and
                automates; a human (customer, worker or ops team) retains the ability to
                review, override or escalate any AI decision affecting a booking, price or
                dispatch.
              </li>
              <li>
                <span className="font-medium">Transparency</span> – Customers and providers
                are told when they&apos;re interacting with an AI system (chatbot, voice
                assistant, auto-matching) rather than a human.
              </li>
              <li>
                <span className="font-medium">Data minimisation</span> – Only data required
                for the specific AI function is collected and processed; voice and
                behavioural data aren&apos;t reused outside their stated purpose without
                consent.
              </li>
              <li>
                <span className="font-medium">Fairness</span> – Matching, dispatch and offer
                models are periodically checked for bias across geography, gender, provider
                tenure and customer segment.
              </li>
              <li>
                <span className="font-medium">Security &amp; privacy</span> – Voice
                recordings, location data and personal information are encrypted in transit
                and at rest, with access restricted on a need-to-know basis.
              </li>
              <li>
                <span className="font-medium">Compliance</span> – AI features handling
                personal data of Nepali users are designed to align with Nepal&apos;s
                Individual Privacy Act, 2075 (2018), and related regulations (see Section
                8).
              </li>
            </ul>
          </div>

          {/* Section 4: Acceptable & Prohibited Use */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              4. Acceptable &amp; Prohibited Use
            </h2>

            <h3 className="text-lg font-medium text-teal-600 mt-3">AI may be used to:</h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                Transcribe, translate, match, recommend, price (within approved ranges),
                dispatch and answer routine queries, as described in Section 6.
              </li>
              <li>
                Support human decisions with recommendations and rankings that a human can
                review or override.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">AI must not be used to:</h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                Set a final price or discount outside finance-approved ranges without human
                sign-off.
              </li>
              <li>
                Make or influence hiring, deactivation, or disciplinary decisions about a
                worker without human review.
              </li>
              <li>
                Deny, deprioritise or delay service to a customer or worker based on caste,
                ethnicity, religion, gender, disability, or any other protected
                characteristic.
              </li>
              <li>
                Impersonate a human agent without disclosing that the customer/worker is
                speaking with an AI system.
              </li>
              <li>
                Take an irreversible action (final payment capture, permanent suspension,
                account deletion) without a human-reviewable checkpoint (see Section 7).
              </li>
              <li>
                Be repurposed for surveillance, profiling, or data use beyond the stated
                purpose of the feature it was built for.
              </li>
              <li>
                Give medical, legal, or safety-critical advice beyond platform-approved,
                factual helpdesk content.
              </li>
            </ul>
          </div>

          {/* Section 5: Ethical Guidelines */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">5. Ethical Guidelines</h2>
            <ul className="list-disc list-inside about space-y-2">
              <li>
                <span className="font-medium">Non-discrimination</span> – Matching, dispatch,
                offer and suggestion models are built and tested to avoid disadvantaging
                customers or workers on the basis of caste, ethnicity, religion, gender, or
                account tenure alone.
              </li>
              <li>
                <span className="font-medium">Accountability</span> – Each AI feature has a
                named internal owner accountable for its outcomes; HomeSewa, not the AI
                system, is responsible for decisions made using it.
              </li>
              <li>
                <span className="font-medium">Explainability</span> – Customers and workers
                can request a plain-language reason for a significant AI-driven outcome
                (e.g. why a particular offer, match, or dispatch was given), routed through
                support.
              </li>
              <li>
                <span className="font-medium">No manipulative design</span> – Offers,
                suggestions and chatbot prompts must not use false urgency, hidden terms, or
                exploit customer vulnerability to drive bookings.
              </li>
              <li>
                <span className="font-medium">Worker wellbeing</span> – Dispatch and matching
                logic must not be used to systematically overload, underpay, or penalise
                workers; workload distribution is monitored as part of fairness review
                (Section 3).
              </li>
            </ul>
          </div>

          {/* Section 6: Feature-Specific AI Policies */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              6. Feature-Specific AI Policies
            </h2>

            <h3 className="text-lg font-medium text-teal-600 mt-3">
              6.1 Voice-to-Message (Nepali) in Booking Form
            </h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                <span className="font-medium">Purpose:</span> Let users record a voice note
                transcribed into text in the booking form, lowering the barrier for
                non-typing users.
              </li>
              <li>
                <span className="font-medium">AI role:</span> Nepali speech-to-text converts
                voice input into editable text; does not auto-submit without confirmation.
              </li>
              <li>
                <span className="font-medium">Human oversight:</span> Transcribed text is
                always shown before submission for edit or re-record.
              </li>
              <li>
                <span className="font-medium">Data handling:</span> Voice clips processed for
                transcription only, not retained longer than necessary; consent is captured
                before recording begins.
              </li>
              <li>
                <span className="font-medium">Risk &amp; mitigation:</span> Mis-transcription
                risk for dialects/accents is mitigated by manual edit and re-record options.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">
              6.2 Service Request Matching with Service Providers
            </h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                <span className="font-medium">Purpose:</span> Match incoming requests to the
                most suitable available provider based on category, location and profile.
              </li>
              <li>
                <span className="font-medium">AI role:</span> Ranking model scores eligible
                providers using proximity, skill, ratings and availability.
              </li>
              <li>
                <span className="font-medium">Human oversight:</span> Customers see top
                matches rather than a single locked assignment; ops can manually reassign.
              </li>
              <li>
                <span className="font-medium">Fairness:</span> A visibility mechanism ensures
                newer/lower-volume providers still get a share of requests.
              </li>
              <li>
                <span className="font-medium">Risk &amp; mitigation:</span> Over-concentration
                to top providers is monitored and corrected via rotation.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">
              6.3 Service Suggestions Based on Earlier Bookings
            </h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                <span className="font-medium">Purpose:</span> Recommend relevant follow-on or
                recurring services using booking history.
              </li>
              <li>
                <span className="font-medium">AI role:</span> Recommendation model uses past
                bookings, frequency norms and category affinity.
              </li>
              <li>
                <span className="font-medium">Human oversight:</span> Suggestions are optional
                prompts, never pre-selected or auto-booked.
              </li>
              <li>
                <span className="font-medium">Data handling:</span> Only the customer&apos;s
                own history is used; not shared across accounts.
              </li>
              <li>
                <span className="font-medium">Risk &amp; mitigation:</span> Suggestion
                frequency is capped to avoid feeling intrusive.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">
              6.4 Custom Offers Based on Suggestions
            </h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                <span className="font-medium">Purpose:</span> Convert a relevant suggestion into
                a time-bound personalised discount or bundle.
              </li>
              <li>
                <span className="font-medium">AI role:</span> Pricing engine determines
                eligibility using recency, frequency and margins.
              </li>
              <li>
                <span className="font-medium">Human oversight:</span> Finance/ops sets the
                allowable discount range; AI can&apos;t exceed pre-approved limits without
                sign-off.
              </li>
              <li>
                <span className="font-medium">Fairness:</span> Reviewed so similar customers
                get comparable offers, avoiding arbitrary price discrimination.
              </li>
              <li>
                <span className="font-medium">Risk &amp; mitigation:</span> Offer-abuse (e.g.
                account farming) checked with fraud rules alongside the model.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">6.5 Seasonal Services</h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                <span className="font-medium">Purpose:</span> Surface services relevant to the
                current season or festival period in Nepal (e.g. pre-monsoon roof/waterproofing
                checks, deep cleaning before Dashain and Tihar).
              </li>
              <li>
                <span className="font-medium">AI role:</span> Hybrid of seasonal calendar and
                demand-forecasting signals.
              </li>
              <li>
                <span className="font-medium">Human oversight:</span> Calendar and promoted
                categories reviewed/approved by ops/marketing each season.
              </li>
              <li>
                <span className="font-medium">Risk &amp; mitigation:</span> Forecasts validated
                against actual booking data each season.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">6.6 Chatbot for Booking</h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                <span className="font-medium">Purpose:</span> Let customers describe a need in
                natural language (text/voice) and complete a booking conversationally.
              </li>
              <li>
                <span className="font-medium">AI role:</span> LLM-based chatbot interprets
                intent, asks clarifying questions, pre-fills the booking form.
              </li>
              <li>
                <span className="font-medium">Human oversight:</span> Bot identifies itself as
                AI; live-agent handoff exists for complex or failed interactions.
              </li>
              <li>
                <span className="font-medium">Data handling:</span> Logs used for improvement
                are anonymised where feasible.
              </li>
              <li>
                <span className="font-medium">Risk &amp; mitigation:</span> Restricted to
                booking-related tasks; no medical/legal/safety advice; can&apos;t confirm a
                booking without explicit customer confirmation.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">
              6.7 Smart Worker Matching &amp; Dispatch
            </h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                <span className="font-medium">Purpose:</span> Assign and route the nearest,
                most qualified available worker to a confirmed job.
              </li>
              <li>
                <span className="font-medium">AI role:</span> Dispatch model combines real-time
                location, skill match, workload and ETA.
              </li>
              <li>
                <span className="font-medium">Human oversight:</span> Workers can
                accept/decline; ops has manual override for emergencies, complaints or
                no-shows.
              </li>
              <li>
                <span className="font-medium">Fairness:</span> Assignment volume and earnings
                opportunity monitored across the worker pool.
              </li>
              <li>
                <span className="font-medium">Risk &amp; mitigation:</span> Dispatch decisions
                logged for auditability in case of disputes.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">
              6.8 Basic DIY Helpdesk AI Automation
            </h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                <span className="font-medium">Purpose:</span> Resolve common, low-complexity
                queries (rescheduling, payment status, basic troubleshooting) without a human
                agent.
              </li>
              <li>
                <span className="font-medium">AI role:</span> Retrieval-based assistant answers
                from an approved knowledge base; can perform simple actions like rescheduling
                within policy limits.
              </li>
              <li>
                <span className="font-medium">Human oversight:</span> Anything outside the
                knowledge base, or involving refunds/safety complaints/disputes, escalates
                automatically to a human.
              </li>
              <li>
                <span className="font-medium">Risk &amp; mitigation:</span> Restricted from
                inventing answers outside its knowledge base (no unverified pricing, refund or
                legal claims).
              </li>
            </ul>

            <h3 className="text-lg font-medium text-teal-600 mt-4">
              6.9 Language Communication and Content-to-Voice
            </h3>
            <ul className="list-disc list-inside about space-y-1">
              <li>
                <span className="font-medium">Purpose:</span> Deliver notifications, reminders
                and support content in the user&apos;s preferred language (Nepali, English, and
                relevant local languages) and as voice where reading is inconvenient.
              </li>
              <li>
                <span className="font-medium">AI role:</span> Machine translation and
                text-to-speech convert platform content into the target language/format.
              </li>
              <li>
                <span className="font-medium">Human oversight:</span> Critical content (payment
                amounts, cancellation terms, legal notices) reviewed for translation accuracy;
                language preference is user-selected, never assumed.
              </li>
              <li>
                <span className="font-medium">Risk &amp; mitigation:</span> Numeric values,
                dates and prices stay in a standard, non-translated format regardless of
                language to avoid critical translation errors.
              </li>
            </ul>
          </div>

          {/* Section 7: Human Oversight & Escalation */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              7. Human Oversight &amp; Escalation
            </h2>
            <p className="about leading-relaxed">
              No AI feature may take an irreversible action (final payment capture, permanent
              account suspension, worker deactivation) without a human-reviewable checkpoint.
              Every automated feature has a defined escalation path to a human for edge cases,
              errors or disputes.
            </p>
          </div>

          {/* Section 8: Data Privacy Requirements */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              8. Data Privacy Requirements (Nepal)
            </h2>
            <ul className="list-disc list-inside about space-y-2">
              <li>
                <span className="font-medium">Legal basis</span> – HomeSewa&apos;s data
                handling is designed to align with the Constitution of Nepal&apos;s Article 28
                (right to privacy), the Individual Privacy Act, 2075 (2018) and Individual
                Privacy Regulation, 2077 (2020), the Electronic Transactions Act, 2063 (2008),
                and the Data Act, 2079 (2022).
              </li>
              <li>
                <span className="font-medium">Consent</span> – Personal information (name,
                phone, address, voice recordings, location, biometric or behavioural data) is
                collected, recorded, disclosed or processed only with the individual&apos;s
                informed consent, except where collection is required by law or court order.
              </li>
              <li>
                <span className="font-medium">Sensitive data</span> – Caste, ethnicity,
                religious affiliation, health information, and similar sensitive personal data
                are given heightened protection and are not processed unless required for
                service delivery, health/emergency purposes, or the individual has made it
                public themselves.
              </li>
              <li>
                <span className="font-medium">Rectification</span> – Customers and workers can
                request correction of inaccurate personal data held by HomeSewa, consistent
                with Section 28 of the Individual Privacy Act. (Note: Nepali law does not
                currently provide a right to erasure/deletion or data portability in the way
                GDPR-style frameworks do; HomeSewa nonetheless deletes data it no longer needs
                as a matter of internal policy.)
              </li>
              <li>
                <span className="font-medium">Retention</span> – Voice clips are retained for a
                maximum of 30 days after transcription; chat logs used for QA are retained for 90
                days; booking/behavioural data used for personalisation is retained only while
                the account is active plus a defined post-closure window.
              </li>
              <li>
                <span className="font-medium">Third-party/cross-border processing</span> – If
                any third-party AI vendor (speech-to-text, translation, LLM API) processes data
                outside Nepal, this is disclosed to users and limited to vendors with adequate
                data-protection safeguards.
              </li>
              <li>
                <span className="font-medium">Breach response</span> – Any suspected data
                breach involving AI-processed personal data is reported internally within 24
                hours; affected individuals are notified where required, and complaints can be
                escalated to the District Court under the Individual Privacy Act&apos;s
                three-month complaint window.
              </li>
              <li>
                <span className="font-medium">No resale</span> – AI training or improvement
                data is never sold or shared with unrelated third parties.
              </li>
            </ul>
          </div>

          {/* Section 9: Quality Assurance & Testing */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              9. Quality Assurance &amp; Testing
            </h2>
            <ul className="list-disc list-inside about space-y-2">
              <li>
                <span className="font-medium">Pre-deployment validation</span> – Every AI
                feature is tested against a defined accuracy/performance threshold (e.g. minimum
                transcription accuracy, minimum matching precision, minimum translation accuracy
                for critical fields) before going live.
              </li>
              <li>
                <span className="font-medium">Bias audits</span> – Matching, dispatch and offer
                models undergo a documented fairness check across geography, gender,
                caste/ethnicity, provider tenure and customer segment before launch and at each
                quarterly review.
              </li>
              <li>
                <span className="font-medium">Ongoing monitoring</span> – Each feature owner
                reviews accuracy, fairness and complaint rates quarterly, or sooner if a
                pattern of errors or complaints is identified.
              </li>
              <li>
                <span className="font-medium">Incident logging</span> – Errors, overrides and
                escalations are logged per feature to identify recurring failure patterns and
                inform model retraining.
              </li>
              <li>
                <span className="font-medium">Versioning &amp; rollback</span> – Model updates
                are versioned; any update that degrades performance or fairness beyond threshold
                is rolled back to the last approved version.
              </li>
              <li>
                <span className="font-medium">Vendor vetting</span> – Third-party AI tools
                (speech-to-text, translation, LLM APIs) are evaluated for accuracy,
                data-handling practices and compliance before integration.
              </li>
            </ul>
          </div>

          {/* Section 10: Implementation Roadmap */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              10. Implementation Roadmap
            </h2>
            <ul className="list-disc list-inside about space-y-2">
              <li>
                <span className="font-medium">Phase 1 – Pilot:</span> Launch voice-to-message,
                chatbot and basic helpdesk automation to a limited user/provider group in a
                single Nepali city; validate accuracy thresholds and escalation flow.
              </li>
              <li>
                <span className="font-medium">Phase 2 – Limited rollout:</span> Extend to
                service matching, suggestions and seasonal recommendations across a wider metro
                area; run first fairness audit.
              </li>
              <li>
                <span className="font-medium">Phase 3 – Full scale:</span> Enable smart dispatch
                and custom offers platform-wide once QA thresholds are consistently met.
              </li>
              <li>
                <span className="font-medium">Staff training:</span> Ops and support staff are
                trained on escalation handling, bias-review basics, and how to explain
                AI-driven outcomes to users.
              </li>
              <li>
                <span className="font-medium">Review ownership:</span> Each feature has a named
                internal owner responsible for its quarterly QA and fairness review (to be
                assigned as the team grows).
              </li>
            </ul>
          </div>

          {/* Section 11: Ownership & Responsibility */}
          <div>
            <h2 className="text-2xl font-semibold text-teal-800 mb-2">
              11. Ownership &amp; Responsibility
            </h2>
            <p className="about leading-relaxed">
              Applies to all team members, contractors and third-party vendors building or
              integrating AI features into the platform. Any new AI feature is reviewed against
              this policy before launch.
            </p>
          </div>

        </section>
      </div>
    </div>
  );
};

export default AIUsagePolicy;
