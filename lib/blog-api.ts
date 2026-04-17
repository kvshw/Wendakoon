import { makeFunctionReference } from "convex/server"
import type { GenericId as Id } from "convex/values"

export type BlogPost = {
  _id: Id<"posts">
  _creationTime: number
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImageUrl?: string
  published: boolean
  publishedAt?: number
  createdAt: number
  updatedAt: number
  authorClerkId: string
}

export const listPublishedRef = makeFunctionReference<
  "query",
  { limit?: number },
  BlogPost[]
>("posts:listPublished")

export const getBySlugRef = makeFunctionReference<
  "query",
  { slug: string; includeDraft?: boolean },
  BlogPost | null
>("posts:getBySlug")

export const listAllAdminRef = makeFunctionReference<"query", Record<string, never>, BlogPost[]>(
  "posts:listAllAdmin"
)

export const upsertPostRef = makeFunctionReference<
  "mutation",
  {
    postId?: Id<"posts">
    title: string
    slug: string
    excerpt?: string
    content: string
    coverImageUrl?: string
    published: boolean
  },
  { postId: Id<"posts">; slug: string }
>("posts:upsertPost")

export const setPublishedRef = makeFunctionReference<
  "mutation",
  { postId: Id<"posts">; published: boolean },
  void
>("posts:setPublished")

export const removePostRef = makeFunctionReference<"mutation", { postId: Id<"posts"> }, void>(
  "posts:removePost"
)

export function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
