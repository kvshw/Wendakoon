import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Contact — Kavishwa Wendakoon",
  description:
    "Get in touch with Kavishwa Wendakoon for research collaboration, industry opportunities, or conversations about AI, software engineering, and digital health.",
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden noise-overlay">
      <Navigation />
      <div className="pt-20" />
      <Footer />
    </main>
  )
}
