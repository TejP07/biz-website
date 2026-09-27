import type { Audience } from "@/content/audiences";

/** "Who we serve": numbered rows with a summary and typical needs. */
export function AudienceList({ audiences }: { audiences: Audience[] }) {
  return (
    <ol className="border-t border-line">
      {audiences.map((a, i) => (
        <li
          key={a.slug}
          id={a.slug}
          data-reveal
          className="grid gap-5 border-b border-line py-8 md:grid-cols-12 md:gap-10 lg:py-9"
        >
          <div className="md:col-span-7">
            <div className="flex items-baseline gap-4">
              <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="heading-3 text-ink">{a.title}</h3>
            </div>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink-2 md:pl-9">{a.summary}</p>
          </div>
          <ul className="space-y-2 self-center text-sm text-ink-2 md:col-span-5 md:border-l md:border-line md:pl-8">
            {a.needs.map((n) => (
              <li key={n} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 border border-accent" />
                {n}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
