"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Code2, Mic, ArrowUpRight, ExternalLink, Github, Play, Star, Download, Filter, X } from "lucide-react"
import { InteractiveModal } from "./interactive-modal"
import { FadeIn, TextReveal } from "./animations"
import { useSiteSection } from "@/hooks/use-site-section"
import type { OutputsContent } from "@/lib/site-content-defaults"

type TabType = "publications" | "prototypes" | "talks"

export function SelectedOutputs() {
  const { eyebrow, title, subtitle, publications, prototypes, talks } = useSiteSection<OutputsContent>("outputs")
  const [activeTab, setActiveTab] = useState<TabType>("publications")
  const [selectedPub, setSelectedPub] = useState<OutputsContent["publications"][number] | null>(null)
  const [filter, setFilter] = useState<string | null>(null)

  const tabs = [
    { id: "publications" as TabType, label: "Publications", icon: FileText, count: publications.length },
    { id: "prototypes" as TabType, label: "Prototypes", icon: Code2, count: prototypes.length },
    { id: "talks" as TabType, label: "Talks & Writing", icon: Mic, count: talks.length },
  ]

  const filteredPrototypes = filter
    ? prototypes.filter((p) => (p.tech as readonly string[]).includes(filter))
    : prototypes
  const allTech = [...new Set(prototypes.flatMap((p) => p.tech))]

  return (
    <section data-gsap-section className="relative py-20 sm:py-32">
      <div className="px-5 sm:px-[8%] lg:px-[10%]">
        <FadeIn className="mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">{eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground mb-3 sm:mb-4">
            <TextReveal>{title}</TextReveal>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">{subtitle}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 sm:mb-8 pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 shrink-0 ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Show ${tab.label} tab`}
                >
                  <Icon className="relative w-4 h-4" />
                  <span className="relative">{tab.label}</span>
                  <span className={`relative px-1.5 py-0.5 text-xs rounded transition-colors ${isActive ? "bg-primary/20" : "bg-surface"}`}>
                    {tab.count}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AnimatePresence mode="wait">
            {activeTab === "publications" && (
              <motion.div
                key="publications"
                data-gsap-stagger
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {publications.map((pub, i) => (
                  <motion.button
                    type="button"
                    key={i}
                    data-gsap-item
                    onClick={() => setSelectedPub(pub)}
                    className="group w-full text-left flex items-start justify-between p-4 sm:p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 ease-out hover:border-primary/30 hover:bg-surface/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    aria-label={`Open publication details: ${pub.title}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="px-2 py-0.5 text-[11px] sm:text-xs font-medium rounded bg-primary/10 text-primary">{pub.type}</span>
                        <span className="text-[11px] sm:text-xs text-muted-foreground truncate">{pub.venue}</span>
                        <span className="text-[11px] sm:text-xs text-muted-foreground">&bull;</span>
                        <span className="text-[11px] sm:text-xs text-muted-foreground">{pub.year}</span>
                      </div>
                      <h3 className="text-sm sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{pub.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 line-clamp-1">{pub.takeaway}</p>
                      {pub.link && pub.link !== "#" && (
                        <div className="flex items-center gap-3 mt-2 sm:mt-3">
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 text-xs text-primary hover:text-foreground transition-colors"
                          >
                            <FileText className="w-3 h-3" />
                            PDF
                          </a>
                        </div>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-3 mt-1" />
                  </motion.button>
                ))}
              </motion.div>
            )}

            {activeTab === "prototypes" && (
              <motion.div
                key="prototypes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-muted-foreground mr-1 sm:mr-2">Filter:</span>
                  {allTech.map((tech) => (
                    <motion.button
                      type="button"
                      key={tech}
                      onClick={() => setFilter(filter === tech ? null : tech)}
                      className={`px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs rounded-full transition-all ${
                        filter === tech
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface text-muted-foreground hover:text-foreground hover:bg-surface/80"
                      }`}
                      aria-pressed={filter === tech}
                      aria-label={`Filter prototypes by ${tech}`}
                    >
                      {tech}
                    </motion.button>
                  ))}
                  {filter && (
                    <button type="button" onClick={() => setFilter(null)} className="p-1 text-muted-foreground hover:text-foreground transition-colors" aria-label="Clear prototype technology filter">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4" data-gsap-stagger>
                  {filteredPrototypes.map((proto, i) => (
                    <motion.div
                      key={proto.title}
                      data-gsap-item
                      className="group relative p-4 sm:p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 ease-out hover:border-primary/30 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        {proto.imageUrl ? (
                          <div className="mb-3 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 h-28 overflow-hidden rounded-t-xl border-b border-border/30">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={proto.imageUrl} alt="" className="h-full w-full object-cover" />
                          </div>
                        ) : null}
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-surface border border-border/50 group-hover:border-primary/30 transition-colors">
                            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          </div>
                          <div className="flex gap-2">
                            <a href={proto.github} className="p-1 text-muted-foreground hover:text-foreground transition-colors sm:opacity-0 sm:group-hover:opacity-100" aria-label={`View GitHub repository for ${proto.title}`}>
                              <Github className="w-4 h-4" />
                            </a>
                            <a href={proto.link} className="p-1 text-muted-foreground hover:text-foreground transition-colors sm:opacity-0 sm:group-hover:opacity-100" aria-label={`Open external link for ${proto.title}`}>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        <h3 className="text-sm sm:text-lg font-medium text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">{proto.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{proto.description}</p>
                        <div className="flex items-center gap-4 mb-3 sm:mb-4">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="w-3 h-3" />
                            {proto.stars}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Download className="w-3 h-3" />
                            {proto.downloads}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {proto.tech.map((t) => (
                            <button
                              type="button"
                              key={t}
                              onClick={() => setFilter(filter === t ? null : t)}
                              className={`px-2 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                                filter === t
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-surface text-muted-foreground hover:bg-primary/10 hover:text-primary"
                              }`}
                              aria-pressed={filter === t}
                              aria-label={`Filter prototypes by ${t}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "talks" && (
              <motion.div
                key="talks"
                data-gsap-stagger
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {talks.map((talk, i) => (
                  <motion.div
                    key={i}
                    data-gsap-item
                    className="group flex flex-col sm:flex-row sm:items-start sm:justify-between p-4 sm:p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 ease-out hover:border-primary/30 hover:bg-surface/50 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-surface border border-border/50 group-hover:border-primary/30 transition-colors shrink-0">
                        <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{talk.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {talk.event} &bull; {talk.date}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <a href={talk.videoUrl} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors" aria-label={`Watch video: ${talk.title}`}>
                            <Play className="w-3 h-3" />
                            Watch
                          </a>
                          <a href={talk.slides} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-surface text-muted-foreground text-xs hover:text-foreground transition-colors" aria-label={`Open slides for ${talk.title}`}>
                            <FileText className="w-3 h-3" />
                            Slides
                          </a>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-surface text-muted-foreground self-start">{talk.type}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </FadeIn>
      </div>

      <InteractiveModal isOpen={!!selectedPub} onClose={() => setSelectedPub(null)} title={selectedPub?.title || ""}>
        {selectedPub && (
          <div className="space-y-5 sm:space-y-6">
            {selectedPub.imageUrl ? (
              <div className="rounded-xl overflow-hidden border border-border/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedPub.imageUrl} alt="" className="w-full max-h-56 object-cover" />
              </div>
            ) : null}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium rounded-lg bg-primary/10 text-primary">{selectedPub.type}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{selectedPub.venue}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{selectedPub.year}</span>
            </div>
            <div>
              <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-2 sm:mb-3">Abstract</h4>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">{selectedPub.abstract}</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 border-t border-border/30">
              {selectedPub.link && selectedPub.link !== "#" && (
                <a href={selectedPub.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors" aria-label={`Read paper PDF: ${selectedPub.title}`}>
                  <ExternalLink className="w-4 h-4" />
                  Read Paper (PDF)
                </a>
              )}
            </div>
          </div>
        )}
      </InteractiveModal>
    </section>
  )
}
