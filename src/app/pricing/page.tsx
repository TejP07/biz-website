import type { Metadata } from "next";
import { proposalIncludes } from "@/content/trust";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { PricingFactors } from "@/components/sections/PricingFactors";
import { CtaSection } from "@/components/sections/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckIcon } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Pricing: How Project Quotes Work",
  description:
    "Every project is quoted individually. Learn what determines the price of drafting, documentation, engineering coordination, and permit support, and what a proposal includes.",
  path: "/pricing",
});

const quoteSteps = [
  {
    title: "Share your project",
    text: "Send the address, a description of the work, and any existing drawings or photos.",
  },
  {
    title: "We review and clarify",
    text: "We review the information, identify required disciplines and approvals, and ask any questions that affect scope.",
  },
  {
    title: "You receive a written proposal",
    text: "A clear scope, deliverables, schedule, and fee, agreed in writing before any work begins.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Quoted on your project, not on a price list."
        intro={
          <p>
            No two projects need exactly the same drawings, disciplines, or approvals, so we
            don&apos;t publish package prices. Instead, we review your project and send a written
            proposal with a defined scope and fee.
          </p>
        }
        breadcrumbs={[{ name: "Pricing", path: "/pricing" }]}
        actions={
          <ButtonLink href="/contact" size="lg" arrow>
            Request a Project Quote
          </ButtonLink>
        }
      />

      <section aria-labelledby="factors-heading" className="py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="factors-heading"
            index="01"
            eyebrow="What affects pricing"
            title="Eight factors shape every quote."
          />
          <div className="mt-12">
            <PricingFactors />
          </div>
        </div>
      </section>

      <section aria-labelledby="quote-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeader
              id="quote-heading"
              index="02"
              eyebrow="How quoting works"
              title="Three steps to a written proposal."
              align="stacked"
            />
            <ol className="mt-10 border-t border-line">
              {quoteSteps.map((s, i) => (
                <li key={s.title} className="flex gap-6 border-b border-line py-6">
                  <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-[0.9688rem] leading-relaxed text-ink-2">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6">
            <div className="border border-line bg-surface p-8 lg:mt-24">
              <p className="eyebrow text-muted">Every proposal includes</p>
              <ul className="mt-6 space-y-4">
                {proposalIncludes.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9844rem] text-ink">
                    <CheckIcon size={18} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-muted">
                Fees for licensed architects or engineers, jurisdiction permit fees, and third-party
                services are identified separately in your proposal where they apply.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact" arrow className="w-full sm:w-auto">
                  Request a Project Quote
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Get a clear scope and a written proposal."
        primaryLabel="Request a Project Quote"
        secondaryLabel="View services"
        secondaryHref="/services"
      />
    </>
  );
}
