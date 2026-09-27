import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { audiences } from "@/content/audiences";
import { featuredFaqs } from "@/content/faqs";
import { processSteps } from "@/content/process";
import { featuredProjects } from "@/content/projects";
import { projectTypes } from "@/content/project-types";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";
import { testimonials } from "@/content/trust";
import { HomeHero } from "@/components/sections/HomeHero";
import { CoordinationDiagram } from "@/components/sections/CoordinationDiagram";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { AudienceList } from "@/components/sections/AudienceList";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ProjectTypesGrid } from "@/components/sections/ProjectTypesGrid";
import { CredentialsBand, PillarsGrid, Testimonials } from "@/components/sections/TrustSections";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeader, Eyebrow } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, InfoIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Design Documentation & Engineering Coordination` },
  description: site.description,
  alternates: { canonical: absoluteUrl("/") },
};

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-accent hover:text-accent-strong"
    >
      {children}
      <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* 01 — What we do */}
      <section aria-labelledby="model-heading" className="py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="model-heading"
            index="01"
            eyebrow="What we do"
            introAlign="start"
            title="One team for the drawings, the engineering, and the approvals."
            intro={
              <div className="space-y-4">
                <p>
                  Most projects need more than a set of drawings. A wall removal needs a structural
                  engineer. A restaurant needs mechanical and plumbing design. Nearly everything
                  needs a permit.
                </p>
                <p>
                  We produce the drawing set, bring in the licensed architects and engineers your
                  project requires, and manage the submission, so one accountable team carries the
                  project from first conversation to approval.
                </p>
              </div>
            }
          />
          <div data-reveal className="mt-14 border-t border-line pt-14 lg:mt-20 lg:pt-16">
            <CoordinationDiagram />
          </div>
          <div className="mt-10">
            <TextLink href="/process">See how the process works</TextLink>
          </div>
        </div>
      </section>

      {/* 02 — Services */}
      <section aria-labelledby="services-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="services-heading"
            index="02"
            eyebrow="Services"
            title="Documentation and coordination for every stage of the drawing set."
            intro={
              <p>
                Engage us for a single drawing package or the full path from existing conditions to
                permit. Each service can stand alone or be combined in one scope.
              </p>
            }
          />
          <div className="mt-12 lg:mt-16">
            <ServicesGrid services={services} />
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Work requiring a license, stamp, or seal is performed or reviewed by licensed
              professionals.
            </p>
            <TextLink href="/services">View all services</TextLink>
          </div>
        </div>
      </section>

      {/* 03 — Who we serve */}
      <section aria-labelledby="clients-heading" className="py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow index="03">Who we serve</Eyebrow>
              <h2 id="clients-heading" className="heading-2 mt-5 text-ink">
                An extension of your team.
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
                Whether you&apos;re renovating one property or running a pipeline of projects, we fit
                around how you already work: your schedule, your contractor, your standards.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact" variant="secondary" arrow>
                  Discuss your project
                </ButtonLink>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <AudienceList audiences={audiences} />
          </div>
        </div>
      </section>

      {/* 04 — How it works */}
      <section aria-labelledby="process-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="process-heading"
            index="04"
            eyebrow="How it works"
            title="A clear path from first call to approved drawings."
            intro={
              <p>
                Five steps, each with a defined outcome. You always know what&apos;s happening, what
                we need from you, and what comes next.
              </p>
            }
          />
          <div className="mt-14 lg:mt-20">
            <ProcessTimeline steps={processSteps} />
          </div>
          <div className="mt-14">
            <TextLink href="/process">Process details &amp; responsibilities</TextLink>
          </div>
        </div>
      </section>

      {/* 05 — Project types */}
      <section aria-labelledby="types-heading" className="on-dark bg-navy py-20 text-on-navy lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="types-heading"
            index="05"
            eyebrow="Project types"
            tone="dark"
            title="Residential, commercial, and everything in between."
            intro={
              <p>
                From a single wall removal to a multi-tenant build-out, the documentation standard is
                the same: accurate, coordinated, and ready for review.
              </p>
            }
          />
          <div className="mt-12 lg:mt-16">
            <ProjectTypesGrid types={projectTypes} />
          </div>
        </div>
      </section>

      {/* 06 — Featured capabilities */}
      <section aria-labelledby="work-heading" className="py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="work-heading"
            index="06"
            eyebrow="Capabilities"
            title="Representative project scopes."
            intro={
              <p>
                These examples show the kinds of scopes and drawing sets we produce. They are
                illustrative samples, not completed client projects.
              </p>
            }
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <li key={p.slug} data-reveal className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-muted">
              <InfoIcon size={16} className="shrink-0" />
              Images are illustrative placeholder drawings.
            </p>
            <TextLink href="/projects">Browse all sample projects</TextLink>
          </div>
        </div>
      </section>

      {/* 07 — Why work with us */}
      <section aria-labelledby="why-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="why-heading"
            index="07"
            eyebrow="Why work with us"
            title="Competent drawings. Clear communication. No surprises."
            intro={
              <p>
                Good documentation saves time in review and money in the field. These are the
                standards we hold every project to.
              </p>
            }
          />
          <div className="mt-12 lg:mt-16">
            <PillarsGrid />
          </div>
          <div className="mt-14 lg:mt-16">
            <CredentialsBand />
          </div>
        </div>
      </section>

      {/* 08 — Testimonials */}
      {testimonials.length > 0 && (
        <section aria-labelledby="testimonials-heading" className="py-20 lg:py-28">
          <div className="container-site">
            <SectionHeader
              id="testimonials-heading"
              index="08"
              eyebrow="Client feedback"
              title="What clients say."
            />
            <div className="mt-12">
              <Testimonials />
            </div>
          </div>
        </section>
      )}

      {/* 09 — FAQ */}
      <section aria-labelledby="faq-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow index="09">FAQ</Eyebrow>
            <h2 id="faq-heading" className="heading-2 mt-5 text-ink">
              Common questions.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
              Straight answers about scope, licensing, permits, and pricing. Don&apos;t see your
              question? Ask us directly.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <TextLink href="/faq">All frequently asked questions</TextLink>
              <TextLink href="/contact">Ask a question</TextLink>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={featuredFaqs} idPrefix="home-faq" />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
