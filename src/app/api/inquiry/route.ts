import { configuredProviders, deliverInquiry, makeReference } from "@/lib/inquiry/deliver";
import { inquiryFromFormData, validateInquiry, type InquiryResponse } from "@/lib/inquiry/schema";

export const runtime = "nodejs";

const json = (body: InquiryResponse, status: number) => Response.json(body, { status });

/** Minimum time (ms) between rendering the form and submitting it. Faster submissions are almost always bots. */
const MIN_FILL_TIME_MS = 3000;

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, code: "BAD_REQUEST", message: "The submission could not be read." }, 400);
  }

  const values = inquiryFromFormData(form);
  const reference = makeReference();

  // Spam protection: honeypot field and minimum fill time. Bots receive a
  // normal-looking success response, and nothing is delivered.
  const startedAt = Number(form.get("startedAt"));
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS;
  if (values.website || tooFast) {
    return json({ ok: true, delivered: true, reference }, 200);
  }

  const files = form
    .getAll("files")
    .filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f && f.size > 0);

  const errors = validateInquiry(
    values,
    files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
  );
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, code: "VALIDATION", errors }, 422);
  }

  // No delivery provider configured: say so honestly instead of pretending.
  if (configuredProviders().length === 0) {
    return json(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        reference,
        message: "Online submission is not connected to an email service, CRM, or form provider yet.",
      },
      503,
    );
  }

  const { website: _honeypot, ...clean } = values;
  void _honeypot;
  const { delivered } = await deliverInquiry({
    reference,
    receivedAt: new Date().toISOString(),
    values: clean,
    files,
  });

  if (!delivered) {
    return json({ ok: false, code: "DELIVERY_FAILED", reference }, 502);
  }
  return json({ ok: true, delivered: true, reference }, 200);
}
