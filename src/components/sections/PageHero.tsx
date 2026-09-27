import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/SectionHeader";

type PageHeroProps = {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs: Crumb[];
  actions?: ReactNode;
  /** Optional content for the right column on large screens. */
  aside?: ReactNode;
};

/** Hero used on inner pages: breadcrumb, eyebrow, H1, intro, optional actions. */
export function PageHero({ eyebrow, index, title, intro, breadcrumbs, actions, aside }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-paper">
      <div
        aria-hidden="true"
        className="bg-drafting-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
      />
      <div className="container-site pb-14 pt-8 sm:pb-16 lg:pb-20 lg:pt-10">
        <Breadcrumbs items={breadcrumbs} />
        <div className={`mt-12 grid gap-10 lg:mt-16 ${aside ? "lg:grid-cols-12 lg:gap-12" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
            <h1 className="display-2 mt-6 text-ink">{title}</h1>
            {intro && <div className="lead mt-6 max-w-2xl text-ink-2">{intro}</div>}
            {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          </div>
          {aside && <div className="lg:col-span-5 lg:pt-10">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
