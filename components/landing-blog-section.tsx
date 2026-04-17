"use client"

import Link from "next/link"
import { useQuery } from "convex/react"
import { ArrowUpRight, CalendarDays } from "lucide-react"
import { listPublishedRef } from "@/lib/blog-api"
import { hasConvexConfigured } from "@/lib/convex-env"
import { FadeIn, TextReveal } from "@/components/animations"

function LandingBlogSectionWithConvex() {
  const posts = useQuery(listPublishedRef, { limit: 3 })

  return (
    <section id="blog" data-gsap-section className="relative py-20 sm:py-32">
      <div className="absolute inset-0 bg-linear-to-b from-background via-surface/20 to-background" />

      <div className="relative z-10 px-5 sm:px-[8%] lg:px-[10%]">
        <FadeIn className="mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">
            Latest Writing
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground mb-3 sm:mb-4 max-w-2xl">
            <TextReveal>Recent Blog Posts</TextReveal>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Notes from research and engineering practice, with a focus on trustworthy AI and real-world systems.
          </p>
        </FadeIn>

        {posts === undefined ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="rounded-xl border border-border/50 bg-card/50 p-5 sm:p-6 animate-pulse">
                <div className="h-3 w-28 bg-surface rounded" />
                <div className="mt-4 h-6 w-5/6 bg-surface rounded" />
                <div className="mt-3 h-4 w-full bg-surface rounded" />
                <div className="mt-2 h-4 w-3/4 bg-surface rounded" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-xl border border-border/50 bg-card/50 p-8 sm:p-10 text-center">
            <p className="text-muted-foreground">No blog posts published yet.</p>
            <Link href="/admin/blog" className="inline-flex mt-4 text-sm text-primary hover:text-primary/80">
              Open admin dashboard
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6" data-gsap-stagger>
            {posts.map((post) => (
              <article
                key={post._id}
                data-gsap-item
                className="group rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 sm:p-6 hover:border-primary/30 transition-all duration-500"
              >
                <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}
                </p>
                <h3 className="mt-3 text-lg sm:text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt || "Read the full post for details and insights."}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 mt-5 text-sm text-primary hover:text-foreground transition-colors"
                >
                  Read post
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-start">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border/60 text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors"
          >
            View all blog posts
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function LandingBlogSection() {
  if (!hasConvexConfigured()) {
    return (
      <section id="blog" data-gsap-section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-linear-to-b from-background via-surface/20 to-background" />
        <div className="relative z-10 px-5 sm:px-[8%] lg:px-[10%]">
          <FadeIn className="mb-10 sm:mb-14">
            <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">
              Latest Writing
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground mb-3 sm:mb-4 max-w-2xl">
              <TextReveal>Recent Blog Posts</TextReveal>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Connect Convex to show posts here. Configure{" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">NEXT_PUBLIC_CONVEX_URL</code>{" "}
              for this deployment.
            </p>
          </FadeIn>
          <div className="mt-8 flex justify-start">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border/60 text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              Blog
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return <LandingBlogSectionWithConvex />
}
