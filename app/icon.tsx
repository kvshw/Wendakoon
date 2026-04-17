import { ImageResponse } from "next/og"

export const size = {
  width: 512,
  height: 512,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #141418 0%, #1a1a22 45%, #12121a 100%)",
        }}
      >
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: 84,
            background: "rgba(212, 175, 55, 0.16)",
            border: "3px solid rgba(212, 175, 55, 0.42)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e8c547",
            fontSize: 180,
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
