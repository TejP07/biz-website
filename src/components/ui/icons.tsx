import type { SVGProps } from "react";
import type { ServiceIcon as ServiceIconName } from "@/content/services";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 16V4M7 9l5-5 5 5M4 15v5h16v-5" />
    </svg>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6h18v12H3z" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h4l1.5 4.5-2.3 1.4a11 11 0 0 0 5.9 5.9l1.4-2.3L20 15v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5v.5" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 2 20h20z" />
      <path d="M12 10v5M12 17.5v.5" />
    </svg>
  );
}

/**
 * Service pictograms. Drawn on a 40px grid in a drafting style:
 * thin lines, square caps, one accent element.
 */
export function ServiceIcon({
  name,
  size = 40,
  className,
}: {
  name: ServiceIconName;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "square" as const,
    "aria-hidden": true,
    focusable: false,
    className,
  };
  switch (name) {
    case "drafting":
      return (
        <svg {...common}>
          <path d="M5 5h30v30H5z" />
          <path d="M5 18h14v17M19 5v7" />
          <path d="M19 12a6 6 0 0 1 6 6" strokeWidth={1} />
          <path d="M25 18h10" />
          <path d="M9 38.5h22M9 37v3M31 37v3" strokeWidth={1} className="text-accent" stroke="currentColor" />
        </svg>
      );
    case "structural":
      return (
        <svg {...common}>
          <path d="M4 10h32M4 13h32" />
          <path d="M8 13v23M32 13v23M20 13v23" strokeWidth={1} strokeDasharray="3 2" />
          <path d="M5 36h6M29 36h6M17 36h6" />
          <path d="M4 7h32" strokeWidth={2.2} className="text-accent" stroke="currentColor" />
        </svg>
      );
    case "mep":
      return (
        <svg {...common}>
          <path d="M4 14h22v12H4" />
          <path d="M26 20h10" />
          <path d="M31 14v12" strokeWidth={1} />
          <circle cx="12" cy="20" r="3" strokeWidth={1} />
          <path d="M18 34l3-5h-4l3-5" className="text-accent" stroke="currentColor" />
          <path d="M4 6h32" strokeWidth={1} strokeDasharray="3 2" />
        </svg>
      );
    case "permit":
      return (
        <svg {...common}>
          <path d="M8 4h18l6 6v26H8z" />
          <path d="M26 4v6h6M13 14h12M13 19h12M13 24h6" strokeWidth={1} />
          <circle cx="26" cy="29" r="5" className="text-accent" stroke="currentColor" />
          <path d="m23.8 29 1.6 1.6 3-3.2" strokeWidth={1.2} className="text-accent" stroke="currentColor" />
        </svg>
      );
    case "documents":
      return (
        <svg {...common}>
          <path d="M12 10h22v24H12z" />
          <path d="M9 7h22M6 4h22" strokeWidth={1} />
          <path d="M9 7v24M6 4v24" strokeWidth={1} />
          <path d="M26 28h6v4h-6z" className="text-accent" stroke="currentColor" />
          <path d="M16 16h10M16 21h14" strokeWidth={1} />
        </svg>
      );
    case "coordination":
      return (
        <svg {...common}>
          <path d="M16 16h8v8h-8z" className="text-accent" stroke="currentColor" />
          <circle cx="7" cy="7" r="3" />
          <circle cx="33" cy="7" r="3" />
          <circle cx="7" cy="33" r="3" />
          <circle cx="33" cy="33" r="3" />
          <path d="m9.5 9.5 6.5 6.5M30.5 9.5 24 16M9.5 30.5l6.5-6.5M30.5 30.5 24 24" strokeWidth={1} />
        </svg>
      );
  }
}
