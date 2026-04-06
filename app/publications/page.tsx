import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SelectedOutputs } from "@/components/selected-outputs"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Publications — Kavishwa Wendakoon",
  description:
    "Research publications, conference papers, theses, prototypes, and talks by Kavishwa Wendakoon.",
}

export default function PublicationsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden noise-overlay">
      <Navigation />
      <div className="pt-20" />
      <SelectedOutputs />
      <Footer />
    </main>
  )
}
