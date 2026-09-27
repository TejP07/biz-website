/**
 * Server-side delivery of project inquiries.
 *
 * Delivery is pluggable and configured entirely with environment variables.
 * If no provider is configured, the API reports NOT_CONFIGURED and the form
 * tells the visitor plainly that nothing was sent.
 *
 * Built-in providers:
 *   1. Webhook: POSTs JSON to any URL (Zapier, Make, n8n, a CRM, your own API).
 *        INQUIRY_WEBHOOK_URL=https://...
 *        INQUIRY_WEBHOOK_SECRET=optional-shared-secret   (sent as a Bearer token)
 *        INQUIRY_WEBHOOK_INCLUDE_FILES=true               (optional: base64 file contents)
 *   2. Email via Resend (https://resend.com), attachments included.
 *        RESEND_API_KEY=re_...
 *        INQUIRY_EMAIL_TO=projects@yourcompany.com        (comma-separated for several)
 *        INQUIRY_EMAIL_FROM="Website <website@yourcompany.com>"   (verified sender domain)
 *
 * To add another destination (a database, a CRM SDK, S3 for uploads...), add
 * a provider to `providers` below.
 */
import { site } from "@/content/site";
import { documentQuestions } from "@/content/inquiry";
import { formatBytes, type InquiryValues } from "./schema";

export type InquiryPayload = {
  reference: string;
  receivedAt: string;
  values: Omit<InquiryValues, "website">;
  files: File[];
};

type Provider = {
  name: string;
  isConfigured: () => boolean;
  send: (payload: InquiryPayload) => Promise<void>;
};

const answerLabel = (v: string) => ({ yes: "Yes", no: "No", unsure: "Not sure" })[v] ?? "Not answered";

/** Plain-text summary used for email bodies and logs. */
export function inquiryToText(p: InquiryPayload): string {
  const v = p.values;
  const lines = [
    `New project inquiry ${p.reference}`,
    `Received: ${p.receivedAt}`,
    "",
    "CONTACT",
    `Name: ${v.name}`,
    `Company: ${v.company || "-"}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone || "-"}`,
    `Client type: ${v.role || "-"}`,
    "",
    "PROJECT",
    `Address: ${v.projectAddress}`,
    `Project type: ${v.projectType}`,
    `Services: ${v.services.join(", ")}`,
    `Approximate size: ${v.projectSize || "-"}`,
    `Timeline: ${v.timeline || "-"}`,
    "",
    "Description:",
    v.description,
    "",
    "EXISTING DOCUMENTS",
    ...documentQuestions.map((q) => `${q.label} ${answerLabel(v[q.name])}`),
    "",
    `Files: ${p.files.length ? p.files.map((f) => `${f.name} (${formatBytes(f.size)})`).join(", ") : "none"}`,
    "",
    "Additional notes:",
    v.notes || "-",
  ];
  return lines.join("\n");
}

async function toBase64(file: File) {
  return Buffer.from(await file.arrayBuffer()).toString("base64");
}

const webhookProvider: Provider = {
  name: "webhook",
  isConfigured: () => Boolean(process.env.INQUIRY_WEBHOOK_URL),
  async send(p) {
    const includeFiles = process.env.INQUIRY_WEBHOOK_INCLUDE_FILES === "true";
    const files = await Promise.all(
      p.files.map(async (f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
        ...(includeFiles ? { contentBase64: await toBase64(f) } : {}),
      })),
    );
    const res = await fetch(process.env.INQUIRY_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INQUIRY_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        type: "project_inquiry",
        source: site.url,
        reference: p.reference,
        receivedAt: p.receivedAt,
        ...p.values,
        files,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  },
};

const resendProvider: Provider = {
  name: "resend",
  isConfigured: () =>
    Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_EMAIL_TO && process.env.INQUIRY_EMAIL_FROM),
  async send(p) {
    const attachments = await Promise.all(
      p.files.map(async (f) => ({ filename: f.name, content: await toBase64(f) })),
    );
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.INQUIRY_EMAIL_FROM,
        to: process.env.INQUIRY_EMAIL_TO!.split(",").map((s) => s.trim()),
        reply_to: p.values.email,
        subject: `Project inquiry ${p.reference}: ${p.values.projectType} (${p.values.name})`,
        text: inquiryToText(p),
        attachments,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  },
};

const providers: Provider[] = [webhookProvider, resendProvider];

export function configuredProviders() {
  return providers.filter((p) => p.isConfigured());
}

/** Sends to every configured provider. Succeeds if at least one delivery succeeds. */
export async function deliverInquiry(payload: InquiryPayload) {
  const active = configuredProviders();
  const results = await Promise.allSettled(active.map((p) => p.send(payload)));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[inquiry] ${active[i].name} delivery failed:`, r.reason);
  });
  return { delivered: results.some((r) => r.status === "fulfilled") };
}

export function makeReference(date = new Date()) {
  const d = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `INQ-${d}-${rand}`;
}
