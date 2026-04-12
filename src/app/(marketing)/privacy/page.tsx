import type { Metadata } from "next";
import Link from "next/link";
import { StitchMarketingHeader } from "@/components/stitch/stitch-marketing-header";

const LAST_UPDATED = "April 6, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How QRField collects, uses, and protects personal information — cookies, third parties, and your rights.",
};

export default function PrivacyPage() {
  return (
    <>
      <StitchMarketingHeader variant="inner" />
      <article className="mx-auto max-w-2xl px-6 pb-16 pt-20">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Privacy Policy</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-on-surface-variant">
          <section>
            <h2 className="text-base font-semibold text-on-surface">1. Introduction</h2>
            <p className="mt-2">
              This Privacy Policy describes how QRField (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) collects, uses, discloses, and protects information when you use our
              websites, applications, and related services (collectively, the &quot;Service&quot;).
              By using the Service, you agree to this Privacy Policy. If you do not agree, do not use
              the Service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">2. Information we collect</h2>
            <p className="mt-2">
              We collect information in the following categories, depending on how you use the Service:
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-on-surface">Account and identity.</strong> When you sign in
                with a provider such as Google, we may receive your name, email address, profile
                identifier, and avatar URL as made available by that provider.
              </li>
              <li>
                <strong className="text-on-surface">Service data.</strong> Content you create or
                upload (for example, QR configurations, destinations, labels, branding choices) and
                metadata needed to operate features you use.
              </li>
              <li>
                <strong className="text-on-surface">Usage and device data.</strong> Log and technical
                information such as IP address, approximate location derived from IP, browser type,
                device type, timestamps, and pages or features accessed.
              </li>
              <li>
                <strong className="text-on-surface">Analytics.</strong> For dynamic codes and paid
                plans, we may collect aggregated or event-level data about scans (for example,
                timestamps, coarse geographic region, device category) as described in your plan and
                product documentation.
              </li>
              <li>
                <strong className="text-on-surface">Cookies and similar technologies.</strong> We use
                cookies and similar technologies for session management, security, preferences, and—
                where applicable—analytics. You can control cookies through your browser settings;
                disabling certain cookies may limit functionality.
              </li>
              <li>
                <strong className="text-on-surface">Payment information.</strong> If you purchase a
                paid plan, payment details are processed by our payment processor (for example,
                Stripe). We typically receive limited billing metadata (such as subscription status and
                last four digits of a card) rather than full card numbers.
              </li>
              <li>
                <strong className="text-on-surface">Communications.</strong> If you contact support,
                we collect the information you provide in those messages.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">3. How we use information</h2>
            <p className="mt-2">We use information to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Provide, maintain, and improve the Service;</li>
              <li>Authenticate users and secure accounts;</li>
              <li>Process transactions and send related notices;</li>
              <li>Provide customer support and respond to requests;</li>
              <li>Monitor and analyze usage, performance, and reliability;</li>
              <li>Detect, prevent, and address fraud, abuse, and security issues;</li>
              <li>Comply with legal obligations and enforce our terms; and</li>
              <li>
                Send service-related communications; where permitted, we may also send product updates
                or marketing (you can opt out of marketing as described in those messages).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">4. Legal bases (EEA, UK, CH)</h2>
            <p className="mt-2">
              If you are in the European Economic Area, United Kingdom, or Switzerland, we process
              personal data on one or more of the following bases: performance of a contract with you;
              our legitimate interests (for example, securing the Service, improving features, and
              fraud prevention), balanced against your rights; your consent where required; and
              compliance with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">5. How we share information</h2>
            <p className="mt-2">We may share information with:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong className="text-on-surface">Service providers</strong> who process data on our
                behalf (for example, hosting, authentication, analytics, email delivery, payment
                processing), subject to contractual safeguards.
              </li>
              <li>
                <strong className="text-on-surface">Professional advisors</strong> (for example,
                lawyers, accountants) where necessary.
              </li>
              <li>
                <strong className="text-on-surface">Authorities</strong> when required by law, legal
                process, or to protect rights, safety, and security.
              </li>
              <li>
                <strong className="text-on-surface">Business transfers</strong> in connection with a
                merger, acquisition, financing, or sale of assets, subject to appropriate notices or
                consent as required by law.
              </li>
            </ul>
            <p className="mt-2">We do not sell your personal information as defined under U.S. state law.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">6. International transfers</h2>
            <p className="mt-2">
              We may process information in the United States and other countries where we or our
              providers operate. Where required, we use appropriate safeguards (such as Standard
              Contractual Clauses) for transfers from the EEA, UK, or Switzerland.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">7. Retention</h2>
            <p className="mt-2">
              We retain information for as long as necessary to provide the Service, comply with law,
              resolve disputes, and enforce our agreements. Retention periods vary by data type; for
              example, account data is kept while your account is active and for a reasonable period
              afterward unless a longer period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">8. Security</h2>
            <p className="mt-2">
              We implement technical and organizational measures designed to protect personal
              information. No method of transmission or storage is completely secure; we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">9. Your rights and choices</h2>
            <p className="mt-2">
              Depending on your location, you may have rights to access, correct, delete, or export
              your personal information; object to or restrict certain processing; withdraw consent
              where processing is consent-based; and lodge a complaint with a supervisory authority.
              To exercise these rights, contact us using the information below. We may need to verify
              your identity before responding.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">
              10. U.S. state privacy (including California)
            </h2>
            <p className="mt-2">
              Residents of certain U.S. states may have additional rights under applicable privacy
              laws (for example, the right to know, delete, or opt out of certain processing). We
              honor applicable rights requests as required by law. We do not use or disclose sensitive
              personal information for inferring characteristics in a manner that would trigger
              opt-out rights beyond what the Service requires. You may designate an authorized agent
              where permitted by law, subject to verification.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">11. Children</h2>
            <p className="mt-2">
              The Service is not directed to children under 13 (or the minimum age in your
              jurisdiction). We do not knowingly collect personal information from children. If you
              believe we have collected information from a child, please contact us and we will take
              appropriate steps to delete it.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">12. Third-party links</h2>
            <p className="mt-2">
              The Service may link to third-party sites or services. We are not responsible for their
              privacy practices; review their policies before providing information.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">13. Changes to this policy</h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time. We will post the updated policy and
              revise the &quot;Last updated&quot; date. If changes are material, we will provide
              additional notice as appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">14. Contact</h2>
            <p className="mt-2">
              For privacy-related questions or requests, contact us using the contact information
              provided on the Service (for example, through the website footer or support channel
              when available). You may also refer to our{" "}
              <Link href="/terms" className="font-semibold text-primary underline underline-offset-2">
                Terms of Service
              </Link>
              .
            </p>
          </section>

          <section className="border-t border-outline-variant pt-8">
            <p className="text-xs leading-relaxed">
              <strong className="text-on-surface">Legal notice.</strong> This policy is provided for
              general operational use. It is not legal advice. Have qualified counsel review it
              against your actual data practices, jurisdictions, and regulatory obligations.
            </p>
          </section>
        </div>

        <p className="mt-10">
          <Link href="/terms" className="text-sm font-semibold text-primary underline underline-offset-2">
            Terms of Service
          </Link>
          <span className="mx-2 text-on-surface-variant">·</span>
          <Link href="/" className="text-sm font-semibold text-primary underline underline-offset-2">
            Home
          </Link>
        </p>
      </article>
    </>
  );
}
