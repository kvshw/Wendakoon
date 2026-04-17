import { makeFunctionReference } from "convex/server"
import type { Id } from "@/convex/_generated/dataModel"

export const getSiteSectionRef = makeFunctionReference<
  "query",
  { key: string },
  { data: unknown; updatedAt: number } | null
>("siteContent:getSiteSection")

export const listSiteSectionsAdminRef = makeFunctionReference<
  "query",
  Record<string, never>,
  { _id: string; key: string; data: unknown; updatedAt: number }[]
>("siteContent:listSiteSectionsAdmin")

export const upsertSiteSectionRef = makeFunctionReference<
  "mutation",
  { key: string; data: unknown },
  { key: string; updatedAt: number }
>("siteContent:upsertSiteSection")

export const removeSiteSectionRef = makeFunctionReference<"mutation", { key: string }, void>(
  "siteContent:removeSiteSection"
)

export const generateUploadUrlRef = makeFunctionReference<"mutation", Record<string, never>, string>(
  "siteContent:generateUploadUrl"
)

export const getStorageUrlRef = makeFunctionReference<
  "mutation",
  { storageId: Id<"_storage"> },
  string | null
>("siteContent:getStorageUrl")
