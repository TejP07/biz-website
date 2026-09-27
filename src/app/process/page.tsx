import type { Metadata } from "next";
import { faqs } from "@/content/faqs";
import { processSteps, responsibilities, startChecklist } from "@/content/process";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckIcon } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Our Process: From First Call to Permit",
  description:
    "A simple five-step process: tell us about your project, scope review, drawings and design coordination, licensed professional review, and permit submission and delivery.",
  path: "/process",
});

const processFaqs = faqs.filter((f) =>
  [
    "How long does a typical project take?",
    "Who stamps or seals the drawings?",
    "Can you work from existing drawings?",
    "How does pricing work?",
  ].includes(f.question),
);

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="Five steps from first call to approved drawings."
        intro={
          <p>
            A predictable process with a defined outcome at every step. You make the decisions; we
            handle the drawings, the coordination, and the paperwork in between.
          </p>
        }
        breadcrumbs={[{ name: "Process", path: "/process" }]}
        aside={
          <ol className="border-t border-line">
            {processSteps.map((s) => (
              <li key={s.number} className="flex items-baseline gap-4 border-b border-line py-3">
                <span className="font-mono text-xs text-accent">{s.number}</span>
                <span className="text-[0.9688rem] font-medium text-ink">{s.title}</span>
              </li>
            ))}
          </ol>
        }
      />

      <section aria-label="Process steps" className="py-6 lg:py-10">
        <div className="container-site">
          <ProcessTimeline steps={processSteps} variant="detailed" />
        </div>
      </section>

      <section aria-labelledby="roles-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="roles-heading"
            eyebrow="Roles"
            title="Who does what on a typical project."
            intro={
              <p>
                Clear roles prevent gaps. This is how responsibilities are usually divided; your
                proposal will spell out the specifics for your project.
              </p>
            }
          />
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {responsibilities.map((r, i) => (
              <div key={r.party} data-reveal className={`p-7 ${i === 1 ? "bg-navy text-on-navy" : "bg-paper"}`}>
                <p className={`eyebrow ${i === 1 ? "text-accent-light" : "text-muted"}`}>{r.role}</p>
                <h3 className={`heading-3 mt-4 ${i === 1 ? "text-on-navy" : "text-ink"}`}>{r.party}</h3>
                <ul className="mt-6 space-y-3">
                  {r.items.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-3 text-[0.9375rem] leading-snug ${
                        i === 1 ? "text-on-navy-muted" : "text-ink-2"
                      }`}
                    >
                      <CheckIcon
                        size={16}
                        className={`mt-0.5 shrink-0 ${i === 1 ? "text-accent-light" : "text-accent"}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Architectural and engineering work requiring a license, stamp, or seal is performed or
            reviewed by professionals licensed in the project&apos;s jurisdiction.
          </p>
        </div>
      </section>

      <section aria-labelledby="start-heading" className="py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              id="start-heading"
              eyebrow="Getting started"
              title="What helps us scope your project quickly."
              align="stacked"
            />
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
              You don&apos;t need all of this to reach out. Send what you have, and we&apos;ll ask
              for the rest.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" arrow>
                Start Your Project
              </ButtonLink>
              <ButtonLink href="/pricing" variant="secondary">
                How pricing works
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {startChecklist.map((item, i) => (
              <li key={item} className="flex gap-4 bg-paper p-6">
                <span className="font-mono text-xs leading-6 text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9688rem] leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="process-faq-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader id="process-faq-heading" eyebrow="FAQ" title="Process questions." align="stacked" />
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={processFaqs} idPrefix="process-faq" />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
