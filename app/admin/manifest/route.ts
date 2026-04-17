import { NextResponse } from "next/server"

const manifest = {
  name: "Wendakoon Admin",
  short_name: "Wendakoon Admin",
  description: "Manage site content and blog posts (owner only).",
  start_url: "/admin",
  scope: "/admin",
  display: "standalone" as const,
  orientation: "portrait" as const,
  background_color: "#101014",
  theme_color: "#1a1a1f",
  icons: [
    {
      src: "/icon",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
    {
      src: "/apple-icon",
      sizes: "180x180",
      type: "image/png",
    },
  ],
  shortcuts: [
    {
      name: "Admin dashboard",
      short_name: "Dashboard",
      url: "/admin",
    },
    {
      name: "Site content",
      short_name: "Site",
      url: "/admin/site",
    },
    {
      name: "Blog posts",
      short_name: "Blog",
      url: "/admin/blog",
    },
  ],
}

export function GET() {
  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  })
}
