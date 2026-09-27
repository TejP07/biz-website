import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: Design documentation & engineering coordination`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social sharing image, generated at build time from site.ts. */
export default function OpengraphImage() {
  const grid = "rgba(233,238,244,0.06)";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0e1a2b",
          backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          color: "#e9eef4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 44, height: 44, border: "3px solid #e9eef4", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 0,
                height: 0,
                borderLeft: "38px solid transparent",
                borderBottom: "38px solid #e9eef4",
              }}
            />
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#9cc0e4", textTransform: "uppercase" }}>
            Design documentation &amp; engineering coordination
          </div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, marginTop: 20 }}>
            From drawings to approval.
          </div>
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 24, color: "#a9b8c9" }}>
          <span>Architectural drafting</span>
          <span>·</span>
          <span>Structural &amp; MEP coordination</span>
          <span>·</span>
          <span>Permit support</span>
        </div>
      </div>
    ),
    size,
  );
}
