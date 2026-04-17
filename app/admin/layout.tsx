import type { Metadata } from "next"
import type { ReactNode } from "react"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { requireAdminUser } from "@/lib/admin-auth"
import { PwaRegister } from "@/components/pwa-register"
import { AdminInstallPwa } from "@/components/admin-install-pwa"

export const metadata: Metadata = {
  manifest: "/admin/manifest",
  appleWebApp: {
    capable: true,
    title: "Wendakoon Admin",
    statusBarStyle: "black-translucent",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdminUser()

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 grid-pattern opacity-20" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_15%,oklch(0.72_0.12_185/0.15),transparent_48%)]" />

      <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/70">
        <div className="w-full px-5 sm:px-[6%] xl:px-[8%] py-4 flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to site
            </Link>
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Admin home
            </Link>
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/admin/site"
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-card/60"
              >
                Site content
              </Link>
              <span className="text-border" aria-hidden>
                |
              </span>
              <Link
                href="/admin/blog"
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-card/60"
              >
                Blog
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <AdminInstallPwa />
            <UserButton />
          </div>
        </div>
      </header>
      <PwaRegister />
      <div className="relative z-10">{children}</div>
    </main>
  )
}
