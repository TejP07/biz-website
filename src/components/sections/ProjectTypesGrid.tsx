import Link from "next/link";
import type { CSSProperties } from "react";
import type { ProjectType } from "@/content/project-types";
import { ArrowRight } from "@/components/ui/icons";

/** Project types on a dark background, arranged like a sheet index. */
export function ProjectTypesGrid({ types }: { types: ProjectType[] }) {
  return (
    <ul className="grid grid-cols-2 gap-px border border-line-navy bg-line-navy lg:grid-cols-5">
      {types.map((t, i) => (
        <li
          key={t.label}
          data-reveal
          style={{ "--reveal-delay": `${(i % 5) * 60}ms` } as CSSProperties}
          className="flex flex-col bg-navy p-5 sm:p-6"
        >
          <span className="font-mono text-[0.7rem] tracking-[0.1em] text-accent-light">{t.code}</span>
          <h3 className="mt-10 font-display text-[1.125rem] font-semibold leading-snug text-on-navy">
            {t.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-on-navy-muted">{t.description}</p>
        </li>
      ))}
      <li className="flex bg-navy-3">
        <Link
          href="/contact"
          className="group flex w-full flex-col p-5 transition-colors sm:p-6 hover:bg-on-navy/[0.05]"
        >
          <span className="font-mono text-[0.7rem] tracking-[0.1em] text-accent-light">OTHER</span>
          <span className="mt-10 font-display text-[1.125rem] font-semibold leading-snug text-on-navy">
            Something else?
          </span>
          <span className="mt-2 inline-flex items-center gap-2 text-sm text-on-navy-muted group-hover:text-on-navy">
            Tell us about the project
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </li>
    </ul>
  );
}
