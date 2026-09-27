/**
 * Project inquiry: shared types and validation.
 * Used by the form (client-side) and by /api/inquiry (server-side), so both
 * enforce exactly the same rules.
 */
import { documentAnswers, projectSizeOptions, timelineOptions, uploadLimits } from "@/content/inquiry";
import { projectTypeOptions } from "@/content/project-types";
import { serviceOptions } from "@/content/services";
import { clientRoleOptions } from "@/content/audiences";

export type DocAnswer = "" | (typeof documentAnswers)[number]["value"];

export type InquiryValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  projectAddress: string;
  projectType: string;
  services: string[];
  projectSize: string;
  description: string;
  timeline: string;
  existingDrawings: DocAnswer;
  architecturalPlans: DocAnswer;
  structuralPlans: DocAnswer;
  mepPlans: DocAnswer;
  notes: string;
  /** Honeypot field; must stay empty. */
  website: string;
};

export type FileMeta = { name: string; size: number; type: string };

export type InquiryField = Exclude<keyof InquiryValues, "website"> | "files";
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const emptyInquiry: InquiryValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  role: "",
  projectAddress: "",
  projectType: "",
  services: [],
  projectSize: "",
  description: "",
  timeline: "",
  existingDrawings: "",
  architecturalPlans: "",
  structuralPlans: "",
  mepPlans: "",
  notes: "",
  website: "",
};

/** Display order of fields, used for the error summary and focus order. */
export const fieldOrder: InquiryField[] = [
  "name",
  "company",
  "email",
  "phone",
  "role",
  "projectAddress",
  "projectType",
  "services",
  "projectSize",
  "description",
  "timeline",
  "existingDrawings",
  "architecturalPlans",
  "structuralPlans",
  "mepPlans",
  "files",
  "notes",
];

export const fieldLabels: Record<InquiryField, string> = {
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  role: "I am a",
  projectAddress: "Project address",
  projectType: "Project type",
  services: "Services needed",
  projectSize: "Approximate project size",
  description: "Project description",
  timeline: "Desired timeline",
  existingDrawings: "Existing drawings",
  architecturalPlans: "Architectural plans",
  structuralPlans: "Structural plans",
  mepPlans: "MEP plans",
  files: "Drawings and documents",
  notes: "Additional notes",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MB = 1024 * 1024;

export function fileExtension(name: string) {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
}

const oneOf = (value: string, options: readonly string[]) => value === "" || options.includes(value);

export function validateInquiry(v: InquiryValues, files: FileMeta[] = []): InquiryErrors {
  const e: InquiryErrors = {};

  if (!v.name.trim()) e.name = "Enter your name.";
  else if (v.name.length > 120) e.name = "Name must be 120 characters or fewer.";

  if (v.company.length > 160) e.company = "Company must be 160 characters or fewer.";

  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim()) || v.email.length > 254)
    e.email = "Enter a valid email address, like name@example.com.";

  if (v.phone.trim()) {
    const digits = v.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15 || !/^[\d\s()+.\-x]+$/i.test(v.phone.trim()))
      e.phone = "Enter a valid phone number, or leave this blank.";
  }

  if (!oneOf(v.role, clientRoleOptions)) e.role = "Choose an option from the list.";

  if (!v.projectAddress.trim()) e.projectAddress = "Enter the project address, or the city and state.";
  else if (v.projectAddress.length > 300) e.projectAddress = "Address must be 300 characters or fewer.";

  if (!v.projectType) e.projectType = "Choose a project type.";
  else if (!oneOf(v.projectType, projectTypeOptions)) e.projectType = "Choose a project type from the list.";

  if (v.services.length === 0) e.services = "Select at least one service, or choose “Not sure yet”.";
  else if (v.services.some((s) => !serviceOptions.includes(s as (typeof serviceOptions)[number])))
    e.services = "Choose services from the list.";

  if (!oneOf(v.projectSize, projectSizeOptions)) e.projectSize = "Choose a size from the list.";

  const desc = v.description.trim();
  if (!desc) e.description = "Describe the project in a few sentences.";
  else if (desc.length < 20) e.description = "Add a little more detail (at least 20 characters).";
  else if (desc.length > 5000) e.description = "Description must be 5,000 characters or fewer.";

  if (!oneOf(v.timeline, timelineOptions)) e.timeline = "Choose a timeline from the list.";

  const answers = documentAnswers.map((a) => a.value) as string[];
  for (const key of ["existingDrawings", "architecturalPlans", "structuralPlans", "mepPlans"] as const) {
    if (!oneOf(v[key], answers)) e[key] = "Choose Yes, No, or Not sure.";
  }

  if (v.notes.length > 5000) e.notes = "Notes must be 5,000 characters or fewer.";

  const fileError = validateFiles(files);
  if (fileError) e.files = fileError;

  return e;
}

export function validateFiles(files: FileMeta[]): string | undefined {
  const { maxFiles, maxFileSizeMB, maxTotalSizeMB, acceptedExtensions } = uploadLimits;
  if (files.length > maxFiles) return `Upload up to ${maxFiles} files.`;
  const bad = files.find((f) => !acceptedExtensions.includes(fileExtension(f.name)));
  if (bad) return `“${bad.name}” isn't a supported file type.`;
  const big = files.find((f) => f.size > maxFileSizeMB * MB);
  if (big) return `“${big.name}” is larger than ${maxFileSizeMB} MB.`;
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > maxTotalSizeMB * MB) return `Files total more than ${maxTotalSizeMB} MB. Remove some, or share a download link in the notes.`;
  return undefined;
}

/** Reads inquiry values from submitted FormData (server side). */
export function inquiryFromFormData(form: FormData): InquiryValues {
  const str = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v : "";
  };
  return {
    name: str("name"),
    company: str("company"),
    email: str("email"),
    phone: str("phone"),
    role: str("role"),
    projectAddress: str("projectAddress"),
    projectType: str("projectType"),
    services: form.getAll("services").filter((s): s is string => typeof s === "string"),
    projectSize: str("projectSize"),
    description: str("description"),
    timeline: str("timeline"),
    existingDrawings: str("existingDrawings") as DocAnswer,
    architecturalPlans: str("architecturalPlans") as DocAnswer,
    structuralPlans: str("structuralPlans") as DocAnswer,
    mepPlans: str("mepPlans") as DocAnswer,
    notes: str("notes"),
    website: str("website"),
  };
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < MB) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / MB).toFixed(1)} MB`;
}

/** API response shape shared by the route handler and the form. */
export type InquiryResponse =
  | { ok: true; delivered: true; reference: string }
  | {
      ok: false;
      code: "NOT_CONFIGURED" | "VALIDATION" | "DELIVERY_FAILED" | "BAD_REQUEST" | "TOO_LARGE";
      reference?: string;
      errors?: InquiryErrors;
      message?: string;
    };
