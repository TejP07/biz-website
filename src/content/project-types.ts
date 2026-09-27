/**
 * Project types. Used by the "Project Types" section on the home page and by
 * the inquiry form's "Project type" dropdown.
 */

export type ProjectType = {
  label: string;
  description: string;
  /** Short drawing-style code shown as a tag. Purely decorative. */
  code: string;
};

export const projectTypes: ProjectType[] = [
  {
    label: "Residential renovation",
    code: "R-01",
    description: "Kitchens, layouts, basements, and whole-house renovations.",
  },
  {
    label: "Commercial renovation",
    code: "C-01",
    description: "Updates to offices, retail, and mixed-use buildings.",
  },
  {
    label: "Tenant improvement",
    code: "TI-01",
    description: "Fit-outs for office, retail, restaurant, and medical tenants.",
  },
  {
    label: "Addition",
    code: "AD-01",
    description: "Horizontal and vertical additions to existing buildings.",
  },
  {
    label: "New construction",
    code: "NC-01",
    description: "Drawing sets and coordination for ground-up projects.",
  },
  {
    label: "Structural modification",
    code: "S-01",
    description: "Wall removals, new openings, mezzanines, and added loads.",
  },
  {
    label: "MEP",
    code: "M-01",
    description: "HVAC, electrical, plumbing, and lighting documentation.",
  },
  {
    label: "Permit drawings",
    code: "P-01",
    description: "Complete packages for building permit submission.",
  },
  {
    label: "As-built documentation",
    code: "AB-01",
    description: "Measured drawings of buildings as they stand today.",
  },
];

/** Options for the inquiry form. "Other" is appended for unlisted work. */
export const projectTypeOptions = [...projectTypes.map((t) => t.label), "Other"] as const;
