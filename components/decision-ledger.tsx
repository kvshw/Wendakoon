"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FadeIn, TextReveal } from "./animations"

const decisions = [
  {
    from: "Monitoring",
    to: "Intervention",
    insight:
      "Passive observation is insufficient — systems must act when safety thresholds are crossed.",
    context:
      "Early research focused on observing AI behavior. But I realized detection without action is incomplete. If you can see a problem forming and do nothing, what was the point of seeing it?",
    year: "2022",
    phase: "Foundation",
  },
  {
    from: "Adaptation",
    to: "Governed Adaptation",
    insight:
      "Unconstrained learning creates risk. Adaptation must occur within policy boundaries.",
    context:
      "Witnessing adaptive systems drift from intended behavior led to the governance-first approach. Freedom without structure isn't intelligence — it's chaos with better marketing.",
    year: "2023",
    phase: "Reframing",
  },
  {
    from: "Model Performance",
    to: "Trust & Accountability",
    insight:
      "Accuracy alone doesn't build confidence. Transparency and auditability matter more.",
    context:
      "Stakeholder interviews revealed something humbling: users care more about understanding a system than about its benchmark scores. Trust is earned through legibility, not metrics.",
    year: "2023",
    phase: "Reframing",
  },
  {
    from: "Theory",
    to: "Executable Systems",
    insight:
      "Research impact requires implementation. Ideas must become deployable artifacts.",
    context:
      "The gap between published papers and practical adoption changed my focus. A framework that exists only in a PDF isn't a framework — it's a suggestion.",
    year: "2024",
    phase: "Integration",
  },
  {
    from: "Individual Safety",
    to: "Systemic Governance",
    insight:
      "Component-level safety doesn't guarantee system safety. Governance must be architectural.",
    context:
      "Complex system failures taught me that safety is an emergent property. You can't bolt it on at the end. It has to be designed into the architecture from the first line.",
    year: "2025",
    phase: "Current",
  },
]

export function DecisionLedger() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-warm/30 to-transparent" />

      <div className="relative px-5 sm:px-[8%] lg:px-[10%]">
        <FadeIn className="text-center mb-14 sm:mb-18 lg:mb-24">
          <p className="text-[11px] font-mono text-primary tracking-[0.2em] uppercase mb-4 sm:mb-5">
            Intellectual Evolution
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-foreground mb-4 sm:mb-5">
            <TextReveal>Decision Ledger</TextReveal>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The paradigm shifts that shaped how I think about building
            trustworthy AI. Each one a point of no return.
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central spine — desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <motion.div
              className="w-[2px] h-full bg-gradient-to-b from-transparent via-primary/25 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-10 sm:space-y-16 lg:space-y-24">
            {decisions.map((decision, i) => {
              const isRight = i % 2 !== 0
              const isExpanded = expandedIndex === i
              
              return (
                <div
                  key={i}
                  className="relative grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] items-start"
                >
                  {/* Left card or spacer */}
                  <div>
                    {!isRight && (
                      <motion.div
                        className="hidden lg:block"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.6,
                          delay: 0.1,
                          ease: [0.25, 0.4, 0, 1],
                        }}
                      >
                        <LedgerCard
                          decision={decision}
                          index={i}
                          isExpanded={isExpanded}
                          onToggle={() =>
                            setExpandedIndex(isExpanded ? null : i)
                          }
                          align="right"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Center node */}
                  <div className="hidden lg:flex justify-center">
                    <motion.div
                      className="relative z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 20,
                        delay: 0.05,
                      }}
                    >
                      <div className="w-14 h-14 rounded-full bg-background border-[2px] border-primary/30 flex flex-col items-center justify-center shadow-lg shadow-primary/5">
                        <span className="text-[11px] font-mono font-bold text-primary leading-none">
                          {decision.year.slice(2)}
                        </span>
                        <span className="text-[8px] text-muted-foreground mt-0.5">
                          {decision.phase}
                        </span>
                    </div>
                    </motion.div>
                    </div>

                  {/* Right card or spacer */}
                  <div>
                    {isRight && (
                      <motion.div
                        className="hidden lg:block"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.6,
                          delay: 0.1,
                          ease: [0.25, 0.4, 0, 1],
                        }}
                      >
                        <LedgerCard
                          decision={decision}
                          index={i}
                          isExpanded={isExpanded}
                          onToggle={() =>
                            setExpandedIndex(isExpanded ? null : i)
                          }
                          align="left"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile card */}
                  <motion.div
                    className="lg:hidden col-span-1"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.4, 0, 1] }}
                  >
                    <LedgerCard
                      decision={decision}
                      index={i}
                      isExpanded={isExpanded}
                      onToggle={() =>
                        setExpandedIndex(isExpanded ? null : i)
                      }
                      align="left"
                    />
                  </motion.div>
                </div>
              )
            })}
          </div>

          {/* End marker */}
          <motion.div
            className="hidden lg:flex justify-center mt-20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-primary/30 ring-4 ring-primary/10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LedgerCard({
  decision,
  index,
  isExpanded,
  onToggle,
  align,
}: {
  decision: (typeof decisions)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
  align: "left" | "right"
}) {
  return (
    <div
      className={`group cursor-pointer transition-all duration-300 ${
        isExpanded
          ? "bg-card/60 border border-border/40 rounded-2xl p-7 md:p-8 shadow-xl shadow-black/5"
          : "p-7 md:p-8"
      }`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onToggle()}
    >
      {/* Year badge + shift number */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs font-mono text-muted-foreground">
          {decision.year}
        </span>
        <span className="w-8 h-px bg-border/30" />
        <span className="text-[10px] font-mono text-muted-foreground/70 tracking-wider">
          SHIFT {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Transition: from → to */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-lg text-muted-foreground font-serif">
          {decision.from}
        </span>
        <ArrowRight className="w-4 h-4 text-primary/70 shrink-0" />
        <span className="text-lg font-serif font-medium text-foreground">
          {decision.to}
        </span>
      </div>

      {/* Insight — the heart of the card */}
      <p className="text-[17px] font-serif italic leading-relaxed text-foreground/90 mb-4">
        &ldquo;{decision.insight}&rdquo;
      </p>

      {/* Expandable context */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[15px] text-muted-foreground leading-relaxed pt-2 pb-2 border-t border-border/20 mt-2">
              {decision.context}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand hint */}
      {!isExpanded && (
        <p className="text-xs text-muted-foreground/70 mt-2 group-hover:text-muted-foreground transition-colors">
          Click to read the full story
        </p>
      )}
    </div>
  )
}
