/**
 * Leadership and team members shown on the About page.
 *
 * To add a photo, place it in /public/images/team/ and set `photo`, e.g.
 * { src: "/images/team/jane-doe.jpg", alt: "Portrait of Jane Doe" }.
 * Leave `photo` as null to show the placeholder frame.
 */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  credentials: string;
  photo: { src: string; alt: string } | null;
};

export const team: TeamMember[] = [
  {
    name: "[Founder Name]",
    role: "[Title, e.g. Founder & Principal]",
    bio: "[Short professional bio: background, areas of focus, and the types of projects this person leads.]",
    credentials: "[Credentials / Licenses]",
    photo: null,
  },
  {
    name: "[Team Member Name]",
    role: "[Title, e.g. Project Manager]",
    bio: "[Short professional bio: background, areas of focus, and the types of projects this person leads.]",
    credentials: "[Credentials / Licenses]",
    photo: null,
  },
  {
    name: "[Team Member Name]",
    role: "[Title, e.g. Senior Drafter / Designer]",
    bio: "[Short professional bio: background, areas of focus, and the types of projects this person leads.]",
    credentials: "[Credentials / Licenses]",
    photo: null,
  },
];
