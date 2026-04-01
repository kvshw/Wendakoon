"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Code2, Mic, ArrowUpRight, ExternalLink, Github, Play, Star, Eye, Download, Filter, X } from "lucide-react"
import { InteractiveModal } from "./interactive-modal"
import { FadeIn, TextReveal } from "./animations"

const outputs = {
  publications: [
    {
      title: "Reducing Cognitive Overload in Software Engineers: A Design Science Approach",
      venue: "TKTP 2025 \u2014 Annual Doctoral Symposium of Computer Science, Helsinki",
      type: "Conference Paper",
      link: "https://ceur-ws.org/Vol-4181/paper16.pdf",
      abstract: "Software engineers often face Mental Workload (MWL) challenges, such as burnout and reduced performance, due to the demanding nature of their work. This paper introduces MentalEEG, a web-based MWL monitoring system developed through an iterative Design Science Research methodology to enhance employee well-being in high-demand cognitive environments. MentalEEG integrates subjective self-assessments and EEG data to provide personalized real-time insights for managing MWL. Using large language models (LLMs), its user-centric dashboard offers real-time analytics and recommendations aligned with organizational health guidelines, enabling proactive interventions to prevent burnout and cognitive overload.",
      citations: 0,
      year: 2025,
    },
    {
      title: "AI-Driven Mental Workload Monitoring and Well-Being Management in Workplace Settings",
      venue: "University of Oulu \u2014 M.Sc. Thesis",
      type: "Thesis",
      link: "#",
      abstract: "Exploring how AI can monitor mental workload in real time and support well-being management in workplace environments, integrating EEG data with subjective assessments and LLM-driven recommendations for organizational-level insights.",
      citations: 0,
      year: 2024,
    },
    {
      title: "Doctor-Patient Management Software and Its Validation",
      venue: "NSBM University \u2014 B.Sc. Thesis",
      type: "Thesis",
      link: "#",
      abstract: "Design and validation of a secure, AI-powered web application for healthcare professionals to manage patient data and automate prescription generation.",
      citations: 0,
      year: 2020,
    },
  ],
  prototypes: [
    {
      title: "Medical Web App for Doctor Patient Management",
      description: "AI-powered web app for healthcare professionals to manage patient data and automate prescriptions",
      tech: ["React", "JavaScript", "Python"],
      link: "#",
      github: "#",
      stars: 0,
      downloads: 0,
    },
    {
      title: "SLRCMS \u2014 Readmission Case Management System",
      description: "National-scale case management system for Sri Lanka \u2014 Merit at NBQSA 2020",
      tech: ["React", "TypeScript", "Node.js"],
      link: "#",
      github: "#",
      stars: 0,
      downloads: 0,
    },
    {
      title: "Raptor Finance",
      description: "Cryptocurrency token on the Binance Smart Chain",
      tech: ["PHP", "Solidity"],
      link: "#",
      github: "#",
      stars: 0,
      downloads: 0,
    },
    {
      title: "Student Management App",
      description: "Android app for teachers to manage students using Kotlin and Firebase",
      tech: ["Kotlin", "Firebase"],
      link: "#",
      github: "#",
      stars: 0,
      downloads: 0,
    },
  ],
  talks: [
    {
      title: "Secure AI for Pediatric Brain Health",
      event: "University of Oulu Doctoral Seminar",
      type: "Talk",
      date: "2025",
      videoUrl: "#",
      slides: "#",
    },
  ],
}

type TabType = "publications" | "prototypes" | "talks"

export function SelectedOutputs() {
  const [activeTab, setActiveTab] = useState<TabType>("publications")
  const [selectedPub, setSelectedPub] = useState<(typeof outputs.publications)[0] | null>(null)
  const [filter, setFilter] = useState<string | null>(null)

  const tabs = [
    { id: "publications" as TabType, label: "Publications", icon: FileText, count: outputs.publications.length },
    { id: "prototypes" as TabType, label: "Prototypes", icon: Code2, count: outputs.prototypes.length },
    { id: "talks" as TabType, label: "Talks & Writing", icon: Mic, count: outputs.talks.length },
  ]

  const filteredPrototypes = filter ? outputs.prototypes.filter((p) => p.tech.includes(filter)) : outputs.prototypes
  const allTech = [...new Set(outputs.prototypes.flatMap((p) => p.tech))]

  return (
    <section className="relative py-20 sm:py-32">
      <div className="px-5 sm:px-[8%] lg:px-[10%]">
        <FadeIn className="mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">Selected Work</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground mb-3 sm:mb-4">
            <TextReveal>Outputs</TextReveal>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            A curated selection of research publications, working prototypes, and public presentations.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 sm:mb-8 pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 shrink-0 ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
                  }`}
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
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {outputs.publications.map((pub, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedPub(pub)}
                    className="group w-full text-left flex items-start justify-between p-4 sm:p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 ease-out hover:border-primary/30 hover:bg-surface/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="px-2 py-0.5 text-[11px] sm:text-xs font-medium rounded bg-primary/10 text-primary">{pub.type}</span>
                        <span className="text-[11px] sm:text-xs text-muted-foreground truncate">{pub.venue}</span>
                        <span className="text-[11px] sm:text-xs text-muted-foreground">&bull;</span>
                        <span className="text-[11px] sm:text-xs text-muted-foreground">{pub.year}</span>
                      </div>
                      <h3 className="text-sm sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{pub.title}</h3>
                      <div className="flex items-center gap-4 mt-2 sm:mt-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="w-3 h-3" />
                          {pub.citations} citations
                        </span>
                      </div>
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
                      key={tech}
                      onClick={() => setFilter(filter === tech ? null : tech)}
                      className={`px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs rounded-full transition-all ${
                        filter === tech
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface text-muted-foreground hover:text-foreground hover:bg-surface/80"
                      }`}
                    >
                      {tech}
                    </motion.button>
                  ))}
                  {filter && (
                    <button onClick={() => setFilter(null)} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                  {filteredPrototypes.map((proto, i) => (
                    <motion.div
                      key={proto.title}
                      className="group relative p-4 sm:p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 ease-out hover:border-primary/30 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-surface border border-border/50 group-hover:border-primary/30 transition-colors">
                            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          </div>
                          <div className="flex gap-2">
                            <a href={proto.github} className="p-1 text-muted-foreground hover:text-foreground transition-colors sm:opacity-0 sm:group-hover:opacity-100">
                              <Github className="w-4 h-4" />
                            </a>
                            <a href={proto.link} className="p-1 text-muted-foreground hover:text-foreground transition-colors sm:opacity-0 sm:group-hover:opacity-100">
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
                              key={t}
                              onClick={() => setFilter(filter === t ? null : t)}
                              className={`px-2 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                                filter === t
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-surface text-muted-foreground hover:bg-primary/10 hover:text-primary"
                              }`}
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
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {outputs.talks.map((talk, i) => (
                  <motion.div
                    key={i}
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
                          <a href={talk.videoUrl} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors">
                            <Play className="w-3 h-3" />
                            Watch
                          </a>
                          <a href={talk.slides} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-surface text-muted-foreground text-xs hover:text-foreground transition-colors">
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
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium rounded-lg bg-primary/10 text-primary">{selectedPub.type}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{selectedPub.venue}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{selectedPub.year}</span>
            </div>
            <div>
              <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-2 sm:mb-3">Abstract</h4>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">{selectedPub.abstract}</p>
            </div>
            <div className="flex items-center gap-6 pt-4 border-t border-border/30">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary">{selectedPub.citations}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Citations</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a href={selectedPub.link} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Read Paper
              </a>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-surface border border-border text-sm text-foreground hover:border-primary/30 transition-colors">
                <FileText className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        )}
      </InteractiveModal>
    </section>
  )
}
