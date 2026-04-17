import { mutationGeneric, queryGeneric } from "convex/server"
import { v } from "convex/values"

async function assertAdmin(ctx: { auth: { getUserIdentity: () => Promise<{ subject: string } | null> } }) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) {
    throw new Error("Unauthorized")
  }

  const adminUserId = process.env.ADMIN_CLERK_USER_ID
  if (!adminUserId) {
    throw new Error("ADMIN_CLERK_USER_ID is not configured")
  }

  if (identity.subject !== adminUserId) {
    throw new Error("Forbidden")
  }

  return identity
}

function normalizeSlug(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

async function ensureUniqueSlug(ctx: { db: any }, slug: string, skipId?: string) {
  const existing = await ctx.db
    .query("posts")
    .withIndex("by_slug", (q: any) => q.eq("slug", slug))
    .collect()

  return !existing.some((post: { _id: string }) => post._id !== skipId)
}

export const listPublished = queryGeneric({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 20, 1), 100)

    return await ctx.db
      .query("posts")
      .withIndex("by_published_and_date", (q) => q.eq("published", true))
      .order("desc")
      .take(limit)
  },
})

export const getBySlug = queryGeneric({
  args: {
    slug: v.string(),
    includeDraft: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first()

    if (!post) {
      return null
    }

    if (!post.published) {
      if (!args.includeDraft) {
        return null
      }
      await assertAdmin(ctx)
    }

    return post
  },
})

export const listAllAdmin = queryGeneric({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx)
    return await ctx.db.query("posts").withIndex("by_created_at").order("desc").collect()
  },
})

export const upsertPost = mutationGeneric({
  args: {
    postId: v.optional(v.id("posts")),
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    coverImageUrl: v.optional(v.string()),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await assertAdmin(ctx)
    const normalizedSlug = normalizeSlug(args.slug || args.title)

    if (!normalizedSlug) {
      throw new Error("Slug cannot be empty")
    }

    const isUnique = await ensureUniqueSlug(ctx, normalizedSlug, args.postId)
    if (!isUnique) {
      throw new Error("Slug is already in use")
    }

    const now = Date.now()
    const payload = {
      title: args.title.trim(),
      slug: normalizedSlug,
      excerpt: args.excerpt?.trim() || undefined,
      content: args.content.trim(),
      coverImageUrl: args.coverImageUrl?.trim() || undefined,
      published: args.published,
      publishedAt: args.published ? now : undefined,
      updatedAt: now,
      authorClerkId: identity.subject,
    }

    if (args.postId) {
      await ctx.db.patch(args.postId, payload)
      return { postId: args.postId, slug: normalizedSlug }
    }

    const postId = await ctx.db.insert("posts", {
      ...payload,
      createdAt: now,
    })
    return { postId, slug: normalizedSlug }
  },
})

export const setPublished = mutationGeneric({
  args: {
    postId: v.id("posts"),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx)
    const now = Date.now()
    await ctx.db.patch(args.postId, {
      published: args.published,
      publishedAt: args.published ? now : undefined,
      updatedAt: now,
    })
  },
})

export const removePost = mutationGeneric({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx)
    await ctx.db.delete(args.postId)
  },
})
