import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { Navigation } from "@/components/navigation"
import { CaseFiles } from "@/components/case-files"
import { Footer } from "@/components/footer"
import {
  getPersonJsonLd,
  getProjectsCollectionJsonLd,
  getWebPageJsonLd,
  getWebSiteJsonLd,
} from "@/lib/json-ld"

export const metadata: Metadata = {
  title: "Projects — Kavishwa Wendakoon",
  description:
    "Selected projects including national-scale government systems, healthcare AI, and research prototypes.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Kavishwa Wendakoon",
    description:
      "Selected projects including national-scale government systems, healthcare AI, and research prototypes.",
    url: "/projects",
    type: "website",
  },
  twitter: {
    title: "Projects — Kavishwa Wendakoon",
    description:
      "Selected projects including national-scale government systems, healthcare AI, and research prototypes.",
  },
}

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={[
          getPersonJsonLd(),
          getWebSiteJsonLd(),
          getWebPageJsonLd(
            "/projects",
            "Projects — Kavishwa Wendakoon",
            "Selected projects including national-scale government systems, healthcare AI, and research prototypes."
          ),
          getProjectsCollectionJsonLd(),
        ]}
      />
      <main id="main-content" className="relative min-h-screen overflow-hidden noise-overlay">
        <Navigation />
        <div className="pt-20" aria-hidden />
        <CaseFiles />
        <Footer />
      </main>
    </>
  )
}
