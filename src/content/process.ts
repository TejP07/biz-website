/** The five-step client process. */

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  /** What the client does at this step. */
  client: string;
  /** What we do at this step. */
  us: string;
  /** What the client receives. */
  deliverable: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Tell Us About Your Project",
    summary:
      "Share the address, what you want to change or build, and any drawings or photos you already have. A short email or call is enough to start.",
    client: "Send the basics: location, goals, timeline, and any existing documents.",
    us: "Ask the follow-up questions that affect scope, cost, and approvals.",
    deliverable: "A clear, shared understanding of what the project involves.",
  },
  {
    number: "02",
    title: "Review Scope & Existing Documents",
    summary:
      "We review existing drawings, surveys, photos, and prior permits, identify which disciplines and approvals are likely to be needed, and send a written scope and fee proposal.",
    client: "Review the proposal and ask questions before anything is signed.",
    us: "Define deliverables, consultants, assumptions, and the schedule for our work.",
    deliverable: "A written scope of work and fee proposal.",
  },
  {
    number: "03",
    title: "Develop Drawings & Coordinate Design",
    summary:
      "We document existing conditions, develop the proposed drawings, and coordinate structural and MEP input. You review progress sets and we incorporate your comments.",
    client: "Make design decisions and review progress sets.",
    us: "Produce the drawings and manage input from each discipline.",
    deliverable: "Progress drawing sets for your review.",
  },
  {
    number: "04",
    title: "Engineering / Professional Review",
    summary:
      "Where the jurisdiction requires it, licensed architects and engineers design, review, and seal the applicable portions of the work. We integrate their input so the full set is consistent.",
    client: "Confirm final selections and approve the set for submission.",
    us: "Coordinate licensed review and resolve conflicts between disciplines.",
    deliverable: "A coordinated set, reviewed and sealed where required.",
  },
  {
    number: "05",
    title: "Permit Submission & Project Delivery",
    summary:
      "We assemble and coordinate the permit submission, respond to plan-review comments, and deliver final drawings for construction, with as-builts when the project needs them.",
    client: "Sign applications and pay jurisdiction fees as required.",
    us: "Submit, track review, prepare responses and issue revised sheets.",
    deliverable: "Permit-ready and construction-ready documents.",
  },
];

/**
 * Responsibility matrix shown on the Process page. It explains, in plain terms,
 * who is responsible for what on a typical project.
 */
export const responsibilities = [
  {
    party: "You",
    role: "Owner, contractor, or client",
    items: [
      "Project goals, budget, and decisions",
      "Access to the site and existing documents",
      "Permit application signatures and jurisdiction fees",
    ],
  },
  {
    party: "Our team",
    role: "Documentation & coordination",
    items: [
      "Drafting and drawing production",
      "Consultant scoping and coordination",
      "Permit package assembly, submission, and responses",
    ],
  },
  {
    party: "Licensed professionals",
    role: "Architects and engineers",
    items: [
      "Engineering analysis and design where required",
      "Professional review of the applicable work",
      "Stamps and seals required by the jurisdiction",
    ],
  },
  {
    party: "Reviewing authority",
    role: "Building department / AHJ",
    items: [
      "Plan review and comments",
      "Permit approval and issuance",
      "Inspections during construction",
    ],
  },
] as const;

/** Information that helps us scope a project quickly. */
export const startChecklist = [
  "Project address, or city and state",
  "A short description of what you want to do",
  "Existing drawings, surveys, or prior permits, if you have them",
  "Photos of the existing space or building",
  "Your target timeline and any fixed dates",
  "Who else is involved: owner, contractor, architect, or landlord",
];
