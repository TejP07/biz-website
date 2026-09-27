import type { CSSProperties } from "react";
import { isPlaceholder, site } from "@/content/site";
import { pillars, stats, testimonials, type Testimonial } from "@/content/trust";

/** "Why work with us": six principles in a hairline grid. */
export function PillarsGrid({ items = pillars }: { items?: typeof pillars }) {
  return (
    <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <li
          key={p.title}
          data-reveal
          style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as CSSProperties}
          className="bg-paper p-7 sm:p-8"
        >
          <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="heading-3 mt-6 text-ink">{p.title}</h3>
          <p className="mt-3 text-[0.9688rem] leading-relaxed text-ink-2">{p.description}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * Credentials and statistics. Placeholder values render inside dashed frames
 * so they are easy to spot and replace. Empty arrays hide the rows.
 */
export function CredentialsBand() {
  const credentials = site.credentials;
  if (credentials.length === 0 && stats.length === 0) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {credentials.length > 0 && (
        <div className="lg:col-span-7">
          <h3 className="eyebrow text-muted">Credentials &amp; affiliations</h3>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {credentials.map((c) => (
              <div
                key={c.label}
                className={`px-5 py-4 ${
                  isPlaceholder(c.value) ? "border border-dashed border-line-strong" : "border border-line bg-surface"
                }`}
              >
                <dt className="text-xs uppercase tracking-[0.08em] text-muted">{c.label}</dt>
                <dd className="mt-1.5 text-[0.9375rem] font-medium text-ink">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {stats.length > 0 && (
        <div className="lg:col-span-5">
          <h3 className="eyebrow text-muted">By the numbers</h3>
          <dl className="mt-5 grid gap-3">
            {stats.map((s, i) => (
              <div
                key={`${s.value}-${i}`}
                className={`flex items-baseline justify-between gap-4 px-5 py-4 ${
                  isPlaceholder(s.value) ? "border border-dashed border-line-strong" : "border border-line bg-surface"
                }`}
              >
                <dt className="text-sm text-ink-2">{s.label}</dt>
                <dd className="font-display text-lg font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

/** Client testimonials. Hidden entirely when the testimonials array is empty. */
export function Testimonials({ items = testimonials }: { items?: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((t, i) => {
        const placeholder = isPlaceholder(t.name);
        return (
          <li
            key={`${t.name}-${i}`}
            data-reveal
            style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
          >
            <figure
              className={`flex h-full flex-col p-7 ${
                placeholder ? "border border-dashed border-line-strong" : "border border-line bg-surface"
              }`}
            >
              <svg aria-hidden="true" width="28" height="22" viewBox="0 0 28 22" className="text-accent">
                <path
                  fill="currentColor"
                  d="M0 22V13.2C0 5.9 4 1.5 11.3 0l1.2 2.6C8.4 4 6.4 6.6 6.2 10.3H11V22H0Zm16 0V13.2C16 5.9 20 1.5 27.3 0l1.2 2.6C24.4 4 22.4 6.6 22.2 10.3H27V22H16Z"
                />
              </svg>
              <blockquote className="mt-6 flex-1 text-[1.0625rem] leading-relaxed text-ink">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-5 text-sm">
                <p className="font-medium text-ink">{t.name}</p>
                <p className="mt-0.5 text-muted">{t.title}</p>
                <p className="eyebrow mt-3 text-[0.65rem] text-accent">{t.projectType}</p>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
