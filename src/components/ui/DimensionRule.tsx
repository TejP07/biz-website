/**
 * Decorative dimension line with architectural tick marks, used as a
 * restrained section divider. Purely visual; hidden from assistive tech.
 */
export function DimensionRule({
  label,
  tone = "light",
  className = "",
}: {
  label?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const line = tone === "dark" ? "bg-on-navy/25" : "bg-ink/20";
  const tick = tone === "dark" ? "bg-on-navy/50" : "bg-ink/45";
  const text = tone === "dark" ? "text-on-navy-muted" : "text-muted";
  return (
    <div aria-hidden="true" className={`relative flex items-center ${className}`}>
      <span className={`absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 ${tick}`} />
      <span className={`absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 -rotate-45 ${tick}`} />
      <span className={`h-px flex-1 ${line}`} />
      {label && <span className={`eyebrow px-4 ${text}`}>{label}</span>}
      {label && <span className={`h-px flex-1 ${line}`} />}
      <span className={`absolute right-0 top-1/2 h-4 w-px -translate-y-1/2 ${tick}`} />
      <span className={`absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 -rotate-45 ${tick}`} />
    </div>
  );
}
