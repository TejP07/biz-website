/** Client groups shown in the "Who We Serve" section. */

export type Audience = {
  slug: string;
  title: string;
  summary: string;
  needs: string[];
};

export const audiences: Audience[] = [
  {
    slug: "property-owners",
    title: "Property Owners",
    summary:
      "Renovating, expanding, or changing how a building is used? We prepare the drawings your municipality and contractor need, and bring in licensed professionals where your project requires them.",
    needs: [
      "Existing-condition and proposed drawings",
      "Permit packages and plan-review responses",
      "One contact for design and engineering",
    ],
  },
  {
    slug: "contractors",
    title: "Contractors",
    summary:
      "Reliable drawings on your schedule, so you can price accurately, pull permits, and keep crews moving.",
    needs: [
      "Permit and construction sets for design-build work",
      "Structural and MEP coordination for field changes",
      "Revision sets and as-builts at close-out",
    ],
  },
  {
    slug: "developers",
    title: "Developers",
    summary:
      "Consistent documentation support across multiple properties, phases, and jurisdictions.",
    needs: [
      "Repeatable drawing standards across a portfolio",
      "Existing-condition surveys for acquisitions",
      "A coordinated consultant team for each site",
    ],
  },
  {
    slug: "architects-design-firms",
    title: "Architects & Design Firms",
    summary:
      "Production capacity when your team is at its limit, working to your standards and under your direction.",
    needs: [
      "Construction document production",
      "Redline pickup and drawing clean-up",
      "Work in your title blocks, layers, and templates",
    ],
  },
  {
    slug: "businesses-tenants",
    title: "Businesses & Commercial Tenants",
    summary:
      "Office, retail, restaurant, and tenant improvement drawings that satisfy your landlord, your contractor, and the building department.",
    needs: [
      "Tenant improvement and fit-out plans",
      "Landlord submission packages",
      "Coordination with base-building drawings",
    ],
  },
];

/** Options used by the inquiry form's "I am a..." field. */
export const clientRoleOptions = [
  "Property owner",
  "Contractor",
  "Developer",
  "Architect / design firm",
  "Business / commercial tenant",
  "Other",
] as const;
