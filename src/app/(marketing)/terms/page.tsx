import type { Metadata } from "next";
import Link from "next/link";
import { StitchMarketingHeader } from "@/components/stitch/stitch-marketing-header";

const LAST_UPDATED = "April 6, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of QRField — accounts, acceptable use, subscriptions, liability, and contact.",
};

export default function TermsPage() {
  return (
    <>
      <StitchMarketingHeader variant="inner" />
      <article className="mx-auto max-w-2xl px-6 pb-16 pt-20">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">Terms of Service</h1>
        <p className="mt-2 text-sm text-on-surface-variant">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-on-surface-variant">
          <section>
            <h2 className="text-base font-semibold text-on-surface">1. Agreement</h2>
            <p className="mt-2">
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of QRField
              (the &quot;Service&quot;), including our website, applications, and related features.
              By creating an account, clicking to accept these Terms where offered, or using the
              Service, you agree to be bound by these Terms. If you do not agree, do not use the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">2. Who we are</h2>
            <p className="mt-2">
              The Service is operated by the provider of QRField (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;). You are the individual or entity using the Service (&quot;you&quot; or
              &quot;Customer&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">3. Eligibility</h2>
            <p className="mt-2">
              You must be at least the age of majority in your jurisdiction (and at least 13 in the
              United States) to use the Service. If you use the Service on behalf of an
              organization, you represent that you have authority to bind that organization to these
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">4. Accounts and security</h2>
            <p className="mt-2">
              You may need to sign in using a supported identity provider (for example, Google). You
              are responsible for maintaining the confidentiality of your account credentials and for
              all activity under your account. Notify us promptly of any unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">5. The Service</h2>
            <p className="mt-2">
              QRField provides tools to create, manage, and distribute QR codes, including static and
              dynamic codes, exports, and—depending on your plan—analytics and related features. We may
              modify, suspend, or discontinue parts of the Service with reasonable notice where
              practicable; we may also update these Terms as described in Section 14.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">6. Plans, billing, and trials</h2>
            <p className="mt-2">
              Free and paid plans may be offered. Fees, taxes, renewal terms, and cancellation rights
              for paid plans will be presented at checkout or in your account. Unless stated otherwise,
              subscriptions renew until you cancel in accordance with the billing flow we provide.
              Failure to pay may result in downgrade or loss of paid features.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">7. Acceptable use</h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Violate applicable law or third-party rights.</li>
              <li>
                Use the Service to distribute malware, phishing, spam, or deceptive or illegal
                content.
              </li>
              <li>
                Attempt to probe, scan, or test the vulnerability of the Service or breach security
                or authentication measures without authorization.
              </li>
              <li>
                Reverse engineer, decompile, or disassemble the Service except where such restriction
                is prohibited by law.
              </li>
              <li>
                Resell or redistribute the Service without our written agreement, or use the Service
                to build a competing product in violation of our intellectual property rights.
              </li>
              <li>
                Interfere with other users&apos; use of the Service or impose an unreasonable load on
                our infrastructure.
              </li>
            </ul>
            <p className="mt-2">
              We may investigate violations and suspend or terminate access where we reasonably
              believe it is necessary to protect the Service, users, or the public.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">8. Your content</h2>
            <p className="mt-2">
              You retain ownership of content you submit (&quot;Customer Content&quot;). You grant us a
              worldwide, non-exclusive license to host, process, transmit, and display Customer
              Content solely to provide, secure, and improve the Service. You represent that you have
              all rights necessary to grant this license and that your content complies with these
              Terms and applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">9. Our intellectual property</h2>
            <p className="mt-2">
              The Service, including software, branding, and documentation, is owned by us or our
              licensors and is protected by intellectual property laws. Except for the limited rights
              expressly granted in these Terms, we reserve all rights.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">10. Third-party services</h2>
            <p className="mt-2">
              The Service may integrate with third parties (for example, sign-in providers or payment
              processors). Your use of those services is subject to their terms and privacy policies;
              we are not responsible for third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">11. Disclaimers</h2>
            <p className="mt-2">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM
              EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR
              STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
              ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">12. Limitation of liability</h2>
            <p className="mt-2">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA,
              GOODWILL, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO THESE TERMS OR THE
              SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER
              LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p className="mt-2">
              OUR AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE
              SERVICE WILL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID US FOR THE SERVICE IN THE
              TWELVE (12) MONTHS BEFORE THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS (US$100), IF YOU
              HAVE NOT HAD ANY PAYMENT OBLIGATIONS.
            </p>
            <p className="mt-2">
              Some jurisdictions do not allow certain limitations; in those jurisdictions, our
              liability is limited to the fullest extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">13. Indemnity</h2>
            <p className="mt-2">
              You will defend, indemnify, and hold harmless us and our affiliates, officers,
              directors, employees, and agents from and against any claims, damages, losses, and
              expenses (including reasonable attorneys&apos; fees) arising out of your Customer
              Content, your use of the Service in violation of these Terms, or your violation of law or
              third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">14. Changes</h2>
            <p className="mt-2">
              We may update these Terms from time to time. We will post the updated Terms and update
              the &quot;Last updated&quot; date. If changes are material, we will provide additional
              notice as appropriate (for example, by email or in-product notice). Your continued use
              after the effective date constitutes acceptance of the revised Terms, except where
              prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">15. Termination</h2>
            <p className="mt-2">
              You may stop using the Service at any time. We may suspend or terminate your access if
              you materially breach these Terms, if we are required to do so by law, or if we
              discontinue the Service. Provisions that by their nature should survive will survive
              termination (including Sections 8–13 and 16–18).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">16. Governing law and disputes</h2>
            <p className="mt-2">
              These Terms are governed by the laws of the State of Delaware, USA, without regard to
              conflict-of-law principles, except where mandatory consumer protection laws of your
              jurisdiction apply. Courts in Delaware (or another forum we designate in writing) will
              have exclusive jurisdiction over disputes, unless applicable law requires otherwise.
            </p>
            <p className="mt-2">
              <strong className="text-on-surface">Informal resolution.</strong> Before filing a claim,
              you agree to contact us to try to resolve the dispute informally.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">17. General</h2>
            <p className="mt-2">
              These Terms, together with our Privacy Policy, constitute the entire agreement between
              you and us regarding the Service. If any provision is unenforceable, the remaining
              provisions remain in effect. Our failure to enforce a provision is not a waiver. You
              may not assign these Terms without our consent; we may assign them in connection with a
              merger, acquisition, or sale of assets.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-on-surface">18. Contact</h2>
            <p className="mt-2">
              For questions about these Terms, contact us using the contact information provided on
              the Service (for example, through the website footer or support channel when available).
            </p>
          </section>

          <section className="border-t border-outline-variant pt-8">
            <p className="text-xs leading-relaxed">
              <strong className="text-on-surface">Legal notice.</strong> This document is provided for
              general information and operational clarity. It is not legal advice. You should have
              qualified counsel review and adapt these Terms for your entity, jurisdiction, product
              features, and risk profile before relying on them commercially.
            </p>
          </section>
        </div>

        <p className="mt-10">
          <Link href="/privacy" className="text-sm font-semibold text-primary underline underline-offset-2">
            Privacy Policy
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
