import { AdminBlogDashboard } from "@/components/admin-blog-dashboard"

export default function AdminBlogPage() {
  return (
    <section className="w-full px-5 sm:px-[6%] xl:px-[8%] py-10">
      <h1 className="text-4xl md:text-5xl font-serif text-foreground">Manage Blog Posts</h1>
      <p className="mt-3 text-base text-muted-foreground max-w-3xl">
        Create drafts, publish posts, and edit existing writing.
      </p>
      <AdminBlogDashboard />
    </section>
  )
}
