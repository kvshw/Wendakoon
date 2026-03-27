"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, FlaskConical, Building2, GraduationCap, ArrowRight, Mail, Calendar, FileText } from "lucide-react"
import { FadeIn, TextReveal, RevealLine } from "./animations"

const personas = [
  {
    id: "recruiters",
    label: "Recruiters",
    icon: Users,
    headline: "Doctoral Researcher with Industry Engineering Background",
    points: [
      "Doctoral researcher at University of Oulu with 3+ years industry experience",
      "Focus on secure, privacy-centric AI for pediatric brain health",
      "Built national-scale systems: e-passport, government language integration, case management",
      "Strong full-stack skills: React, TypeScript, Node.js, Python, Flutter",
    ],
    highlight: "Looking for roles bridging research and real-world healthcare AI systems",
    cta: { label: "Download CV", icon: FileText },
    stats: { experience: "3+", publications: "2", projects: "10+" },
  },
  {
    id: "researchers",
    label: "Research Collaborators",
    icon: FlaskConical,
    headline: "Exploring Trustworthy AI for Pediatric Brain Health",
    points: [
      "Current focus on privacy-centric AI for pediatric health monitoring",
      "Open to collaborative research on federated learning and mHealth",
      "Interest in trustworthy AI, generative AI, and regulatory compliance",
      "Cross-disciplinary work spanning ML, software engineering, and healthcare",
    ],
    highlight: "Seeking collaborators for joint publications in healthcare AI and privacy-preserving systems",
    cta: { label: "Propose Collaboration", icon: Mail },
    stats: { papers: "2", theses: "2", projects: "10+" },
  },
  {
    id: "industry",
    label: "Industry Partners",
    icon: Building2,
    headline: "Bridging Academic Research & Industrial Application",
    points: [
      "Experience consulting on AI governance frameworks",
      "Prototype development for clinical decision support systems",
      "Advisory capacity on responsible AI implementation",
      "Track record of research-to-product engineering",
    ],
    highlight: "Available for consulting, partnerships, and technology transfer",
    cta: { label: "Schedule Discussion", icon: Calendar },
    stats: { prototypes: "10+", partners: "4+", deployments: "3+" },
  },
  {
    id: "students",
    label: "Students",
    icon: GraduationCap,
    headline: "Resources & Mentorship for Emerging Researchers",
    points: [
      "Open to supervising undergraduate and masters projects",
      "Sharing research methodologies and best practices",
      "Guidance on navigating academic-industry boundaries",
      "Building accessible resources for AI safety research",
    ],
    highlight: "Reach out for mentorship or collaboration opportunities",
    cta: { label: "Request Mentorship", icon: Mail },
    stats: { mentees: "8+", resources: "15+", workshops: "5+" },
  },
]

export function VisitorLens() {
  const [activePersona, setActivePersona] = useState(personas[0])

  const handlePersonaChange = (persona: (typeof personas)[0]) => {
    if (persona.id === activePersona.id) return
    setActivePersona(persona)
  }

  return (
    <section id="lens" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

      <div className="relative z-10 px-5 sm:px-[8%] lg:px-[10%]">
        <FadeIn className="text-center mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">
            Adaptive Context
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground mb-3 sm:mb-4">
            <TextReveal>How Can I Help You?</TextReveal>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Select your perspective to see how my work aligns with your interests.
          </p>
        </FadeIn>

        <RevealLine className="max-w-xs mx-auto mb-8 sm:mb-12 opacity-30" delay={0.2} />

        <FadeIn delay={0.1}>
          <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 sm:mb-12 sm:flex-wrap sm:justify-center pb-1">
            {personas.map((persona) => {
              const Icon = persona.icon
              const isActive = activePersona.id === persona.id

              return (
                <button
                  key={persona.id}
                  onClick={() => handlePersonaChange(persona)}
                  className={`group relative flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg font-medium text-sm transition-all duration-500 ease-out overflow-hidden cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-surface border border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className={`relative w-4 h-4 transition-colors duration-500 ${isActive ? "" : "group-hover:text-primary"}`} />
                  <span className="relative whitespace-nowrap">{persona.label}</span>
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-foreground/50 rounded-full"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 35 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative glass rounded-2xl border border-border/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activePersona.id}
                className="relative z-10 p-5 sm:p-8 md:p-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
              >
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-5 sm:space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      <activePersona.icon className="w-3 h-3" />
                      {activePersona.label}
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-foreground leading-tight">
                      {activePersona.headline}
                    </h3>

                    <p className="text-primary/80 font-medium italic text-sm sm:text-base">
                      &ldquo;{activePersona.highlight}&rdquo;
                    </p>

                    <div className="flex gap-4 sm:gap-6 pt-2 sm:pt-4">
                      {Object.entries(activePersona.stats).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-xl sm:text-2xl font-bold text-primary">
                            {value}
                          </div>
                          <div className="text-[11px] sm:text-xs text-muted-foreground capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 mt-2 sm:mt-4 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-500 ease-out group"
                    >
                      <activePersona.cta.icon className="w-4 h-4" />
                      {activePersona.cta.label}
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </a>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {activePersona.points.map((point, i) => (
                      <motion.div
                        key={i}
                        className="w-full text-left flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-surface/30 hover:bg-surface/60 transition-all duration-500 ease-out"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0, 1] }}
                      >
                        <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-primary/50" />
                        <p className="text-sm sm:text-base text-foreground/80">
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>

        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={() => {
              const currentIndex = personas.findIndex((p) => p.id === activePersona.id)
              const nextIndex = (currentIndex + 1) % personas.length
              handlePersonaChange(personas[nextIndex])
            }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <span>
              Next: {personas[(personas.findIndex((p) => p.id === activePersona.id) + 1) % personas.length].label}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
