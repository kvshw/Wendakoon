/** Serializable site content (icons = Lucide export names). Used when Convex has no row for a section. */

export const SITE_SECTION_KEYS = [
  "research",
  "projects",
  "researchJourney",
  "experience",
  "outputs",
  "currentFocus",
] as const

export type SiteSectionKey = (typeof SITE_SECTION_KEYS)[number]

export const DEFAULT_RESEARCH = {
  eyebrow: "Research Areas",
  title: "Research Areas",
  subtitle:
    "Four interconnected domains, each informing the others to create cohesive, trustworthy AI systems.",
  featured: {
    id: "pediatric-ai",
    title: "Pediatric Brain Health AI",
    statement:
      "My central research question: how do we build AI that can monitor and protect children's brain health in real time — without compromising their privacy?",
    description:
      "I'm developing secure, privacy-centric AI for real-time personalized pediatric brain health management. This means integrating federated learning, self-adaptive systems, and regulatory compliance into mobile health platforms that clinicians and families can trust.",
    icon: "Shield",
    tags: ["Pediatric Health", "Privacy-Preserving AI", "Federated Learning", "Regulatory Compliance"],
    details: {
      overview:
        "Pediatric brain health requires AI systems that are not only accurate but also deeply privacy-aware — working with the most sensitive patient population demands the strongest protections at every layer.",
      keyProjects: [
        "Privacy-Preserving Federated Architecture for pediatric health data",
        "Real-time brain health monitoring with on-device ML inference",
        "Regulatory compliance framework for cross-jurisdiction healthcare AI",
      ],
      skills: ["Python", "Federated Learning", "Flutter", "Machine Learning", "Privacy Engineering"],
      papers: 1,
      prototypes: 1,
    },
  },
  supporting: [
    {
      id: "trustworthy-ai",
      title: "Trustworthy & Generative AI",
      description:
        "Building AI systems that are transparent, explainable, and meet regulatory compliance standards for high-stakes domains.",
      icon: "Brain",
      tags: ["Generative AI", "Explainability", "AI Agent-based Development"],
      details: {
        overview:
          "Trustworthy AI goes beyond accuracy — it requires systems that can explain their reasoning, operate within defined boundaries, and adapt to changing regulatory landscapes.",
        keyProjects: [
          "AI Agent-based Software Development research",
          "Trustworthiness evaluation frameworks for generative models",
          "Software security analysis for AI-driven applications",
        ],
        skills: ["Python", "Machine Learning", "LLMs", "Security Analysis"],
        papers: 1,
        prototypes: 1,
      },
    },
    {
      id: "mhealth",
      title: "mHealth & Mobile AI",
      description:
        "Advancing mobile health solutions that bring AI-driven monitoring closer to patients and clinicians through privacy-preserving architectures.",
      icon: "HeartPulse",
      tags: ["Mobile Health", "Flutter", "On-Device ML", "Patient Management"],
      details: {
        overview:
          "Mobile health platforms can democratize access to AI-driven care — but only if they're built with privacy, reliability, and usability at their core.",
        keyProjects: [
          "Medical Web App for Doctor Patient Management",
          "AI-driven mental workload monitoring (MSc thesis)",
          "mHealth platform architecture with federated learning backend",
        ],
        skills: ["Flutter", "React", "Python", "JavaScript", "Firebase"],
        papers: 1,
        prototypes: 3,
      },
    },
    {
      id: "engineering",
      title: "Full-Stack & Systems Engineering",
      description:
        "3+ years building national-scale production systems — from e-passport infrastructure to government language integration.",
      icon: "Rocket",
      tags: ["E-Governance", "System Architecture", "Full-Stack Development"],
      details: {
        overview:
          "Before research, I shipped real systems at national scale. That industry foundation shapes how I approach research — everything I build is designed to work, not just to prove a concept.",
        keyProjects: [
          "E-Passport System for International Organization for Migration, Sri Lanka",
          "SLRCMS — Readmission Case Management System (Merit at NBQSA 2020)",
          "Sinhala/Tamil language integration for Sri Lankan Government websites",
          "InfoHR — Internal Business Management System",
        ],
        skills: ["React", "TypeScript", "Node.js", "Express", "SQL", "Docker"],
        papers: 0,
        prototypes: 5,
      },
    },
  ],
} as const

export const DEFAULT_PROJECTS = {
  eyebrow: "Featured Work",
  title: "Selected Projects",
  subtitle: "National-scale systems, healthcare AI, and research prototypes.",
  subtitleAccent: "Click any project for details.",
  caseFiles: [
    {
      id: "slrcms",
      ownerType: "company" as const,
      title: "SLRCMS — Readmission Case Management",
      coverImageUrl: "" as string | undefined,
      problem:
        "Sri Lanka needed a modern, scalable system for managing readmission cases across the country — replacing fragmented manual processes.",
      tags: ["E-Governance", "Full-Stack", "National-Scale"],
      evidence: [
        { icon: "Building2", label: "Deployed System", link: "" },
        { icon: "FlaskConical", label: "Award", link: "https://nbqsa.com/nbqsa-2020/" },
      ],
      status: "Shipped",
      year: "2020",
      details: {
        abstract:
          "Designed and developed the Readmission Case Management System for Sri Lanka. This became the most significant product success for Informatics International and led to winning Merit at the National ICT Awards NBQSA 2020.",
        contribution:
          "Led front-end architecture and full-stack development. Designed scalable data flows for national case management.",
        impact: "Won Merit at National ICT Awards NBQSA 2020. Deployed nationally in Sri Lanka.",
        timeline: [
          { phase: "Design", duration: "2 months", complete: true },
          { phase: "Development", duration: "6 months", complete: true },
          { phase: "Testing", duration: "2 months", complete: true },
          { phase: "Deployment", duration: "1 month", complete: true },
        ],
        metrics: { accuracy: 0, papers: 0, citations: 0, users: 0 },
        links: { paper: "", github: "", demo: "" },
      },
    },
    {
      id: "e-passport",
      ownerType: "company" as const,
      title: "E-Passport System — IOM Sri Lanka",
      coverImageUrl: "" as string | undefined,
      problem:
        "The International Organization for Migration needed a secure digital passport system for Sri Lanka with a modern web interface.",
      tags: ["E-Governance", "Security", "React", "TypeScript"],
      evidence: [
        { icon: "Cpu", label: "Architecture", link: "" },
        { icon: "ShieldCheck", label: "Production Deployment", link: "" },
      ],
      status: "Shipped",
      year: "2021",
      details: {
        abstract:
          "Designed and developed the e-passport system in close collaboration with the International Organization for Migration of Sri Lanka. Built the complete front-end using React and TypeScript.",
        contribution:
          "Front-end architecture using React and TypeScript for a security-critical government application.",
        impact: "Deployed for national use by the International Organization for Migration of Sri Lanka.",
        timeline: [
          { phase: "Requirements", duration: "2 months", complete: true },
          { phase: "Development", duration: "8 months", complete: true },
          { phase: "Security Review", duration: "2 months", complete: true },
          { phase: "Deployment", duration: "1 month", complete: true },
        ],
        metrics: { accuracy: 0, papers: 0, citations: 0, users: 0 },
        links: { paper: "", github: "", demo: "" },
      },
    },
    {
      id: "medical-web-app",
      ownerType: "personal" as const,
      title: "Medical Web App for Doctor Patient Management",
      coverImageUrl: "" as string | undefined,
      problem:
        "Healthcare professionals needed a secure, AI-powered tool to manage patient data and automate prescription generation.",
      tags: ["Healthcare", "AI", "React", "Python"],
      evidence: [
        { icon: "FileText", label: "B.Sc. Thesis", link: "#" },
        { icon: "Code", label: "Prototype", link: "#" },
      ],
      status: "Completed",
      year: "2020",
      details: {
        abstract:
          "A secure, AI-powered web application for healthcare professionals to manage patient data and automate prescription generation. Developed as the B.Sc. thesis project at NSBM University.",
        contribution:
          "End-to-end design and development — from patient data modelling to AI-powered prescription automation.",
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
  ],
} as const

export const DEFAULT_RESEARCH_JOURNEY = {
  eyebrow: "How My Thinking Evolved",
  title: "Research Journey",
  subtitle: "The paradigm shifts that shaped how I think about building trustworthy AI systems.",
  decisions: [
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
      insight: "Unconstrained learning creates risk. Adaptation must occur within policy boundaries.",
      context:
        "Witnessing adaptive systems drift from intended behavior led to the governance-first approach. Freedom without structure isn't intelligence — it's chaos with better marketing.",
      year: "2023",
      phase: "Reframing",
    },
    {
      from: "Model Performance",
      to: "Trust & Accountability",
      insight: "Accuracy alone doesn't build confidence. Transparency and auditability matter more.",
      context:
        "Stakeholder interviews revealed something humbling: users care more about understanding a system than about its benchmark scores. Trust is earned through legibility, not metrics.",
      year: "2023",
      phase: "Reframing",
    },
    {
      from: "Theory",
      to: "Executable Systems",
      insight: "Research impact requires implementation. Ideas must become deployable artifacts.",
      context:
        "The gap between published papers and practical adoption changed my focus. A framework that exists only in a PDF isn't a framework — it's a suggestion.",
      year: "2024",
      phase: "Integration",
    },
    {
      from: "Individual Safety",
      to: "Systemic Governance",
      insight: "Component-level safety doesn't guarantee system safety. Governance must be architectural.",
      context:
        "Complex system failures taught me that safety is an emergent property. You can't bolt it on at the end. It has to be designed into the architecture from the first line.",
      year: "2025",
      phase: "Current",
    },
  ],
} as const

export const DEFAULT_EXPERIENCE = {
  eyebrow: "Experience & Background",
  title: "Experience & Background",
  subtitle: "Research positions, industry roles, skills, and awards.",
  cvDownloadHref: "#",
  footerNote:
    "Based in Oulu, Finland. Open to research positions and collaborations worldwide.",
  milestones: [
    {
      year: "2024 –",
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
      year: "2019 – 22",
      role: "Software Engineer",
      place: "Informatics International Pvt LTD, Colombo, Sri Lanka",
      type: "industry" as const,
      summary:
        "Full-stack development on national-scale systems — e-passport infrastructure, government language integration, and case management platforms.",
      achievements: [
        "Built InfoHR internal business management system using React, Node, and Express",
        "Designed and developed the e-passport system for the International Organization for Migration of Sri Lanka",
        "Created a language model integrating Sinhala and Tamil into Sri Lankan Government websites",
        "Developed SLRCMS — won Merit at National ICT Awards NBQSA 2020",
      ],
      technologies: ["React", "TypeScript", "Node.js", "Express", "SQL"],
    },
    {
      year: "2022 – 24",
      role: "M.Sc. Software Engineering",
      place: "University of Oulu, Finland",
      type: "education" as const,
      summary:
        "Master's thesis on AI-driven mental workload monitoring and well-being management in workplace settings.",
      achievements: [
        "Thesis on AI-driven mental workload monitoring and workplace well-being",
        "Advanced coursework in software architecture and AI systems",
        "Selected for the Doctoral Pilot Program upon completion",
      ],
      technologies: ["Python", "Machine Learning", "Research Methods", "LaTeX"],
    },
    {
      year: "2017 – 20",
      role: "B.Sc. Software Engineering",
      place: "NSBM University, Colombo, Sri Lanka",
      type: "education" as const,
      summary:
        "Bachelor's thesis on doctor-patient management software and its validation. Built foundation in full-stack development and healthcare-oriented software.",
      achievements: [
        "Thesis on doctor-patient management software and validation",
        "Developed Medical Web App for Doctor Patient Management",
        "Built Raptor Finance cryptocurrency project on Binance Smart Chain",
        "Created Student Management App using Kotlin and Firebase",
      ],
      technologies: ["Java", "JavaScript", "Python", "React", "Kotlin", "PHP", "Solidity"],
    },
  ],
  skillCategories: {
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
    "Professional Skills": [
      "Data Visualization (Power BI)",
      "Critical Thinking",
      "Team Leadership",
      "Public Speaking",
      "Decision-Making",
    ],
  },
  awards: [
    {
      title: "Merit Award — National ICT Awards NBQSA",
      venue: "NBQSA 2020",
      year: "2020",
      note: "Won for SLRCMS (Readmission Case Management System for Sri Lanka) — the most significant product success for Informatics International.",
    },
    {
      title: "Finnish Doctoral Pilot Program Selection",
      venue: "University of Oulu",
      year: "2024",
      note: "Selected for the Finnish Software Engineering Doctoral Pilot Program based on MSc performance and research potential.",
    },
  ],
  highlights: [
    { label: "Years in Industry", value: "3+" },
    { label: "Projects Shipped", value: "10+" },
    { label: "National-Scale Systems", value: "4" },
    { label: "Awards", value: "2" },
  ],
  languages: [
    { lang: "English", level: "Fluent", pct: 95 },
    { lang: "Sinhala", level: "Native", pct: 100 },
    { lang: "Tamil", level: "Conversational", pct: 55 },
  ],
} as const

export const DEFAULT_OUTPUTS = {
  eyebrow: "Selected Work",
  title: "Publications, Talks & Prototypes",
  subtitle: "Research papers, working prototypes, and public presentations.",
  publications: [
    {
      title: "Reducing Cognitive Overload in Software Engineers: A Design Science Approach",
      venue: "TKTP 2025 — Annual Doctoral Symposium of Computer Science, Helsinki",
      type: "Conference Paper",
      link: "https://ceur-ws.org/Vol-4181/paper16.pdf",
      imageUrl: "" as string | undefined,
      abstract:
        "Software engineers often face Mental Workload (MWL) challenges, such as burnout and reduced performance, due to the demanding nature of their work. This paper introduces MentalEEG, a web-based MWL monitoring system developed through an iterative Design Science Research methodology to enhance employee well-being in high-demand cognitive environments. MentalEEG integrates subjective self-assessments and EEG data to provide personalized real-time insights for managing MWL. Using large language models (LLMs), its user-centric dashboard offers real-time analytics and recommendations aligned with organizational health guidelines, enabling proactive interventions to prevent burnout and cognitive overload.",
      takeaway:
        "Design science research on monitoring cognitive overload in software engineering using EEG and LLMs.",
      year: 2025,
    },
    {
      title: "AI-Driven Mental Workload Monitoring and Well-Being Management in Workplace Settings",
      venue: "University of Oulu — M.Sc. Thesis",
      type: "Thesis",
      link: "#",
      imageUrl: "" as string | undefined,
      abstract:
        "Exploring how AI can monitor mental workload in real time and support well-being management in workplace environments, integrating EEG data with subjective assessments and LLM-driven recommendations for organizational-level insights.",
      takeaway:
        "AI-driven mental workload monitoring combining EEG and self-assessment data with LLM recommendations.",
      year: 2024,
    },
    {
      title: "Doctor-Patient Management Software and Its Validation",
      venue: "NSBM University — B.Sc. Thesis",
      type: "Thesis",
      link: "#",
      imageUrl: "" as string | undefined,
      abstract:
        "Design and validation of a secure, AI-powered web application for healthcare professionals to manage patient data and automate prescription generation.",
      takeaway: "AI-powered healthcare management system with automated prescription generation.",
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
      imageUrl: "" as string | undefined,
      stars: 0,
      downloads: 0,
    },
    {
      title: "SLRCMS — Readmission Case Management System",
      description: "National-scale case management system for Sri Lanka — Merit at NBQSA 2020",
      tech: ["React", "TypeScript", "Node.js"],
      link: "#",
      github: "#",
      imageUrl: "" as string | undefined,
      stars: 0,
      downloads: 0,
    },
    {
      title: "Raptor Finance",
      description: "Cryptocurrency token on the Binance Smart Chain",
      tech: ["PHP", "Solidity"],
      link: "#",
      github: "#",
      imageUrl: "" as string | undefined,
      stars: 0,
      downloads: 0,
    },
    {
      title: "Student Management App",
      description: "Android app for teachers to manage students using Kotlin and Firebase",
      tech: ["Kotlin", "Firebase"],
      link: "#",
      github: "#",
      imageUrl: "" as string | undefined,
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
      imageUrl: "" as string | undefined,
    },
  ],
} as const

export const DEFAULT_CURRENT_FOCUS = {
  eyebrow: "Current Focus",
  title: "Current Research Focus",
  subtitle: "What I'm investigating, building, questioning, and open to collaborating on.",
  closingQuote:
    "I care about what happens when AI meets the most vulnerable patients — children whose data demands the strongest protections.",
  focusBlocks: [
    {
      icon: "Search",
      heading: "What I'm investigating",
      summary: "Secure, privacy-centric AI for real-time pediatric brain health management.",
      body: "How to build AI systems that can monitor and manage pediatric brain health in real time while preserving patient privacy at every layer. The core tension: personalization requires data, but the most sensitive patients — children — deserve the strongest protections.",
      deeper:
        "I'm exploring how federated learning architectures can enable collaborative model training across hospitals without centralizing sensitive patient data. The challenge is maintaining model accuracy and personalization while meeting regulatory compliance standards across different healthcare jurisdictions.",
      topics: ["Pediatric Brain Health", "Privacy-Preserving AI", "Federated Learning", "Regulatory Compliance"],
      relatedWork: [{ label: "Doctoral Research Program", href: "#cv" }],
      stat: null as { value: string; label: string } | null,
      cta: false,
    },
    {
      icon: "Wrench",
      heading: "What I'm building",
      summary: "mHealth solutions integrating self-adaptive AI with privacy-preserving techniques.",
      body: "Mobile health platforms that bring AI-driven monitoring closer to patients and clinicians. The goal is systems that adapt to individual needs while maintaining strict privacy guarantees — using federated learning, on-device inference, and secure data pipelines.",
      deeper:
        "The architecture combines Flutter-based mobile interfaces with privacy-preserving ML backends. I'm particularly focused on how AI agent-based software development can accelerate the creation of trustworthy medical applications — agents that understand both the clinical domain and the security constraints.",
      topics: ["Flutter", "Python", "Federated Learning", "mHealth", "AI Agents"],
      relatedWork: [{ label: "Medical Web App for Doctor Patient Management", href: "#projects" }],
      stat: null as { value: string; label: string } | null,
      cta: false,
    },
    {
      icon: "HelpCircle",
      heading: "What I'm questioning",
      summary: "Whether current AI trustworthiness frameworks are enough for pediatric healthcare.",
      body: "Whether the frameworks we use to evaluate AI trustworthiness are sufficient for the unique demands of pediatric care. Whether generative AI can be made safe enough for clinical decision support. Whether privacy and personalization are truly at odds, or if that's a false trade-off.",
      deeper:
        "Most AI safety research targets adult populations and general-purpose systems. Pediatric brain health has different risk profiles, different data constraints, and different ethical considerations. I believe we need domain-specific trustworthiness frameworks — not just adapted versions of general ones.",
      topics: ["Trustworthy AI", "Generative AI", "Software Security", "Ethics"],
      relatedWork: null as { label: string; href: string }[] | null,
      stat: null as { value: string; label: string } | null,
      cta: false,
    },
    {
      icon: "Handshake",
      heading: "What I'm open to",
      summary: "Collaboration on medical AI, mHealth, and privacy-preserving systems.",
      body: "Collaboration with teams building healthcare AI systems, particularly in pediatric and brain health domains. Joint research on privacy-preserving architectures. Conversations with clinicians, researchers, and engineers working at the intersection of AI and patient care.",
      deeper:
        "I bring both industry experience (3+ years building national-scale systems at Informatics International) and research depth. I'm especially interested in working with hospitals, health-tech startups, and research groups exploring federated learning for clinical applications.",
      topics: ["Healthcare AI", "Joint Research", "Industry Partnerships", "mHealth"],
      relatedWork: null as { label: string; href: string }[] | null,
      stat: null as { value: string; label: string } | null,
      cta: true,
    },
  ],
} as const

export const DEFAULT_BY_SECTION: Record<SiteSectionKey, unknown> = {
  research: DEFAULT_RESEARCH,
  projects: DEFAULT_PROJECTS,
  researchJourney: DEFAULT_RESEARCH_JOURNEY,
  experience: DEFAULT_EXPERIENCE,
  outputs: DEFAULT_OUTPUTS,
  currentFocus: DEFAULT_CURRENT_FOCUS,
}

export function defaultForSection(key: SiteSectionKey): unknown {
  return JSON.parse(JSON.stringify(DEFAULT_BY_SECTION[key]))
}

type JsonLike = string | number | boolean | null | JsonLike[] | { [key: string]: JsonLike }

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function isRecord(value: JsonLike): value is { [key: string]: JsonLike } {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function getObjectId(value: JsonLike): string | null {
  if (!isRecord(value)) {
    return null
  }
  const id = value.id
  return typeof id === "string" && id.trim().length > 0 ? id : null
}

function mergeArrays(defaultArray: JsonLike[], storedArray: JsonLike[]): JsonLike[] {
  if (storedArray.length === 0) {
    return cloneJson(defaultArray)
  }

  const hasIds = defaultArray.some((item) => getObjectId(item) !== null) || storedArray.some((item) => getObjectId(item) !== null)

  if (hasIds) {
    const storedById = new Map<string, JsonLike>()
    for (const item of storedArray) {
      const id = getObjectId(item)
      if (id) {
        storedById.set(id, item)
      }
    }

    const defaultIds = new Set<string>()
    const merged = defaultArray.map((defaultItem) => {
      const id = getObjectId(defaultItem)
      if (!id) {
        return cloneJson(defaultItem)
      }
      defaultIds.add(id)
      const storedItem = storedById.get(id)
      if (storedItem === undefined) {
        return cloneJson(defaultItem)
      }
      return deepMergeWithDefaults(defaultItem, storedItem)
    })

    const extras = storedArray.filter((item) => {
      const id = getObjectId(item)
      return id !== null && !defaultIds.has(id)
    })

    return [...merged, ...extras.map((item) => cloneJson(item))]
  }

  const maxLength = Math.max(defaultArray.length, storedArray.length)
  const merged: JsonLike[] = []
  for (let i = 0; i < maxLength; i += 1) {
    const defaultItem = defaultArray[i]
    const storedItem = storedArray[i]
    if (defaultItem === undefined) {
      merged.push(cloneJson(storedItem))
      continue
    }
    if (storedItem === undefined) {
      merged.push(cloneJson(defaultItem))
      continue
    }
    merged.push(deepMergeWithDefaults(defaultItem, storedItem))
  }

  return merged
}

function deepMergeWithDefaults(defaultValue: JsonLike, storedValue: JsonLike): JsonLike {
  if (Array.isArray(defaultValue)) {
    if (!Array.isArray(storedValue)) {
      return cloneJson(defaultValue)
    }
    return mergeArrays(defaultValue, storedValue)
  }

  if (isRecord(defaultValue)) {
    if (!isRecord(storedValue)) {
      return cloneJson(defaultValue)
    }
    const keys = new Set([...Object.keys(defaultValue), ...Object.keys(storedValue)])
    const merged: { [key: string]: JsonLike } = {}

    for (const key of keys) {
      const hasDefault = Object.prototype.hasOwnProperty.call(defaultValue, key)
      const hasStored = Object.prototype.hasOwnProperty.call(storedValue, key)
      if (!hasStored && hasDefault) {
        merged[key] = cloneJson(defaultValue[key])
        continue
      }
      if (!hasDefault && hasStored) {
        merged[key] = cloneJson(storedValue[key])
        continue
      }
      merged[key] = deepMergeWithDefaults(defaultValue[key], storedValue[key])
    }

    return merged
  }

  return cloneJson(storedValue)
}

export function mergeSectionWithDefaults(key: SiteSectionKey, storedData: unknown): unknown {
  const defaults = defaultForSection(key) as JsonLike
  if (storedData === null || storedData === undefined) {
    return defaults
  }
  return deepMergeWithDefaults(defaults, storedData as JsonLike)
}

export type ResearchContent = typeof DEFAULT_RESEARCH
export type ProjectsContent = typeof DEFAULT_PROJECTS
export type ResearchJourneyContent = typeof DEFAULT_RESEARCH_JOURNEY
export type ExperienceContent = typeof DEFAULT_EXPERIENCE
export type OutputsContent = typeof DEFAULT_OUTPUTS
export type CurrentFocusContent = typeof DEFAULT_CURRENT_FOCUS
