import Link from "next/link"

export default function AdminHomePage() {
  return (
    <section className="w-full px-5 sm:px-[6%] xl:px-[8%] py-10">
      <h1 className="text-4xl md:text-5xl font-serif text-foreground">Admin</h1>
      <p className="mt-3 text-base text-muted-foreground max-w-2xl">Choose what you want to manage.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-2xl">
        <Link
          href="/admin/site"
          className="rounded-2xl border border-border/60 bg-card/40 p-6 hover:border-primary/40 transition-colors"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-primary">Homepage</p>
          <p className="mt-2 text-lg font-serif text-foreground">Site content</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Projects, research, journey, CV, publications, current focus.
          </p>
        </Link>
        <Link
          href="/admin/blog"
          className="rounded-2xl border border-border/60 bg-card/40 p-6 hover:border-primary/40 transition-colors"
        >
          <p className="text-xs font-mono uppercase tracking-wider text-primary">Writing</p>
          <p className="mt-2 text-lg font-serif text-foreground">Blog posts</p>
          <p className="mt-2 text-sm text-muted-foreground">Drafts, publish, cover images.</p>
        </Link>
      </div>
    </section>
  )
}
