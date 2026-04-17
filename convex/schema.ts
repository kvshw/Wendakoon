import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  siteSections: defineTable({
    key: v.string(),
    data: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    coverImageUrl: v.optional(v.string()),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    authorClerkId: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_published_and_date", ["published", "publishedAt"])
    .index("by_created_at", ["createdAt"]),
})
