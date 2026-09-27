import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Disciplines shown in the hero's title-block strip. The letters follow
 * common drawing-set discipline designators (G, A, S, M/E/P).
 */
const disciplines = [
  { code: "A", title: "Architectural drafting", text: "Existing, proposed & construction drawings", href: "/services#architectural-drafting" },
  { code: "S", title: "Structural coordination", text: "Framing & modifications with licensed engineers", href: "/services#structural-coordination" },
  { code: "MEP", title: "MEP coordination", text: "Mechanical, electrical & plumbing layouts", href: "/services#mep-coordination" },
  { code: "G", title: "Permit & approvals", text: "Submission, review responses & tracking", href: "/services#permit-support" },
];

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="on-dark relative isolate overflow-hidden bg-navy text-on-navy"
    >
      {/* Drafting grid, fading out toward the bottom */}
      <div
        aria-hidden="true"
        className="bg-drafting-grid-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
      />

      <div className="container-site relative">
        <div className="relative z-10 pb-4 pt-14 sm:pt-20 lg:max-w-[31rem] lg:pb-24 lg:pt-28 xl:max-w-[40rem]">
          <h1 id="hero-heading">
            <span className="eyebrow flex items-center gap-3 text-on-navy-muted">
              <span aria-hidden="true" className="h-px w-8 bg-accent-light/60" />
              Design documentation &amp; engineering coordination
              <span className="sr-only">:</span>
            </span>
            <span className="display-1 mt-6 block text-on-navy">From drawings to approval.</span>
          </h1>
          <p className="lead mt-7 max-w-xl text-on-navy-muted">
            Architectural drafting, structural and MEP coordination, and permit support for property
            owners, contractors, developers, and businesses, with licensed architects and engineers
            brought in wherever your project requires them.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="inverse" size="lg" arrow>
              Start Your Project
            </ButtonLink>
            <ButtonLink href="/services" variant="outline-inverse" size="lg">
              Explore Services
            </ButtonLink>
          </div>
        </div>

        {/* Architectural illustration: in flow on mobile, positioned right on desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative -mx-[18%] -mt-2 sm:mx-auto sm:mt-4 sm:max-w-xl lg:absolute lg:-right-[12%] lg:top-8 lg:mt-0 lg:w-[68%] lg:max-w-none xl:-right-[1%] xl:top-6 xl:w-[58%] 2xl:-right-[3%] 2xl:w-[60%]"
        >
          <Image
            src="/images/hero-drawing.svg"
            alt=""
            width={1200}
            height={1000}
            loading="eager"
            className="hero-drawing h-auto w-full"
          />
        </div>
        {/* Keeps text legible where the drawing passes behind it on mid-size screens */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-navy via-navy/85 to-transparent lg:block xl:hidden"
        />
      </div>

      {/* Title-block strip */}
      <div className="relative z-10 border-t border-line-navy bg-navy/80 backdrop-blur-sm">
        <ul className="container-site grid grid-cols-2 lg:grid-cols-4">
          {disciplines.map((d, i) => (
            <li
              key={d.code}
              className={`border-line-navy ${i % 2 === 1 ? "border-l" : ""} ${
                i > 1 ? "border-t lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <Link
                href={d.href}
                className={`group flex h-full flex-col gap-3 py-6 pr-4 transition-colors hover:bg-on-navy/[0.04] lg:py-7 lg:pr-6 ${
                  i % 2 === 1 ? "pl-4 sm:pl-6" : "pl-0"
                } ${i === 2 ? "lg:pl-6" : ""}`}
              >
                <span className="flex items-center justify-between">
                  <span className="inline-flex h-7 min-w-7 items-center justify-center border border-accent-light/50 px-1.5 font-mono text-[0.7rem] font-medium text-accent-light">
                    {d.code}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-on-navy-muted opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </span>
                <span className="font-display text-[1.02rem] font-semibold leading-snug text-on-navy">
                  {d.title}
                </span>
                <span className="hidden text-sm leading-snug text-on-navy-muted sm:block">{d.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
