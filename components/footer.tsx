"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUpRight, Copy, Check, ArrowUp } from "lucide-react"
import { FadeIn, TextReveal, RevealLine } from "./animations"

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/kvshw",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kavishwa-wendakoon/",
    icon: Linkedin,
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?hl=en&user=LtjOAsQAAAAJ",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5 12 0Z" />
      </svg>
    ),
  },
  {
    label: "ORCID",
    href: "https://orcid.org/0009-0001-1691-4750",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.209-.619-3.722-3.853-3.722h-2.466z" />
      </svg>
    ),
  },
]

const email = "kaveebhashiofficial@gmail.com"

export function Footer() {
  const [copied, setCopied] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer id="contact" className="relative border-t border-border/20">
      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />

      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 p-2.5 sm:p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-110 transition-transform"
        animate={{
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 40,
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </motion.button>

      {/* Main CTA Section */}
      <div className="relative z-10 px-5 sm:px-[8%] lg:px-[10%] pt-16 sm:pt-28 pb-12 sm:pb-20">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-foreground leading-tight mb-6 sm:mb-8">
              <TextReveal>
                If you are building systems that must adapt without losing trust, we should talk.
              </TextReveal>
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8 sm:mb-10">
              Open to collaboration on medical AI, mHealth, and
              privacy-preserving systems. I bring both industry engineering
              and doctoral research to the table.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-7 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-medium text-sm sm:text-base transition-all hover:shadow-xl hover:shadow-primary/20"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <motion.button
                onClick={copyEmail}
                className="group flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-lg border border-border/40 hover:border-border/60 transition-all"
              >
                <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors truncate">
                  {email}
                </span>
                {copied ? (
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                )}
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </div>

      <RevealLine className="mx-5 sm:mx-[10%] opacity-15" delay={0.2} />

      {/* Bottom bar */}
      <div className="relative z-10 px-5 sm:px-[8%] lg:px-[10%] py-8 sm:py-10">
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span className="text-sm hidden sm:inline">{link.label}</span>
                </a>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-8">
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {[
                { label: "Research", href: "#research" },
                { label: "Projects", href: "#projects" },
                { label: "CV", href: "#cv" },
                { label: "Publications", href: "#outputs" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Kavishwa Wendakoon
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
