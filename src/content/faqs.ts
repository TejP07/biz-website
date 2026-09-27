/**
 * Frequently asked questions. `featured` questions appear on the home page;
 * all questions appear on /faq, grouped by `category`.
 *
 * Answers are written to avoid legal or licensing claims. If your company or
 * team holds specific licenses, you can update the relevant answers.
 */
import { site } from "./site";

export type Faq = {
  question: string;
  answer: string[];
  category: FaqCategory;
  featured?: boolean;
};

export type FaqCategory =
  | "Services"
  | "Licensing & Engineering"
  | "Permits & Approvals"
  | "Pricing & Timelines"
  | "Getting Started";

export const faqCategories: FaqCategory[] = [
  "Services",
  "Licensing & Engineering",
  "Permits & Approvals",
  "Pricing & Timelines",
  "Getting Started",
];

export const faqs: Faq[] = [
  {
    question: "What types of projects do you work on?",
    category: "Services",
    featured: true,
    answer: [
      "We work on residential and commercial renovations, interior build-outs and tenant improvements, additions, new construction, structural modifications, MEP coordination, permit drawing sets, and as-built documentation.",
      "If your project isn't on that list, send us a short description. We'll tell you plainly whether it's a good fit.",
    ],
  },
  {
    question: "Do you provide architectural drawings?",
    category: "Services",
    featured: true,
    answer: [
      "Yes. We prepare existing-condition plans, proposed plans, elevations, sections, details, and construction documentation.",
      "Some jurisdictions and project types require drawings to be prepared or sealed by a licensed architect. When that applies, we coordinate with a licensed architect who reviews and seals the applicable work.",
    ],
  },
  {
    question: "Do you provide structural engineering?",
    category: "Licensing & Engineering",
    featured: true,
    answer: [
      "We coordinate structural engineering. When a project requires structural analysis, design, or sealed drawings, that work is performed by a licensed structural engineer.",
      "We prepare the supporting documentation, coordinate with the engineer, and integrate the structural design into your drawing set so everything is consistent.",
    ],
  },
  {
    question: "Do you provide MEP design?",
    category: "Licensing & Engineering",
    answer: [
      "We document and coordinate mechanical, electrical, and plumbing layouts. When the project or jurisdiction requires engineered MEP design, calculations, or sealed drawings, that work is performed by licensed MEP engineers, and we integrate it into the set.",
    ],
  },
  {
    question: "Can you help with permits?",
    category: "Permits & Approvals",
    featured: true,
    answer: [
      "Yes. We prepare permit drawing packages, coordinate the submission with the reviewing authority, track the review, and prepare responses and revised drawings when reviewers issue comments.",
      "Review timelines and approval decisions are made by the jurisdiction, so no one can guarantee them. Our job is to make each submission complete, clear, and responsive.",
    ],
  },
  {
    question: "Do you work with contractors?",
    category: "Services",
    featured: true,
    answer: [
      "Yes. Contractors are one of the main groups we work with. We provide permit sets for design-build projects, construction documentation, drawings for field changes, and as-builts at close-out, on a per-project basis or as ongoing support.",
    ],
  },
  {
    question: "Can you work from existing drawings?",
    category: "Services",
    answer: [
      "Yes. Existing plans, prior permit sets, surveys, and even hand sketches are useful starting points. We'll review what you have and tell you whether key conditions should be field-verified before we rely on them.",
    ],
  },
  {
    question: "Can you create as-built drawings?",
    category: "Services",
    answer: [
      "Yes. We produce measured as-built and existing-condition drawings of buildings as they stand today. These are often the first step for renovations, tenant improvements, and property acquisitions.",
      "When we scope the work, we'll confirm how field measurements will be collected for your location.",
    ],
  },
  {
    question: "Do you work with licensed engineers?",
    category: "Licensing & Engineering",
    featured: true,
    answer: [
      "Yes. We coordinate with licensed structural, mechanical, electrical, and plumbing engineers, and with licensed architects, whenever a project requires professional design, review, or a seal.",
      "Architectural and engineering work that requires a license, stamp, or seal is performed or reviewed by a professional licensed in the project's jurisdiction.",
    ],
  },
  {
    question: "Who stamps or seals the drawings?",
    category: "Licensing & Engineering",
    answer: [
      "Seals are applied by the licensed architect or engineer responsible for the sealed work, as required by the jurisdiction where the project is located. Your proposal will identify which portions of the work require a licensed professional.",
    ],
  },
  {
    question: "How does pricing work?",
    category: "Pricing & Timelines",
    featured: true,
    answer: [
      "Every project is quoted individually. Pricing depends on scope, size, complexity, existing documentation, the disciplines involved, the jurisdiction, engineering requirements, and your timeline.",
      "After reviewing your project information, we send a written proposal with scope, deliverables, and fees before any work begins.",
    ],
  },
  {
    question: "How long does a typical project take?",
    category: "Pricing & Timelines",
    answer: [
      "It depends on scope, the disciplines involved, and how quickly information and decisions come back. Permit review time is set by the jurisdiction and varies widely.",
      "Your proposal includes an estimated schedule for our work, and we keep you updated at each stage, including while the permit is in review.",
    ],
  },
  {
    question: "What information do you need to get started?",
    category: "Getting Started",
    featured: true,
    answer: [
      "The project address, a short description of what you want to do, any existing drawings or surveys, a few photos, your target timeline, and who else is involved: owner, contractor, architect, or landlord.",
      "If you don't have all of that yet, that's fine. Start with what you know and we'll help fill in the rest.",
    ],
  },
  {
    question: "What areas do you serve?",
    category: "Getting Started",
    answer: [
      `We're based in ${site.serviceArea.primary} and work on projects throughout ${site.serviceArea.region}. Contact us about projects outside that area.`,
    ],
  },
  {
    question: "Can you work as an extension of our team?",
    category: "Getting Started",
    answer: [
      "Yes. Contractors, developers, and design firms can use us for ongoing drafting, documentation, and coordination support. We can work in your drawing standards, title blocks, and templates and follow your review process.",
      `Our production software: ${site.software}.`,
    ],
  },
];

export const featuredFaqs = faqs.filter((f) => f.featured);
