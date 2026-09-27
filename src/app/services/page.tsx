import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { professionalNotice } from "@/content/site";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { PricingFactors } from "@/components/sections/PricingFactors";
import { CtaSection } from "@/components/sections/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceIcon } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Services: Drafting, Structural & MEP Coordination, Permits",
  description:
    "Architectural drafting and documentation, structural and MEP design coordination, permit and approval support, construction documentation, and design team coordination.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Drawings, coordination, and approvals under one scope."
        intro={
          <p>
            Six service areas that can be engaged individually or combined. Where a project needs a
            licensed architect or engineer, we coordinate their involvement and integrate their work
            into your drawing set.
          </p>
        }
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        actions={
          <>
            <ButtonLink href="/contact" arrow>
              Request a Project Quote
            </ButtonLink>
            <ButtonLink href="/process" variant="secondary">
              How the process works
            </ButtonLink>
          </>
        }
      />

      {/* Service index */}
      <nav aria-label="Service index" className="border-b border-line bg-paper-2">
        <div className="container-site">
          <ul className="grid grid-cols-2 gap-px border-x border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
            {services.map((s, i) => (
              <li key={s.slug} className="bg-paper-2">
                <Link
                  href={`#${s.slug}`}
                  className="group flex h-full flex-col gap-3 px-4 py-5 transition-colors hover:bg-paper"
                >
                  <span className="flex items-center justify-between">
                    <ServiceIcon name={s.icon} size={28} className="text-ink" />
                    <span className="eyebrow text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="text-sm font-medium leading-snug text-ink group-hover:text-accent">
                    {s.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="container-site">
        {services.map((service, i) => (
          <ServiceDetail key={service.slug} service={service} index={i} />
        ))}
      </div>

      <section aria-labelledby="pricing-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="pricing-heading"
            eyebrow="Pricing"
            title="Every project is quoted on its actual scope."
            intro={
              <p>
                We don&apos;t publish package prices because they rarely match a real project. After
                reviewing your information, we send a written proposal. These are the factors that
                shape it.
              </p>
            }
          />
          <div className="mt-12">
            <PricingFactors />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" arrow>
              Request a Project Quote
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary">
              How pricing works
            </ButtonLink>
          </div>
          <p className="mt-12 max-w-4xl border-t border-line pt-6 text-xs leading-relaxed text-muted">
            {professionalNotice}
          </p>
        </div>
      </section>

      <CtaSection />

      <JsonLd
        data={services.map((s) =>
          serviceSchema({ name: s.title, description: s.description, path: `/services#${s.slug}` }),
        )}
      />
    </>
  );
}
