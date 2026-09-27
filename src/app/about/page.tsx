import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { serviceAreas } from "@/content/service-areas";
import { professionalNotice, site } from "@/content/site";
import { team } from "@/content/team";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CredentialsBand } from "@/components/sections/TrustSections";
import { CtaSection } from "@/components/sections/CtaSection";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { SectionHeader, Eyebrow } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${site.name} is a design documentation and engineering coordination firm serving property owners, contractors, developers, design firms, and businesses in ${site.serviceArea.primary}.`,
  path: "/about",
});

const principles = [
  {
    title: "Technical accuracy",
    text: "We measure carefully, dimension completely, and cross-check sheets against each other before anything goes out. Accurate drawings are faster to review and cheaper to build from.",
  },
  {
    title: "Clear communication",
    text: "Plain-language updates, clear questions, and no guessing about status. You'll always know what's done, what's next, and what we need from you.",
  },
  {
    title: "Efficient documentation",
    text: "We draw what the project needs: no more, no less. Consistent standards and templates keep production quick without cutting corners.",
  },
  {
    title: "Coordination",
    text: "We manage the handoffs between architects, engineers, reviewers, and contractors so the drawing set stays consistent across disciplines.",
  },
  {
    title: "Responsiveness",
    text: "Projects move when questions get answered. We reply promptly, turn around comments quickly, and flag issues early rather than late.",
  },
  {
    title: "Client-focused delivery",
    text: "Each scope is built around your goals, schedule, and budget, whether you're a first-time owner or a firm with established standards.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A documentation partner for projects that need to get approved and built."
        intro={
          <p>
            {site.name} is a design documentation and engineering coordination firm based in{" "}
            {site.serviceArea.primary}. We help property owners, contractors, developers, design
            firms, and businesses turn plans into coordinated drawing sets, and see them through
            permitting.
          </p>
        }
        breadcrumbs={[{ name: "About", path: "/about" }]}
        aside={<PhotoPlaceholder label="[Studio / team photo]" aspect="aspect-[5/4]" />}
      />

      {/* Story */}
      <section aria-labelledby="story-heading" className="py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Why we exist</Eyebrow>
            <h2 id="story-heading" className="heading-2 mt-5 text-ink">
              Projects stall in the gaps between design, engineering, and permitting.
            </h2>
          </div>
          <div className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-2 lg:col-span-7">
            <p>
              A property owner needs drawings but doesn&apos;t know which engineers to hire. A
              contractor has a crew ready and a permit application waiting on a revised sheet. A
              design firm has more work than its team can document. In each case, the project slows
              down because nobody is responsible for connecting the pieces.
            </p>
            <p>
              We take on that responsibility. We produce clear, well-organized drawings, bring in
              licensed architects and engineers when the work requires them, and keep every
              discipline working from the same set through submission and review.
            </p>
            <p>
              Our clients get the output of a coordinated design team without having to build or
              manage one, and they get a single point of contact who knows the status of every
              drawing.
            </p>
            <p className="border-l-2 border-dashed border-line-strong pl-5 text-muted">
              [Company story: add a short paragraph, in your own words, about how and why the
              company was started and the experience behind it.]
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="principles-heading"
            eyebrow="How we work"
            title="Six principles behind every drawing set."
          />
          <ol className="mt-12 grid gap-x-12 gap-y-0 md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} data-reveal className="flex gap-6 border-t border-line py-8">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="heading-3 text-ink">{p.title}</h3>
                  <p className="mt-3 text-[0.9844rem] leading-relaxed text-ink-2">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="team-heading" className="py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="team-heading"
            eyebrow="Leadership & team"
            title="The people behind your drawings."
            intro={<p>Replace these profiles with your leadership and key team members.</p>}
          />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <li key={`${m.name}-${i}`} data-reveal>
                {m.photo ? (
                  <div className="relative aspect-[4/5] overflow-hidden border border-line bg-paper-2">
                    <Image
                      src={m.photo.src}
                      alt={m.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <PhotoPlaceholder label="[Team member photo]" aspect="aspect-[4/5]" variant="portrait" />
                )}
                <h3 className="heading-3 mt-6 text-ink">{m.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{m.role}</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">{m.bio}</p>
                <p className="mt-4 border-t border-line pt-4 text-sm text-muted">{m.credentials}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Credentials & licensed professionals */}
      <section aria-labelledby="credentials-heading" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site">
          <SectionHeader
            id="credentials-heading"
            eyebrow="Credentials"
            title="Licensing, credentials, and how we work with licensed professionals."
            intro={
              <p>
                We only list credentials and licenses we hold. Where a project requires a licensed
                architect or engineer, that work is performed or reviewed by an appropriately
                licensed professional.
              </p>
            }
          />
          <div className="mt-12">
            <CredentialsBand />
          </div>
          <div className="mt-12 grid gap-8 border-t border-line pt-10 lg:grid-cols-12">
            <h3 className="heading-3 text-ink lg:col-span-4">Licensed professional coordination</h3>
            <div className="space-y-4 text-[0.9844rem] leading-relaxed text-ink-2 lg:col-span-8">
              <p>
                Licensing requirements for architectural and engineering work vary by jurisdiction
                and project type. During scoping, we identify which parts of your project are likely
                to require a licensed architect or engineer, and we coordinate their involvement.
              </p>
              <p className="text-sm text-muted">{professionalNotice}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section aria-labelledby="areas-heading" className="py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              id="areas-heading"
              eyebrow="Service areas"
              title={`Based in ${site.serviceArea.primary}.`}
              align="stacked"
            />
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-2">
              We work on projects throughout {site.serviceArea.region}. Contact us about projects
              outside these areas.
            </p>
          </div>
          <ul className="border-t border-line lg:col-span-7">
            {serviceAreas.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/service-areas/${a.slug}`}
                  className="group flex items-center justify-between gap-6 border-b border-line py-5"
                >
                  <span>
                    <span className="block font-display text-lg font-semibold text-ink group-hover:text-accent">
                      {a.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{a.localities.join(" · ")}</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
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
