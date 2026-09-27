import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

type LogoProps = {
  tone?: "light" | "dark";
  showDescriptor?: boolean;
  className?: string;
};

/**
 * Company logo. Renders the logo image configured in `site.logo`, or a
 * text-based placeholder logo when no image is configured.
 */
export function Logo({ tone = "dark", showDescriptor = false, className = "" }: LogoProps) {
  const onDark = tone === "light";
  const imageSrc = onDark ? site.logo.srcOnDark ?? site.logo.src : site.logo.src;

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${site.name}, home`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={site.logo.width}
          height={site.logo.height}
          preload
          className="h-9 w-auto"
        />
      ) : (
        <>
          <LogoMark className={onDark ? "text-on-navy" : "text-ink"} />
          <span className="flex flex-col">
            <span
              className={`font-display text-[0.95rem] font-semibold leading-none tracking-[0.04em] ${
                onDark ? "text-on-navy" : "text-ink"
              }`}
            >
              {site.name}
            </span>
            {showDescriptor && (
              <span
                className={`mt-1.5 font-mono text-[0.625rem] uppercase leading-none tracking-[0.12em] ${
                  onDark ? "text-on-navy-muted" : "text-muted"
                }`}
              >
                {site.descriptor}
              </span>
            )}
          </span>
        </>
      )}
    </Link>
  );
}

/** Geometric mark: a drawing sheet split by a section line, half in poché. */
export function LogoMark({ className = "", size = 30 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="1" y="1" width="28" height="28" stroke="currentColor" strokeWidth="2" />
      <path d="M1 29 29 1V29Z" fill="currentColor" />
    </svg>
  );
}
