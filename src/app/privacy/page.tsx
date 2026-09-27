import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { EmailLink } from "@/components/ui/ContactValue";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} handles information submitted through this website.`,
  path: "/privacy",
});

/**
 * PLACEHOLDER PRIVACY POLICY.
 * This page outlines the topics a privacy policy typically covers. Replace it
 * with a policy reviewed by a qualified professional for your jurisdiction
 * and your actual data practices (form provider, CRM, analytics, etc.).
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro={<p>Last updated: [DATE]</p>}
        breadcrumbs={[{ name: "Privacy Policy", path: "/privacy" }]}
      />
      <section className="py-16 lg:py-24">
        <div className="container-site">
          <div className="max-w-3xl space-y-10 text-[1.0156rem] leading-relaxed text-ink-2">
            <p className="border border-dashed border-line-strong bg-paper-2 px-5 py-4 text-sm">
              [Placeholder: replace this page with your privacy policy. Have it reviewed for your
              jurisdiction and make sure it reflects the tools you use to receive and store inquiries.]
            </p>
            <div>
              <h2 className="heading-3 text-ink">Information we collect</h2>
              <p className="mt-3">
                When you submit a project inquiry, we collect the information you provide, such as
                your name, company, email, phone number, project address, project details, and any
                files you upload.
              </p>
            </div>
            <div>
              <h2 className="heading-3 text-ink">How we use it</h2>
              <p className="mt-3">
                We use this information to respond to your inquiry, prepare a proposal, and
                communicate with you about your project. [Describe any other uses.]
              </p>
            </div>
            <div>
              <h2 className="heading-3 text-ink">Sharing</h2>
              <p className="mt-3">
                [Describe when information may be shared, for example with licensed architects or
                engineers engaged on your project, or with service providers that host the website or
                process form submissions.]
              </p>
            </div>
            <div>
              <h2 className="heading-3 text-ink">Retention and security</h2>
              <p className="mt-3">[Describe how long information is kept and how it is protected.]</p>
            </div>
            <div>
              <h2 className="heading-3 text-ink">Contact</h2>
              <p className="mt-3">
                Questions about this policy can be sent to <EmailLink className="text-accent underline underline-offset-4" />.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
