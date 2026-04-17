"use client"

import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown, FileText, Mail } from "lucide-react"
// HeroScene is now rendered at the page level (home-content.tsx) as a fixed overlay

gsap.registerPlugin(useGSAP)

const proofItems = [
  { value: "PhD", label: "University of Oulu" },
  { value: "3+", label: "Years Industry" },
  { value: "10+", label: "Projects Shipped" },
  { value: "3", label: "Publications" },
]

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const ctaRowRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLButtonElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(media.matches)
    const update = () => setReducedMotion(media.matches)
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useGSAP(
    () => {
      if (!introRef.current || !ctaRowRef.current || !scrollHintRef.current) return
      if (reducedMotion) {
        const revealItems = introRef.current.querySelectorAll("[data-hero-reveal]")
        const lineItems = introRef.current.querySelectorAll("[data-hero-line]")
        gsap.set(
          [lineItems, revealItems, ctaRowRef.current, scrollHintRef.current],
          { clearProps: "all" }
        )
        return
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } })
      tl.fromTo(
        introRef.current.querySelectorAll("[data-hero-line]"),
        { yPercent: 120, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12 }
      )
        .fromTo(
          introRef.current.querySelectorAll("[data-hero-reveal]"),
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          ctaRowRef.current,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65 },
          "-=0.45"
        )
        .fromTo(
          scrollHintRef.current,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55 },
          "-=0.25"
        )
    },
    { dependencies: [reducedMotion], scope: heroRef }
  )

  return (
    <motion.section
      ref={heroRef}
      id="hero"
      data-gsap-section
      className="relative min-h-screen flex items-center overflow-visible"
      style={{ opacity: heroOpacity, scale: heroScale }}
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_35%,oklch(0.72_0.12_185/0.16),transparent_54%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.12_0.005_260/0.75)_0%,oklch(0.12_0.005_260/0.9)_50%,oklch(0.12_0.005_260)_100%)]" />

      <motion.div
        className="pointer-events-none relative z-30 w-full px-5 sm:px-[6%] lg:px-[8%] xl:px-[10%] pt-24 pb-16 sm:py-20"
        style={{ y: heroY }}
      >
        <div className="pointer-events-auto max-w-3xl">
          <motion.div ref={introRef} className="space-y-6 sm:space-y-8" style={{ y: textY }}>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-serif font-medium tracking-tight leading-[0.92]">
                <span className="block overflow-hidden">
                  <span data-hero-line className="block text-foreground">
                    Kavishwa
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span data-hero-line className="block text-foreground">
                    Wendakoon
                  </span>
                </span>
              </h1>
            </div>

            <p
              data-hero-reveal
              className="text-lg sm:text-xl md:text-2xl font-serif text-foreground/90 leading-relaxed max-w-2xl"
            >
              Doctoral researcher and software engineer building safe, privacy-preserving AI for pediatric brain health.
            </p>

            <p
              data-hero-reveal
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl"
            >
              I combine doctoral research in trustworthy medical AI with 3+ years of production engineering on national-scale systems.
            </p>

            <div
              ref={ctaRowRef}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2"
            >
              <a
                href="/#cv"
                data-gsap-cta
                className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition-all duration-500 hover:shadow-lg hover:shadow-primary/20"
                aria-label="Jump to experience and CV section"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View CV</span>
              </a>
              <a
                href="/#research"
                data-gsap-cta
                className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 border border-border/60 rounded-lg font-medium text-sm text-foreground transition-all duration-500 hover:bg-surface hover:border-primary/40"
                aria-label="Jump to research areas section"
              >
                <span>Selected Research</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
              </a>
              <a
                href="/#contact"
                data-gsap-cta
                className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 border border-border/60 rounded-lg font-medium text-sm text-foreground transition-all duration-500 hover:bg-surface hover:border-primary/40"
                aria-label="Jump to contact section to start a conversation"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </a>
            </div>

            {/* Proof strip */}
            <div
              data-hero-reveal
              className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 pt-4 sm:pt-6 border-t border-border/20"
            >
              {proofItems.map((item) => (
                <div key={item.label} className="flex items-baseline gap-2">
                  <span className="text-lg sm:text-xl font-serif font-medium text-foreground">
                    {item.value}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        ref={scrollHintRef}
        type="button"
        data-scroll-to="#lens"
        className="pointer-events-auto absolute bottom-6 sm:bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/70 hover:text-primary transition-colors cursor-pointer group"
        aria-label="Scroll to the About section"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase group-hover:tracking-[0.3em] transition-all">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </motion.section>
  )
}
