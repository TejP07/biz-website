/**
 * Trust-building content: reasons to work with us, pricing factors,
 * placeholder statistics and testimonials.
 *
 * IMPORTANT: Only replace placeholders with information that is true and
 * verifiable. Leave an array empty to hide its section entirely.
 */

export const pillars = [
  {
    title: "Technical accuracy",
    description:
      "Drawings are dimensioned, noted, and cross-referenced so they hold up in plan review and in the field.",
  },
  {
    title: "Licensed professional coordination",
    description:
      "When a project needs a licensed architect or engineer, we bring them in and integrate their work into your set. You don't have to find and manage separate consultants.",
  },
  {
    title: "Clear documentation",
    description:
      "Consistent sheet organization, visible revision history, and notes written for the people who will actually use the drawings.",
  },
  {
    title: "Responsive communication",
    description:
      "You'll know who is working on your project, what's in progress, and exactly what we need from you next.",
  },
  {
    title: "Project-specific scope",
    description:
      "Each proposal is built around what your project actually requires, so you don't pay for standard packages or extra deliverables you won't use.",
  },
  {
    title: "Transparent workflow",
    description:
      "A written scope, defined deliverables, and a clear view of every step from the first call to approval.",
  },
];

/**
 * Placeholder statistics. Replace with real, verifiable figures, or set this
 * to an empty array to hide the statistics row.
 */
export const stats: { value: string; label: string }[] = [
  { value: "[Project Statistic]", label: "[Statistic description]" },
  { value: "[Project Statistic]", label: "[Statistic description]" },
  { value: "[Project Statistic]", label: "[Statistic description]" },
];

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  projectType: string;
};

/**
 * Client testimonials. Use only real testimonials with the client's permission.
 * Set to an empty array to hide the testimonials section.
 */
export const testimonials: Testimonial[] = [
  {
    quote: "[Client Testimonial]: a short quote describing the client's experience working with your team.",
    name: "[Client Name]",
    title: "[Title, Company]",
    projectType: "[Project Type]",
  },
  {
    quote: "[Client Testimonial]: a short quote describing the client's experience working with your team.",
    name: "[Client Name]",
    title: "[Title, Company]",
    projectType: "[Project Type]",
  },
  {
    quote: "[Client Testimonial]: a short quote describing the client's experience working with your team.",
    name: "[Client Name]",
    title: "[Title, Company]",
    projectType: "[Project Type]",
  },
];

/** Factors that determine project pricing. */
export const pricingFactors = [
  {
    title: "Project scope",
    description: "Which drawings, disciplines, and services the project actually needs.",
  },
  {
    title: "Size",
    description: "Floor area, number of levels, and the number of spaces or units involved.",
  },
  {
    title: "Complexity",
    description: "Structural changes, system upgrades, occupancy changes, and unusual conditions.",
  },
  {
    title: "Existing documentation",
    description: "Whether reliable drawings exist or conditions must be measured and documented.",
  },
  {
    title: "Required disciplines",
    description: "Involvement of licensed architects, structural engineers, and MEP engineers.",
  },
  {
    title: "Jurisdiction",
    description: "Local submission requirements, review process, and number of review cycles.",
  },
  {
    title: "Engineering requirements",
    description: "Calculations, design work, and sealed drawings required for approval.",
  },
  {
    title: "Timeline",
    description: "Target dates and whether the schedule requires expedited production.",
  },
];

/** What a written proposal includes. */
export const proposalIncludes = [
  "Scope of work and list of deliverables",
  "Disciplines and licensed professionals involved",
  "Assumptions and items excluded from scope",
  "Estimated schedule for our work",
  "Fees and payment terms",
];
