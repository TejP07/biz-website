"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
  type Ref,
} from "react";
import { clientRoleOptions } from "@/content/audiences";
import { documentAnswers, documentQuestions, projectSizeOptions, timelineOptions, uploadLimits } from "@/content/inquiry";
import { projectTypeOptions } from "@/content/project-types";
import { serviceOptions } from "@/content/services";
import { isPlaceholder, site } from "@/content/site";
import {
  emptyInquiry,
  fieldLabels,
  fieldOrder,
  formatBytes,
  validateInquiry,
  type InquiryErrors,
  type InquiryField,
  type InquiryResponse,
  type InquiryValues,
} from "@/lib/inquiry/schema";
import { Button, ButtonLink } from "@/components/ui/Button";
import { AlertIcon, CheckIcon, CloseIcon, FileIcon, InfoIcon, UploadIcon } from "@/components/ui/icons";
import { describedBy, FieldShell, GroupShell, inputClasses } from "./fields";

type Status = "idle" | "submitting" | "success" | "preview" | "error";

const meta = (f: File) => ({ name: f.name, size: f.size, type: f.type });

function FormSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  const id = `form-section-${number}`;
  return (
    <section aria-labelledby={id} className="pt-10 first:pt-0">
      <div className="flex items-baseline gap-4 border-b border-line pb-4">
        <span className="font-mono text-xs text-accent">{number}</span>
        <h2 id={id} className="font-display text-xl font-semibold text-ink">
          {title}
        </h2>
      </div>
      <div className="mt-7 grid gap-x-5 gap-y-7 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export function ProjectInquiryForm() {
  const [values, setValues] = useState<InquiryValues>(emptyInquiry);
  const [files, setFiles] = useState<File[]>([]);
  const [touched, setTouched] = useState<Partial<Record<InquiryField, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [serverErrors, setServerErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const startedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const liveErrors = useMemo(() => validateInquiry(values, files.map(meta)), [values, files]);
  const errorFor = (field: InquiryField) =>
    submitAttempted || touched[field] ? (liveErrors[field] ?? serverErrors[field]) : serverErrors[field];
  const visibleErrors = fieldOrder.filter((f) => submitAttempted && (liveErrors[f] || serverErrors[f]));

  useEffect(() => {
    if (status === "success" || status === "preview") {
      resultRef.current?.focus();
      resultRef.current?.scrollIntoView({ block: "start" });
    }
  }, [status]);

  function update<K extends keyof InquiryValues>(field: K, value: InquiryValues[K]) {
    setValues((v) => ({ ...v, [field]: value }));
    if (serverErrors[field as InquiryField]) setServerErrors((e) => ({ ...e, [field]: undefined }));
  }
  const touch = (field: InquiryField) => setTouched((t) => (t[field] ? t : { ...t, [field]: true }));

  const text = (field: "name" | "company" | "email" | "phone" | "projectAddress" | "description" | "notes") => ({
    id: field,
    name: field,
    value: values[field],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update(field, e.target.value),
    onBlur: () => touch(field),
    "aria-invalid": errorFor(field) ? true : undefined,
  });

  const select = (field: "role" | "projectType" | "projectSize" | "timeline") => ({
    id: field,
    name: field,
    value: values[field],
    onChange: (e: ChangeEvent<HTMLSelectElement>) => {
      update(field, e.target.value);
      touch(field);
    },
    onBlur: () => touch(field),
    "aria-invalid": errorFor(field) ? true : undefined,
  });

  function toggleService(option: string, checked: boolean) {
    const next = checked ? [...values.services, option] : values.services.filter((s) => s !== option);
    update("services", next);
    touch("services");
  }

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    setFiles((current) => {
      const merged = [...current];
      for (const f of incoming) {
        if (!merged.some((m) => m.name === f.name && m.size === f.size)) merged.push(f);
      }
      return merged;
    });
    touch("files");
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, i) => i !== index));
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setSubmitAttempted(true);
    setServerMessage("");

    const errors = validateInquiry(values, files.map(meta));
    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("submitting");
    const body = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (Array.isArray(value)) value.forEach((v) => body.append(key, v));
      else body.append(key, value);
    }
    files.forEach((f) => body.append("files", f));
    body.append("startedAt", String(startedAt.current));

    try {
      const res = await fetch("/api/inquiry", { method: "POST", body });
      if (res.status === 413) {
        setStatus("error");
        setServerMessage(
          "The attached files are too large to upload here. Remove them and add a download link in the notes, or send them by email.",
        );
        return;
      }
      const data = (await res.json()) as InquiryResponse;
      if (data.ok) {
        setReference(data.reference);
        setStatus("success");
      } else if (data.code === "NOT_CONFIGURED") {
        setReference(data.reference ?? "");
        setStatus("preview");
      } else if (data.code === "VALIDATION") {
        setServerErrors(data.errors ?? {});
        setStatus("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
      } else {
        setStatus("error");
        setServerMessage("Your inquiry couldn't be delivered. Please try again in a moment, or contact us directly.");
      }
    } catch {
      setStatus("error");
      setServerMessage("We couldn't reach the server. Check your connection and try again, or contact us directly.");
    }
  }

  function reset() {
    setValues(emptyInquiry);
    setFiles([]);
    setTouched({});
    setSubmitAttempted(false);
    setServerErrors({});
    setServerMessage("");
    setReference("");
    setStatus("idle");
    startedAt.current = Date.now();
  }

  if (status === "success" || status === "preview") {
    return (
      <Confirmation
        ref={resultRef}
        mode={status}
        reference={reference}
        values={values}
        fileCount={files.length}
        onBack={() => setStatus("idle")}
        onReset={reset}
      />
    );
  }

  const { maxFiles, maxFileSizeMB, maxTotalSizeMB, acceptedExtensions } = uploadLimits;
  const filesError = errorFor("files");
  const totalSize = files.reduce((s, f) => s + f.size, 0);

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="form-note" className="relative">
      <p id="form-note" className="mb-8 text-sm text-muted">
        Fields marked <span className="text-accent">*</span> are required. Most people finish in about
        three minutes.
      </p>

      {visibleErrors.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="error-summary-title"
          className="mb-10 border-l-4 border-danger bg-danger-soft px-5 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger"
        >
          <p id="error-summary-title" className="flex items-center gap-2 font-medium text-danger">
            <AlertIcon size={18} />
            {visibleErrors.length === 1 ? "1 field needs attention" : `${visibleErrors.length} fields need attention`}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {visibleErrors.map((f) => (
              <li key={f}>
                <a href={`#${f}`} className="text-ink underline underline-offset-2 hover:text-danger">
                  {fieldLabels[f]}: {liveErrors[f] ?? serverErrors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <FormSection number="01" title="Your details">
        <FieldShell id="name" label="Name" required error={errorFor("name")}>
          <input
            {...text("name")}
            type="text"
            autoComplete="name"
            required
            aria-describedby={describedBy("name", undefined, errorFor("name"))}
            className={inputClasses(!!errorFor("name"), "h-12")}
          />
        </FieldShell>
        <FieldShell id="company" label="Company" error={errorFor("company")}>
          <input
            {...text("company")}
            type="text"
            autoComplete="organization"
            aria-describedby={describedBy("company", undefined, errorFor("company"))}
            className={inputClasses(!!errorFor("company"), "h-12")}
          />
        </FieldShell>
        <FieldShell id="email" label="Email" required error={errorFor("email")}>
          <input
            {...text("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-describedby={describedBy("email", undefined, errorFor("email"))}
            className={inputClasses(!!errorFor("email"), "h-12")}
          />
        </FieldShell>
        <FieldShell id="phone" label="Phone" error={errorFor("phone")}>
          <input
            {...text("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-describedby={describedBy("phone", undefined, errorFor("phone"))}
            className={inputClasses(!!errorFor("phone"), "h-12")}
          />
        </FieldShell>
        <FieldShell id="role" label="I am a" error={errorFor("role")} className="sm:col-span-2">
          <SelectInput {...select("role")} error={errorFor("role")} placeholder="Select one" options={clientRoleOptions} />
        </FieldShell>
      </FormSection>

      <FormSection number="02" title="The project">
        <FieldShell
          id="projectAddress"
          label="Project address"
          required
          hint="Street address, or the city and state if the address isn't final."
          error={errorFor("projectAddress")}
          className="sm:col-span-2"
        >
          <input
            {...text("projectAddress")}
            type="text"
            autoComplete="street-address"
            required
            aria-describedby={describedBy("projectAddress", "hint", errorFor("projectAddress"))}
            className={inputClasses(!!errorFor("projectAddress"), "h-12")}
          />
        </FieldShell>
        <FieldShell id="projectType" label="Project type" required error={errorFor("projectType")}>
          <SelectInput
            {...select("projectType")}
            required
            error={errorFor("projectType")}
            placeholder="Select a project type"
            options={projectTypeOptions}
          />
        </FieldShell>
        <FieldShell id="projectSize" label="Approximate project size" error={errorFor("projectSize")}>
          <SelectInput
            {...select("projectSize")}
            error={errorFor("projectSize")}
            placeholder="Select a size range"
            options={projectSizeOptions}
          />
        </FieldShell>

        <GroupShell
          id="services"
          legend="Services needed"
          required
          hint="Select all that apply."
          error={errorFor("services")}
          className="sm:col-span-2"
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {serviceOptions.map((option) => {
              const checked = values.services.includes(option);
              return (
                <label
                  key={option}
                  className={`flex cursor-pointer items-start gap-3 rounded-[2px] border px-4 py-3 text-[0.9375rem] leading-snug transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
                    checked ? "border-accent bg-accent-soft/60 text-ink" : "border-line-strong bg-surface text-ink-2 hover:border-ink/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={option}
                    checked={checked}
                    onChange={(e) => toggleService(option, e.target.checked)}
                    className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 accent-accent focus:outline-none"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </GroupShell>

        <FieldShell
          id="description"
          label="Project description"
          required
          hint="What do you want to build or change? Include anything you already know about structural, mechanical, or permit requirements."
          error={errorFor("description")}
          className="sm:col-span-2"
        >
          <textarea
            {...text("description")}
            rows={6}
            required
            aria-describedby={describedBy("description", "hint", errorFor("description"))}
            className={inputClasses(!!errorFor("description"), "min-h-40 py-3 leading-relaxed")}
          />
        </FieldShell>

        <FieldShell id="timeline" label="Desired timeline" error={errorFor("timeline")} className="sm:col-span-2 sm:max-w-[calc(50%-0.625rem)]">
          <SelectInput {...select("timeline")} error={errorFor("timeline")} placeholder="Select a timeline" options={timelineOptions} />
        </FieldShell>
      </FormSection>

      <FormSection number="03" title="Existing documents">
        <p className="-mt-2 text-sm text-muted sm:col-span-2">
          Existing drawings help us scope accurately. It&apos;s fine if you don&apos;t have them.
        </p>
        {documentQuestions.map((q) => (
          <GroupShell key={q.name} id={q.name} legend={`Do you have ${q.label.charAt(0).toLowerCase()}${q.label.slice(1)}`} error={errorFor(q.name)}>
            <div className="grid grid-cols-3 gap-2">
              {documentAnswers.map((a) => {
                const checked = values[q.name] === a.value;
                return (
                  <label
                    key={a.value}
                    className={`flex h-11 cursor-pointer items-center justify-center rounded-[2px] border text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-1 ${
                      checked ? "border-ink bg-ink text-paper" : "border-line-strong bg-surface text-ink-2 hover:border-ink/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.name}
                      value={a.value}
                      checked={checked}
                      onChange={() => {
                        update(q.name, a.value);
                        touch(q.name);
                      }}
                      className="sr-only"
                    />
                    {a.label}
                  </label>
                );
              })}
            </div>
          </GroupShell>
        ))}
      </FormSection>

      <FormSection number="04" title="Drawings & notes">
        <div className="sm:col-span-2">
          <p className="text-[0.9375rem] font-medium text-ink" id="files-label">
            Upload drawings or documents <span className="text-xs font-normal text-muted">Optional</span>
          </p>
          <p id="files-hint" className="mt-1 text-sm text-muted">
            Plans, surveys, photos, or prior permit sets. {acceptedExtensions.map((x) => x.slice(1).toUpperCase()).join(", ")}.
            Up to {maxFiles} files, {maxFileSizeMB} MB each, {maxTotalSizeMB} MB total.
          </p>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`relative mt-3 flex flex-col items-center justify-center gap-3 rounded-[2px] border border-dashed px-6 py-9 text-center transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent ${
              dragOver ? "border-accent bg-accent-soft/60" : filesError ? "border-danger bg-surface" : "border-line-strong bg-surface"
            }`}
          >
            <input
              ref={fileInputRef}
              id="files"
              name="files"
              type="file"
              multiple
              accept={acceptedExtensions.join(",")}
              aria-labelledby="files-label"
              aria-describedby={describedBy("files", "hint", filesError)}
              aria-invalid={filesError ? true : undefined}
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
              className="sr-only"
            />
            <UploadIcon size={26} className="text-accent" />
            <p className="text-[0.9375rem] text-ink-2">
              <label htmlFor="files" className="cursor-pointer font-medium text-accent underline underline-offset-4 hover:text-accent-strong">
                Choose files
              </label>{" "}
              <span className="hidden sm:inline">or drag and drop them here</span>
            </p>
          </div>
          {filesError && (
            <p id="files-error" className="mt-2 flex items-start gap-2 text-sm text-danger">
              <AlertIcon size={16} className="mt-0.5 shrink-0" />
              {filesError}
            </p>
          )}
          {files.length > 0 && (
            <div className="mt-4">
              <ul className="divide-y divide-line border border-line bg-surface" aria-label="Selected files">
                {files.map((f, i) => (
                  <li key={`${f.name}-${f.size}`} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                    <FileIcon size={18} className="shrink-0 text-muted" />
                    <span className="min-w-0 flex-1 truncate text-ink">{f.name}</span>
                    <span className="shrink-0 font-mono text-xs text-muted">{formatBytes(f.size)}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="-mr-2 inline-flex h-9 w-9 shrink-0 items-center justify-center text-muted hover:bg-ink/5 hover:text-danger"
                      aria-label={`Remove ${f.name}`}
                    >
                      <CloseIcon size={16} />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-muted">
                {files.length} of {maxFiles} files · {formatBytes(totalSize)} of {maxTotalSizeMB} MB
              </p>
            </div>
          )}
        </div>

        <FieldShell
          id="notes"
          label="Additional notes"
          hint="Deadlines, access constraints, links to large files, or anything else we should know."
          error={errorFor("notes")}
          className="sm:col-span-2"
        >
          <textarea
            {...text("notes")}
            rows={4}
            aria-describedby={describedBy("notes", "hint", errorFor("notes"))}
            className={inputClasses(!!errorFor("notes"), "min-h-28 py-3 leading-relaxed")}
          />
        </FieldShell>
      </FormSection>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {status === "error" && serverMessage && (
        <div role="alert" className="mt-10 flex gap-3 border-l-4 border-danger bg-danger-soft px-5 py-4 text-sm text-ink">
          <AlertIcon size={18} className="mt-0.5 shrink-0 text-danger" />
          <p>
            {serverMessage}{" "}
            {!isPlaceholder(site.contact.email) && (
              <a className="underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            )}
          </p>
        </div>
      )}

      <div className="mt-12 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-muted">
          We use your information only to respond to this inquiry. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">
            Privacy Policy
          </Link>
          .
        </p>
        <Button
          type="submit"
          size="lg"
          arrow={status !== "submitting"}
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Submit Project Inquiry"}
        </Button>
      </div>
    </form>
  );
}

function SelectInput({
  options,
  placeholder,
  error,
  ...props
}: {
  id: string;
  name: string;
  value: string;
  options: readonly string[];
  placeholder: string;
  error?: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: () => void;
  "aria-invalid"?: boolean;
}) {
  return (
    <div className="relative">
      <select
        {...props}
        aria-describedby={describedBy(props.id, undefined, error)}
        className={inputClasses(!!error, `h-12 appearance-none pr-11 ${props.value ? "" : "text-muted"}`)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-2"
      >
        <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function Confirmation({
  ref,
  mode,
  reference,
  values,
  fileCount,
  onBack,
  onReset,
}: {
  ref: Ref<HTMLDivElement>;
  mode: "success" | "preview";
  reference: string;
  values: InquiryValues;
  fileCount: number;
  onBack: () => void;
  onReset: () => void;
}) {
  const firstName = values.name.trim().split(/\s+/)[0];
  const delivered = mode === "success";
  const summary: [string, string][] = [
    ["Project type", values.projectType],
    ["Project address", values.projectAddress],
    ["Services", values.services.join(", ")],
    ["Files attached", fileCount ? String(fileCount) : "None"],
  ];

  return (
    <div ref={ref} tabIndex={-1} role="region" aria-labelledby="confirmation-heading" className="scroll-mt-28 focus:outline-none">
      {!delivered && (
        <div className="mb-10 border-l-4 border-notice bg-notice-soft px-5 py-5 text-sm leading-relaxed text-ink">
          <p className="flex items-center gap-2 font-semibold text-notice">
            <InfoIcon size={18} />
            Preview mode: this inquiry was not sent
          </p>
          <p className="mt-2">
            Your details passed validation, but online submission hasn&apos;t been connected to an email
            service, CRM, or form provider yet, so nothing was delivered. Please send your project
            details to <strong>{site.contact.email}</strong> or call <strong>{site.contact.phone}</strong>.
          </p>
          <p className="mt-2 text-xs text-muted">
            Site owner: connect a delivery provider as described in the README (“Connecting the inquiry
            form”).
          </p>
        </div>
      )}

      <div className="border border-line bg-surface p-7 sm:p-10">
        <span
          className={`flex h-12 w-12 items-center justify-center ${delivered ? "bg-success-soft text-success" : "bg-paper-2 text-muted"}`}
        >
          {delivered ? <CheckIcon size={24} /> : <InfoIcon size={24} />}
        </span>
        <p className="eyebrow mt-8 text-accent">{delivered ? "Inquiry received" : "Inquiry summary"}</p>
        <h2 id="confirmation-heading" className="heading-2 mt-4 text-ink">
          {delivered ? `Thank you${firstName ? `, ${firstName}` : ""}.` : "Here's what you entered."}
        </h2>
        <p className="lead mt-4 max-w-xl text-ink-2">
          {delivered
            ? `We've received your project details and will review them before we reply. We typically respond within ${site.contact.responseTime}.`
            : "Keep a copy of these details for your email, or go back to edit the form."}
        </p>

        <dl className="mt-8 border-t border-line">
          {delivered && reference && (
            <div className="grid gap-1 border-b border-line py-3 text-sm sm:grid-cols-[10rem_1fr]">
              <dt className="text-muted">Reference</dt>
              <dd className="font-mono text-ink">{reference}</dd>
            </div>
          )}
          {summary.map(([label, value]) => (
            <div key={label} className="grid gap-1 border-b border-line py-3 text-sm sm:grid-cols-[10rem_1fr]">
              <dt className="text-muted">{label}</dt>
              <dd className="text-ink">{value || "-"}</dd>
            </div>
          ))}
        </dl>

        {delivered && (
          <div className="mt-10">
            <p className="eyebrow text-muted">What happens next</p>
            <ol className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-3">
              {[
                ["Review", "We review your description, documents, and site information."],
                ["Conversation", "We contact you to confirm goals, constraints, and any open questions."],
                ["Proposal", "You receive a written scope, schedule, and fee proposal."],
              ].map(([title, body], i) => (
                <li key={title} className="bg-paper p-5">
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <p className="mt-3 font-medium text-ink">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {delivered ? (
            <>
              <ButtonLink href="/" arrow>
                Back to home
              </ButtonLink>
              <Button variant="secondary" onClick={onReset}>
                Submit another inquiry
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onBack}>Back to the form</Button>
              <Button variant="secondary" onClick={onReset}>
                Clear and start over
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
