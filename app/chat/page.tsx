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
    text: "I'm Kavishwa Wendakoon \u2014 a Doctoral Researcher at the University of Oulu, Finland, and a former software engineer with 3+ years building national-scale systems in Sri Lanka.\n\nI did my Bachelor's in Software Engineering at NSBM University, then my Master's at the University of Oulu. Now I'm part of the Finnish Software Engineering Doctoral Pilot Program, researching secure AI for pediatric brain health.\n\nI care about what happens when AI meets the most vulnerable patients \u2014 children whose data demands the strongest protections.",
    followUps: ["What's your research about?", "Tell me about your industry experience", "Where are you based?"],
  },
  projects: {
    text: "Here are some highlights from my work:\n\n**SLRCMS** \u2014 Readmission Case Management System for Sri Lanka. Won Merit at the National ICT Awards NBQSA 2020.\n\n**E-Passport System** \u2014 Built the frontend for the International Organization for Migration of Sri Lanka using React and TypeScript.\n\n**Language Integration** \u2014 Created a language model integrating Sinhala and Tamil into Sri Lankan Government websites.\n\n**Medical Web App** \u2014 AI-powered doctor-patient management system (B.Sc. thesis).\n\n**Raptor Finance** \u2014 Cryptocurrency token on the Binance Smart Chain.",
    followUps: ["Tell me more about SLRCMS", "What tech stack do you use?", "View full portfolio"],
  },
  skills: {
    text: "**Programming:** JavaScript, TypeScript, Python, Java, PHP, Kotlin, Solidity\n\n**Web & Mobile:** React, Next.js, Node.js, Express, Flutter, HTML5/CSS3\n\n**Research:** Trustworthy AI, Generative AI, Federated Learning, Privacy-Preserving ML, mHealth\n\n**Tools:** Docker, Kubernetes, Git, Linux, SQL, RESTful APIs\n\n**Professional:** Team Leadership, Public Speaking, Data Visualization (Power BI), Critical Thinking",
    followUps: ["What's your strongest skill?", "Tell me about your research areas", "View full CV"],
  },
  research: {
    text: "My doctoral research focuses on **secure, privacy-centric AI for real-time personalized pediatric brain health management**.\n\nI'm working on:\n\u2022 Generative AI & Trustworthy AI systems\n\u2022 AI Agent-based Software Development\n\u2022 Federated learning for healthcare data\n\u2022 Software security and regulatory compliance\n\u2022 Pediatric Brain Health Management\n\nThe core question: how do we build AI that can monitor and protect children's brain health in real time \u2014 without compromising their privacy?",
    followUps: ["What is federated learning?", "Why pediatric brain health?", "Are you open to collaboration?"],
  },
  contact: {
    text: "I'd love to hear from you! Here's how to reach me:\n\n\ud83d\udce7 **Email:** kaveebhashiofficial@gmail.com\n\ud83d\udccd **Location:** Oulu, Finland\n\ud83d\udd17 **LinkedIn:** linkedin.com/in/kavishwa-wendakoon\n\nI'm open to collaboration on medical AI, mHealth, and privacy-preserving systems. Whether you're a researcher, recruiter, or industry partner \u2014 let's talk.",
    followUps: ["Send an email", "View LinkedIn", "View full portfolio"],
  },
  greeting: {
    text: "Hey! \ud83d\udc4b I'm Kavishwa \u2014 a Doctoral Researcher working on trustworthy AI for healthcare. Ask me anything about my research, projects, skills, or just say hi!",
    followUps: ["Tell me about yourself", "What are you working on?", "Show me your projects"],
  },
  "What's your research about?": {
    text: "My doctoral research at the University of Oulu focuses on building **secure, privacy-centric AI** that can monitor pediatric brain health in real time. The challenge is making AI personalized enough to be clinically useful while protecting children's data with the strongest privacy guarantees \u2014 using techniques like federated learning and on-device ML inference.",
    followUps: ["Why pediatric health specifically?", "What is federated learning?", "View portfolio"],
  },
  "Tell me about your industry experience": {
    text: "Before academia, I spent 3+ years at **Informatics International** in Colombo, Sri Lanka, building national-scale systems:\n\n\u2022 **E-Passport System** for the International Organization for Migration\n\u2022 **SLRCMS** \u2014 a case management system that won Merit at NBQSA 2020\n\u2022 **Government language integration** \u2014 Sinhala and Tamil for official websites\n\u2022 **InfoHR** \u2014 internal business management platform\n\nThat experience taught me to build systems that actually work at scale, not just prove concepts.",
    followUps: ["What tech did you use?", "Tell me about SLRCMS", "View full CV"],
  },
  "Where are you based?": {
    text: "I'm currently based in **Oulu, Finland**, where I'm doing my doctoral research at the University of Oulu. Originally from Sri Lanka \u2014 I did my Bachelor's at NSBM University in Colombo, then moved to Finland for my Master's and now the PhD.",
    followUps: ["Tell me about your education", "Are you open to relocation?", "Contact you"],
  },
  default: {
    text: "That's a great question! I'd be happy to discuss that further. Feel free to reach out at kaveebhashiofficial@gmail.com, or try one of the quick topics below to learn more about specific areas.",
    followUps: ["Tell me about yourself", "Show me your projects", "What are your skills?"],
  },
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
      if (!text.trim() || isTyping) return

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsTyping(true)

      const lowerText = text.trim().toLowerCase()
      let response = responses.default

      if (responses[text.trim()]) {
        response = responses[text.trim()]
      } else if (lowerText.includes("about") || lowerText.includes("yourself") || lowerText.includes("who")) {
        response = responses.me
      } else if (lowerText.includes("project") || lowerText.includes("work") || lowerText.includes("built") || lowerText.includes("portfolio")) {
        response = responses.projects
      } else if (lowerText.includes("skill") || lowerText.includes("tech") || lowerText.includes("stack") || lowerText.includes("language")) {
        response = responses.skills
      } else if (lowerText.includes("research") || lowerText.includes("phd") || lowerText.includes("doctoral") || lowerText.includes("ai") || lowerText.includes("health")) {
        response = responses.research
      } else if (lowerText.includes("contact") || lowerText.includes("email") || lowerText.includes("reach") || lowerText.includes("hire") || lowerText.includes("collaborate")) {
        response = responses.contact
      } else if (lowerText.includes("experience") || lowerText.includes("industry") || lowerText.includes("informatics")) {
        response = responses["Tell me about your industry experience"]
      } else if (lowerText.includes("oulu") || lowerText.includes("finland") || lowerText.includes("location") || lowerText.includes("based") || lowerText.includes("live")) {
        response = responses["Where are you based?"]
      }

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
      window.location.href = "mailto:kaveebhashiofficial@gmail.com"
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
