"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

/**
 * Filterable portfolio grid. The full list is rendered on the server; the
 * filter is a progressive enhancement. The active filter is mirrored in the
 * URL (?category=...) so filtered views can be linked to.
 */
export function ProjectGrid({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  const [active, setActive] = useState<string>("all");

  // Read the initial filter from the URL after hydration.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("category");
    if (param && categories.some((c) => c.slug === param)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the URL once on mount
      setActive(param);
    }
  }, [categories]);

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.categories.includes(active))),
    [active, projects],
  );

  function select(slug: string) {
    setActive(slug);
    const url = new URL(window.location.href);
    if (slug === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", slug);
    window.history.replaceState(null, "", url);
  }

  const options = [{ slug: "all", label: "All projects" }, ...categories];
  const activeLabel = options.find((o) => o.slug === active)?.label ?? "All projects";

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {options.map((o) => {
            const pressed = active === o.slug;
            const count =
              o.slug === "all" ? projects.length : projects.filter((p) => p.categories.includes(o.slug)).length;
            return (
              <button
                key={o.slug}
                type="button"
                aria-pressed={pressed}
                onClick={() => select(o.slug)}
                className={`inline-flex h-10 shrink-0 items-center gap-2 border px-4 text-sm transition-colors ${
                  pressed
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-surface text-ink-2 hover:border-ink/40 hover:text-ink"
                }`}
              >
                {o.label}
                <span className={`font-mono text-[0.7rem] ${pressed ? "text-paper/70" : "text-muted"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
          {active !== "all" && <> in {activeLabel}</>}
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
