"use client"

import { useRef, useState } from "react"
import { useMutation } from "convex/react"
import type { Id } from "@/convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { generateUploadUrlRef, getStorageUrlRef } from "@/lib/site-api"

type ConvexImageUploadProps = {
  onUploadedUrl: (url: string) => void
  label?: string
  disabled?: boolean
}

export function ConvexImageUpload({ onUploadedUrl, label = "Upload image", disabled }: ConvexImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const generateUploadUrl = useMutation(generateUploadUrlRef)
  const getStorageUrl = useMutation(getStorageUrlRef)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onPick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file || !file.type.startsWith("image/")) {
      return
    }

    setBusy(true)
    setError(null)
    try {
      const postUrl = await generateUploadUrl({})
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })
      const json = (await result.json()) as { storageId: Id<"_storage"> }
      const url = await getStorageUrl({ storageId: json.storageId })
      if (url) {
        onUploadedUrl(url)
      } else {
        setError("Could not resolve file URL.")
      }
    } catch {
      setError("Upload failed. Try again or paste a URL instead.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled || busy}
        onChange={onPick}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled || busy}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? "Uploading…" : label}
      </Button>
      {error ? <span className="text-xs text-destructive">{error}</span> : null}
    </div>
  )
}
