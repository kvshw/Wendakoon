"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { SiteSectionKey } from "@/lib/site-content-defaults"
import { mergeSectionWithDefaults } from "@/lib/site-content-defaults"

export function useSiteSection<T>(key: SiteSectionKey): T {
  const row = useQuery(api.siteContent.getSiteSection, { key })
  return mergeSectionWithDefaults(key, row?.data) as T
}
