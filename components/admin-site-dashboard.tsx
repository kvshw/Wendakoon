"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { Activity, CheckCircle2, Database, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ConvexImageUpload } from "@/components/convex-image-upload"
import {
  listSiteSectionsAdminRef,
  removeSiteSectionRef,
  upsertSiteSectionRef,
} from "@/lib/site-api"
import {
  SITE_SECTION_KEYS,
  type SiteSectionKey,
  defaultForSection,
  mergeSectionWithDefaults,
} from "@/lib/site-content-defaults"

const SECTION_LABELS: Record<SiteSectionKey, string> = {
  research: "Research areas",
  projects: "Projects (case files)",
  researchJourney: "Research journey",
  experience: "Experience & CV",
  outputs: "Publications & prototypes",
  currentFocus: "Current focus",
}

const SECTION_NOTES: Record<SiteSectionKey, string> = {
  research: "Domain cards, featured statement, and supporting tracks.",
  projects: "Case files, timeline blocks, metrics, and links.",
  researchJourney: "Decision milestones and narrative evolution.",
  experience: "Milestones, skills, highlights, awards, and language bars.",
  outputs: "Publications, prototypes, talks, and media links.",
  currentFocus: "Focus pillars, topics, collaboration CTA, and quote.",
}

type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }
type AddFieldType = "text" | "number" | "boolean" | "object" | "list" | "null"

function toTitleCase(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^\w/, (s) => s.toUpperCase())
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function setAtPath(root: JsonValue, path: Array<string | number>, nextValue: JsonValue): JsonValue {
  if (path.length === 0) {
    return nextValue
  }
  const [head, ...tail] = path
  if (Array.isArray(root)) {
    const index = typeof head === "number" ? head : Number(head)
    const next = root.slice()
    next[index] = setAtPath(next[index] as JsonValue, tail, nextValue)
    return next
  }
  const key = String(head)
  return {
    ...root,
    [key]: setAtPath((root[key] as JsonValue) ?? ({} as JsonValue), tail, nextValue),
  }
}

function removeAtPath(root: JsonValue, path: Array<string | number>): JsonValue {
  if (path.length === 0) {
    return root
  }
  const [head, ...tail] = path
  if (Array.isArray(root)) {
    const index = typeof head === "number" ? head : Number(head)
    if (tail.length === 0) {
      return root.filter((_, i) => i !== index)
    }
    const next = root.slice()
    next[index] = removeAtPath(next[index] as JsonValue, tail)
    return next
  }
  const key = String(head)
  if (tail.length === 0) {
    const { [key]: _removed, ...rest } = root
    return rest
  }
  return {
    ...root,
    [key]: removeAtPath(root[key] as JsonValue, tail),
  }
}

function inferNewArrayItem(items: JsonValue[]): JsonValue {
  const sample = items[0]
  if (sample === undefined) {
    return ""
  }
  if (sample === null) {
    return null
  }
  if (typeof sample === "string") {
    return ""
  }
  if (typeof sample === "number") {
    return 0
  }
  if (typeof sample === "boolean") {
    return false
  }
  return cloneJson(sample)
}

function defaultValueByType(type: AddFieldType): JsonValue {
  switch (type) {
    case "number":
      return 0
    case "boolean":
      return false
    case "object":
      return {}
    case "list":
      return []
    case "null":
      return null
    case "text":
    default:
      return ""
  }
}

function getArrayItemTitle(item: JsonValue, index: number): string {
  if (item === null) {
    return `Item ${index + 1} (null)`
  }
  if (typeof item === "string") {
    return item.trim() ? item : `Item ${index + 1} (text)`
  }
  if (typeof item === "number" || typeof item === "boolean") {
    return `Item ${index + 1}: ${String(item)}`
  }
  if (Array.isArray(item)) {
    return `Item ${index + 1} (list)`
  }

  const titleCandidate = item.title ?? item.heading ?? item.label ?? item.name ?? item.id
  if (typeof titleCandidate === "string" && titleCandidate.trim()) {
    return titleCandidate
  }

  if (typeof item.from === "string" && typeof item.to === "string") {
    return `${item.from} -> ${item.to}`
  }

  return `Item ${index + 1}`
}

export function AdminSiteDashboard() {
  const rows = useQuery(listSiteSectionsAdminRef, {})
  const upsert = useMutation(upsertSiteSectionRef)
  const remove = useMutation(removeSiteSectionRef)

  const [active, setActive] = useState<SiteSectionKey>("research")
  const [draftData, setDraftData] = useState<JsonValue | null>(null)
  const [lastSavedData, setLastSavedData] = useState<JsonValue | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [lastUploadUrl, setLastUploadUrl] = useState<string | null>(null)
  const [showJsonAdvanced, setShowJsonAdvanced] = useState(false)
  const [newFieldNameByPath, setNewFieldNameByPath] = useState<Record<string, string>>({})
  const [newFieldTypeByPath, setNewFieldTypeByPath] = useState<Record<string, AddFieldType>>({})
  const [selectedArrayItemByPath, setSelectedArrayItemByPath] = useState<Record<string, number>>({})
  const [selectedRootFieldBySection, setSelectedRootFieldBySection] = useState<Record<SiteSectionKey, string>>({
    research: "eyebrow",
    projects: "eyebrow",
    researchJourney: "eyebrow",
    experience: "eyebrow",
    outputs: "eyebrow",
    currentFocus: "eyebrow",
  })

  const rowMap = useMemo(() => {
    const m = new Map<string, unknown>()
    for (const r of rows ?? []) {
      m.set(r.key, r.data)
    }
    return m
  }, [rows])

  const loadSection = useCallback(
    (key: SiteSectionKey) => {
      const stored = rowMap.get(key)
      const data = cloneJson(mergeSectionWithDefaults(key, stored) as JsonValue)
      setDraftData(data)
      setLastSavedData(cloneJson(data))
    },
    [rowMap]
  )

  useEffect(() => {
    if (rows === undefined) {
      return
    }
    loadSection(active)
  }, [active, loadSection, rows])

  useEffect(() => {
    if (!draftData || Array.isArray(draftData) || typeof draftData !== "object") {
      return
    }
    const keys = Object.keys(draftData)
    if (keys.length === 0) {
      return
    }
    const selected = selectedRootFieldBySection[active]
    if (!selected || !keys.includes(selected)) {
      setSelectedRootFieldBySection((prev) => ({ ...prev, [active]: keys[0] }))
    }
  }, [active, draftData, selectedRootFieldBySection])

  const updatePath = (path: Array<string | number>, value: JsonValue) => {
    setDraftData((prev) => {
      if (prev == null) {
        return prev
      }
      return setAtPath(prev, path, value)
    })
  }

  const removePath = (path: Array<string | number>) => {
    setDraftData((prev) => {
      if (prev == null) {
        return prev
      }
      return removeAtPath(prev, path)
    })
  }

  const renderEditor = (
    label: string,
    value: JsonValue,
    path: Array<string | number>,
    depth = 0
  ): React.ReactNode => {
    const key = path.join(".")

    if (Array.isArray(value)) {
      const arrayPathKey = key || "root"
      const selectedIndexRaw = selectedArrayItemByPath[arrayPathKey] ?? 0
      const selectedIndex = value.length === 0 ? -1 : Math.min(Math.max(selectedIndexRaw, 0), value.length - 1)
      return (
        <div key={key} className="space-y-3 rounded-xl border border-border/60 bg-background/60 p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{value.length} items</p>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={newFieldTypeByPath[arrayPathKey] ?? "text"}
                onValueChange={(next) =>
                  setNewFieldTypeByPath((prev) => ({ ...prev, [arrayPathKey]: next as AddFieldType }))
                }
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Item type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="object">Object</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  <SelectItem value="null">Null</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  const selectedType = newFieldTypeByPath[arrayPathKey]
                  const nextItem = value.length > 0 ? inferNewArrayItem(value) : defaultValueByType(selectedType ?? "text")
                  updatePath(path, [...value, nextItem] as JsonValue)
                  setSelectedArrayItemByPath((prev) => ({ ...prev, [arrayPathKey]: value.length }))
                }}
              >
                Add item
              </Button>
            </div>
          </div>

          {value.length === 0 ? (
            <p className="text-xs text-muted-foreground">No items yet.</p>
          ) : (
            <div className="grid gap-3 xl:grid-cols-[280px_minmax(0,1fr)]">
              <div className="space-y-2 rounded-lg border border-border/50 bg-card/40 p-2">
                {value.map((item, index) => {
                  const itemPath = [...path, index]
                  const activeItem = index === selectedIndex
                  return (
                    <div
                      key={itemPath.join(".")}
                      className={`rounded-lg border p-2 transition ${
                        activeItem ? "border-primary/70 bg-primary/10" : "border-border/50 bg-background/60"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedArrayItemByPath((prev) => ({ ...prev, [arrayPathKey]: index }))}
                        className="w-full text-left"
                      >
                        <p className="text-sm font-medium text-foreground line-clamp-2">{getArrayItemTitle(item, index)}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">Entry {index + 1}</p>
                      </button>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedArrayItemByPath((prev) => ({ ...prev, [arrayPathKey]: index }))}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const next = [...value]
                            next.splice(index + 1, 0, cloneJson(item))
                            updatePath(path, next as JsonValue)
                            setSelectedArrayItemByPath((prev) => ({ ...prev, [arrayPathKey]: index + 1 }))
                          }}
                        >
                          Duplicate
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            removePath(itemPath)
                            const fallbackIndex = Math.max(0, index - 1)
                            setSelectedArrayItemByPath((prev) => ({ ...prev, [arrayPathKey]: fallbackIndex }))
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {selectedIndex >= 0 ? (
                <div className="space-y-2 rounded-lg border border-border/50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Editing: {getArrayItemTitle(value[selectedIndex] as JsonValue, selectedIndex)}
                    </p>
                    <Badge variant="outline">Item {selectedIndex + 1}</Badge>
                  </div>
                  {renderEditor(
                    `${label} ${selectedIndex + 1}`,
                    value[selectedIndex] as JsonValue,
                    [...path, selectedIndex],
                    depth + 1
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>
      )
    }

    if (value !== null && typeof value === "object") {
      const objectPathKey = key || "root"
      const nextFieldName = newFieldNameByPath[objectPathKey] ?? ""
      const nextFieldType = newFieldTypeByPath[objectPathKey] ?? "text"
      return (
        <div key={key} className="space-y-3 rounded-xl border border-border/60 bg-background/60 p-4">
          {depth === 0 ? null : <p className="text-sm font-medium text-foreground">{label}</p>}
          <div className="rounded-lg border border-dashed border-border p-3 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Add new field</p>
            <div className="flex flex-wrap items-center gap-2">
              <Input
                value={nextFieldName}
                onChange={(e) => setNewFieldNameByPath((prev) => ({ ...prev, [objectPathKey]: e.target.value }))}
                placeholder="fieldName"
                className="w-[220px]"
              />
              <Select
                value={nextFieldType}
                onValueChange={(next) =>
                  setNewFieldTypeByPath((prev) => ({ ...prev, [objectPathKey]: next as AddFieldType }))
                }
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Field type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="object">Object</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  <SelectItem value="null">Null</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  const cleaned = nextFieldName.trim()
                  if (!cleaned) {
                    setError("Field name is required.")
                    return
                  }
                  if (Object.prototype.hasOwnProperty.call(value, cleaned)) {
                    setError(`Field "${cleaned}" already exists.`)
                    return
                  }
                  updatePath([...path, cleaned], defaultValueByType(nextFieldType))
                  setNewFieldNameByPath((prev) => ({ ...prev, [objectPathKey]: "" }))
                  setError(null)
                }}
              >
                Add field
              </Button>
            </div>
          </div>
          {Object.entries(value).map(([childKey, childValue]) =>
            renderEditor(toTitleCase(childKey), childValue, [...path, childKey], depth + 1)
          )}
        </div>
      )
    }

    if (typeof value === "boolean") {
      return (
        <div key={key} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 p-3">
          <p className="text-sm text-foreground">{label}</p>
          <Switch checked={value} onCheckedChange={(checked) => updatePath(path, checked)} />
        </div>
      )
    }

    if (typeof value === "number") {
      return (
        <div key={key} className="space-y-2">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <Input
            type="number"
            value={String(value)}
            onChange={(e) => updatePath(path, Number(e.target.value || 0))}
          />
        </div>
      )
    }

    if (value === null) {
      return (
        <div key={key} className="space-y-2 rounded-lg border border-dashed border-border p-3">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">This field is currently null.</p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline" onClick={() => updatePath(path, "")}>
              Set text
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => updatePath(path, [])}>
              Set list
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => updatePath(path, {})}>
              Set object
            </Button>
          </div>
        </div>
      )
    }

    const stringValue = value ?? ""
    const showTextarea = typeof stringValue === "string" && (stringValue.length > 120 || stringValue.includes("\n"))
    return (
      <div key={key} className="space-y-2">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {showTextarea ? (
          <Textarea
            value={String(stringValue)}
            onChange={(e) => updatePath(path, e.target.value)}
            className="min-h-[90px]"
          />
        ) : (
          <Input value={String(stringValue)} onChange={(e) => updatePath(path, e.target.value)} />
        )}
      </div>
    )
  }

  const save = async () => {
    if (draftData == null) {
      return
    }
    setError(null)
    setNotice(null)
    setSaving(true)
    try {
      await upsert({ key: active, data: draftData })
      setLastSavedData(cloneJson(draftData))
      setNotice("Saved to Convex. The live site will update for visitors.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.")
    } finally {
      setSaving(false)
    }
  }

  const resetDraftToDefaults = () => {
    setDraftData(cloneJson(defaultForSection(active) as JsonValue))
    setNotice(null)
    setError(null)
  }

  const clearStoredSection = async () => {
    setError(null)
    setNotice(null)
    const ok = window.confirm(
      "Remove saved content for this section from the database? The site will fall back to built-in defaults."
    )
    if (!ok) {
      return
    }
    setSaving(true)
    try {
      await remove({ key: active })
      const fallback = cloneJson(defaultForSection(active) as JsonValue)
      setDraftData(fallback)
      setLastSavedData(cloneJson(fallback))
      setNotice("Reverted to built-in defaults (database entry removed).")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Remove failed.")
    } finally {
      setSaving(false)
    }
  }

  const hasUnsavedChanges = useMemo(() => {
    if (draftData == null || lastSavedData == null) {
      return false
    }
    return JSON.stringify(draftData) !== JSON.stringify(lastSavedData)
  }, [draftData, lastSavedData])

  return (
    <div className="mt-8 space-y-6">
      <Card className="border-border/50 bg-linear-to-br from-card via-card to-card/70 shadow-lg">
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1.5">
              <Badge variant="secondary" className="w-fit bg-primary/15 text-primary">
                Content Studio
              </Badge>
              <CardTitle className="text-2xl font-serif">Premium Site Content Dashboard</CardTitle>
              <CardDescription className="max-w-2xl">
                Visual editing built for precision. Manage each homepage section with structured controls and optional advanced JSON mode.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/70 px-3 py-2 text-xs">
              <Sparkles className="size-4 text-primary" />
              <span className="text-muted-foreground">Design-first admin workspace</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-border/60 bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">Total sections</p>
              <p className="mt-1 flex items-center gap-1 text-lg font-semibold">
                <Database className="size-4 text-primary" />
                {SITE_SECTION_KEYS.length}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">Editor status</p>
              <p className="mt-1 flex items-center gap-1 text-lg font-semibold">
                <Activity className="size-4 text-amber-400" />
                {rows === undefined ? "Loading" : "Live"}
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">Current section</p>
              <p className="mt-1 text-lg font-semibold">{SECTION_LABELS[active]}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">Change state</p>
              <p className="mt-1 flex items-center gap-1 text-lg font-semibold">
                <CheckCircle2 className={`size-4 ${hasUnsavedChanges ? "text-amber-400" : "text-emerald-400"}`} />
                {hasUnsavedChanges ? "Unsaved edits" : "All changes saved"}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="border-border/60 bg-card/90 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Content sections</CardTitle>
            <CardDescription>Select a section to edit</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="h-[540px] pr-2">
              <div className="space-y-2">
                {SITE_SECTION_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setActive(key)
                      setNotice(null)
                      setError(null)
                    }}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                      active === key
                        ? "border-primary/70 bg-primary/10 shadow-sm"
                        : "border-border/60 bg-background/70 hover:border-border hover:bg-accent/40"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">{SECTION_LABELS[key]}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{SECTION_NOTES[key]}</p>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/90 shadow-md">
          <CardHeader className="gap-3 pb-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl font-serif">{SECTION_LABELS[active]}</CardTitle>
                <CardDescription className="mt-1">{SECTION_NOTES[active]}</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowJsonAdvanced((prev) => !prev)}>
                  {showJsonAdvanced ? "Hide JSON view" : "Show JSON view"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={resetDraftToDefaults}>
                  Reset section
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={clearStoredSection} disabled={saving}>
                  Clear DB row
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <ConvexImageUpload
                label="Upload image (auto-copy URL)"
                disabled={saving}
                onUploadedUrl={(url) => {
                  setLastUploadUrl(url)
                  void navigator.clipboard?.writeText(url).catch(() => {})
                }}
              />
              {lastUploadUrl ? (
                <Badge variant="outline" className="max-w-full break-all text-[11px]">
                  Copied: {lastUploadUrl}
                </Badge>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {rows === undefined ? (
              <p className="text-sm text-muted-foreground">Loading editor...</p>
            ) : (
              <ScrollArea className="h-[560px] rounded-xl border border-border/60 bg-background/40 p-4">
                <div className="space-y-4 pr-3">
                  {draftData == null || Array.isArray(draftData) || typeof draftData !== "object" ? (
                    <p className="text-sm text-muted-foreground">No editable content found for this section.</p>
                  ) : (
                    (() => {
                      const entries = Object.entries(draftData)
                      const selectedRoot = selectedRootFieldBySection[active] || entries[0]?.[0]
                      const selectedEntry = entries.find(([key]) => key === selectedRoot) ?? entries[0]

                      return (
                        <div className="space-y-3">
                          <div className="rounded-lg border border-border/50 bg-card/40 p-2">
                            <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              Content blocks (view / edit / manage)
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {entries.map(([key, value]) => (
                                <Button
                                  key={key}
                                  type="button"
                                  size="sm"
                                  variant={selectedRoot === key ? "default" : "outline"}
                                  onClick={() => setSelectedRootFieldBySection((prev) => ({ ...prev, [active]: key }))}
                                >
                                  {toTitleCase(key)}
                                  {Array.isArray(value) ? ` (${value.length})` : ""}
                                </Button>
                              ))}
                            </div>
                          </div>
                          {selectedEntry
                            ? renderEditor(toTitleCase(selectedEntry[0]), selectedEntry[1] as JsonValue, [selectedEntry[0]], 1)
                            : null}
                        </div>
                      )
                    })()
                  )}

                  {showJsonAdvanced && draftData != null ? (
                    <div className="space-y-2 rounded-xl border border-dashed border-border p-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Advanced JSON editor</p>
                      <Textarea
                        value={JSON.stringify(draftData, null, 2)}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value) as JsonValue
                            setDraftData(parsed)
                            setError(null)
                          } catch {
                            setError("Invalid JSON in advanced editor.")
                          }
                        }}
                        className="min-h-[280px] font-mono text-sm"
                        spellCheck={false}
                      />
                    </div>
                  ) : null}
                </div>
              </ScrollArea>
            )}

            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {notice ? <p className="text-sm text-emerald-400">{notice}</p> : null}
            {hasUnsavedChanges ? <p className="text-xs text-amber-300">You have unsaved changes.</p> : null}

            <div className="sticky bottom-0 rounded-xl border border-border/60 bg-card/95 p-3 backdrop-blur supports-backdrop-filter:bg-card/80">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Save to publish updates across the live website. Changes stay local in this editor until saved.
                </p>
                <Button type="button" onClick={save} disabled={saving || rows === undefined || draftData == null}>
                  {saving ? "Saving..." : "Save section"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
