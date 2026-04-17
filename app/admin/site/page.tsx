import { AdminSiteDashboard } from "@/components/admin-site-dashboard"

export default function AdminSitePage() {
  return (
    <section className="w-full px-5 sm:px-[6%] xl:px-[8%] py-10 space-y-3">
      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Admin Console</p>
      <h1 className="text-4xl md:text-5xl font-serif text-foreground">Site Content Management</h1>
      <p className="text-base text-muted-foreground max-w-3xl">
        Manage research, projects, journey, experience, outputs, and current focus with a premium visual editor. Content is stored in
        Convex and falls back to built-in defaults when a section is not saved yet.
      </p>
      <AdminSiteDashboard />
    </section>
  )
}
