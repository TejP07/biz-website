import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** Two-digit index shown before the eyebrow label, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Heading level. Defaults to h2. */
  as?: "h1" | "h2";
  tone?: "light" | "dark";
  align?: "split" | "stacked";
  /** Vertical alignment of the intro in split layouts. */
  introAlign?: "end" | "start";
  id?: string;
  className?: string;
};

export function Eyebrow({
  index,
  children,
  tone = "light",
  className = "",
}: {
  index?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${
        tone === "dark" ? "text-on-navy-muted" : "text-muted"
      } ${className}`}
    >
      {index && (
        <span className={tone === "dark" ? "text-accent-light" : "text-accent"}>{index}</span>
      )}
      <span
        aria-hidden="true"
        className={`h-px w-8 ${tone === "dark" ? "bg-on-navy/30" : "bg-ink/25"}`}
      />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  tone = "light",
  align = "split",
  introAlign = "end",
  id,
  className = "",
}: SectionHeaderProps) {
  const titleColor = tone === "dark" ? "text-on-navy" : "text-ink";
  const introColor = tone === "dark" ? "text-on-navy-muted" : "text-ink-2";

  return (
    <div
      className={`grid gap-6 ${
        align === "split" && intro
          ? `lg:grid-cols-12 lg:gap-10 ${introAlign === "end" ? "lg:items-end" : "lg:items-start"}`
          : ""
      } ${className}`}
    >
      <div className={align === "split" && intro ? "lg:col-span-7" : "max-w-3xl"}>
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
        <Tag id={id} className={`heading-2 mt-5 ${titleColor}`}>
          {title}
        </Tag>
      </div>
      {intro && (
        <div
          className={`${
            align === "split"
              ? `lg:col-span-5 ${introAlign === "end" ? "lg:pb-1.5" : "lg:pt-[2.6rem]"}`
              : "max-w-2xl"
          } text-[1.0625rem] leading-relaxed ${introColor}`}
        >
          {intro}
        </div>
      )}
    </div>
  );
}
