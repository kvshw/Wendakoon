"use client"

import Link from "next/link"
import { useQuery } from "convex/react"
import { Navigation } from "@/components/navigation"
import { listPublishedRef } from "@/lib/blog-api"
import { hasConvexConfigured } from "@/lib/convex-env"

function BlogPageWithConvex() {
  const posts = useQuery(listPublishedRef, { limit: 50 })

  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-hidden bg-background noise-overlay"
    >
      <div className="pointer-events-none fixed inset-0 grid-pattern opacity-20" />
      <div className="pointer-events-none fixed inset-0 bg-linear-to-b from-background via-surface/15 to-background" />
      <Navigation />
      <section className="relative z-10 w-full px-5 sm:px-[8%] lg:px-[10%] pt-28 sm:pt-32 pb-24 sm:pb-28">
        <div className="mx-auto w-full max-w-5xl">
          <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">
            Blog
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight">
            Writing
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Trustworthy AI, engineering, and systems for healthcare.
          </p>

          {posts === undefined ? (
            <div className="mt-12 grid gap-4 sm:gap-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl border border-border/50 bg-card/40 animate-pulse"
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="mt-12 text-muted-foreground">No posts published yet.</p>
          ) : (
            <div className="mt-12 sm:mt-14 space-y-4 sm:space-y-5">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="group rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-5 sm:p-7 transition-all duration-500 hover:border-primary/35 hover:bg-surface/30"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Draft"}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl sm:text-2xl font-serif font-medium text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-primary hover:text-foreground transition-colors"
                  >
                    Read post
                    <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default function BlogPage() {
  if (!hasConvexConfigured()) {
    return (
      <main
        id="main-content"
        className="relative min-h-screen overflow-hidden bg-background noise-overlay"
      >
        <div className="pointer-events-none fixed inset-0 grid-pattern opacity-20" />
        <div className="pointer-events-none fixed inset-0 bg-linear-to-b from-background via-surface/15 to-background" />
        <Navigation />
        <section className="relative z-10 w-full px-5 sm:px-[8%] lg:px-[10%] pt-28 sm:pt-32 pb-24 sm:pb-28">
          <div className="mx-auto w-full max-w-5xl">
            <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">
              Blog
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-foreground leading-tight">
              Writing
            </h1>
            <p className="mt-12 text-muted-foreground max-w-2xl">
              The blog is not connected for this deployment. Add{" "}
              <code className="text-xs bg-muted px-1.5 py-0.5 rounded">NEXT_PUBLIC_CONVEX_URL</code>{" "}
              in your environment to load posts.
            </p>
          </div>
        </section>
      </main>
    )
  }

  return <BlogPageWithConvex />
}
