"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react"
import Link from "next/link"
import { NetworkVisualization } from "./network-visualization"

const researchTerrain = [
  {
    title: "Pediatric Brain Health AI",
    description:
      "Secure, privacy-centric AI for real-time personalized pediatric brain health management and monitoring.",
    tag: "Primary Focus",
    href: "#research",
  },
  {
    title: "Trustworthy & Generative AI",
    description:
      "Building AI systems that are transparent, explainable, and meet regulatory compliance standards.",
    tag: "Research",
    href: "#research",
  },
  {
    title: "mHealth & Federated Learning",
    description:
      "Advancing mobile health solutions with privacy-preserving techniques and federated architectures.",
    tag: "Domain",
    href: "#research",
  },
  {
    title: "Software Engineering \u2192 AI Systems",
    description:
      "From national-scale e-governance systems to AI agent-based software development — bridging industry and research.",
    tag: "Journey",
    href: "#case-files",
  },
]

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeTheme, setActiveTheme] = useState(0)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 2.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.4, 0, 1] },
    },
  }

  return (
    <motion.section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ opacity: heroOpacity, scale: heroScale }}
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />

      <div className="absolute inset-0">
        <NetworkVisualization />
      </div>

      <motion.div
        className="relative z-10 w-full px-5 sm:px-[6%] lg:px-[8%] xl:px-[10%] pt-24 pb-16 sm:py-20"
        style={{ y: heroY }}
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 xl:gap-20 items-center">
          {/* Left: Editorial content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: textY }}
          >
            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm text-muted-foreground tracking-wide"
            >
              Doctoral Researcher &middot; University of Oulu &middot; Finland
            </motion.p>

            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-serif font-medium tracking-tight leading-[0.92]">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-foreground"
                    initial={{ y: "120%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 2.3,
                    }}
                  >
                    Kavishwa
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-foreground"
                    initial={{ y: "120%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 2.45,
                    }}
                  >
                    Wendakoon
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            <motion.blockquote
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl font-serif italic text-foreground/90 leading-relaxed max-w-lg border-l-2 border-primary/40 pl-5 sm:pl-6"
            >
              I work on systems that must change without becoming unsafe.
            </motion.blockquote>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg"
            >
              My research focuses on secure, privacy-centric AI for
              real-time pediatric brain health management — advancing medical
              AI and mHealth through self-adaptive systems, federated
              learning, and privacy-preserving techniques.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2"
            >
              <a
                href="#case-files"
                className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition-all duration-500 hover:shadow-lg hover:shadow-primary/20"
              >
                <span>Case Files</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#research"
                className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 border border-border/60 rounded-lg font-medium text-sm text-foreground transition-all duration-500 hover:bg-surface hover:border-primary/40"
              >
                <span>Research</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/chat"
                className="group relative inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium text-sm border border-primary/30 bg-primary/[0.07] text-foreground hover:bg-primary/15 hover:border-primary/50 transition-all duration-500"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                <span>Ask Me</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Research Terrain — Interactive (hidden on mobile, shown on tablet as simpler version) */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 3, ease: [0.25, 0.4, 0, 1] }}
          >
            <div className="relative rounded-2xl border border-border/25 bg-card/30 backdrop-blur-sm p-5 lg:p-6 xl:p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary/20 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-primary/20 rounded-br-2xl" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                  <p className="text-[11px] font-mono text-primary tracking-[0.2em] uppercase">
                    Research Terrain
                  </p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                  {String(activeTheme + 1).padStart(2, "0")} / {String(researchTerrain.length).padStart(2, "0")}
                </span>
              </div>

              {/* Theme selector list */}
              <div className="relative">
                <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border/25" />
                <motion.div
                  className="absolute left-[14px] w-[3px] rounded-full bg-primary"
                  animate={{
                    top: `${activeTheme * 25}%`,
                    height: "25%",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ boxShadow: "0 0 10px var(--primary)" }}
                />

                <div className="relative space-y-0">
                  {researchTerrain.map((theme, i) => {
                    const isActive = activeTheme === i
                    return (
                      <a
                        key={i}
                        href={theme.href}
                        className="group relative flex items-start gap-5 py-4 pl-10 cursor-pointer"
                        onMouseEnter={() => setActiveTheme(i)}
                      >
                        <motion.div
                          className="absolute left-[11px] top-[22px] z-10"
                          animate={{ scale: isActive ? 1 : 0.6 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div
                            className={`w-[9px] h-[9px] rounded-full border-2 transition-colors duration-300 ${
                              isActive
                                ? "bg-primary border-primary"
                                : "bg-background border-border/50 group-hover:border-primary/50"
                            }`}
                          />
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3
                              className={`text-base font-medium transition-colors duration-300 ${
                                isActive
                                  ? "text-foreground"
                                  : "text-foreground/60 group-hover:text-foreground/80"
                              }`}
                            >
                              {theme.title}
                            </h3>
                            {isActive && (
                              <motion.span
                                className="text-[9px] font-mono text-primary/80 tracking-wider uppercase px-2 py-0.5 rounded-full bg-primary/10 border border-primary/15"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {theme.tag}
                              </motion.span>
                            )}
                          </div>
                          <AnimatePresence mode="wait">
                            {isActive && (
                              <motion.p
                                className="text-sm text-muted-foreground leading-relaxed pr-4"
                                initial={{ opacity: 0, y: -4, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                exit={{ opacity: 0, y: -4, height: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                {theme.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        <ArrowRight
                          className={`w-3.5 h-3.5 mt-1 shrink-0 transition-all duration-300 ${
                            isActive
                              ? "text-primary translate-x-0 opacity-100"
                              : "text-transparent -translate-x-2 opacity-0 group-hover:text-muted-foreground group-hover:translate-x-0 group-hover:opacity-60"
                          }`}
                        />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Footer credentials */}
              <div className="mt-6 pt-5 border-t border-border/20 flex items-center justify-between">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Doctoral Researcher &middot; University of Oulu
                  <br />
                  Finnish SE Doctoral Pilot Program
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/60">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  Active Research
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        data-scroll-to="#lens"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/70 hover:text-primary transition-colors cursor-pointer group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
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
