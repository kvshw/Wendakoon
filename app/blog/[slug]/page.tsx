import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ConvexHttpClient } from "convex/browser"
import { Navigation } from "@/components/navigation"
import { getBySlugRef } from "@/lib/blog-api"
import { BlogShareActions } from "@/components/blog-share-actions"
import { siteUrl } from "@/lib/site"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

function getConvexClient() {
  if (!convexUrl) {
    return null
  }
  return new ConvexHttpClient(convexUrl)
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const client = getConvexClient()
  const post = client ? await client.query(getBySlugRef, { slug }) : null

  if (!post) {
    return {
      title: "Post not found",
      description: "This blog post could not be found.",
    }
  }

  const postUrl = `${siteUrl.replace(/\/$/, "")}/blog/${post.slug}`
  const description = post.excerpt || post.content.slice(0, 160)

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: postUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const client = getConvexClient()
  const post = client ? await client.query(getBySlugRef, { slug }) : null
  const postUrl = `${siteUrl.replace(/\/$/, "")}/blog/${slug}`

  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-hidden bg-background noise-overlay"
    >
      <div className="pointer-events-none fixed inset-0 grid-pattern opacity-20" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_22%_18%,oklch(0.72_0.12_185/0.12),transparent_52%)]" />
      <Navigation />
      <section className="relative z-10 w-full px-5 sm:px-[8%] lg:px-[10%] pt-28 sm:pt-32 pb-24 sm:pb-28">
        <div className="mx-auto w-full max-w-5xl">
          {!post ? (
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-8 sm:p-10 space-y-4">
              <h1 className="text-3xl font-serif text-foreground">Post not found</h1>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to blog
              </Link>
            </div>
          ) : (
            <article>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                All posts
              </Link>

              <header className="border-b border-border/40 pb-8 sm:pb-10">
                <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Draft"}
                </p>
                <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-medium text-foreground leading-[1.08] tracking-tight">
                  {post.title}
                </h1>
                {post.excerpt ? (
                  <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl">
                    {post.excerpt}
                  </p>
                ) : null}
              </header>

              <div className="mt-10 sm:mt-12 w-full text-base sm:text-lg text-foreground/90 leading-[1.75]">
                {post.content.includes("\n\n") ? (
                  post.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-pretty mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <div className="whitespace-pre-wrap text-pretty">{post.content}</div>
                )}
              </div>

              <BlogShareActions title={post.title} url={postUrl} />

              <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border/40 pt-10">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <span className="text-border">·</span>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  All blog posts
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          )}
        </div>
      </section>
    </main>
  )
}
