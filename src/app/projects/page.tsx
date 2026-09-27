import type { Metadata } from "next";
import { projectCategories, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { InfoIcon } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  title: "Projects & Capabilities",
  description:
    "Representative project scopes: residential and commercial renovations, tenant improvements, additions, structural modifications, MEP coordination, and permit and as-built documentation.",
  path: "/projects",
});

export default function ProjectsPage() {
  const hasSamples = projects.some((p) => p.isSample);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="The kinds of projects we document and coordinate."
        intro={
          <p>
            Browse by project type or discipline. Each entry lists the scope of work, the services
            involved, and the disciplines coordinated.
          </p>
        }
        breadcrumbs={[{ name: "Projects", path: "/projects" }]}
      />

      <section aria-label="Project portfolio" className="py-14 lg:py-20">
        <div className="container-site">
          {hasSamples && (
            <div
              role="note"
              className="mb-10 flex gap-4 border border-line bg-surface px-5 py-4 text-sm leading-relaxed text-ink-2"
            >
              <InfoIcon size={18} className="mt-0.5 shrink-0 text-accent" />
              <p>
                <span className="font-medium text-ink">About these examples. </span>
                Projects marked <span className="font-medium text-ink">Sample scope</span> illustrate
                typical work and are not completed client projects. Images are placeholder drawings
                created for this website. They will be replaced with completed, client-approved
                projects.
              </p>
            </div>
          )}
          <ProjectGrid projects={projects} categories={projectCategories} />
        </div>
      </section>

      <CtaSection
        title="Have a project like one of these?"
        body="Send us the address, a short description, and any drawings you already have. We'll outline the scope, the disciplines involved, and the approvals to expect."
      />
    </>
  );
}
