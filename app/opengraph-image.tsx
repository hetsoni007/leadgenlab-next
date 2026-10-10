import { ImageResponse } from "next/og";

export const alt = "LeadGenLab: practical AI workflows for growing teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 72, color: "#14172b",
          background: "linear-gradient(135deg,#e0e7ff 0%,#ccfbf1 55%,#ffe4d3 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(120deg,#4338ca,#0d9488)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>LG</div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>LeadGenLab</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 700, maxWidth: 980 }}>Turn AI releases into working workflows.</div>
          <div style={{ fontSize: 32, color: "#4a5068" }}>Claude and ChatGPT updates, explained. Practical AI workflow audits.</div>
        </div>
      </div>
    ),
    size,
  );
}
