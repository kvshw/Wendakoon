"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Search,
  Wrench,
  HelpCircle,
  Handshake,
  FileText,
  ExternalLink,
} from "lucide-react"
import { FadeIn, TextReveal } from "./animations"

const focusBlocks = [
  {
    icon: Search,
    heading: "What I\u2019m investigating",
    summary:
      "Secure, privacy-centric AI for real-time pediatric brain health management.",
    body: "How to build AI systems that can monitor and manage pediatric brain health in real time while preserving patient privacy at every layer. The core tension: personalization requires data, but the most sensitive patients \u2014 children \u2014 deserve the strongest protections.",
    deeper:
      "I\u2019m exploring how federated learning architectures can enable collaborative model training across hospitals without centralizing sensitive patient data. The challenge is maintaining model accuracy and personalization while meeting regulatory compliance standards across different healthcare jurisdictions.",
    topics: ["Pediatric Brain Health", "Privacy-Preserving AI", "Federated Learning", "Regulatory Compliance"],
    relatedWork: [
      { label: "Doctoral Research Program", href: "#cv" },
    ],
    stat: null,
  },
  {
    icon: Wrench,
    heading: "What I\u2019m building",
    summary:
      "mHealth solutions integrating self-adaptive AI with privacy-preserving techniques.",
    body: "Mobile health platforms that bring AI-driven monitoring closer to patients and clinicians. The goal is systems that adapt to individual needs while maintaining strict privacy guarantees \u2014 using federated learning, on-device inference, and secure data pipelines.",
    deeper:
      "The architecture combines Flutter-based mobile interfaces with privacy-preserving ML backends. I\u2019m particularly focused on how AI agent-based software development can accelerate the creation of trustworthy medical applications \u2014 agents that understand both the clinical domain and the security constraints.",
    topics: ["Flutter", "Python", "Federated Learning", "mHealth", "AI Agents"],
    relatedWork: [
      { label: "Medical Web App for Doctor Patient Management", href: "#case-files" },
    ],
    stat: null,
  },
  {
    icon: HelpCircle,
    heading: "What I\u2019m questioning",
    summary:
      "Whether current AI trustworthiness frameworks are enough for pediatric healthcare.",
    body: "Whether the frameworks we use to evaluate AI trustworthiness are sufficient for the unique demands of pediatric care. Whether generative AI can be made safe enough for clinical decision support. Whether privacy and personalization are truly at odds, or if that\u2019s a false trade-off.",
    deeper:
      "Most AI safety research targets adult populations and general-purpose systems. Pediatric brain health has different risk profiles, different data constraints, and different ethical considerations. I believe we need domain-specific trustworthiness frameworks \u2014 not just adapted versions of general ones.",
    topics: ["Trustworthy AI", "Generative AI", "Software Security", "Ethics"],
    relatedWork: null,
    stat: null,
  },
  {
    icon: Handshake,
    heading: "What I\u2019m open to",
    summary:
      "Collaboration on medical AI, mHealth, and privacy-preserving systems.",
    body: "Collaboration with teams building healthcare AI systems, particularly in pediatric and brain health domains. Joint research on privacy-preserving architectures. Conversations with clinicians, researchers, and engineers working at the intersection of AI and patient care.",
    deeper:
      "I bring both industry experience (3+ years building national-scale systems at Informatics International) and research depth. I\u2019m especially interested in working with hospitals, health-tech startups, and research groups exploring federated learning for clinical applications.",
    topics: ["Healthcare AI", "Joint Research", "Industry Partnerships", "mHealth"],
    relatedWork: null,
    stat: null,
    cta: true,
  },
]

export function CurrentFocus() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = focusBlocks[activeIndex]
  const ActiveIcon = active.icon

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-deep/40 to-transparent" />

      <div className="relative z-10 px-5 sm:px-[8%] lg:px-[10%]">
        <FadeIn className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <p className="text-[11px] font-mono text-primary tracking-[0.2em] uppercase">
              Current Focus
            </p>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] font-mono text-primary">ACTIVE</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground mb-3 sm:mb-4">
            <TextReveal>Where My Attention Lives Right Now</TextReveal>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            Click each focus to explore what drives my current work.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-[280px_1fr] gap-4 sm:gap-6">
          {/* Left: Focus selectors */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar lg:overflow-visible pb-2 lg:pb-0">
            {focusBlocks.map((block, i) => {
              const Icon = block.icon
              const isActive = activeIndex === i
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl text-left transition-all duration-300 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-card border border-primary/30 shadow-lg shadow-primary/5"
                      : "bg-transparent border border-transparent hover:bg-card/40 hover:border-border/30"
                  }`}
                >
                  <div
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                      isActive ? "bg-primary/15" : "bg-surface"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-xs sm:text-sm font-medium truncate transition-colors ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {block.heading}
                    </p>
                    <p className="text-xs text-muted-foreground truncate hidden lg:block mt-0.5">
                      {block.summary}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-primary rounded-r-full hidden lg:block"
                      layoutId="focus-indicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Right: Detail panel */}
          <div className="relative min-h-[300px] sm:min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="rounded-2xl border border-border/30 bg-card/50 p-5 sm:p-8 md:p-10"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <ActiveIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-medium text-foreground">
                      {active.heading}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Focus {String(activeIndex + 1).padStart(2, "0")} of{" "}
                      {String(focusBlocks.length).padStart(2, "0")}
                    </p>
                  </div>
                </div>

                {/* Main body */}
                <p className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed mb-4 sm:mb-5">
                  {active.body}
                </p>

                {/* Deeper context */}
                <div className="p-4 sm:p-5 rounded-xl bg-surface/50 border border-border/20 mb-5 sm:mb-6">
                  <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-2 sm:mb-2.5">
                    Deeper Context
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {active.deeper}
                  </p>
                </div>

                {/* Bottom row */}
                <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-3 sm:space-y-4 flex-1">
                    {active.topics && (
                      <div className="flex flex-wrap gap-1.5">
                        {active.topics.map((t) => (
                          <span
                            key={t}
                            className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono rounded-md bg-surface border border-border/30 text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {active.relatedWork && (
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          Related:
                        </span>
                        {active.relatedWork.map((rw, j) => (
                          <a
                            key={j}
                            href={rw.href}
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-foreground transition-colors"
                          >
                            <FileText className="w-3 h-3" />
                            {rw.label}
                          </a>
                        ))}
                      </div>
                    )}

                    {active.cta && (
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 mt-1 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all group/cta"
                      >
                        Start a conversation
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
                      </a>
                    )}
                  </div>

                  {active.stat && (
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-serif font-medium text-foreground">
                        {active.stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {active.stat.label}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-border/20">
            <p className="text-sm sm:text-base font-serif italic text-muted-foreground">
              &ldquo;I care about what happens when AI meets the most
              vulnerable patients &mdash; children whose data demands the strongest
              protections.&rdquo;
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
