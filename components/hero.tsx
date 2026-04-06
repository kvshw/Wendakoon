"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown, FileText, Mail } from "lucide-react"
import { NetworkVisualization } from "./network-visualization"

const proofItems = [
  { value: "PhD", label: "University of Oulu" },
  { value: "3+", label: "Years Industry" },
  { value: "10+", label: "Projects Shipped" },
  { value: "3", label: "Publications" },
]

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

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
        <div className="max-w-3xl">
          <motion.div
            className="space-y-6 sm:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: textY }}
          >
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

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl font-serif text-foreground/90 leading-relaxed max-w-2xl"
            >
              Doctoral researcher and software engineer building safe, privacy-preserving AI for pediatric brain health.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl"
            >
              I combine doctoral research in trustworthy medical AI with 3+ years of production engineering on national-scale systems.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2"
            >
              <a
                href="#cv"
                className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition-all duration-500 hover:shadow-lg hover:shadow-primary/20"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View CV</span>
              </a>
              <a
                href="#research"
                className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 border border-border/60 rounded-lg font-medium text-sm text-foreground transition-all duration-500 hover:bg-surface hover:border-primary/40"
              >
                <span>Selected Research</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 border border-border/60 rounded-lg font-medium text-sm text-foreground transition-all duration-500 hover:bg-surface hover:border-primary/40"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact</span>
              </a>
            </motion.div>

            {/* Proof strip */}
            <motion.div
              variants={itemVariants}
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
            </motion.div>
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
