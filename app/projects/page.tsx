import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { CaseFiles } from "@/components/case-files"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Projects — Kavishwa Wendakoon",
  description:
    "Selected projects including national-scale government systems, healthcare AI, and research prototypes.",
}

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden noise-overlay">
      <Navigation />
      <div className="pt-20" />
      <CaseFiles />
      <Footer />
    </main>
  )
}
