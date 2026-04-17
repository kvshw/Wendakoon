/**
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://yourdomain.com) for accurate canonical URLs, OG tags, and JSON-LD.
 */
export const siteUrl =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
  "https://kavishwa-wendakoon.vercel.app"

export const siteConfig = {
  name: "Kavishwa Wendakoon",
  title: "Kavishwa Wendakoon — Doctoral Researcher & Software Engineer",
  description:
    "Kavishwa Wendakoon is a doctoral researcher at the University of Oulu building trustworthy, privacy-preserving AI for pediatric brain health, mHealth, and self-adaptive systems.",
  locale: "en_US",
  email: "kaveebhashiofficial@gmail.com",
  universityEmail: "kavishwa.wendakoonmudiyanselage@oulu.fi",
  jobTitle: "Doctoral Researcher",
  affiliation: {
    name: "University of Oulu",
    url: "https://www.oulu.fi/en",
  },
  sameAs: [
    "https://github.com/kvshw",
    "https://www.linkedin.com/in/kavishwa-wendakoon/",
    "https://scholar.google.com/citations?hl=en&user=LtjOAsQAAAAJ",
    "https://orcid.org/0009-0001-1691-4750",
  ],
  knowsAbout: [
    "Trustworthy AI",
    "Federated Learning",
    "Privacy-Preserving Machine Learning",
    "Pediatric Brain Health",
    "mHealth",
    "Medical AI",
    "Self-Adaptive Systems",
    "Software Engineering",
    "Full-Stack Development",
    "React",
    "TypeScript",
    "Python",
    "Flutter",
  ],
  offers: [
    {
      name: "Research collaboration",
      description:
        "Collaboration on healthcare AI, federated learning, and privacy-preserving systems.",
    },
    {
      name: "Industry consulting",
      description:
        "Consulting on AI governance, clinical decision support prototypes, and responsible AI implementation.",
    },
    {
      name: "Mentorship",
      description:
        "Supervision and guidance for students in software engineering and AI research.",
    },
  ],
} as const
