/**
 * Neutral frame shown where real photography should go (team portraits,
 * studio photos). Replace by passing a real image in the content files.
 */
export function PhotoPlaceholder({
  label,
  aspect = "aspect-[4/3]",
  variant = "scene",
  className = "",
}: {
  label: string;
  aspect?: string;
  variant?: "scene" | "portrait";
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`bg-drafting-grid relative flex items-center justify-center overflow-hidden border border-dashed border-line-strong bg-paper-2 ${aspect} ${className}`}
    >
      {variant === "portrait" ? (
        <svg aria-hidden="true" viewBox="0 0 120 120" className="h-1/2 w-1/2 text-line-strong" fill="none">
          <circle cx="60" cy="44" r="20" stroke="currentColor" strokeWidth="1.5" />
          <path d="M22 112c3-22 19-36 38-36s35 14 38 36" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 160 100" className="h-2/5 w-2/5 text-line-strong" fill="none">
          <path d="M10 90h140M20 90V40l40-25 40 25v50M100 90V55h40v35" stroke="currentColor" strokeWidth="1.5" />
          <path d="M45 90V62h30v28" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
      <span className="eyebrow absolute bottom-3 left-3 bg-paper px-2 py-1 text-[0.625rem] text-muted ring-1 ring-line">
        {label}
      </span>
    </div>
  );
}
