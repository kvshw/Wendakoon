import type { AuthConfig } from "convex/server"

/** Same value Clerk labels "Frontend API URL" (Convex docs use CLERK_JWT_ISSUER_DOMAIN). */
function clerkIssuerDomain() {
  return process.env.CLERK_JWT_ISSUER_DOMAIN ?? process.env.CLERK_FRONTEND_API_URL
}

export default {
  providers: [
    {
      domain: clerkIssuerDomain()!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig
