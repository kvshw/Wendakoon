"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Download,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  ChevronDown,
  MapPin,
} from "lucide-react"
import { FadeIn, TextReveal } from "./animations"

const milestones = [
  {
    year: "2024 \u2013",
    role: "Doctoral Researcher",
    place: "University of Oulu, Finland",
    type: "research" as const,
    summary:
      "Selected for the Finnish Software Engineering Doctoral Pilot Program. Research focuses on secure, privacy-centric AI for real-time personalized pediatric brain health management and advancing mHealth technologies.",
    achievements: [
      "Research on Generative AI, Trustworthy AI, and AI Agent-based Software Development",
      "Focus on Software Security, Regulatory Compliance, and Pediatric Brain Health",
      "Developing innovative medical AI solutions for mobile health (mHealth)",
      "Integrating self-adaptive AI, federated learning, and privacy-preserving techniques",
    ],
    technologies: ["Python", "Machine Learning", "Federated Learning", "Kubernetes", "Flutter"],
  },
  {
    year: "2019 \u2013 22",
    role: "Software Engineer",
    place: "Informatics International Pvt LTD, Colombo, Sri Lanka",
    type: "industry" as const,
    summary:
      "Full-stack development on national-scale systems \u2014 e-passport infrastructure, government language integration, and case management platforms.",
    achievements: [
      "Built InfoHR internal business management system using React, Node, and Express",
      "Designed and developed the e-passport system for the International Organization for Migration of Sri Lanka",
      "Created a language model integrating Sinhala and Tamil into Sri Lankan Government websites",
      "Developed SLRCMS \u2014 won Merit at National ICT Awards NBQSA 2020",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "SQL"],
  },
  {
    year: "2022 \u2013 24",
    role: "M.Sc. Software Engineering",
    place: "University of Oulu, Finland",
    type: "education" as const,
    summary:
      "Master\u2019s thesis on AI-driven mental workload monitoring and well-being management in workplace settings.",
    achievements: [
      "Thesis on AI-driven mental workload monitoring and workplace well-being",
      "Advanced coursework in software architecture and AI systems",
      "Selected for the Doctoral Pilot Program upon completion",
    ],
    technologies: ["Python", "Machine Learning", "Research Methods", "LaTeX"],
  },
  {
    year: "2017 \u2013 20",
    role: "B.Sc. Software Engineering",
    place: "NSBM University, Colombo, Sri Lanka",
    type: "education" as const,
    summary:
      "Bachelor\u2019s thesis on doctor-patient management software and its validation. Built foundation in full-stack development and healthcare-oriented software.",
    achievements: [
      "Thesis on doctor-patient management software and validation",
      "Developed Medical Web App for Doctor Patient Management",
      "Built Raptor Finance cryptocurrency project on Binance Smart Chain",
      "Created Student Management App using Kotlin and Firebase",
    ],
    technologies: ["Java", "JavaScript", "Python", "React", "Kotlin", "PHP", "Solidity"],
  },
]

const skillCategories: Record<string, string[]> = {
  "Research Areas": [
    "Trustworthy AI",
    "Generative AI",
    "Federated Learning",
    "Privacy-Preserving ML",
    "Pediatric Brain Health",
    "mHealth",
    "Regulatory Compliance",
  ],
  Programming: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "Kotlin", "Solidity"],
  "Web & Mobile": ["React", "Next.js", "Node.js", "Express", "Flutter", "HTML5 & CSS3"],
  "Tools & Platforms": ["Git", "GitHub", "GitLab", "Docker", "Kubernetes", "Linux/Unix", "SQL", "RESTful APIs"],
  "Professional Skills": ["Data Visualization (Power BI)", "Critical Thinking", "Team Leadership", "Public Speaking", "Decision-Making"],
}

const awards = [
  {
    title: "Merit Award \u2014 National ICT Awards NBQSA",
    venue: "NBQSA 2020",
    year: "2020",
    note: "Won for SLRCMS (Readmission Case Management System for Sri Lanka) \u2014 the most significant product success for Informatics International.",
  },
  {
    title: "Finnish Doctoral Pilot Program Selection",
    venue: "University of Oulu",
    year: "2024",
    note: "Selected for the Finnish Software Engineering Doctoral Pilot Program based on MSc performance and research potential.",
  },
]

const highlights = [
  { label: "Years in Industry", value: "3+" },
  { label: "Projects Shipped", value: "10+" },
  { label: "National-Scale Systems", value: "4" },
  { label: "Awards", value: "2" },
]

type Tab = "timeline" | "skills" | "awards"

const tabs: { id: Tab; label: string; icon: typeof Briefcase }[] = [
  { id: "timeline", label: "Timeline", icon: Briefcase },
  { id: "skills", label: "Skills & Tools", icon: Code },
  { id: "awards", label: "Awards", icon: Award },
]

export function CVSection() {
  const [activeTab, setActiveTab] = useState<Tab>("timeline")
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)
  const [activeSkillCat, setActiveSkillCat] = useState("Research Areas")

  return (
    <section id="cv" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="relative px-5 sm:px-[8%] lg:px-[10%]">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
            <div>
              <p className="text-[11px] font-mono text-primary tracking-[0.2em] uppercase mb-3 sm:mb-4">
                Experience & Background
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground">
                <TextReveal>Experience & Background</TextReveal>
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-lg">
                Research positions, industry roles, skills, and awards.
              </p>
            </div>
            <a
              href="#"
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-primary/20 transition-all shrink-0 self-start sm:self-auto"
            >
              <Download className="w-4 h-4 group-hover:animate-bounce" />
              Download Full CV
            </a>
          </div>
        </FadeIn>

        {/* Stat highlights */}
        <FadeIn delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                className="text-center sm:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="text-2xl sm:text-3xl font-serif font-medium text-foreground">
                  {h.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {h.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Tab bar */}
        <FadeIn delay={0.1}>
          <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto no-scrollbar pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/40 border border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </FadeIn>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
            >
              <div className="space-y-2 sm:space-y-3">
                {milestones.map((m, i) => {
                  const isOpen = expandedIndex === i
                  return (
                    <motion.div
                      key={i}
                      className={`rounded-xl border transition-all duration-300 ${
                        isOpen
                          ? "bg-card/60 border-primary/25 shadow-lg shadow-primary/5"
                          : "bg-card/30 border-border/25 hover:border-border/40"
                      }`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <button
                        onClick={() =>
                          setExpandedIndex(isOpen ? null : i)
                        }
                        className="w-full text-left p-4 sm:p-5 md:p-6 cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div className="flex items-start gap-3 sm:gap-4 md:gap-6 flex-1 min-w-0">
                            <span className="text-[11px] sm:text-xs font-mono text-muted-foreground pt-1 tabular-nums shrink-0 w-[60px] sm:w-[72px] md:w-[88px]">
                              {m.year}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm sm:text-base font-medium text-foreground">
                                  {m.role}
                                </h4>
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                    m.type === "research"
                                      ? "bg-primary/10 text-primary border-primary/20"
                                      : m.type === "industry"
                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                  }`}
                                >
                                  {m.type}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-primary mt-0.5 flex items-center gap-1">
                                <MapPin className="w-3 h-3 shrink-0" />
                                <span className="truncate">{m.place}</span>
                              </p>
                              {!isOpen && (
                                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 line-clamp-1">
                                  {m.summary}
                                </p>
                              )}
                            </div>
                          </div>
                          <motion.div
                            className={`p-1 sm:p-1.5 rounded-md shrink-0 transition-colors ${
                              isOpen ? "bg-primary/10" : "bg-surface/50"
                            }`}
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <ChevronDown
                              className={`w-4 h-4 ${
                                isOpen
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </motion.div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.25, 0.4, 0, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 pt-0 space-y-4">
                              <div className="pl-0 sm:pl-[84px] md:pl-[112px]">
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                                  {m.summary}
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-2">
                                      Key Achievements
                                    </p>
                                    <ul className="space-y-1.5">
                                      {m.achievements.map((a, j) => (
                                        <li
                                          key={j}
                                          className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90"
                                        >
                                          <span className="text-primary mt-0.5 sm:mt-1 shrink-0">
                                            &#8226;
                                          </span>
                                          {a}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-2">
                                      Technologies
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {m.technologies.map((t) => (
                                        <span
                                          key={t}
                                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono rounded-md bg-surface border border-border/30 text-muted-foreground"
                                        >
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
            >
              <div className="grid lg:grid-cols-[240px_1fr] gap-4 sm:gap-6">
                {/* Category selectors */}
                <div className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar lg:overflow-visible pb-2 lg:pb-0">
                  {Object.keys(skillCategories).map((cat) => {
                    const isActive = activeSkillCat === cat
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveSkillCat(cat)}
                        className={`relative text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm transition-all duration-300 shrink-0 cursor-pointer whitespace-nowrap ${
                          isActive
                            ? "bg-card border border-primary/25 text-foreground font-medium shadow-md shadow-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-card/40 border border-transparent"
                        }`}
                      >
                        {cat}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {skillCategories[cat].length}
                        </span>
                        {isActive && (
                          <motion.div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-primary rounded-r-full hidden lg:block"
                            layoutId="skill-indicator"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                            }}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Skill tags */}
                <div className="rounded-2xl border border-border/30 bg-card/50 p-5 sm:p-8 md:p-10">
                  <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase mb-2">
                    {activeSkillCat}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-6">
                    {activeSkillCat === "Research Areas"
                      ? "Core research domains spanning my doctoral and applied work."
                      : activeSkillCat === "Programming"
                        ? "Languages I use across research, web, mobile, and blockchain."
                        : activeSkillCat === "Web & Mobile"
                          ? "Frameworks and tools for full-stack and mobile development."
                          : activeSkillCat === "Tools & Platforms"
                            ? "Infrastructure, version control, and deployment technologies."
                            : "Soft skills honed through industry and research collaboration."}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSkillCat}
                      className="flex flex-wrap gap-2 sm:gap-2.5"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      {skillCategories[activeSkillCat].map((skill, i) => (
                        <motion.span
                          key={skill}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border border-border/30 text-foreground bg-surface/50 hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-default"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Languages below */}
              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { lang: "English", level: "Fluent", pct: 95 },
                  { lang: "Sinhala", level: "Native", pct: 100 },
                  { lang: "Tamil", level: "Conversational", pct: 55 },
                ].map((l, i) => (
                  <motion.div
                    key={l.lang}
                    className="p-3 sm:p-4 rounded-xl bg-card/30 border border-border/20"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {l.lang}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {l.level}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-primary/60"
                        initial={{ width: 0 }}
                        animate={{ width: `${l.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "awards" && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
              className="grid sm:grid-cols-2 gap-3 sm:gap-4"
            >
              {awards.map((a, i) => (
                <motion.div
                  key={i}
                  className="group p-4 sm:p-6 rounded-xl border border-border/25 bg-card/30 hover:bg-card/50 hover:border-primary/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors">
                        {a.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-primary mt-0.5">
                        {a.venue}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {a.year}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
                        {a.note}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-border/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Based in Oulu, Finland. Open to research positions and
              collaborations worldwide.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-foreground transition-colors shrink-0"
            >
              Get in touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
