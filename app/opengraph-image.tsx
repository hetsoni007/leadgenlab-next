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
          <svg width="72" height="72" viewBox="0 0 64 64">
            <defs><linearGradient id="g" x1="6" y1="4" x2="60" y2="62" gradientUnits="userSpaceOnUse"><stop stopColor="#4f46e5" /><stop offset="0.55" stopColor="#4338ca" /><stop offset="1" stopColor="#0d9488" /></linearGradient></defs>
            <rect width="64" height="64" rx="16" fill="url(#g)" />
            <path d="M26 13h12M28 13v14L17 47a4 4 0 0 0 3.5 6h23a4 4 0 0 0 3.5-6L36 27V13" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 45.5l6-6.5 4 4 7.5-8.5M37.2 34.6h4.5v4.5" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
