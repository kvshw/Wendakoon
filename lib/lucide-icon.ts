import type { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

const FALLBACK: LucideIcon = Icons.Circle

export function getLucideIcon(name: string | undefined): LucideIcon {
  if (!name || typeof name !== "string") {
    return FALLBACK
  }
  const Icon = (Icons as unknown as Record<string, LucideIcon | undefined>)[name]
  return Icon ?? FALLBACK
}
