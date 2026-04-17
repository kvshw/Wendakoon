import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { ScrollProgress } from '@/components/scroll-progress'
import { siteConfig, siteUrl } from '@/lib/site'
import { AppProviders } from '@/components/app-providers'
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
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: '%s',
  },
  description: siteConfig.description,
  keywords: ['Kavishwa Wendakoon', 'Trustworthy AI', 'Pediatric Brain Health', 'Federated Learning', 'Privacy-Preserving AI', 'mHealth', 'Doctoral Researcher', 'University of Oulu', 'Software Engineer'],
  authors: [{ name: 'Kavishwa Wendakoon', url: siteUrl }],
  creator: 'Kavishwa Wendakoon',
  publisher: 'Kavishwa Wendakoon',
  alternates: { canonical: '/' },
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: '/',
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/opengraph-image'],
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
        <AppProviders>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-medium">
            Skip to main content
          </a>
          <SmoothScroll>
            <CustomCursor />
            <ScrollProgress />
            {children}
          </SmoothScroll>
          <Analytics />
        </AppProviders>
      </body>
    </html>
  )
}
