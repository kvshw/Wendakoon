import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site"

export const alt = siteConfig.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(145deg, #141418 0%, #1a1a22 45%, #12121a 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "rgba(212, 175, 55, 0.15)",
              border: "1px solid rgba(212, 175, 55, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 600,
              color: "#e8c547",
              fontFamily: "Georgia, serif",
            }}
          >
            K
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 42, fontWeight: 600, color: "#f4f4f5", fontFamily: "Georgia, serif" }}>
              Kavishwa Wendakoon
            </span>
            <span style={{ fontSize: 22, color: "rgba(244, 244, 245, 0.65)", marginTop: 6 }}>
              Doctoral Researcher · Software Engineer
            </span>
          </div>
        </div>
        <p
          style={{
            fontSize: 28,
            lineHeight: 1.45,
            color: "rgba(244, 244, 245, 0.88)",
            maxWidth: 920,
            margin: 0,
          }}
        >
          Trustworthy, privacy-preserving AI for pediatric brain health, mHealth, and self-adaptive systems.
        </p>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 72,
            fontSize: 18,
            color: "rgba(244, 244, 245, 0.45)",
          }}
        >
          University of Oulu · M3S
        </div>
      </div>
    ),
    { ...size }
  )
}
