/**
 * Email-based project inquiries (used on /contact).
 *
 * The site is hosted as static files (GitHub Pages), so there is no server to
 * receive a form. Instead, visitors email their project details using a
 * pre-filled template. Edit the subject and template text here.
 */
import { projectTypes } from "./project-types";

export const inquiryEmailSubject = "Project inquiry";

export const inquiryEmailTemplate = [
  "Hello,",
  "",
  "I'd like to discuss a project.",
  "",
  "CONTACT",
  "Name:",
  "Company:",
  "Phone:",
  "I am a (property owner / contractor / developer / architect or design firm / business or tenant / other):",
  "",
  "PROJECT",
  "Project address (or city and state):",
  `Project type (${[...projectTypes.map((t) => t.label.toLowerCase()), "other"].join(" / ")}):`,
  "Services needed (drafting, as-built drawings, structural coordination, MEP coordination, permit support, construction documentation, design coordination, not sure):",
  "Approximate project size (sq ft):",
  "Desired timeline:",
  "",
  "Project description:",
  "",
  "",
  "EXISTING DOCUMENTS (yes / no / not sure)",
  "Existing drawings:",
  "Architectural plans:",
  "Structural plans:",
  "MEP plans:",
  "",
  "Additional notes:",
  "",
  "",
  "(Attached: any drawings, surveys, photos, or prior permit sets.)",
].join("\n");
