"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Code, Cpu, FlaskConical, ArrowUpRight, ChevronRight, ExternalLink, Github, BookOpen } from "lucide-react"
import { InteractiveModal } from "./interactive-modal"
import { FadeIn, TextReveal, StaggerContainer, staggerItem } from "./animations"

const caseFiles = [
  {
    id: "slrcms",
    title: "SLRCMS \u2014 Readmission Case Management",
    problem: "Sri Lanka needed a modern, scalable system for managing readmission cases across the country \u2014 replacing fragmented manual processes.",
    tags: ["E-Governance", "Full-Stack", "National-Scale"],
    evidence: [
      { icon: Code, label: "System", link: "#" },
      { icon: FlaskConical, label: "Award", link: "#" },
    ],
    status: "Shipped",
    year: "2020",
    details: {
      abstract: "Designed and developed the Readmission Case Management System for Sri Lanka. This became the most significant product success for Informatics International and led to winning Merit at the National ICT Awards NBQSA 2020.",
      contribution: "Led front-end architecture and full-stack development. Designed scalable data flows for national case management.",
      impact: "Won Merit at National ICT Awards NBQSA 2020. Deployed nationally in Sri Lanka.",
      timeline: [
        { phase: "Design", duration: "2 months", complete: true },
        { phase: "Development", duration: "6 months", complete: true },
        { phase: "Testing", duration: "2 months", complete: true },
        { phase: "Deployment", duration: "1 month", complete: true },
      ],
      metrics: { accuracy: 0, papers: 0, citations: 0, users: 0 },
      links: { paper: "#", github: "#", demo: "#" },
    },
  },
  {
    id: "e-passport",
    title: "E-Passport System \u2014 IOM Sri Lanka",
    problem: "The International Organization for Migration needed a secure digital passport system for Sri Lanka with a modern web interface.",
    tags: ["E-Governance", "Security", "React", "TypeScript"],
    evidence: [
      { icon: Cpu, label: "Architecture", link: "#" },
      { icon: Code, label: "Prototype", link: "#" },
    ],
    status: "Shipped",
    year: "2021",
    details: {
      abstract: "Designed and developed the e-passport system in close collaboration with the International Organization for Migration of Sri Lanka. Built the complete front-end using React and TypeScript.",
      contribution: "Front-end architecture using React and TypeScript for a security-critical government application.",
      impact: "Deployed for national use by the International Organization for Migration of Sri Lanka.",
      timeline: [
        { phase: "Requirements", duration: "2 months", complete: true },
        { phase: "Development", duration: "8 months", complete: true },
        { phase: "Security Review", duration: "2 months", complete: true },
        { phase: "Deployment", duration: "1 month", complete: true },
      ],
      metrics: { accuracy: 0, papers: 0, citations: 0, users: 0 },
      links: { paper: "#", github: "#", demo: "#" },
    },
  },
  {
    id: "medical-web-app",
    title: "Medical Web App for Doctor Patient Management",
    problem: "Healthcare professionals needed a secure, AI-powered tool to manage patient data and automate prescription generation.",
    tags: ["Healthcare", "AI", "React", "Python"],
    evidence: [
      { icon: FileText, label: "B.Sc. Thesis", link: "#" },
      { icon: Code, label: "Prototype", link: "#" },
    ],
    status: "Completed",
    year: "2020",
    details: {
      abstract: "A secure, AI-powered web application for healthcare professionals to manage patient data and automate prescription generation. Developed as the B.Sc. thesis project at NSBM University.",
      contribution: "End-to-end design and development \u2014 from patient data modelling to AI-powered prescription automation.",
      impact: "Validated through thesis evaluation. Foundation for continued healthcare AI research.",
      timeline: [
        { phase: "Research", duration: "3 months", complete: true },
        { phase: "Development", duration: "5 months", complete: true },
        { phase: "Validation", duration: "2 months", complete: true },
        { phase: "Thesis Defense", duration: "1 month", complete: true },
      ],
      metrics: { accuracy: 0, papers: 0, citations: 0, users: 0 },
      links: { paper: "#", github: "#", demo: "#" },
    },
  },
]

export function CaseFiles() {
  const [selectedFile, setSelectedFile] = useState<(typeof caseFiles)[0] | null>(null)
  const [activeTimeline, setActiveTimeline] = useState<string | null>(null)

  const toggleTimeline = (id: string) => {
    setActiveTimeline(activeTimeline === id ? null : id)
  }

  return (
    <section id="case-files" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

      <div className="relative z-10 px-5 sm:px-[8%] lg:px-[10%]">
        <FadeIn className="mb-10 sm:mb-16">
          <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">Featured Work</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground mb-3 sm:mb-4 max-w-xl">
            <TextReveal>Case Files</TextReveal>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Research dossiers representing significant contributions to trustworthy AI systems.
            <span className="text-primary"> Click to explore each project in detail.</span>
          </p>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.12}>
          {caseFiles.map((file) => (
            <motion.div key={file.id} variants={staggerItem} className="group relative">
              <div className="relative h-full flex flex-col">
                <div className="flex items-center gap-3 mb-0">
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-surface rounded-t-lg border border-b-0 border-border/50">
                    <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">CASE/{file.id.toUpperCase()}</span>
                  </div>
                  <div className="flex-1 h-px bg-border/30" />
                  <span
                    className={`text-[11px] sm:text-xs font-medium px-2 py-0.5 sm:py-1 rounded ${
                      file.status === "Published"
                        ? "bg-primary/10 text-primary"
                        : file.status === "In Progress"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {file.status}
                  </span>
                </div>

                <motion.div
                  className="flex-1 rounded-lg rounded-tl-none border border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-500 ease-out hover:border-primary/30 hover:-translate-y-1 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedFile(file)}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-xs font-mono text-muted-foreground">{file.year}</span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <h3 className="text-base sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors">{file.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 leading-relaxed line-clamp-3">{file.problem}</p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      {file.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded bg-surface text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-border/30">
                      <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 uppercase tracking-wider">Evidence</p>
                      <div className="flex gap-2 sm:gap-3">
                        {file.evidence.map((ev, j) => {
                          const Icon = ev.icon
                          return (
                            <button
                              key={j}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-surface/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                            >
                              <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              <span className="text-[10px] sm:text-xs">{ev.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleTimeline(file.id)
                      }}
                      className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors"
                    >
                      <span className="text-[10px] sm:text-xs text-muted-foreground">View Timeline</span>
                      <motion.div animate={{ rotate: activeTimeline === file.id ? 90 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeTimeline === file.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 mt-3">
                            {file.details.timeline.map((phase, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${phase.complete ? "bg-primary" : "bg-muted-foreground/30"}`} />
                                <div className="flex-1 flex items-center justify-between">
                                  <span className={`text-xs ${phase.complete ? "text-foreground" : "text-muted-foreground"}`}>{phase.phase}</span>
                                  <span className="text-xs text-muted-foreground">{phase.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>

      <InteractiveModal isOpen={!!selectedFile} onClose={() => setSelectedFile(null)} title={selectedFile?.title || ""}>
        {selectedFile && (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span
                className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium rounded-lg ${
                  selectedFile.status === "Published"
                    ? "bg-primary/10 text-primary"
                    : selectedFile.status === "In Progress"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-blue-500/10 text-blue-400"
                }`}
              >
                {selectedFile.status}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">{selectedFile.year}</span>
            </div>

            <div>
              <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-2 sm:mb-3">Abstract</h4>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">{selectedFile.details.abstract}</p>
            </div>

            <div>
              <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-2 sm:mb-3">Key Contribution</h4>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{selectedFile.details.contribution}</p>
            </div>

            <div>
              <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-2 sm:mb-3">Impact</h4>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{selectedFile.details.impact}</p>
            </div>

            <div>
              <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-3 sm:mb-4">Project Timeline</h4>
              <div className="relative">
                <div className="hidden sm:block absolute top-4 left-4 right-4 h-0.5 bg-border">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${(selectedFile.details.timeline.filter((p) => p.complete).length / selectedFile.details.timeline.length) * 100}%`,
                    }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0, 1] }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                  {selectedFile.details.timeline.map((phase, idx) => (
                    <div key={idx} className="flex sm:flex-col items-center gap-3 sm:gap-0">
                      <motion.div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center z-10 text-xs sm:text-sm shrink-0 ${
                          phase.complete ? "bg-primary text-primary-foreground" : "bg-surface border-2 border-border text-muted-foreground"
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
                      >
                        {phase.complete ? "\u2713" : idx + 1}
                      </motion.div>
                      <div className="sm:mt-3 sm:text-center">
                        <p className={`text-xs sm:text-sm font-medium ${phase.complete ? "text-foreground" : "text-muted-foreground"}`}>{phase.phase}</p>
                        <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{phase.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-3 sm:mb-4">Key Metrics</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {Object.entries(selectedFile.details.metrics).map(([key, value]) => (
                  <motion.div
                    key={key}
                    className="p-3 sm:p-4 rounded-xl bg-surface/50 border border-border/30 text-center hover:border-primary/30 transition-all duration-500 ease-out cursor-pointer group"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                      {typeof value === "number" && value < 10 ? value.toFixed(1) : value}
                      {key === "accuracy" || key === "privacy" || key === "uptime" || key === "compliance" ? "%" : ""}
                      {key === "latency" ? "ms" : ""}
                    </div>
                    <div className="text-[11px] sm:text-xs text-muted-foreground capitalize mt-1">{key}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 border-t border-border/30">
              <a href={selectedFile.details.links.paper} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors">
                <BookOpen className="w-4 h-4" />
                Read Paper
              </a>
              <a href={selectedFile.details.links.github} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-surface border border-border text-sm hover:border-primary/30 text-foreground transition-colors">
                <Github className="w-4 h-4" />
                View Code
              </a>
              <a href={selectedFile.details.links.demo} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-surface border border-border text-sm hover:border-primary/30 text-foreground transition-colors">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </div>
          </div>
        )}
      </InteractiveModal>
    </section>
  )
}
