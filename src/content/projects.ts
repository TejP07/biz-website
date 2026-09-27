/**
 * Portfolio projects.
 *
 * IMPORTANT: The entries below are SAMPLE SCOPES that illustrate the kinds of
 * projects the company handles. They are not completed client projects, and
 * `isSample: true` makes the site label them that way. Replace them with real
 * projects (and set `isSample: false`) as work is completed and approved for
 * publication by the client.
 *
 * To add a project:
 *   1. Add images to /public/images/projects/<slug>/ (JPG or WebP recommended).
 *   2. Copy an entry below, update its fields, and point `cover` and `gallery`
 *      at the new images. The project page is generated automatically.
 */

export type ProjectCategory = {
  slug: string;
  label: string;
};

export const projectCategories: ProjectCategory[] = [
  { slug: "residential", label: "Residential" },
  { slug: "commercial", label: "Commercial" },
  { slug: "renovation", label: "Renovation" },
  { slug: "tenant-improvement", label: "Tenant Improvement" },
  { slug: "structural", label: "Structural" },
  { slug: "mep", label: "MEP" },
  { slug: "permit", label: "Permit / Documentation" },
];

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  /** Label shown above the card title. */
  projectType: string;
  /** Category slugs from `projectCategories`. */
  categories: string[];
  /** Short description for cards (one or two sentences). */
  summary: string;
  /** Longer description for the project page. */
  description: string[];
  /** Scope items for the project page. */
  scope: string[];
  /** Services provided (shown on cards and the project page). */
  services: string[];
  /** Disciplines coordinated on the project. */
  disciplines: string[];
  clientType: string;
  location: string;
  size: string;
  /** Marks the project as an illustrative sample rather than completed work. */
  isSample: boolean;
  cover: ProjectImage;
  gallery: ProjectImage[];
};

const img = (
  src: string,
  alt: string,
  caption?: string,
): ProjectImage => ({ src, alt, caption, width: 1600, height: 1000 });

const P = "/images/placeholders";

export const projects: Project[] = [
  {
    slug: "residential-kitchen-wall-removal",
    title: "Kitchen Opening & Bearing Wall Removal",
    projectType: "Residential Renovation",
    categories: ["residential", "renovation", "structural"],
    summary:
      "Opening a kitchen to the adjacent living space by removing a load-bearing wall and adding a new beam.",
    description: [
      "A typical residential scope: the owner wants to combine a closed kitchen with the living room. The wall between them carries floor framing above, so the change requires structural input and a permit.",
      "We document the existing conditions, develop the proposed layout, and coordinate with a licensed structural engineer on the new beam, posts, and load path. The engineer's design is incorporated into a permit set with framing plans and details.",
    ],
    scope: [
      "Existing-condition measurement and drawings",
      "Proposed floor plan and interior elevations",
      "Beam, post and foundation documentation",
      "Permit package and plan-review responses",
    ],
    services: ["Existing-condition drawings", "Proposed plans", "Structural coordination", "Permit package"],
    disciplines: ["Architectural", "Structural"],
    clientType: "Property owner",
    location: "[CITY, STATE]",
    size: "[SQ FT]",
    isSample: true,
    cover: img(`${P}/project-kitchen-cover.svg`, "Illustrative floor plan showing a removed wall and a new beam between kitchen and living room", "Proposed floor plan (illustrative placeholder)"),
    gallery: [
      img(`${P}/project-kitchen-1.svg`, "Illustrative framing plan showing a new beam and posts", "Framing plan (illustrative placeholder)"),
      img(`${P}/project-kitchen-2.svg`, "Illustrative building section through the new beam", "Building section (illustrative placeholder)"),
    ],
  },
  {
    slug: "second-story-addition",
    title: "Second-Story Addition",
    projectType: "Residential Addition",
    categories: ["residential", "structural", "permit"],
    summary:
      "Adding a second floor to a single-story home, with coordinated structural and permit documentation.",
    description: [
      "Vertical additions touch nearly every part of a house: foundations, framing, stairs, egress, and energy code. The drawing set has to answer each of those questions clearly for the reviewer.",
      "This sample scope covers existing-condition documentation, proposed plans and elevations, coordination with a licensed structural engineer for the new floor and roof framing, and the complete permit submission.",
    ],
    scope: [
      "Existing plans and elevations",
      "Proposed second-floor plan, elevations and sections",
      "Structural framing coordination",
      "Permit submission and revision tracking",
    ],
    services: ["Architectural drafting", "Structural coordination", "Permit support"],
    disciplines: ["Architectural", "Structural"],
    clientType: "Property owner",
    location: "[CITY, STATE]",
    size: "[SQ FT]",
    isSample: true,
    cover: img(`${P}/project-addition-cover.svg`, "Illustrative exterior elevation of a house with a proposed second-story addition", "Proposed elevation (illustrative placeholder)"),
    gallery: [
      img(`${P}/project-addition-1.svg`, "Illustrative axonometric diagram of a house with a second-story addition", "Massing diagram (illustrative placeholder)"),
      img(`${P}/project-addition-2.svg`, "Illustrative second-floor framing plan", "Floor framing plan (illustrative placeholder)"),
    ],
  },
  {
    slug: "office-tenant-improvement",
    title: "Office Tenant Improvement",
    projectType: "Tenant Improvement",
    categories: ["commercial", "tenant-improvement", "mep"],
    summary:
      "Reconfiguring a leased office suite with new offices, a conference room, and updated lighting and HVAC zoning.",
    description: [
      "A common commercial scope: a tenant takes a suite and needs a new layout. The landlord, the contractor, and the building department each need drawings, and the HVAC and lighting have to follow the new walls.",
      "This sample includes the partition layout, reflected ceiling plan, coordination with licensed MEP engineers, a landlord review package, and the permit set.",
    ],
    scope: [
      "Base-building review and existing conditions",
      "Partition, door and finish plans",
      "Reflected ceiling and lighting layout",
      "MEP coordination and permit package",
    ],
    services: ["Tenant improvement plans", "MEP coordination", "Permit package"],
    disciplines: ["Architectural", "Mechanical", "Electrical"],
    clientType: "Business / tenant",
    location: "[CITY, STATE]",
    size: "[SQ FT]",
    isSample: true,
    cover: img(`${P}/project-office-cover.svg`, "Illustrative office floor plan with private offices, a conference room and open workspace", "Partition plan (illustrative placeholder)"),
    gallery: [
      img(`${P}/project-office-1.svg`, "Illustrative reflected ceiling plan with light fixtures and air diffusers", "Reflected ceiling plan (illustrative placeholder)"),
      img(`${P}/project-office-2.svg`, "Illustrative permit set cover sheet with sheet index", "Cover sheet (illustrative placeholder)"),
    ],
  },
  {
    slug: "restaurant-build-out",
    title: "Restaurant Build-Out",
    projectType: "Tenant Improvement",
    categories: ["commercial", "tenant-improvement", "mep"],
    summary:
      "Converting a vacant retail space into a restaurant with a commercial kitchen, dining room, and accessible restrooms.",
    description: [
      "Restaurants are among the most coordination-heavy tenant improvements: kitchen equipment, exhaust hoods, grease interceptors, gas, and accessible restrooms all need to be reflected in the drawings.",
      "This sample scope covers the floor plan and equipment layout, coordination with licensed mechanical and plumbing engineers, and the permit submission.",
    ],
    scope: [
      "Dining, kitchen and restroom layouts",
      "Equipment plan and schedules",
      "Mechanical and plumbing coordination",
      "Permit set and review responses",
    ],
    services: ["Floor plans", "MEP coordination", "Permit support"],
    disciplines: ["Architectural", "Mechanical", "Plumbing", "Electrical"],
    clientType: "Business / tenant",
    location: "[CITY, STATE]",
    size: "[SQ FT]",
    isSample: true,
    cover: img(`${P}/project-restaurant-cover.svg`, "Illustrative restaurant floor plan with dining room, kitchen and restrooms", "Floor plan (illustrative placeholder)"),
    gallery: [
      img(`${P}/project-restaurant-1.svg`, "Illustrative mechanical plan with kitchen exhaust and supply ducts", "Mechanical plan (illustrative placeholder)"),
      img(`${P}/project-restaurant-2.svg`, "Illustrative building section through the kitchen", "Building section (illustrative placeholder)"),
    ],
  },
  {
    slug: "retail-storefront-renovation",
    title: "Retail Storefront Renovation",
    projectType: "Commercial Renovation",
    categories: ["commercial", "renovation", "permit"],
    summary:
      "Replacing an outdated storefront and reworking the sales floor for a retail tenant.",
    description: [
      "Storefront work combines exterior changes, which often need landlord and sometimes design-review approval, with an interior layout the contractor can build from.",
      "This sample includes existing and proposed elevations, the sales-floor plan, and permit documentation.",
    ],
    scope: [
      "Existing and proposed storefront elevations",
      "Sales floor and fixture plan",
      "Landlord submission package",
      "Permit drawings",
    ],
    services: ["Elevations", "Floor plans", "Permit package"],
    disciplines: ["Architectural"],
    clientType: "Business / tenant",
    location: "[CITY, STATE]",
    size: "[SQ FT]",
    isSample: true,
    cover: img(`${P}/project-retail-cover.svg`, "Illustrative storefront elevation with glazing, entry doors and signage band", "Storefront elevation (illustrative placeholder)"),
    gallery: [
      img(`${P}/project-retail-1.svg`, "Illustrative retail floor plan with fixtures and a cash wrap", "Floor plan (illustrative placeholder)"),
      img(`${P}/project-retail-2.svg`, "Illustrative permit set cover sheet", "Cover sheet (illustrative placeholder)"),
    ],
  },
  {
    slug: "mixed-use-as-built",
    title: "Mixed-Use Building As-Built Survey",
    projectType: "As-Built Documentation",
    categories: ["commercial", "permit"],
    summary:
      "Measured drawings of an existing mixed-use building ahead of acquisition and future renovation.",
    description: [
      "Many older buildings have no reliable drawings. Before a buyer or owner can plan improvements, they need an accurate record of what's there.",
      "This sample scope covers field measurement, as-built floor plans for each level, exterior elevations, and a building section, all delivered as an organized base set for future design work.",
    ],
    scope: [
      "Field measurement of each floor",
      "As-built floor plans and roof plan",
      "Exterior elevations and building section",
      "Organized base drawings for future work",
    ],
    services: ["As-built drawings", "Existing-condition documentation"],
    disciplines: ["Architectural"],
    clientType: "Developer",
    location: "[CITY, STATE]",
    size: "[SQ FT]",
    isSample: true,
    cover: img(`${P}/project-asbuilt-cover.svg`, "Illustrative as-built floor plan with field dimensions and measurement notes", "As-built plan (illustrative placeholder)"),
    gallery: [
      img(`${P}/project-asbuilt-1.svg`, "Illustrative exterior elevation of a three-story mixed-use building", "Exterior elevation (illustrative placeholder)"),
      img(`${P}/project-asbuilt-2.svg`, "Illustrative building section of a three-story building", "Building section (illustrative placeholder)"),
    ],
  },
  {
    slug: "multifamily-unit-renovations",
    title: "Multifamily Unit Renovation Program",
    projectType: "Residential Renovation",
    categories: ["residential", "renovation", "permit"],
    summary:
      "Standardized unit renovation drawings for a developer upgrading apartments across several buildings.",
    description: [
      "Developers renovating many similar units benefit from a repeatable drawing standard: typical unit plans, consistent details, and a predictable permit process.",
      "This sample scope includes typical unit plans, kitchen and bath layouts, a standard detail sheet, and permit packages organized by building.",
    ],
    scope: [
      "Typical unit existing and proposed plans",
      "Kitchen and bath layouts",
      "Standard detail sheets",
      "Permit packages by building",
    ],
    services: ["Proposed plans", "Construction documentation", "Permit support"],
    disciplines: ["Architectural", "Plumbing", "Electrical"],
    clientType: "Developer",
    location: "[CITY, STATE]",
    size: "[UNITS / SQ FT]",
    isSample: true,
    cover: img(`${P}/project-multifamily-cover.svg`, "Illustrative typical apartment unit floor plans", "Typical unit plans (illustrative placeholder)"),
    gallery: [
      img(`${P}/project-multifamily-1.svg`, "Illustrative apartment unit plan with kitchen and bath layout", "Unit plan (illustrative placeholder)"),
      img(`${P}/project-multifamily-2.svg`, "Illustrative permit set cover sheet for a multifamily project", "Cover sheet (illustrative placeholder)"),
    ],
  },
  {
    slug: "warehouse-mezzanine",
    title: "Warehouse Mezzanine Addition",
    projectType: "Structural Modification",
    categories: ["commercial", "structural"],
    summary:
      "Adding a steel mezzanine for storage and offices inside an existing warehouse.",
    description: [
      "A mezzanine adds usable area without expanding the building, but it introduces new structure, stairs, guards, and egress requirements.",
      "This sample scope includes the mezzanine layout, coordination with a licensed structural engineer for framing and foundations, and permit documentation.",
    ],
    scope: [
      "Existing warehouse plan",
      "Mezzanine layout, stair and guard documentation",
      "Structural framing and footing coordination",
      "Permit submission",
    ],
    services: ["Floor plans", "Structural coordination", "Permit package"],
    disciplines: ["Architectural", "Structural"],
    clientType: "Contractor",
    location: "[CITY, STATE]",
    size: "[SQ FT]",
    isSample: true,
    cover: img(`${P}/project-mezzanine-cover.svg`, "Illustrative axonometric diagram of a steel mezzanine inside a warehouse", "Mezzanine diagram (illustrative placeholder)"),
    gallery: [
      img(`${P}/project-mezzanine-1.svg`, "Illustrative mezzanine framing plan with beams and columns", "Framing plan (illustrative placeholder)"),
      img(`${P}/project-mezzanine-2.svg`, "Illustrative warehouse floor plan with mezzanine outline", "Floor plan (illustrative placeholder)"),
    ],
  },
  {
    slug: "medical-office-mep-upgrade",
    title: "Medical Office MEP Upgrade",
    projectType: "MEP Coordination",
    categories: ["commercial", "mep"],
    summary:
      "Replacing HVAC equipment and upgrading power and lighting in an occupied medical office.",
    description: [
      "System upgrades in occupied buildings need careful documentation. The new equipment, circuits, and ductwork have to fit existing conditions and be phased around ongoing operations.",
      "This sample scope covers existing-condition documentation, coordination with licensed mechanical and electrical engineers, and the permit set.",
    ],
    scope: [
      "Existing MEP condition survey",
      "Mechanical and electrical layout coordination",
      "Reflected ceiling and lighting plans",
      "Permit documentation",
    ],
    services: ["MEP coordination", "Existing-condition drawings", "Permit support"],
    disciplines: ["Mechanical", "Electrical"],
    clientType: "Property owner",
    location: "[CITY, STATE]",
    size: "[SQ FT]",
    isSample: true,
    cover: img(`${P}/project-medical-cover.svg`, "Illustrative mechanical plan with supply and return duct runs", "Mechanical plan (illustrative placeholder)"),
    gallery: [
      img(`${P}/project-medical-1.svg`, "Illustrative reflected ceiling plan with lighting layout", "Reflected ceiling plan (illustrative placeholder)"),
      img(`${P}/project-medical-2.svg`, "Illustrative medical office floor plan with exam rooms", "Floor plan (illustrative placeholder)"),
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getCategoryLabel(slug: string) {
  return projectCategories.find((c) => c.slug === slug)?.label ?? slug;
}

/** Projects shown in the "Featured" section of the home page. */
export const featuredProjects = [
  "office-tenant-improvement",
  "residential-kitchen-wall-removal",
  "mixed-use-as-built",
]
  .map((slug) => getProject(slug))
  .filter((p): p is Project => Boolean(p));
