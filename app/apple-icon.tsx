import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101014",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 36,
            background: "rgba(212, 175, 55, 0.2)",
            border: "2px solid rgba(212, 175, 55, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e8c547",
            fontSize: 88,
            fontWeight: 700,
            fontFamily: "Georgia, serif",
          }}
        >
          K
        </div>
      </div>
    ),
    size
  )
}
