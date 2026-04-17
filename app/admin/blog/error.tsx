"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function AdminBlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[admin/blog]", error)
  }, [error])

  const message = error.message ?? ""
  const isAuth =
    message.includes("Unauthorized") ||
    message.includes("Forbidden") ||
    message.includes("Not authenticated")

  return (
    <section className="w-full px-5 sm:px-[6%] xl:px-[8%] py-10 max-w-3xl">
      <h1 className="text-2xl font-serif text-foreground">Admin dashboard can’t load</h1>
      <p className="mt-3 text-muted-foreground">
        Convex didn’t accept your session. This is usually a Clerk ↔ Convex configuration issue, not your
        password.
      </p>

      {isAuth ? (
        <ol className="mt-6 list-decimal list-inside space-y-3 text-sm text-foreground/90">
          <li>
            In the{" "}
            <a
              href="https://dashboard.clerk.com/apps/setup/convex"
              className="text-primary underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clerk Dashboard → Convex integration
            </a>{" "}
            select your app, then click <strong>Activate Convex integration</strong>. Clerk and Convex both require
            this step — a manual JWT template alone often still yields{" "}
            <code className="text-xs bg-muted px-1 rounded">404</code> on{" "}
            <code className="text-xs bg-muted px-1 rounded">/tokens/convex</code>.
          </li>
          <li>
            In the{" "}
            <strong>Convex Dashboard</strong> for this deployment, set environment variables:{" "}
            <code className="text-xs bg-muted px-1 rounded">CLERK_JWT_ISSUER_DOMAIN</code> to your Clerk issuer
            (e.g. <code className="text-xs bg-muted px-1 rounded">https://your-app.clerk.accounts.dev</code>
            ), and <code className="text-xs bg-muted px-1 rounded">ADMIN_CLERK_USER_ID</code> to your Clerk{" "}
            <code className="text-xs bg-muted px-1 rounded">user_…</code> id. Redeploy Convex after changing
            auth settings.
          </li>
          <li>
            Use the <strong>same</strong> Clerk application for Vercel keys and for that issuer URL (no mixing
            test vs live instances).
          </li>
        </ol>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">{message}</p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
        >
          Try again
        </button>
        <Link href="/" className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50">
          Home
        </Link>
      </div>
    </section>
  )
}
