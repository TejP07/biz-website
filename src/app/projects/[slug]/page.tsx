import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryLabel, getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArchImage } from "@/components/ui/ArchImage";
import { ButtonLink } from "@/components/ui/Button";
import { InfoIcon } from "@/components/ui/icons";
import { ImageGallery } from "@/components/projects/ImageGallery";
import { ProjectCard, SampleBadge } from "@/components/projects/ProjectCard";
import { CtaSection } from "@/components/sections/CtaSection";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.isSample ? `${project.title} (Sample Scope)` : project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== project.slug && p.categories.some((c) => project.categories.includes(c)))
    .slice(0, 3);

  const facts = [
    ["Project type", project.projectType],
    ["Client type", project.clientType],
    ["Location", project.location],
    ["Size", project.size],
    ["Disciplines", project.disciplines.join(", ")],
  ];

  return (
    <>
      <section className="border-b border-line bg-paper">
        <div className="container-site pb-12 pt-8 lg:pb-16 lg:pt-10">
          <Breadcrumbs
            items={[
              { name: "Projects", path: "/projects" },
              { name: project.title, path: `/projects/${project.slug}` },
            ]}
          />
          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                {project.isSample && <SampleBadge />}
                <p className="eyebrow text-accent">{project.projectType}</p>
              </div>
              <h1 className="display-2 mt-6 text-ink">{project.title}</h1>
              <p className="lead mt-6 max-w-2xl text-ink-2">{project.summary}</p>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Categories">
                {project.categories.map((c) => (
                  <li key={c} className="border border-line bg-surface px-2.5 py-1 text-xs text-ink-2">
                    {getCategoryLabel(c)}
                  </li>
                ))}
              </ul>
            </div>
            <dl className="self-end border-t border-line lg:col-span-4">
              {facts.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-6 border-b border-line py-3 text-sm">
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-right font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-label="Project details" className="py-14 lg:py-20">
        <div className="container-site">
          {project.isSample && (
            <div
              role="note"
              className="mb-10 flex gap-4 border border-line bg-surface px-5 py-4 text-sm leading-relaxed text-ink-2"
            >
              <InfoIcon size={18} className="mt-0.5 shrink-0 text-accent" />
              <p>
                This is a <span className="font-medium text-ink">sample scope</span> describing a
                typical project of this type. It is not a completed client project, and the images
                are illustrative placeholder drawings.
              </p>
            </div>
          )}

          <ArchImage
            src={project.cover.src}
            alt={project.cover.alt}
            sizes="(min-width: 1280px) 1200px, 100vw"
            preload
            placeholderLabel={project.isSample ? "Illustrative placeholder" : false}
            className="border border-line"
          />

          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="heading-2 text-ink">Overview</h2>
              <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-ink-2">
                {project.description.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            </div>
            <div className="space-y-10 lg:col-span-5">
              <div>
                <h2 className="eyebrow text-muted">Scope of work</h2>
                <ul className="mt-5 border-t border-line">
                  {project.scope.map((item, i) => (
                    <li key={item} className="flex gap-4 border-b border-line py-3 text-[0.9688rem] text-ink">
                      <span className="font-mono text-xs leading-6 text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="eyebrow text-muted">Services provided</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <li key={s} className="border border-line bg-surface px-3 py-1.5 text-sm text-ink-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {project.gallery.length > 0 && (
            <div className="mt-16 border-t border-line pt-14 lg:mt-24">
              <h2 className="heading-2 text-ink">Drawings</h2>
              <div className="mt-10">
                <ImageGallery images={project.gallery} title={project.title} />
              </div>
            </div>
          )}

          <div className="mt-16 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row lg:mt-20">
            <ButtonLink href="/contact" arrow>
              Start a similar project
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Back to all projects
            </ButtonLink>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-line bg-paper-2 py-16 lg:py-24">
          <div className="container-site">
            <h2 id="related-heading" className="heading-2 text-ink">
              Related project types
            </h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
