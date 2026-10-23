import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site-config"

export const alt = "GP Seguros en Refrigeración"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#a78bfa", fontSize: 30, marginBottom: 24 }}>Refrigeración industrial</div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.12 }}>{siteConfig.companyName}</div>
        <div style={{ fontSize: 30, marginTop: 32, color: "#e5e7eb" }}>Mantenimiento y reparación de equipos</div>
      </div>
    ),
    { ...size },
  )
}
