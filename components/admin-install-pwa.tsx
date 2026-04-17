"use client"

import { useEffect, useMemo, useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

function isIosSafari() {
  if (typeof window === "undefined") return false
  const ua = window.navigator.userAgent.toLowerCase()
  const isIos = /iphone|ipad|ipod/.test(ua)
  const isWebKit = /webkit/.test(ua)
  const isOtherBrowser = /crios|fxios|edgios|opios/.test(ua)
  return isIos && isWebKit && !isOtherBrowser
}

export function AdminInstallPwa() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [installHintDismissed, setInstallHintDismissed] = useState(false)

  const isStandalone = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(display-mode: standalone)").matches
  }, [])

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt)
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  if (isStandalone) {
    return null
  }

  if (deferredPrompt) {
    return (
      <Button type="button" variant="outline" size="sm" onClick={install}>
        <Download className="w-4 h-4" />
        Install App
      </Button>
    )
  }

  if (isIosSafari() && !installHintDismissed) {
    return (
      <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
        <span>Add to Home Screen from Safari share menu.</span>
        <button
          type="button"
          onClick={() => setInstallHintDismissed(true)}
          className="underline hover:text-foreground"
        >
          Dismiss
        </button>
      </div>
    )
  }

  return null
}
