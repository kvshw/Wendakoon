import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { ScrollProgress } from '@/components/scroll-progress'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kavishwa Wendakoon — Doctoral Researcher & Software Engineer',
  description: 'Doctoral Researcher at University of Oulu specializing in secure, privacy-centric AI for pediatric brain health. Former software engineer with 3+ years building national-scale systems.',
  keywords: ['Trustworthy AI', 'Pediatric Brain Health', 'Federated Learning', 'Privacy-Preserving AI', 'mHealth', 'Doctoral Researcher', 'University of Oulu'],
  authors: [{ name: 'Kavishwa Wendakoon' }],
  creator: 'Kavishwa Wendakoon',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Kavishwa Wendakoon — Doctoral Researcher & Software Engineer',
    description: 'Secure, privacy-centric AI for pediatric brain health. Doctoral Researcher at University of Oulu, Finland.',
    siteName: 'Kavishwa Wendakoon',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kavishwa Wendakoon — Doctoral Researcher & Software Engineer',
    description: 'Secure, privacy-centric AI for pediatric brain health. Doctoral Researcher at University of Oulu, Finland.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} ${geistMono.variable} font-sans antialiased cursor-none`}>
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
