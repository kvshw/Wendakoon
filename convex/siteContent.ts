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

export const getSiteSection = queryGeneric({
  args: {
    key: v.string(),
  },
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("siteSections")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first()

    if (!row) {
      return null
    }

    return { data: row.data, updatedAt: row.updatedAt }
  },
})

export const listSiteSectionsAdmin = queryGeneric({
  args: {},
  handler: async (ctx) => {
    // Keep admin writes strict, but avoid crashing the admin page on initial load
    // when auth/session/env are not ready in Convex yet.
    const identity = await ctx.auth.getUserIdentity()
    const adminUserId = process.env.ADMIN_CLERK_USER_ID
    if (!identity || !adminUserId || identity.subject !== adminUserId) {
      return []
    }
    return await ctx.db.query("siteSections").collect()
  },
})

export const upsertSiteSection = mutationGeneric({
  args: {
    key: v.string(),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx)
    const key = args.key.trim()
    if (!key) {
      throw new Error("Section key is required")
    }

    const now = Date.now()
    const existing = await ctx.db
      .query("siteSections")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first()

    if (existing) {
      await ctx.db.patch(existing._id, { data: args.data, updatedAt: now })
      return { key, updatedAt: now }
    }

    await ctx.db.insert("siteSections", { key, data: args.data, updatedAt: now })
    return { key, updatedAt: now }
  },
})

export const removeSiteSection = mutationGeneric({
  args: {
    key: v.string(),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx)
    const row = await ctx.db
      .query("siteSections")
      .withIndex("by_key", (q) => q.eq("key", args.key.trim()))
      .first()

    if (row) {
      await ctx.db.delete(row._id)
    }
  },
})

export const generateUploadUrl = mutationGeneric({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

export const getStorageUrl = mutationGeneric({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx)
    return await ctx.storage.getUrl(args.storageId)
  },
})
