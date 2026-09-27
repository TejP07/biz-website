import Link from "next/link";
import type { Project } from "@/content/projects";
import { ArchImage } from "@/components/ui/ArchImage";
import { ArrowUpRight } from "@/components/ui/icons";

export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-1.5 bg-navy px-2 py-1 text-[0.625rem] text-on-navy ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent-light" />
      Sample scope
    </span>
  );
}

export function ProjectCard({
  project,
  headingLevel = "h3",
  sizes,
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  sizes?: string;
}) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex h-full flex-col border border-line bg-surface transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgb(20_26_34/0.35)] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent">
      <div className="relative overflow-hidden border-b border-line">
        <ArchImage
          src={project.cover.src}
          alt={project.cover.alt}
          sizes={sizes}
          placeholderLabel={false}
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {project.isSample && <SampleBadge className="absolute left-3 top-3" />}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-accent">{project.projectType}</p>
        <Heading className="heading-3 mt-3 text-ink">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </Heading>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{project.summary}</p>
        <div className="mt-auto pt-6">
          <p className="sr-only">Services provided:</p>
          <ul className="flex flex-wrap gap-1.5">
            {project.services.map((s) => (
              <li key={s} className="border border-line px-2 py-1 text-xs text-ink-2">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ArrowUpRight
        size={18}
        className="absolute right-4 top-4 text-paper opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100"
      />
    </article>
  );
}
