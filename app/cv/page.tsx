import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { CVSection } from "@/components/cv-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "CV — Kavishwa Wendakoon",
  description:
    "Experience, education, skills, and awards. Doctoral researcher at University of Oulu with 3+ years of industry engineering.",
}

export default function CVPage() {
  return (
    <main className="relative min-h-screen overflow-hidden noise-overlay">
      <Navigation />
      <div className="pt-20" />
      <CVSection />
      <Footer />
    </main>
  )
}
