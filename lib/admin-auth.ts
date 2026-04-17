import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function requireAdminUser() {
  const { userId, redirectToSignIn } = await auth()

  if (!userId) {
    redirectToSignIn({ returnBackUrl: "/admin/blog" })
  }

  const adminUserId = process.env.ADMIN_CLERK_USER_ID
  if (!adminUserId) {
    throw new Error("ADMIN_CLERK_USER_ID is not configured.")
  }

  if (userId !== adminUserId) {
    redirect("/not-authorized")
  }

  return userId
}
