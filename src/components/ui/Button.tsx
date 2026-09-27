import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./icons";

type Variant = "primary" | "secondary" | "inverse" | "outline-inverse" | "link";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-strong active:bg-accent-strong shadow-[inset_0_-1px_0_rgb(0_0_0/0.15)]",
  secondary:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  inverse: "bg-paper text-navy hover:bg-white",
  "outline-inverse":
    "border border-on-navy/35 text-on-navy hover:border-on-navy hover:bg-on-navy hover:text-navy",
  link: "text-accent hover:text-accent-strong underline-offset-4 hover:underline px-0! h-auto!",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return [
    "group/btn inline-flex items-center justify-center gap-2.5 font-medium tracking-[0.005em] rounded-[2px]",
    "transition-colors duration-200 select-none whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    extra,
  ].join(" ");
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

function Arrow() {
  return (
    <ArrowRight
      size={18}
      className="shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5"
    />
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  arrow,
  children,
  className,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant,
  size,
  arrow,
  children,
  className,
  type = "button",
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
