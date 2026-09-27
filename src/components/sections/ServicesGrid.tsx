import Link from "next/link";
import type { CSSProperties } from "react";
import type { Service } from "@/content/services";
import { ArrowRight, ServiceIcon } from "@/components/ui/icons";

/** Grid of service cards separated by hairlines, like a drawing index. */
export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <ServiceCard key={service.slug} service={service} index={i} />
      ))}
    </div>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as CSSProperties}
      className="group relative flex flex-col bg-paper p-7 transition-colors duration-300 hover:bg-surface has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-inset has-[a:focus-visible]:ring-accent sm:p-8"
    >
      <div className="flex items-start justify-between">
        <ServiceIcon name={service.icon} className="text-ink" />
        <span className="eyebrow text-muted">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="heading-3 mt-8 text-ink">
        <Link
          href={`/services#${service.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 text-[0.9688rem] leading-relaxed text-ink-2 lg:min-h-[4.75rem]">{service.summary}</p>
      <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-ink-2">
        {service.items.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-accent" />
            {item}
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-accent">
        Service details
        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </article>
  );
}
