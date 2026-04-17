import { siteConfig, siteUrl } from "./site"

const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`

export function getPersonJsonLd() {
  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteUrl,
    email: siteConfig.email,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    knowsAbout: [...siteConfig.knowsAbout],
    sameAs: [...siteConfig.sameAs],
    worksFor: {
      "@type": "Organization",
      name: siteConfig.affiliation.name,
      url: siteConfig.affiliation.url,
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Oulu",
        url: siteConfig.affiliation.url,
      },
    ],
    makesOffer: siteConfig.offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      description: o.description,
    })),
  }
}

export function getWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  }
}

export function getWebPageJsonLd(path: string, name: string, description: string) {
  const url = `${siteUrl}${path}`
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}/opengraph-image` },
  }
}

export function getProjectsCollectionJsonLd() {
  const items = [
    {
      name: "SLRCMS — Readmission Case Management",
      description: "National-scale readmission case management for Sri Lanka (NBQSA 2020 Merit).",
    },
    {
      name: "E-Passport System — IOM Sri Lanka",
      description: "Secure digital passport system front-end with React and TypeScript.",
    },
    {
      name: "Medical Web App for Doctor Patient Management",
      description: "AI-powered healthcare management and prescription automation (B.Sc. thesis).",
    },
  ]
  return {
    "@type": "CollectionPage",
    "@id": `${siteUrl}/projects#collection`,
    name: "Selected projects — Kavishwa Wendakoon",
    description:
      "Selected projects including national-scale government systems, healthcare AI, and research prototypes.",
    url: `${siteUrl}/projects`,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        description: item.description,
      })),
    },
  }
}

export function getAboutPageJsonLd() {
  return {
    "@type": "AboutPage",
    "@id": `${siteUrl}/about#webpage`,
    url: `${siteUrl}/about`,
    name: "About — Kavishwa Wendakoon",
    description:
      "How Kavishwa works with recruiters, researchers, industry partners, and students — background, services, and collaboration angles.",
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
  }
}
