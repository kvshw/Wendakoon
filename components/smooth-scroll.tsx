"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (anchor) {
        const id = anchor.getAttribute("href")
        if (id && id !== "#") {
          e.preventDefault()
          const el = document.querySelector(id)
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -80 })
          }
        }
      }

      const scrollButton = target.closest('button')
      if (scrollButton) {
        const onClick = scrollButton.getAttribute('data-scroll-to')
        if (onClick) {
          const el = document.querySelector(onClick)
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -80 })
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      lenis.destroy()
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return <>{children}</>
}
