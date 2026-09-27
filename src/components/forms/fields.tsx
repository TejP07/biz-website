"use client";

import type { ReactNode } from "react";

const inputBase =
  "block w-full rounded-[2px] border bg-surface px-4 text-[1rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-150 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

export function inputClasses(invalid: boolean, extra = "") {
  return `${inputBase} ${invalid ? "border-danger" : "border-line-strong hover:border-ink/40"} ${extra}`;
}

type ShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

/** Label, hint, and error message around a single input. */
export function FieldShell({ id, label, required, hint, error, children, className = "" }: ShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[0.9375rem] font-medium text-ink">
        <span>
          {label}
          {required && (
            <span className="text-accent" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </span>
        {!required && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm text-danger">
      <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className="mt-0.5 shrink-0">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 4.5v4.5M8 11v.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span>{error}</span>
    </p>
  );
}

export function describedBy(id: string, hint?: string, error?: string) {
  const ids = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ");
  return ids || undefined;
}

/** Fieldset wrapper for checkbox and radio groups. */
export function GroupShell({
  id,
  legend,
  required,
  hint,
  error,
  children,
  showOptional = true,
  className = "",
}: {
  id: string;
  legend: string;
  showOptional?: boolean;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      aria-describedby={describedBy(id, hint, error)}
      aria-invalid={error ? true : undefined}
      className={`min-w-0 focus:outline-none ${className}`}
    >
      <legend className="flex w-full items-baseline justify-between gap-3 text-[0.9375rem] font-medium text-ink">
        <span>
          {legend}
          {required && (
            <span className="text-accent" aria-hidden="true">
              {" "}
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </span>
        {!required && showOptional && <span className="text-xs font-normal text-muted">Optional</span>}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-3">{children}</div>
      <FieldError id={`${id}-error`} error={error} />
    </fieldset>
  );
}
