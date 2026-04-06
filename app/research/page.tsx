import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { ResearchDomains } from "@/components/research-domains"
import { CurrentFocus } from "@/components/current-focus"
import { DecisionLedger } from "@/components/decision-ledger"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Research — Kavishwa Wendakoon",
  description:
    "Research areas in trustworthy AI, self-adaptive systems, federated learning, and pediatric brain health at the University of Oulu.",
}

export default function ResearchPage() {
  return (
    <main className="relative min-h-screen overflow-hidden noise-overlay">
      <Navigation />
      <div className="pt-20" />
      <ResearchDomains />
      <CurrentFocus />
      <DecisionLedger />
      <Footer />
    </main>
  )
}
