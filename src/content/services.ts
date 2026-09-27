/**
 * Service categories. Order here controls the order on the home page,
 * the services page and the footer. The `slug` is used as the anchor on
 * /services (e.g. /services#structural-coordination).
 */

export type ServiceIcon =
  | "drafting"
  | "structural"
  | "mep"
  | "permit"
  | "documents"
  | "coordination";

export type Service = {
  slug: string;
  title: string;
  /** One sentence used on cards. */
  summary: string;
  /** Paragraph used on the services page. */
  description: string;
  /** Deliverables / scope items. */
  items: string[];
  /** Typical situations where this service is needed. */
  typicalProjects: string[];
  /** Optional note about licensed professional involvement. */
  licensedNote?: string;
  icon: ServiceIcon;
  image: { src: string; alt: string };
  /** Portfolio filter that shows related sample projects. */
  projectCategory?: string;
};

export const services: Service[] = [
  {
    slug: "architectural-drafting",
    title: "Architectural Drafting & Documentation",
    summary:
      "Measured, clearly organized drawings of what exists today and what you plan to build.",
    description:
      "Most projects start with a simple question: what is actually there? We document existing conditions, develop proposed layouts, and produce the plans, elevations, sections, and details that contractors, plan reviewers, and consultants work from. Every set is organized with consistent sheet numbering, notes, dimensions, and revision tracking.",
    items: [
      "Floor plans",
      "Existing-condition drawings",
      "Proposed plans",
      "Elevations",
      "Building and wall sections",
      "Details",
      "Construction documentation",
      "As-built drawings",
    ],
    typicalProjects: [
      "Renovations that need existing and proposed plans",
      "Buildings with missing or outdated drawings",
      "Change-of-use and space-planning studies",
    ],
    licensedNote:
      "Where a jurisdiction or project type requires drawings prepared or sealed by a licensed architect, we coordinate that review and seal with a licensed architect.",
    icon: "drafting",
    image: {
      src: "/images/placeholders/service-drafting.svg",
      alt: "Illustrative floor plan drawing with existing walls, proposed partitions, door swings and dimension strings",
    },
    projectCategory: "renovation",
  },
  {
    slug: "structural-coordination",
    title: "Structural Design Coordination",
    summary:
      "Framing and structural documentation, coordinated with licensed structural engineers.",
    description:
      "When a project removes walls, adds openings, changes loads, or adds floor area, structural input is usually required. We prepare the framing and layout documentation, engage a licensed structural engineer for analysis and design, and integrate their sizing, connections, and details into the drawing set so the architectural and structural sheets agree.",
    items: [
      "Structural drawing coordination",
      "Framing plans",
      "Structural modifications and load-path changes",
      "Beam and column documentation",
      "Opening and wall-removal documentation",
      "Coordination with licensed structural engineers",
    ],
    typicalProjects: [
      "Removing or relocating load-bearing walls",
      "Additions, mezzanines and new floor openings",
      "Rooftop equipment and added loads",
    ],
    licensedNote:
      "Structural analysis, design, and sealed structural drawings are performed by licensed structural engineers where required.",
    icon: "structural",
    image: {
      src: "/images/placeholders/service-structural.svg",
      alt: "Illustrative structural framing plan with grid lines, beams, columns and a beam schedule",
    },
    projectCategory: "structural",
  },
  {
    slug: "mep-coordination",
    title: "MEP Design Coordination",
    summary:
      "Mechanical, electrical, and plumbing layouts coordinated with the architecture and with each other.",
    description:
      "Mechanical, electrical, and plumbing systems have to fit the building and work around each other. We document MEP layouts, coordinate equipment locations and routing against the architectural and structural drawings, and work with licensed MEP engineers when a system design, calculation, or seal is required.",
    items: [
      "Mechanical and HVAC layouts",
      "Electrical power and lighting documentation",
      "Plumbing layouts and fixture coordination",
      "Reflected ceiling plans",
      "Equipment and fixture schedules",
      "Coordination with licensed MEP engineers where required",
    ],
    typicalProjects: [
      "Tenant improvements with new HVAC zoning or lighting",
      "Restaurant, kitchen and restroom build-outs",
      "Service upgrades and equipment replacements",
    ],
    licensedNote:
      "Mechanical, electrical, and plumbing engineering that requires a licensed engineer is designed or reviewed and sealed by licensed MEP professionals.",
    icon: "mep",
    image: {
      src: "/images/placeholders/service-mep.svg",
      alt: "Illustrative reflected ceiling and mechanical plan with duct runs, diffusers and light fixtures",
    },
    projectCategory: "mep",
  },
  {
    slug: "permit-support",
    title: "Permit & Approval Support",
    summary:
      "Complete permit packages, organized submissions, and prompt responses to plan-review comments.",
    description:
      "Permitting is where many projects lose time. We assemble the drawings and supporting documents the jurisdiction asks for, coordinate the submission, track review status, and prepare written responses and revised sheets when reviewers issue comments, keeping the owner, contractor, and consultants informed along the way.",
    items: [
      "Permit drawing packages",
      "Municipal submission coordination",
      "Plan-review comment responses",
      "Revision coordination",
      "Communication with engineers, architects, and clients",
      "Approval tracking",
    ],
    typicalProjects: [
      "Building permit applications for renovations and additions",
      "Tenant improvement and landlord approvals",
      "Resubmittals after plan-review comments",
    ],
    licensedNote:
      "Review timelines and approval decisions rest with the reviewing authority. We manage the documentation and coordination; we don't guarantee approval or review duration.",
    icon: "permit",
    image: {
      src: "/images/placeholders/service-permit.svg",
      alt: "Illustrative permit set cover sheet with a sheet index, project data table and professional seal area",
    },
    projectCategory: "permit",
  },
  {
    slug: "construction-documentation",
    title: "Construction Documentation",
    summary:
      "Contractor-ready drawing sets with the dimensions, details, and notes a field team needs.",
    description:
      "Permit drawings and construction drawings are not always the same thing. We develop contractor-ready sets with the dimensions, details, schedules, and notes a field team needs to price and build accurately, and we issue clean, clearly marked revisions when conditions change.",
    items: [
      "Detailed drawing sets",
      "Contractor-ready documentation",
      "Existing vs. proposed plans",
      "Door, window and finish schedules",
      "Revision sets",
      "Field and as-built documentation",
    ],
    typicalProjects: [
      "Design-build projects that need a buildable set",
      "Bid packages for multiple contractors",
      "Close-out and record drawings",
    ],
    icon: "documents",
    image: {
      src: "/images/placeholders/service-documents.svg",
      alt: "Illustrative building section with floor levels, slab hatching and level markers",
    },
    projectCategory: "documentation",
  },
  {
    slug: "design-coordination",
    title: "Design & Engineering Coordination",
    summary:
      "One point of contact who keeps the architects, engineers, and reviewers working from the same set.",
    description:
      "Most projects involve several professionals: a licensed architect, a structural engineer, MEP engineers, and sometimes a surveyor or code consultant. We coordinate that team for you. We scope what each discipline needs to provide, share the right information at the right time, integrate their work into one consistent set, and keep you informed about what's done and what's next.",
    items: [
      "Single point of contact for the design team",
      "Consultant scoping and scheduling",
      "Drawing integration across disciplines",
      "Conflict checks between architectural, structural and MEP sheets",
      "Document control and version management",
      "Regular status updates",
    ],
    typicalProjects: [
      "Projects that need more than one discipline",
      "Owners and contractors without an in-house design team",
      "Firms that want one accountable coordinator",
    ],
    icon: "coordination",
    image: {
      src: "/images/placeholders/service-coordination.svg",
      alt: "Illustrative axonometric diagram of a building with coordinated structural and mechanical systems",
    },
  },
];

/** Options used by the inquiry form's "Services needed" checkboxes. */
export const serviceOptions = [
  "Architectural drafting & documentation",
  "Existing-condition / as-built drawings",
  "Structural design coordination",
  "MEP design coordination",
  "Permit & approval support",
  "Construction documentation",
  "Design & engineering coordination",
  "Not sure yet: help me define the scope",
] as const;
