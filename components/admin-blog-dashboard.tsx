"use client"

import { FormEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "convex/react"
import type { GenericId as Id } from "convex/values"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  createSlug,
  listAllAdminRef,
  removePostRef,
  setPublishedRef,
  type BlogPost,
  upsertPostRef,
} from "@/lib/blog-api"
import { ConvexImageUpload } from "@/components/convex-image-upload"

type PostFormState = {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImageUrl: string
  published: boolean
}

const initialFormState: PostFormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  published: false,
}

export function AdminBlogDashboard() {
  const posts = useQuery(listAllAdminRef, {})
  const upsertPost = useMutation(upsertPostRef)
  const removePost = useMutation(removePostRef)
  const setPublished = useMutation(setPublishedRef)

  const [form, setForm] = useState<PostFormState>(initialFormState)
  const [slugTouched, setSlugTouched] = useState(false)
  const [editingPostId, setEditingPostId] = useState<Id<"posts"> | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all")

  const isEditing = useMemo(() => editingPostId !== null, [editingPostId])
  const safePosts = posts ?? []
  const totalPosts = safePosts.length
  const publishedPosts = safePosts.filter((post) => post.published).length
  const draftPosts = totalPosts - publishedPosts

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return safePosts.filter((post) => {
      const statusMatches =
        statusFilter === "all" ||
        (statusFilter === "published" && post.published) ||
        (statusFilter === "draft" && !post.published)

      if (!statusMatches) return false
      if (!query) return true

      return (
        post.title.toLowerCase().includes(query) ||
        post.slug.toLowerCase().includes(query) ||
        (post.excerpt ?? "").toLowerCase().includes(query)
      )
    })
  }, [safePosts, search, statusFilter])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setNotice(null)

    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content are required.")
      return
    }

    const normalizedSlug = createSlug(form.slug || form.title)
    if (!normalizedSlug) {
      setError("Slug cannot be empty.")
      return
    }

    setSubmitting(true)
    try {
      await upsertPost({
        postId: editingPostId ?? undefined,
        title: form.title,
        slug: normalizedSlug,
        excerpt: form.excerpt || undefined,
        content: form.content,
        coverImageUrl: form.coverImageUrl || undefined,
        published: form.published,
      })
      setNotice(isEditing ? "Post updated successfully." : "Post created successfully.")
      resetForm()
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save post.")
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setEditingPostId(null)
    setForm(initialFormState)
    setSlugTouched(false)
  }

  const startEdit = (post: BlogPost) => {
    setEditingPostId(post._id)
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content,
      coverImageUrl: post.coverImageUrl ?? "",
      published: post.published,
    })
    setSlugTouched(true)
  }

  const handleDelete = async (postId: Id<"posts">) => {
    const confirmed = window.confirm("Delete this post permanently?")
    if (!confirmed) {
      return
    }
    setError(null)
    setNotice(null)
    try {
      await removePost({ postId })
      setNotice("Post deleted.")
      if (editingPostId === postId) {
        resetForm()
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete post.")
    }
  }

  const handlePublishToggle = async (post: BlogPost) => {
    setError(null)
    setNotice(null)
    try {
      await setPublished({ postId: post._id, published: !post.published })
      setNotice(post.published ? "Post moved to drafts." : "Post published.")
    } catch (publishError) {
      setError(publishError instanceof Error ? publishError.message : "Failed to update publish status.")
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">All posts</p>
          <p className="mt-2 text-3xl font-serif text-foreground">{totalPosts}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Published</p>
          <p className="mt-2 text-3xl font-serif text-foreground">{publishedPosts}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Drafts</p>
          <p className="mt-2 text-3xl font-serif text-foreground">{draftPosts}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-serif text-foreground">
                {isEditing ? "Edit Post" : "Create New Post"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Write, edit, publish, and maintain your blog from one place.
              </p>
            </div>
            {isEditing ? (
              <Button type="button" variant="outline" onClick={resetForm}>
                New post
              </Button>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="blog-title" className="text-sm text-foreground/90">
              Title
            </label>
            <Input
              id="blog-title"
              value={form.title}
              onChange={(event) => {
                const title = event.target.value
                setForm((prev) => ({
                  ...prev,
                  title,
                  slug: slugTouched ? prev.slug : createSlug(title),
                }))
              }}
              placeholder="Post title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="blog-slug" className="text-sm text-foreground/90">
              Slug
            </label>
            <Input
              id="blog-slug"
              value={form.slug}
              onChange={(event) => {
                setSlugTouched(true)
                setForm((prev) => ({ ...prev, slug: createSlug(event.target.value) }))
              }}
              placeholder="post-slug"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="blog-excerpt" className="text-sm text-foreground/90">
              Excerpt
            </label>
            <Textarea
              id="blog-excerpt"
              value={form.excerpt}
              onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
              placeholder="Short preview for blog listing"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="blog-cover-image" className="text-sm text-foreground/90">
              Cover image (URL or upload)
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                id="blog-cover-image"
                value={form.coverImageUrl}
                onChange={(event) => setForm((prev) => ({ ...prev, coverImageUrl: event.target.value }))}
                placeholder="https://… or upload"
                className="sm:flex-1"
              />
              <ConvexImageUpload
                label="Upload cover"
                onUploadedUrl={(url) => setForm((prev) => ({ ...prev, coverImageUrl: url }))}
                disabled={submitting}
              />
            </div>
            {form.coverImageUrl ? (
              <div className="mt-2 overflow-hidden rounded-lg border border-border/60 max-w-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.coverImageUrl} alt="" className="max-h-40 w-full object-cover" />
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="blog-content" className="text-sm text-foreground/90">
              Content
            </label>
            <Textarea
              id="blog-content"
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              placeholder="Write your post content here..."
              className="min-h-64"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-foreground/90">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(event) => setForm((prev) => ({ ...prev, published: event.target.checked }))}
            />
            Publish immediately
          </label>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {notice ? <p className="text-sm text-emerald-400">{notice}</p> : null}

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : isEditing ? "Update post" : "Create post"}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </form>

        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6">
          <h2 className="text-xl font-serif text-foreground">Live preview</h2>
          <p className="mt-1 text-sm text-muted-foreground">How this post card appears in your public blog.</p>

          <article className="mt-5 rounded-xl border border-border/60 p-5 bg-background/50">
            <p className="text-xs text-muted-foreground">
              {form.published ? "Will publish immediately" : "Will be saved as draft"}
            </p>
            <h3 className="mt-2 text-2xl font-serif text-foreground">{form.title || "Untitled post"}</h3>
            <p className="mt-3 text-muted-foreground">{form.excerpt || "Post excerpt preview appears here."}</p>
            <p className="mt-4 text-xs text-muted-foreground">/{form.slug || "post-slug"}</p>
          </article>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-serif text-foreground">Current posts</h2>
          <div className="flex flex-wrap gap-2">
            <Input
              placeholder="Search title or slug..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-56"
            />
            <Button
              type="button"
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button
              type="button"
              variant={statusFilter === "published" ? "default" : "outline"}
              onClick={() => setStatusFilter("published")}
            >
              Published
            </Button>
            <Button
              type="button"
              variant={statusFilter === "draft" ? "default" : "outline"}
              onClick={() => setStatusFilter("draft")}
            >
              Drafts
            </Button>
          </div>
        </div>

        {posts === undefined ? (
          <p className="mt-4 text-sm text-muted-foreground">Loading posts...</p>
        ) : filteredPosts.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No posts match your current filter.</p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post._id} className="rounded-xl border border-border/60 p-4 bg-background/50">
                <p className="font-medium text-foreground">{post.title}</p>
                <p className="text-xs text-muted-foreground mt-1">/{post.slug}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {post.published ? "Published" : "Draft"} • Updated{" "}
                  {new Date(post.updatedAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline" type="button" onClick={() => startEdit(post)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" type="button" onClick={() => handlePublishToggle(post)}>
                    {post.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button size="sm" variant="destructive" type="button" onClick={() => handleDelete(post._id)}>
                    Delete
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
