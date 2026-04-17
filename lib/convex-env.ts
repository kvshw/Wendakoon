/** True when Convex client URL is available (inlined for client; set in Vercel env for prod). */
export function hasConvexConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL
  return typeof url === "string" && url.length > 0
}
