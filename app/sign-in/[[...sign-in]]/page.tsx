import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.72_0.12_185/0.14),transparent_55%)]" />
      <div className="relative z-10">
        <SignIn forceRedirectUrl="/admin/blog" fallbackRedirectUrl="/admin/blog" />
      </div>
    </main>
  )
}
