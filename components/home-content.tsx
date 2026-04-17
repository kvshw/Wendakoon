"use client"

import { useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { VisitorLens } from "@/components/visitor-lens"
import { ResearchDomains } from "@/components/research-domains"
import { CaseFiles } from "@/components/case-files"
import { DecisionLedger } from "@/components/decision-ledger"
import { CurrentFocus } from "@/components/current-focus"
import { CVSection } from "@/components/cv-section"
import { SelectedOutputs } from "@/components/selected-outputs"
import { LandingBlogSection } from "@/components/landing-blog-section"
import { Footer } from "@/components/footer"
import { Preloader } from "@/components/preloader"
import { GsapPageAnimations } from "@/components/gsap-page-animations"
import { HeroScene } from "@/components/hero-scene"

export function HomeContent() {
  const mainRef = useRef<HTMLElement>(null)

  return (
    <>
      <Preloader />
      <main id="main-content" ref={mainRef} className="relative min-h-screen overflow-hidden noise-overlay">
        <HeroScene />
        <GsapPageAnimations scopeRef={mainRef} />
        <Navigation />
        <Hero />
        <VisitorLens />
        <ResearchDomains />
        <CaseFiles />
        <DecisionLedger />
        <CurrentFocus />
        <CVSection />
        <section id="outputs" aria-label="Publications, talks, and prototypes">
          <SelectedOutputs />
        </section>
        <LandingBlogSection />
        <Footer />
      </main>
    </>
  )
}
