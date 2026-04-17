"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Layers } from "lucide-react"
import { InteractiveModal } from "./interactive-modal"
import { FadeIn, TextReveal } from "./animations"
import { useSiteSection } from "@/hooks/use-site-section"
import type { ResearchContent } from "@/lib/site-content-defaults"
import { getLucideIcon } from "@/lib/lucide-icon"

type DomainDetails = {
  overview: string
  keyProjects: readonly string[]
  skills: readonly string[]
  papers: number
  prototypes: number
}

export function ResearchDomains() {
  const { eyebrow, title, subtitle, featured, supporting } = useSiteSection<ResearchContent>("research")
  const FeaturedIcon = getLucideIcon(featured.icon)

  const [selectedDomain, setSelectedDomain] = useState<{
    title: string
    details: DomainDetails
  } | null>(null)

  return (
    <section id="research" data-gsap-section className="relative py-20 sm:py-32">
      <div className="px-5 sm:px-[8%] lg:px-[10%]">
        <FadeIn className="mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">
            {eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground mb-3 sm:mb-4 max-w-xl">
            <TextReveal>{title}</TextReveal>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">{subtitle}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative mb-8 sm:mb-10 py-8 sm:py-10 md:py-14 px-5 sm:px-8 md:px-12 rounded-2xl bg-gradient-to-br from-surface-warm to-surface/40">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <FeaturedIcon className="w-5 h-5 text-primary" />
                <span className="text-xs font-mono text-primary tracking-wider uppercase">Primary Focus</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium text-foreground mb-4 sm:mb-5 leading-snug">
                {featured.title}
              </h3>
              <p className="text-base sm:text-lg font-serif italic text-foreground leading-relaxed mb-3 sm:mb-4">
                {featured.statement}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                {featured.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs rounded-md bg-background/50 text-muted-foreground border border-border/20"
                  >
                    {tag}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedDomain({
                      title: featured.title,
                      details: featured.details,
                    })
                  }
                  className="ml-1 sm:ml-2 flex items-center gap-1.5 text-sm text-primary hover:text-primary transition-colors"
                  aria-label={`Read more about ${featured.title}`}
                >
                  Read more
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="absolute top-6 right-6 sm:right-8 text-[80px] sm:text-[120px] font-serif font-bold text-foreground/[0.03] leading-none select-none pointer-events-none">
              01
            </div>
          </div>
        </FadeIn>

        <div data-gsap-stagger className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {supporting.map((domain, i) => {
            const Icon = getLucideIcon(domain.icon)
            return (
              <FadeIn key={domain.id} delay={0.15 + i * 0.08}>
                <motion.div
                  data-gsap-item
                  className="group relative h-full p-5 sm:p-6 md:p-7 rounded-xl border border-border/30 bg-card/30 hover:bg-card/50 hover:border-border/50 transition-all duration-500 ease-out"
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-5">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-medium text-foreground mb-2 sm:mb-3 group-hover:text-foreground transition-colors">
                    {domain.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5">
                    {domain.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                    {domain.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-[11px] rounded bg-surface/60 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border/20">
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{domain.details.papers} papers</span>
                      <span>{domain.details.prototypes} prototypes</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDomain({
                          title: domain.title,
                          details: domain.details,
                        })
                      }
                      className="p-1.5 rounded-md text-muted-foreground/70 hover:text-primary hover:bg-primary/10 transition-all sm:opacity-0 sm:group-hover:opacity-100"
                      aria-label={`Open details for research area: ${domain.title}`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>

      <InteractiveModal
        isOpen={!!selectedDomain}
        onClose={() => setSelectedDomain(null)}
        title={selectedDomain?.title || ""}
      >
        {selectedDomain && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-2">Overview</h4>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">{selectedDomain.details.overview}</p>
            </div>
            <div>
              <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-3">Key Projects</h4>
              <div className="space-y-2 sm:space-y-3">
                {selectedDomain.details.keyProjects.map((project, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-surface/50 border border-border/20 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-mono shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm sm:text-base text-foreground">{project}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDomain.details.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-sm rounded-lg bg-surface text-foreground border border-border/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-8 pt-4 border-t border-border/20">
              <div>
                <div className="text-2xl font-serif font-medium text-foreground">{selectedDomain.details.papers}</div>
                <div className="text-sm text-muted-foreground">Papers</div>
              </div>
              <div>
                <div className="text-2xl font-serif font-medium text-foreground">{selectedDomain.details.prototypes}</div>
                <div className="text-sm text-muted-foreground">Prototypes</div>
              </div>
            </div>
          </div>
        )}
      </InteractiveModal>
    </section>
  )
}
