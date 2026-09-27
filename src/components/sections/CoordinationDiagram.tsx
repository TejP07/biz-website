import { site } from "@/content/site";

const professionals = [
  { title: "Licensed architect", sub: "Where the jurisdiction requires" },
  { title: "Structural engineer", sub: "Analysis, design & seal" },
  { title: "MEP engineers", sub: "Mechanical, electrical & plumbing" },
  { title: "Reviewing authority", sub: "Building department / AHJ" },
];

function Connector() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center py-2 lg:px-2 lg:py-0">
      <span className="relative block h-10 w-px bg-ink/35 lg:h-px lg:w-12 xl:w-16">
        {/* arrowheads */}
        <span className="absolute -bottom-px left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-ink/50 lg:bottom-auto lg:left-auto lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:-rotate-45" />
      </span>
    </div>
  );
}

/**
 * Explains the business model: the client works with one team, which
 * coordinates the licensed professionals and the reviewing authority.
 */
export function CoordinationDiagram() {
  return (
    <figure aria-labelledby="coordination-caption" className="w-full">
      <div className="grid items-center lg:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.1fr)_auto_minmax(0,1.25fr)]">
        <div className="border border-line bg-surface p-5">
          <p className="eyebrow text-muted">Client</p>
          <p className="mt-3 font-display text-lg font-semibold text-ink">You</p>
          <p className="mt-1 text-sm leading-snug text-ink-2">Owner, contractor, developer, design firm, or tenant</p>
        </div>

        <Connector />

        <div className="relative border border-navy bg-navy p-5 text-on-navy shadow-[8px_8px_0_0_var(--color-accent-soft)]">
          <p className="eyebrow text-accent-light">Single point of contact</p>
          <p className="mt-3 font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-1 text-sm leading-snug text-on-navy-muted">
            Drawings, documentation, coordination & submission
          </p>
        </div>

        <Connector />

        <ul className="relative space-y-3 pl-6 before:absolute before:bottom-[1.9rem] before:left-0 before:top-[1.9rem] before:w-px before:bg-ink/35">
          {professionals.map((p) => (
            <li
              key={p.title}
              className="relative border border-line bg-surface px-4 py-3 before:absolute before:-left-6 before:top-1/2 before:h-px before:w-6 before:bg-ink/35"
            >
              <p className="text-[0.9375rem] font-medium text-ink">{p.title}</p>
              <p className="text-xs text-muted">{p.sub}</p>
            </li>
          ))}
        </ul>
      </div>
      <figcaption id="coordination-caption" className="mt-6 text-sm text-muted">
        You work with one team. We coordinate the licensed professionals and the reviewing authority
        your project requires.
      </figcaption>
    </figure>
  );
}
