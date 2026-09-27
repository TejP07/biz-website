/**
 * Options and settings for the project inquiry form (/contact).
 * Project types come from project-types.ts and services from services.ts.
 */

export const projectSizeOptions = [
  "Under 1,000 sq ft",
  "1,000 – 2,500 sq ft",
  "2,500 – 5,000 sq ft",
  "5,000 – 10,000 sq ft",
  "10,000 – 25,000 sq ft",
  "Over 25,000 sq ft",
  "Not sure",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "6+ months",
  "Flexible / not sure yet",
] as const;

export const documentQuestions = [
  { name: "existingDrawings", label: "Existing drawings of the building or space?" },
  { name: "architecturalPlans", label: "Architectural plans?" },
  { name: "structuralPlans", label: "Structural plans?" },
  { name: "mepPlans", label: "MEP plans?" },
] as const;

export const documentAnswers = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
] as const;

/**
 * Upload limits. Note: many hosting platforms cap request bodies for serverless
 * functions (Vercel: 4.5 MB). For large drawing sets, connect direct-to-storage
 * uploads (see README) or ask clients to send a download link in the notes.
 */
export const uploadLimits = {
  maxFiles: 10,
  maxFileSizeMB: 10,
  maxTotalSizeMB: 25,
  acceptedExtensions: [".pdf", ".dwg", ".dxf", ".jpg", ".jpeg", ".png", ".heic", ".tif", ".tiff", ".zip"],
};
