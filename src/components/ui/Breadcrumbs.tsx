import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus BreadcrumbList structured data. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  const muted = tone === "dark" ? "text-on-navy-muted" : "text-muted";
  const current = tone === "dark" ? "text-on-navy" : "text-ink";

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`eyebrow flex flex-wrap items-center gap-x-2 gap-y-1 ${muted}`}>
          {all.map((item, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className={current}>
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="transition-colors hover:text-accent">
                      {item.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
