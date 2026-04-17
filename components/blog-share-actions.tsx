"use client"

import { useMemo, useState } from "react"
import { Facebook, Linkedin, Link2, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

type BlogShareActionsProps = {
  title: string
  url: string
}

export function BlogShareActions({ title, url }: BlogShareActionsProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = useMemo(() => {
    const encUrl = encodeURIComponent(url)
    const encTitle = encodeURIComponent(title)
    // Classic mini share window: passes url + title (LinkedIn often ignores share-offsite prefills).
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encUrl}&title=${encTitle}&summary=${encTitle}`
    const xUrl = `https://twitter.com/intent/tweet?url=${encUrl}&text=${encTitle}`
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`
    return { linkedInUrl, xUrl, facebookUrl }
  }, [title, url])

  const linkedInShareText = useMemo(() => `${title}\n\n${url}`, [title, url])

  const handleLinkedInClick = () => {
    // LinkedIn frequently opens an empty composer; copying first makes paste reliable.
    void navigator.clipboard.writeText(linkedInShareText).catch(() => {})
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="mt-12 sm:mt-14 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 sm:p-6">
      <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">Share</p>
      <p className="text-sm text-muted-foreground mb-2">Post this article on social media</p>
      <p className="text-xs text-muted-foreground/80 mb-4 max-w-xl">
        If LinkedIn opens a blank box, press paste — the title and link were copied automatically.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button asChild type="button" variant="outline" size="sm" className="text-foreground hover:text-foreground">
          <a
            href={shareLinks.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share this post on LinkedIn"
            onClick={handleLinkedInClick}
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
        </Button>
        <Button asChild type="button" variant="outline" size="sm" className="text-foreground hover:text-foreground">
          <a href={shareLinks.xUrl} target="_blank" rel="noopener noreferrer" aria-label="Share this post on X">
            <Twitter className="w-3.5 h-3.5" />
            X
          </a>
        </Button>
        <Button asChild type="button" variant="outline" size="sm" className="text-foreground hover:text-foreground">
          <a
            href={shareLinks.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share this post on Facebook"
          >
            <Facebook className="w-3.5 h-3.5" />
            Facebook
          </a>
        </Button>
        <Button type="button" variant="default" size="sm" onClick={copyLink} aria-label="Copy direct post link">
          <Link2 className="w-3.5 h-3.5" />
          {copied ? "Link copied" : "Copy link"}
        </Button>
      </div>
    </div>
  )
}
