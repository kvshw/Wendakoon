"use client"

import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { VisitorLens } from "@/components/visitor-lens"
import { ResearchDomains } from "@/components/research-domains"
import { CaseFiles } from "@/components/case-files"
import { DecisionLedger } from "@/components/decision-ledger"
import { CurrentFocus } from "@/components/current-focus"
import { CVSection } from "@/components/cv-section"
import { SelectedOutputs } from "@/components/selected-outputs"
import { Footer } from "@/components/footer"
import { Preloader } from "@/components/preloader"

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="relative min-h-screen overflow-hidden noise-overlay">
        <Navigation />
        <Hero />
        <VisitorLens />
        <ResearchDomains />
        <CaseFiles />
        <DecisionLedger />
        <CurrentFocus />
        <CVSection />
        <div id="outputs">
          <SelectedOutputs />
        </div>
        <Footer />
      </main>
    </>
  )
}
