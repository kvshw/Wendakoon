"use client"

import { useEffect } from "react"

export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return
    }

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/admin/sw.js", {
          scope: "/admin/",
          updateViaCache: "none",
        })
        void registration.update()
      } catch {
        // no-op: PWA registration failure should not break dashboard usage
      }
    }

    void register()
  }, [])

  return null
}
