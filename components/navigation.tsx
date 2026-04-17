"use client"

import { useState, useEffect } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion"
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { label: "About", href: "/#lens", num: "01" },
  { label: "Research", href: "/#research", num: "02" },
  { label: "Projects", href: "/#projects", num: "03" },
  { label: "CV", href: "/#cv", num: "04" },
  { label: "Publications", href: "/#outputs", num: "05" },
  { label: "Blog", href: "/#blog", num: "06" },
  { label: "Contact", href: "/#contact", num: "07" },
]

function sectionIdFromHref(href: string): string | null {
  if (href.startsWith("/#")) return href.slice(2)
  return null
}

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { scrollY, scrollYProgress } = useScroll()

  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 100,
    damping: 30,
  })

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
    setIsCompact(latest > 200)
  })

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("")
      return
    }

    const sectionIds = navLinks
      .map((link) => sectionIdFromHref(link.href))
      .filter((id): id is string => Boolean(id))

    const updateActiveSection = () => {
      const currentScrollY = window.scrollY
      const viewportBottom = currentScrollY + window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      if (docHeight - viewportBottom < 80) {
        setActiveSection("contact")
        return
      }

      let current = sectionIds[0] ?? ""
      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (!section) continue
        const sectionTop = section.getBoundingClientRect().top + currentScrollY
        if (currentScrollY + 140 >= sectionTop) {
          current = id
        }
      }
      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [pathname])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        animate={{ y: "0%" }}
      >
        <motion.nav
          className="w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.0, ease: [0.25, 0.4, 0, 1] }}
        >
          <div
            className={`mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0,1)] ${
              isCompact
                ? "max-w-fit mt-3 px-3 py-2 rounded-full bg-background/60 backdrop-blur-2xl border border-border/25 shadow-2xl shadow-black/25 gap-3"
                : "w-full px-5 sm:px-[6%] xl:px-[10%] py-4 sm:py-5 gap-4 sm:gap-5 lg:gap-6"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 shrink-0"
              aria-label="Kavishwa Wendakoon home"
              onClick={() => {
                setActiveSection("")
              }}
            >
              <div
                className={`flex items-center justify-center rounded-full bg-primary/15 border border-primary/30 hover:border-primary/50 hover:bg-primary/20 transition-all duration-300 ${
                  isCompact ? "w-7 h-7" : "w-8 h-8 sm:w-9 sm:h-9 rounded-xl"
                }`}
              >
                <span
                  className={`font-serif font-semibold text-primary leading-none ${
                    isCompact ? "text-xs" : "text-sm sm:text-base"
                  }`}
                >
                  K
                </span>
              </div>
              <AnimatePresence>
                {!isCompact && (
                  <motion.div
                    className="hidden sm:block overflow-hidden"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm font-medium text-foreground tracking-tight whitespace-nowrap">
                      Kavishwa Wendakoon
                    </p>
                    <p className="text-[11px] text-muted-foreground whitespace-nowrap">
                      Doctoral Researcher
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>

            {/* Desktop nav links */}
            <div
              className={`hidden lg:flex items-center ${
                isCompact ? "gap-0" : "gap-0.5"
              }`}
            >
              {navLinks.map((link) => {
                const id = sectionIdFromHref(link.href)
                const active = id != null && activeSection === id

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      if (id) setActiveSection(id)
                    }}
                    className={`relative px-3 py-1.5 text-[13px] transition-colors duration-200 ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}

                    {active && (
                      <motion.span
                        className="absolute bottom-0 left-3 right-3 h-px bg-primary"
                        layoutId="nav-underline"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                  </a>
                )
              })}
            </div>

            {/* CTA group */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <Link
                href="/chat"
                className={`flex items-center gap-1.5 font-medium border border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60 hover:bg-card/30 transition-all ${
                  isCompact
                    ? "px-3 py-1.5 text-[12px] rounded-full"
                    : "px-3.5 py-2 text-[13px] rounded-lg"
                }`}
                aria-label="Open AI chat to learn about Kavishwa's work and contact options"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat with Me
              </Link>
              <a
                href="mailto:kaveebhashiofficial@gmail.com"
                className={`flex items-center gap-1.5 font-medium bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all ${
                  isCompact
                    ? "px-3.5 py-1.5 text-[12px] rounded-full"
                    : "px-4 py-2 text-[13px] rounded-lg"
                }`}
                aria-label="Send email to Kavishwa Wendakoon"
              >
                Get in Touch
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-foreground hover:bg-white/4 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Scroll progress */}
          <motion.div
            className={`h-px origin-left transition-opacity duration-300 ${
              isScrolled && !isCompact ? "opacity-100" : "opacity-0"
            }`}
            style={{
              scaleX,
              background:
                "linear-gradient(90deg, var(--primary), var(--primary), transparent)",
            }}
          />
        </motion.nav>
      </motion.header>

      {/* Mobile menu — full-screen app-like overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
          <motion.div
            className="absolute inset-0 bg-background/98 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

            <div className="relative flex flex-col h-full safe-area-inset">

              {/* Mobile menu header */}
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <span className="font-serif text-base font-semibold text-primary">
                      K
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground tracking-tight">
                      Kavishwa Wendakoon
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Doctoral Researcher
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 text-foreground hover:bg-white/4 rounded-xl transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center px-6 gap-0.5">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      const id = sectionIdFromHref(link.href)
                      if (id) setActiveSection(id)
                      setIsMobileMenuOpen(false)
                    }}
                    className="group flex items-center justify-between py-4 border-b border-border/15"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.06 + i * 0.05,
                      duration: 0.4,
                      ease: [0.25, 0.4, 0, 1],
                    }}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[11px] font-mono text-primary/40 w-5">
                        {link.num}
                      </span>
                      <span className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-all" />
                  </motion.a>
                ))}
              </div>

              {/* Bottom CTAs */}
              <motion.div
                className="px-5 pb-8 pt-4 space-y-2.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/chat"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-medium border border-border/40 text-foreground rounded-xl hover:bg-card/30 transition-colors"
                  aria-label="Open AI chat to learn about Kavishwa's work and contact options"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with Me
                </Link>
                <a
                  href="mailto:kaveebhashiofficial@gmail.com"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/85 transition-colors"
                  aria-label="Send email to Kavishwa Wendakoon"
                >
                  Get in Touch
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
