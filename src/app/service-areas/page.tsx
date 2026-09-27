import type { Metadata } from "next";
import Link from "next/link";
import { serviceAreas } from "@/content/service-areas";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { ArrowRight, PinIcon } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Service Areas",
  description: `Design documentation, engineering coordination, and permit support in ${site.serviceArea.primary} and throughout ${site.serviceArea.region}.`,
  path: "/service-areas",
});

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title={`Serving ${site.serviceArea.primary} and ${site.serviceArea.region}.`}
        intro={
          <p>
            We work with the building departments and review processes in the areas below. Contact
            us about projects in other locations.
          </p>
        }
        breadcrumbs={[{ name: "Service Areas", path: "/service-areas" }]}
      />
      <section aria-label="Service area list" className="py-16 lg:py-24">
        <div className="container-site">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="group flex h-full flex-col border border-line bg-surface p-7 transition-colors hover:border-ink/30"
                >
                  <PinIcon size={22} className="text-accent" />
                  <h2 className="heading-3 mt-6 text-ink group-hover:text-accent">{area.name}</h2>
                  <p className="mt-1 text-sm text-muted">{area.region}</p>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">{area.summary}</p>
                  <p className="mt-5 text-sm text-ink-2">{area.localities.join(" · ")}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-accent">
                    Area details
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
