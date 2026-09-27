/**
 * Service areas. Each entry generates a page at /service-areas/[slug] with
 * location-specific metadata and structured data (local SEO).
 *
 * Replace the placeholders with the real regions, cities, or counties you serve,
 * and update each slug to match (e.g. "denver-metro"). Remove entries you don't need.
 */

export type ServiceArea = {
  slug: string;
  name: string;
  region: string;
  summary: string;
  /** Cities, counties, or neighborhoods within this area. */
  localities: string[];
  /** Building departments / jurisdictions you commonly submit to. */
  jurisdictions: string[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "primary-service-area",
    name: "[PRIMARY SERVICE AREA]",
    region: "[STATE / REGION]",
    summary:
      "[Short description of this area: the types of properties and projects you typically see here.]",
    localities: ["[City / County]", "[City / County]", "[City / County]", "[City / County]"],
    jurisdictions: ["[Local Building Department]", "[Local Building Department]"],
  },
  {
    slug: "secondary-service-area",
    name: "[SECONDARY SERVICE AREA]",
    region: "[STATE / REGION]",
    summary:
      "[Short description of this area: the types of properties and projects you typically see here.]",
    localities: ["[City / County]", "[City / County]", "[City / County]"],
    jurisdictions: ["[Local Building Department]"],
  },
  {
    slug: "surrounding-region",
    name: "[SURROUNDING REGION]",
    region: "[STATE / REGION]",
    summary:
      "[Short description of this area: the types of properties and projects you typically see here.]",
    localities: ["[City / County]", "[City / County]", "[City / County]"],
    jurisdictions: ["[Local Building Department]"],
  },
];

export function getServiceArea(slug: string) {
  return serviceAreas.find((a) => a.slug === slug);
}
