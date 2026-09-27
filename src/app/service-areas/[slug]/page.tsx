import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceArea, serviceAreas } from "@/content/service-areas";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { projectTypes } from "@/content/project-types";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight, ServiceIcon } from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/service-areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) return {};
  return pageMetadata({
    title: `Drafting, Engineering Coordination & Permits in ${area.name}`,
    description: `Architectural drafting, structural and MEP coordination, and permit support for projects in ${area.name}, ${area.region}.`,
    path: `/service-areas/${area.slug}`,
  });
}

export default async function ServiceAreaPage({ params }: PageProps<"/service-areas/[slug]">) {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Design documentation and engineering coordination",
    provider: { "@id": absoluteUrl("/#organization"), name: site.name },
    areaServed: { "@type": "Place", name: `${area.name}, ${area.region}` },
    url: absoluteUrl(`/service-areas/${area.slug}`),
  };

  return (
    <>
      <PageHero
        eyebrow={`Service area · ${area.region}`}
        title={`Design documentation & permit support in ${area.name}.`}
        intro={<p>{area.summary}</p>}
        breadcrumbs={[
          { name: "Service Areas", path: "/service-areas" },
          { name: area.name, path: `/service-areas/${area.slug}` },
        ]}
        actions={
          <ButtonLink href="/contact" arrow>
            Start Your Project
          </ButtonLink>
        }
        aside={
          <dl className="border-t border-line">
            <div className="border-b border-line py-4">
              <dt className="eyebrow text-muted">Communities</dt>
              <dd className="mt-2 text-[0.9688rem] text-ink">{area.localities.join(" · ")}</dd>
            </div>
            <div className="border-b border-line py-4">
              <dt className="eyebrow text-muted">Jurisdictions</dt>
              <dd className="mt-2 text-[0.9688rem] text-ink">{area.jurisdictions.join(" · ")}</dd>
            </div>
          </dl>
        }
      />

      <section aria-labelledby="area-services-heading" className="py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="area-services-heading"
            eyebrow="Services"
            title={`Services for ${area.name} projects.`}
          />
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className="bg-paper">
                <Link href={`/services#${s.slug}`} className="group flex h-full gap-5 p-6 hover:bg-surface">
                  <ServiceIcon name={s.icon} size={32} className="shrink-0 text-ink" />
                  <span>
                    <span className="block font-display text-[1.0625rem] font-semibold text-ink group-hover:text-accent">
                      {s.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-ink-2">{s.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="area-types-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              id="area-types-heading"
              eyebrow="Project types"
              title="Projects we support in this area."
              align="stacked"
            />
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
              Local submission requirements differ between jurisdictions. We prepare each package to
              the requirements of the reviewing authority for your project.
            </p>
          </div>
          <ul className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {projectTypes.map((t) => (
              <li key={t.label} className="flex items-center justify-between gap-4 bg-paper px-5 py-4">
                <span className="text-[0.9688rem] text-ink">{t.label}</span>
                <span className="font-mono text-[0.7rem] text-muted">{t.code}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Other service areas" className="py-14">
        <div className="container-site flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="eyebrow text-muted">Other areas</span>
          {serviceAreas
            .filter((a) => a.slug !== area.slug)
            .map((a) => (
              <Link
                key={a.slug}
                href={`/service-areas/${a.slug}`}
                className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-accent hover:text-accent-strong"
              >
                {a.name}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
        </div>
      </section>

      <CtaSection />
      <JsonLd data={schema} />
    </>
  );
}
