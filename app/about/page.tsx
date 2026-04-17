import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { Navigation } from "@/components/navigation"
import { VisitorLens } from "@/components/visitor-lens"
import { Footer } from "@/components/footer"
import { getAboutPageJsonLd, getPersonJsonLd, getWebSiteJsonLd } from "@/lib/json-ld"
export const metadata: Metadata = {
  title: "About — Kavishwa Wendakoon",
  description:
    "How Kavishwa works with recruiters, researchers, industry partners, and students — doctoral research, industry background, and collaboration.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Kavishwa Wendakoon",
    description:
      "Audience-specific overview: research collaboration, recruiting, industry partnerships, and mentorship.",
    url: "/about",
    type: "website",
  },
  twitter: {
    title: "About — Kavishwa Wendakoon",
    description:
      "Audience-specific overview: research collaboration, recruiting, industry partnerships, and mentorship.",
  },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          getPersonJsonLd(),
          getWebSiteJsonLd(),
          getAboutPageJsonLd(),
        ]}
      />
      <main id="main-content" className="relative min-h-screen overflow-hidden noise-overlay">
        <Navigation />
        <div className="pt-20" aria-hidden />
        <VisitorLens />
        <Footer />
      </main>
    </>
  )
}
