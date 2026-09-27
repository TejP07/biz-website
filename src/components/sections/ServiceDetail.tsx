import Link from "next/link";
import type { Service } from "@/content/services";
import { ArchImage } from "@/components/ui/ArchImage";
import { ArrowRight, InfoIcon, ServiceIcon } from "@/components/ui/icons";

/** Full description of one service, used on the Services page. */
export function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className="scroll-mt-24 border-t border-line py-16 first:border-t-0 lg:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center border border-line bg-surface">
                <ServiceIcon name={service.icon} className="text-ink" size={36} />
              </span>
              <span className="eyebrow text-accent">Service {number}</span>
            </div>
            <h2 id={`${service.slug}-title`} className="heading-2 mt-7 text-ink">
              {service.title}
            </h2>
            <p className="lead mt-5 text-ink-2">{service.summary}</p>
            <div data-reveal className="mt-8">
              <ArchImage
                src={service.image.src}
                alt={service.image.alt}
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="border border-line"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-[1.0625rem] leading-relaxed text-ink-2">{service.description}</p>

          <h3 className="eyebrow mt-12 text-muted">What&apos;s included</h3>
          <ul className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2">
            {service.items.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-paper px-5 py-4 text-[0.9688rem] text-ink">
                <span aria-hidden="true" className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="eyebrow mt-12 text-muted">Typical situations</h3>
          <ul className="mt-5 space-y-3">
            {service.typicalProjects.map((p) => (
              <li key={p} className="flex gap-4 border-b border-line pb-3 text-[0.9688rem] text-ink-2">
                <span aria-hidden="true" className="font-mono text-xs leading-6 text-muted">
                  —
                </span>
                {p}
              </li>
            ))}
          </ul>

          {service.licensedNote && (
            <div className="mt-10 flex gap-4 border-l-2 border-accent bg-accent-soft/60 px-5 py-4 text-sm leading-relaxed text-ink-2">
              <InfoIcon size={18} className="mt-0.5 shrink-0 text-accent" />
              <p>{service.licensedNote}</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-accent hover:text-accent-strong"
            >
              Request a quote for this service
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            {service.projectCategory && (
              <Link
                href={`/projects?category=${service.projectCategory}`}
                className="text-[0.9375rem] text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                See related sample projects
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
