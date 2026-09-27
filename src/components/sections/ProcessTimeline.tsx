import type { CSSProperties } from "react";
import type { ProcessStep } from "@/content/process";

/**
 * Five-step process.
 * - "compact": horizontal timeline on large screens, vertical on mobile (home page).
 * - "detailed": vertical steps with client / our role / deliverable (process page).
 */
export function ProcessTimeline({
  steps,
  variant = "compact",
  tone = "light",
}: {
  steps: ProcessStep[];
  variant?: "compact" | "detailed";
  tone?: "light" | "dark";
}) {
  if (variant === "detailed") return <DetailedTimeline steps={steps} />;

  const dark = tone === "dark";
  return (
    <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-8">
      {/* Horizontal rule connecting the steps on large screens */}
      <span
        aria-hidden="true"
        className={`absolute left-0 right-0 top-[1.375rem] hidden h-px lg:block ${
          dark ? "bg-line-navy" : "bg-line-strong"
        }`}
      />
      {steps.map((step, i) => (
        <li
          key={step.number}
          data-reveal
          style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
          className="relative grid grid-cols-[2.75rem_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0"
        >
          {/* Vertical connector on mobile */}
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute bottom-0 left-[1.375rem] top-11 w-px lg:hidden ${
                dark ? "bg-line-navy" : "bg-line-strong"
              }`}
            />
          )}
          <span
            className={`relative z-10 flex h-11 w-11 items-center justify-center border font-mono text-sm font-medium ${
              dark
                ? "border-accent-light/60 bg-navy text-accent-light"
                : "border-ink bg-paper text-ink"
            }`}
          >
            {step.number}
          </span>
          <div className="lg:mt-7">
            <h3 className={`heading-3 text-[1.125rem]! ${dark ? "text-on-navy" : "text-ink"}`}>
              {step.title}
            </h3>
            <p className={`mt-3 text-[0.9375rem] leading-relaxed ${dark ? "text-on-navy-muted" : "text-ink-2"}`}>
              {step.summary}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function DetailedTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol>
      {steps.map((step) => (
        <li
          key={step.number}
          data-reveal
          className="grid gap-8 border-b border-line py-12 last:border-b-0 lg:grid-cols-12 lg:gap-12 lg:py-16"
        >
          <div className="lg:col-span-5">
            <div className="flex items-center gap-5">
              <span className="flex h-14 w-14 items-center justify-center border border-ink bg-paper font-mono text-base font-medium text-ink">
                {step.number}
              </span>
              <span className="eyebrow text-muted">Step {step.number} of 05</span>
            </div>
            <h2 className="heading-2 mt-7 text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)]! text-ink">
              {step.title}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-2">{step.summary}</p>
          </div>
          <dl className="grid gap-px self-start border border-line bg-line sm:grid-cols-3 lg:col-span-7 lg:mt-2">
            {[
              ["You", step.client],
              ["We", step.us],
              ["You receive", step.deliverable],
            ].map(([label, text], i) => (
              <div key={label} className={`p-6 ${i === 2 ? "bg-accent-soft/70" : "bg-paper"}`}>
                <dt className={`eyebrow ${i === 2 ? "text-accent" : "text-muted"}`}>{label}</dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink">{text}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ol>
  );
}
