"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  User,
  Briefcase,
  Code,
  Sparkles,
  Mail,
  ArrowUpRight,
  Bot,
  ChevronRight,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "me", label: "Me", icon: User, color: "text-primary" },
  { id: "projects", label: "Projects", icon: Briefcase, color: "text-amber-400" },
  { id: "skills", label: "Skills", icon: Code, color: "text-blue-400" },
  { id: "research", label: "Research", icon: Sparkles, color: "text-purple-400" },
  { id: "contact", label: "Contact", icon: Mail, color: "text-emerald-400" },
]

const responses: Record<string, { text: string; followUps?: string[] }> = {
  me: {
    text: "I'm Kavishwa Wendakoon — a software engineer and PhD researcher at **M3S, University of Oulu**. My work sits at the intersection of software engineering, AI, health technology, and adaptive systems. I enjoy turning research ideas into practical tools, especially systems that are useful, trustworthy, and designed for real people.",
    followUps: ["What's your research about?", "Tell me about your industry experience", "Where are you based?"],
  },
  projects: {
    text: "I've worked on projects across health tech, AI, analytics, and full-stack software engineering.\n\nMy work includes **MentalEEG**, a real-time mental workload monitoring platform, research on **runtime governance for self-adaptive AI** in clinical decision support, and software solutions involving dashboards, mobile apps, backend systems, and intelligent automation.\n\nI'm especially interested in projects where strong engineering meets meaningful impact.",
    followUps: ["Tell me more about SLRCMS", "What tech stack do you use?", "View full portfolio"],
  },
  skills: {
    text: "My core strengths are **full-stack development**, **AI-integrated software**, **research-driven system design**, and **analytical dashboards**.\n\nI work with technologies such as React, Next.js, Flutter, Flask, Node.js, Supabase, PostgreSQL, Python, TypeScript, and OpenAI-based integrations.\n\nI'm particularly strong at connecting complex ideas from research or business needs into well-structured, working software.",
    followUps: ["What's your strongest skill?", "Tell me about your research areas", "View full CV"],
  },
  research: {
    text: "My research focuses on **trustworthy self-adaptive AI systems** for healthcare and clinical decision support.\n\nI'm interested in how adaptive AI can remain safe, auditable, privacy-aware, and practically useful in sensitive domains. My broader research areas include runtime governance, software architecture for adaptive systems, medical AI, pediatric brain health, federated learning, and responsible data-driven decision-making.",
    followUps: ["What is federated learning?", "Why pediatric brain health?", "Are you open to collaboration?"],
  },
  contact: {
    text: "You can reach me at:\n\n📧 **University:** kavishwa.wendakoonmudiyanselage@oulu.fi\n📧 **Personal:** kaveebhashiofficial@gmail.com\n📍 **Location:** Oulu, Finland\n🔗 **LinkedIn:** linkedin.com/in/kavishwa-wendakoon\n\nI'm open to research collaboration, industry opportunities, and conversations around AI, software engineering, digital health, and intelligent systems. If my work aligns with your team or project, I'd be happy to connect.",
    followUps: ["Send an email", "View LinkedIn", "View full portfolio"],
  },
  greeting: {
    text: "Hi, I'm Kavishwa Wendakoon. I'm a software engineer and PhD researcher at the University of Oulu, where I work on trustworthy AI, adaptive software systems, and digital health. Ask me anything about my research, projects, skills, or experience.",
    followUps: ["Tell me about yourself", "What are you working on?", "Show me your projects"],
  },
  "What's your research about?": {
    text: "My research focuses on **trustworthy self-adaptive AI** for healthcare and clinical decision support.\n\nIn practical terms, I study how adaptive AI systems can change their behavior intelligently while still remaining safe, auditable, and governed by clear constraints. I'm particularly interested in runtime governance, system architecture, and responsible AI in sensitive domains.",
    followUps: ["Why pediatric health specifically?", "What is federated learning?", "View portfolio"],
  },
  "Tell me about your industry experience": {
    text: "I have around **three years of industry experience** as a software engineer in Sri Lanka. During that time, I worked on practical software development problems and built a strong foundation in engineering, system design, and product-focused thinking.\n\nThat experience still shapes how I approach research today — I like solutions that are not only academically interesting, but also implementable and useful in the real world.",
    followUps: ["What tech did you use?", "Tell me about SLRCMS", "View full CV"],
  },
  "Where are you based?": {
    text: "I'm based in **Oulu, Finland**, and I'm currently working at the University of Oulu. Originally, I'm from Sri Lanka, so my journey combines international academic research with industry experience from different contexts.",
    followUps: ["Tell me about your education", "Are you open to relocation?", "Contact you"],
  },
  "Why pediatric health specifically?": {
    text: "I'm interested in pediatric health because early support can have a **lifelong impact**. Building intelligent and trustworthy systems for children's health means contributing to prevention, better care decisions, and long-term well-being at a stage where timely intervention matters enormously.\n\nIt's a field where careful software and AI design can make a meaningful difference.",
    followUps: ["What is federated learning?", "Are you open to collaboration?", "View portfolio"],
  },
  "What is federated learning?": {
    text: "Federated learning is a machine learning approach where models are trained across multiple devices or organizations **without moving all the raw data into one central place**.\n\nInstead of sharing sensitive data directly, participants share model updates, which helps improve privacy and data protection. In healthcare and other sensitive domains, this makes federated learning especially valuable.",
    followUps: ["What's your research about?", "Why pediatric health specifically?", "View portfolio"],
  },
  "Are you open to collaboration?": {
    text: "Yes, absolutely. I'm open to **research collaboration**, **industry partnerships**, and **interdisciplinary projects** — especially in software engineering, AI, digital health, adaptive systems, and trustworthy intelligent applications.\n\nI enjoy working with people who want to build things that are both technically strong and socially meaningful.",
    followUps: ["Contact you", "What's your research about?", "View full portfolio"],
  },
  "Tell me more about SLRCMS": {
    text: "**SLRCMS** (Sri Lanka Readmission Case Management System) was a national-scale system I helped build at Informatics International. It replaced fragmented manual processes for managing readmission cases across the country.\n\nI led the front-end architecture and contributed to full-stack development. The project won **Merit at the National ICT Awards NBQSA 2020** and was deployed nationally in Sri Lanka.",
    followUps: ["Tell me about your industry experience", "What tech stack do you use?", "View full portfolio"],
  },
  "What tech stack do you use?": {
    text: "My work spans both research and product development, so my tech stack is broad.\n\nI commonly use **React**, **Next.js**, **Flutter**, **Flask**, **Node.js**, **Supabase**, **PostgreSQL**, **Python**, and **TypeScript**. Depending on the project, I also work with AI APIs, analytical dashboards, mobile development, and research-oriented system architectures for adaptive and privacy-aware applications.",
    followUps: ["What's your strongest skill?", "Show me your projects", "View full CV"],
  },
  "What tech did you use?": {
    text: "My work spans both research and product development, so my tech stack is broad.\n\nI commonly use **React**, **Next.js**, **Flutter**, **Flask**, **Node.js**, **Supabase**, **PostgreSQL**, **Python**, and **TypeScript**. Depending on the project, I also work with AI APIs, analytical dashboards, mobile development, and research-oriented system architectures for adaptive and privacy-aware applications.",
    followUps: ["What's your strongest skill?", "Show me your projects", "View full CV"],
  },
  "What's your strongest skill?": {
    text: "My strongest skill is **turning complex ideas into practical software systems**. I'm good at bridging research, architecture, and implementation — which means I can take a concept, design it clearly, and build it into something useful.\n\nThat applies whether I'm working on a research prototype, an AI-enabled platform, or a full-stack product.",
    followUps: ["What tech stack do you use?", "Tell me about your projects", "View full CV"],
  },
  "Tell me about your research areas": {
    text: "My research areas include **trustworthy AI**, **self-adaptive software systems**, **runtime governance**, **clinical decision support**, **digital health**, **pediatric brain health**, **federated learning**, **privacy-aware intelligent systems**, and **software architecture** for high-stakes environments.\n\nI'm especially interested in how these areas come together in systems that need to be both adaptive and dependable.",
    followUps: ["What's your research about?", "What is federated learning?", "Are you open to collaboration?"],
  },
  "Tell me about your education": {
    text: "I hold a **Master's degree in Software Engineering and Information Processing Science** from the University of Oulu, and I'm currently pursuing my **PhD** there as well.\n\nMy Bachelor's is in Software Engineering from NSBM University in Sri Lanka. My academic path has focused on software engineering, AI, adaptive systems, and healthcare-oriented intelligent software.",
    followUps: ["Where are you based?", "Are you open to relocation?", "What's your research about?"],
  },
  "Are you open to relocation?": {
    text: "Yes, I'm open to relocation for the right research or industry opportunity, especially if it aligns with **AI**, **software engineering**, **digital health**, or **advanced intelligent systems**.",
    followUps: ["Contact you", "Tell me about your skills", "View full portfolio"],
  },
  "Contact you": {
    text: "You can reach me at:\n\n📧 **University:** kavishwa.wendakoonmudiyanselage@oulu.fi\n📧 **Personal:** kaveebhashiofficial@gmail.com\n📍 **Location:** Oulu, Finland\n🔗 **LinkedIn:** linkedin.com/in/kavishwa-wendakoon\n\nI'm open to research collaboration, industry opportunities, and conversations around AI, software engineering, digital health, and intelligent systems.",
    followUps: ["Send an email", "View LinkedIn", "View full portfolio"],
  },
}

type ResponseEntry = { text: string; followUps?: string[] }

/** Routed by intent, not by user exact string — kept separate so keys are never matched as user input. */
const edgeResponses: Record<
  "unknown" | "offTopic" | "playfulBoundary" | "thanksClosure",
  ResponseEntry
> = {
  unknown: {
    text: "This assistant only covers portfolio Q&A — it’s scripted, not a general chatbot — so I don’t have a tailored answer for that. I *can* help with my background, projects, skills, research, and how to reach me:\n\n📧 **kavishwa.wendakoonmudiyanselage@oulu.fi** · **kaveebhashiofficial@gmail.com**",
    followUps: ["Tell me about yourself", "Show me your projects", "What are your skills?"],
  },
  offTopic: {
    text: "General chat isn’t in scope here — I’m a small pre-written guide for this portfolio. If something’s about my work or how to connect, pick a prompt below or ask in your own words.",
    followUps: ["Tell me about yourself", "Show me your projects", "Contact you"],
  },
  playfulBoundary: {
    text: "I’d like to keep this space respectful and on-topic. I’m happy to chat about my research, projects, skills, or how to get in touch.",
    followUps: ["Tell me about yourself", "Show me your projects", "Contact you"],
  },
  thanksClosure: {
    text: "You’re welcome. If you want to explore more:",
    followUps: ["Tell me about yourself", "Show me your projects", "What are your skills?"],
  },
}

/** Lowercase, collapse punctuation to spaces, normalize whitespace — for pattern matching only. */
function normalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w\s'-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function matchesProvocative(normalized: string, lowerText: string): boolean {
  const insultStems = [
    "stupid",
    "idiot",
    "dumb",
    "moron",
    "loser",
    "pathetic",
    "useless",
    "trash",
    "garbage",
    "suck",
    "worst",
    "hate you",
    "shut up",
    "go away",
    "screw you",
    "fuck",
    "damn you",
  ]
  if (insultStems.some((w) => normalized.includes(w))) return true
  if (
    /\b(you'?re|you are|u\s+r|ur)\s+crazy\b/.test(lowerText) ||
    /\bcrazy\s*[!.]+\s*$/.test(lowerText) ||
    /^crazy\s*[!.]*$/.test(lowerText.trim())
  ) {
    return true
  }
  if (/\bcrazy\s+(good|smart|cool|impressive|nice|talented)\b/i.test(lowerText)) return false
  if (/\bcrazy\b/.test(normalized) && normalized.split(/\s+/).length <= 8) {
    if (normalized.includes("crazy about") || normalized.includes("not crazy")) return false
    return true
  }
  return false
}

function matchesOffTopic(normalized: string, lowerText: string): boolean {
  if (
    /\bweather\b/.test(normalized) ||
    /\bjoke\b/.test(normalized) ||
    /\bmeaning of life\b/.test(normalized) ||
    /\bplay\s+a\s+game\b/.test(normalized) ||
    /\btic[\s-]?tac[\s-]?toe\b/.test(normalized)
  ) {
    return true
  }
  if (/^how\s+are\s+you(\s+doing)?\s*[!?.]*$/i.test(lowerText.trim())) return true
  if (/^how\s+r\s+u\s*[!?.]*$/i.test(lowerText.trim())) return true
  if (/^(what'?s|whats)\s+up\s*[!?.]*$/i.test(lowerText.trim())) return true
  if (/^(sup)\s*[!.?]*$/i.test(lowerText.trim())) return true
  return false
}

function matchesThanks(normalized: string, lowerText: string): boolean {
  if (/^(thanks|thank you|thx|ty|tysm|much appreciated)\b/i.test(lowerText.trim())) return true
  if (/thank(s|\s+you)/i.test(lowerText) && lowerText.length < 50) return true
  if (/^(cool|nice|great|awesome)\s*!*$/i.test(lowerText.trim())) return true
  if (/^(appreciate it|much love)\s*!*$/i.test(lowerText.trim())) return true
  if (normalized === "cheers" || normalized === "kudos") return true
  return false
}

function matchesShortGreeting(normalized: string, lowerText: string): boolean {
  const words = normalized.split(/\s+/).filter(Boolean)
  if (words.length > 4) return false
  return /^(hi|hello|hey|howdy|greetings)(\s+there)?\s*!*$/.test(lowerText.trim()) ||
    /^good\s+(morning|afternoon|evening)\s*!*$/.test(lowerText.trim())
}

function matchKeywordResponse(lowerText: string): ResponseEntry | null {
  if (lowerText.includes("about") || lowerText.includes("yourself") || lowerText.includes("who")) {
    return responses.me
  }
  if (
    lowerText.includes("project") ||
    lowerText.includes("work") ||
    lowerText.includes("built") ||
    lowerText.includes("portfolio")
  ) {
    return responses.projects
  }
  if (
    lowerText.includes("skill") ||
    lowerText.includes("tech") ||
    lowerText.includes("stack") ||
    lowerText.includes("language")
  ) {
    return responses.skills
  }
  if (
    lowerText.includes("research") ||
    lowerText.includes("phd") ||
    lowerText.includes("doctoral") ||
    lowerText.includes("ai") ||
    lowerText.includes("health")
  ) {
    return responses.research
  }
  if (
    lowerText.includes("contact") ||
    lowerText.includes("email") ||
    lowerText.includes("reach") ||
    lowerText.includes("hire") ||
    lowerText.includes("collaborate")
  ) {
    return responses.contact
  }
  if (lowerText.includes("experience") || lowerText.includes("industry") || lowerText.includes("informatics")) {
    return responses["Tell me about your industry experience"]
  }
  if (
    lowerText.includes("oulu") ||
    lowerText.includes("finland") ||
    lowerText.includes("location") ||
    lowerText.includes("based") ||
    lowerText.includes("live")
  ) {
    return responses["Where are you based?"]
  }
  if (lowerText.includes("pediatric") || lowerText.includes("children") || lowerText.includes("brain health")) {
    return responses["Why pediatric health specifically?"]
  }
  if (lowerText.includes("federated")) {
    return responses["What is federated learning?"]
  }
  if (
    lowerText.includes("education") ||
    lowerText.includes("degree") ||
    lowerText.includes("university") ||
    lowerText.includes("bachelor") ||
    lowerText.includes("master")
  ) {
    return responses["Tell me about your education"]
  }
  if (lowerText.includes("relocat") || lowerText.includes("move")) {
    return responses["Are you open to relocation?"]
  }
  if (lowerText.includes("collaborat") || lowerText.includes("partner")) {
    return responses["Are you open to collaboration?"]
  }
  if (
    lowerText.includes("slrcms") ||
    lowerText.includes("readmission") ||
    lowerText.includes("case management")
  ) {
    return responses["Tell me more about SLRCMS"]
  }
  if (lowerText.includes("strongest") || lowerText.includes("best skill") || lowerText.includes("superpower")) {
    return responses["What's your strongest skill?"]
  }
  return null
}

function resolveResponse(trimmedInput: string): ResponseEntry {
  const trimmed = trimmedInput.trim()
  if (!trimmed) {
    return edgeResponses.unknown
  }

  if (trimmed in responses) {
    return responses[trimmed as keyof typeof responses]
  }

  const normalized = normalize(trimmed)
  const lowerText = trimmed.toLowerCase()

  if (matchesProvocative(normalized, lowerText)) {
    return edgeResponses.playfulBoundary
  }
  if (matchesOffTopic(normalized, lowerText)) {
    return edgeResponses.offTopic
  }
  if (matchesThanks(normalized, lowerText)) {
    return edgeResponses.thanksClosure
  }
  if (matchesShortGreeting(normalized, lowerText)) {
    return responses.greeting
  }

  const keywordHit = matchKeywordResponse(lowerText)
  if (keywordHit) {
    return keywordHit
  }

  return edgeResponses.unknown
}

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  followUps?: string[]
}

function parseMarkdown(text: string) {
  return text
    .split("\n")
    .map((line) =>
      line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-medium">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
    )
    .join("<br/>")
}

const STORAGE_KEY = "kw-chat-messages"

const initialMessages: Message[] = [
  {
    id: "initial",
    role: "assistant",
    content: responses.greeting.text,
    followUps: responses.greeting.followUps,
  },
]

function loadMessages(): Message[] {
  if (typeof window === "undefined") return initialMessages
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Message[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return initialMessages
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMessages(loadMessages())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
      } catch {}
    }
  }, [messages, hydrated])

  const resetChat = useCallback(() => {
    setMessages(initialMessages)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isTyping) return

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: trimmed,
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsTyping(true)

      const response = resolveResponse(trimmed)

      const delay = 400 + Math.min(response.text.length * 3, 1500)

      setTimeout(() => {
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.text,
          followUps: response.followUps,
        }
        setMessages((prev) => [...prev, assistantMsg])
        setIsTyping(false)
      }, delay)
    },
    [isTyping]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleCategoryClick = (id: string) => {
    const label = categories.find((c) => c.id === id)?.label || id
    sendMessage(`Tell me about your ${label.toLowerCase()}`)
  }

  const handleFollowUp = (text: string) => {
    if (text === "View full portfolio" || text === "View portfolio") {
      window.location.href = "/"
      return
    }
    if (text === "View full CV") {
      window.location.href = "/#cv"
      return
    }
    if (text === "Send an email") {
      window.location.href = "mailto:kavishwa.wendakoonmudiyanselage@oulu.fi"
      return
    }
    if (text === "View LinkedIn") {
      window.open("https://www.linkedin.com/in/kavishwa-wendakoon/", "_blank")
      return
    }
    sendMessage(text)
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background noise-overlay">
      {/* Top bar */}
      <header className="shrink-0 border-b border-border/15 bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <span className="font-serif text-xs sm:text-sm font-semibold text-primary">K</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              Kavishwa Wendakoon
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            {messages.length > 1 && (
              <button
                onClick={resetChat}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                title="Start new chat"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">New Chat</span>
              </button>
            )}
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="hidden sm:inline">Full Portfolio</span>
              <span className="sm:hidden">Portfolio</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Welcome hero */}
          {messages.length <= 1 && (
            <motion.div
              className="pt-10 sm:pt-16 pb-6 sm:pb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/25 flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-2xl sm:text-3xl font-serif font-semibold text-primary">
                  K
                </span>
              </motion.div>
              <motion.p
                className="text-sm text-muted-foreground mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hey, I&rsquo;m Kavishwa
              </motion.p>
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground mb-2 sm:mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Doctoral Researcher
              </motion.h1>
              <motion.p
                className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Secure AI for pediatric brain health. Ask me anything about my
                research, projects, or experience.
              </motion.p>

              {/* Category chips */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 mt-6 sm:mt-8 px-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {categories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-border/30 bg-card/30 hover:bg-card/60 hover:border-border/50 transition-all duration-200 cursor-pointer"
                    >
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${cat.color}`} />
                      <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {cat.label}
                      </span>
                    </button>
                  )
                })}
              </motion.div>
            </motion.div>
          )}

          {/* Messages */}
          <div className="py-4 sm:py-6 space-y-4 sm:space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 sm:gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] sm:max-w-[85%] ${
                      msg.role === "user" ? "order-first" : ""
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-[15px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-card/50 border border-border/20 text-foreground rounded-bl-md"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdown(msg.content),
                      }}
                    />

                    {msg.role === "assistant" && msg.followUps && (
                      <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-2.5">
                        {msg.followUps.map((fu) => (
                          <button
                            key={fu}
                            onClick={() => handleFollowUp(fu)}
                            disabled={isTyping}
                            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs rounded-lg border border-border/25 bg-card/20 text-muted-foreground hover:text-foreground hover:border-border/40 hover:bg-card/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <span className="line-clamp-1">{fu}</span>
                            <ChevronRight className="w-3 h-3 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface border border-border/30 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  className="flex gap-2 sm:gap-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-card/50 border border-border/20 px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-muted-foreground/40"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="shrink-0 border-t border-border/15 bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isTyping}
              className="w-full px-4 sm:px-5 py-3 sm:py-3.5 pr-12 sm:pr-14 rounded-xl bg-card/40 border border-border/30 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:bg-card/60 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/85 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </form>
          <p className="text-[10px] sm:text-[11px] text-muted-foreground/40 text-center mt-2 sm:mt-2.5">
            Responses are pre-written, not AI-generated. Visit the{" "}
            <Link href="/" className="text-primary/60 hover:text-primary transition-colors">
              full portfolio
            </Link>{" "}
            for details.
          </p>
        </div>
      </div>
    </div>
  )
}
