"use client"

import { RefObject, useEffect, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type Props = {
  scopeRef: RefObject<HTMLElement | null>
}

export function GsapPageAnimations({ scopeRef }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(media.matches)
    const update = () => setReducedMotion(media.matches)
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useGSAP(
    () => {
      if (!scopeRef.current || reducedMotion) return
      const cleanups: Array<() => void> = []

      const sections = gsap.utils.toArray<HTMLElement>("[data-gsap-section]", scopeRef.current)
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          }
        )
      })

      const groups = gsap.utils.toArray<HTMLElement>("[data-gsap-stagger]", scopeRef.current)
      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-gsap-item]")
        if (!items.length) return
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: group,
              start: "top 84%",
              once: true,
            },
          }
        )
      })

      const timelines = gsap.utils.toArray<HTMLElement>("[data-gsap-timeline]", scopeRef.current)
      timelines.forEach((timelineRoot) => {
        const line = timelineRoot.querySelector<HTMLElement>("[data-gsap-timeline-line]")
        const nodes = timelineRoot.querySelectorAll<HTMLElement>("[data-gsap-timeline-node]")
        const content = timelineRoot.querySelectorAll<HTMLElement>("[data-gsap-timeline-content]")
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineRoot,
            start: "top 75%",
            once: true,
          },
        })

        if (line) {
          tl.fromTo(
            line,
            { scaleY: 0, transformOrigin: "top center" },
            { scaleY: 1, duration: 1, ease: "power2.out" }
          )
        }

        if (nodes.length) {
          tl.fromTo(
            nodes,
            { autoAlpha: 0, scale: 0.75 },
            { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)", stagger: 0.12 },
            line ? "-=0.7" : 0
          )
        }

        if (content.length) {
          tl.fromTo(
            content,
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out", stagger: 0.1 },
            "-=0.35"
          )
        }
      })

      const footerCta = scopeRef.current.querySelector<HTMLElement>("[data-gsap-footer-cta]")
      if (footerCta) {
        gsap.fromTo(
          footerCta,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerCta,
              start: "top 88%",
              once: true,
            },
          }
        )
      }

      const ctaButtons = gsap.utils.toArray<HTMLElement>("[data-gsap-cta]", scopeRef.current)
      ctaButtons.forEach((button) => {
        const onEnter = () => gsap.to(button, { y: -2, scale: 1.01, duration: 0.3, ease: "power2.out" })
        const onLeave = () => gsap.to(button, { y: 0, scale: 1, duration: 0.35, ease: "power2.out" })
        button.addEventListener("mouseenter", onEnter)
        button.addEventListener("mouseleave", onLeave)
        cleanups.push(() => {
          button.removeEventListener("mouseenter", onEnter)
          button.removeEventListener("mouseleave", onLeave)
        })
      })

      return () => {
        cleanups.forEach((cleanup) => cleanup())
      }
    },
    { dependencies: [scopeRef, reducedMotion], scope: scopeRef }
  )

  return null
}
