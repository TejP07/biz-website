import type { Metadata } from "next";
import Link from "next/link";
import { faqCategories, faqs } from "@/content/faqs";
import { faqSchema, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about our services, licensed architect and engineer coordination, permits and approvals, pricing, timelines, and what we need to get started.",
  path: "/faq",
});

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function FaqPage() {
  const groups = faqCategories
    .map((category) => ({ category, items: faqs.filter((f) => f.category === category) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered plainly."
        intro={
          <p>
            What we do, how licensing and engineering are handled, what to expect from permitting,
            and how projects are priced. If your question isn&apos;t here,{" "}
            <Link href="/contact" className="text-accent underline underline-offset-4 hover:text-accent-strong">
              ask us directly
            </Link>
            .
          </p>
        }
        breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
      />

      <section aria-label="Frequently asked questions" className="py-16 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="FAQ categories" className="lg:col-span-3">
            <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-0 lg:border-t lg:border-line">
              {groups.map((g) => (
                <li key={g.category}>
                  <a
                    href={`#${slugify(g.category)}`}
                    className="inline-flex border border-line px-3 py-2 text-sm text-ink-2 hover:border-ink/40 hover:text-ink lg:flex lg:w-full lg:justify-between lg:border-0 lg:border-b lg:px-0 lg:py-3"
                  >
                    {g.category}
                    <span className="ml-3 font-mono text-xs text-muted">{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16 lg:col-span-9">
            {groups.map((g) => (
              <div key={g.category} id={slugify(g.category)} className="scroll-mt-28">
                <h2 className="eyebrow mb-2 text-accent">{g.category}</h2>
                <FaqAccordion items={g.items} idPrefix={slugify(g.category)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Still have a question about your project?"
        body="Send us a short description and any drawings you have. We'll answer your questions and explain what the project is likely to involve."
      />

      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
