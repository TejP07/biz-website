import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: Design documentation & engineering coordination`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social sharing image, generated at build time from site.ts.
 * Fonts: Archivo (SIL Open Font License), bundled in src/assets/fonts.
 */
export default async function OpengraphImage() {
  const fontsDir = join(process.cwd(), "src/assets/fonts");
  const [semibold, regular] = await Promise.all([
    readFile(join(fontsDir, "Archivo-SemiBold.ttf")),
    readFile(join(fontsDir, "Archivo-Regular.ttf")),
  ]);
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
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="44" height="44" viewBox="0 0 30 30">
            <rect x="1" y="1" width="28" height="28" fill="none" stroke="#e9eef4" strokeWidth="2" />
            <path d="M1 29 29 1V29Z" fill="#e9eef4" />
          </svg>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 1 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, fontWeight: 400, letterSpacing: 4, color: "#9cc0e4", textTransform: "uppercase" }}>
            Design documentation &amp; engineering coordination
          </div>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, marginTop: 22 }}>
            From drawings to approval.
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 24, fontWeight: 400, color: "#a9b8c9" }}>
          <span>Architectural drafting</span>
          <span>·</span>
          <span>Structural &amp; MEP coordination</span>
          <span>·</span>
          <span>Permit support</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: semibold, weight: 600, style: "normal" },
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
