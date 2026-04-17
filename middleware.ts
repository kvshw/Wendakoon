import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtectedRoute = createRouteMatcher(["/admin(.*)"])
const isPublicAdminPwaAsset = createRouteMatcher(["/admin/manifest"])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicAdminPwaAsset(req)) {
    return
  }
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico)).*)",
    "/(api|trpc)(.*)",
  ],
}
