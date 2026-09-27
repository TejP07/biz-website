import type { CSSProperties } from "react";
import { pricingFactors } from "@/content/trust";

/** The factors that determine a project quote. */
export function PricingFactors() {
  return (
    <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {pricingFactors.map((f, i) => (
        <li
          key={f.title}
          data-reveal
          style={{ "--reveal-delay": `${(i % 4) * 60}ms` } as CSSProperties}
          className="bg-paper p-6 sm:p-7"
        >
          <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-5 font-display text-[1.0625rem] font-semibold text-ink">{f.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">{f.description}</p>
        </li>
      ))}
    </ol>
  );
}
