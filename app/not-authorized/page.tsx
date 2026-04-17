import Link from "next/link"

export default function NotAuthorizedPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-5">
      <div className="w-full max-w-xl rounded-2xl border border-border/60 bg-card/40 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Access denied</p>
        <h1 className="mt-3 text-3xl font-serif text-foreground">You are not allowed to open admin dashboard.</h1>
        <p className="mt-3 text-muted-foreground">
          Sign in with the owner Clerk account configured in the backend to manage blog posts.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/sign-in" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
            Sign in again
          </Link>
          <Link href="/" className="px-4 py-2 rounded-lg border border-border/70 text-sm text-foreground">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
