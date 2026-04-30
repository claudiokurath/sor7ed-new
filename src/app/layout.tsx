import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccessibilityControls from '@/components/AccessibilityControls';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  metadataBase: new URL('https://sor7ed.com'),
  title: {
    default: 'SOR7ED — Templates, not inspiration. Tools for neurodivergent minds.',
    template: '%s — SOR7ED',
  },
  description:
    'Practical templates and micro-tools for ADHD, autism, dyslexia, and related needs. Delivered via WhatsApp. No app. No spam.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    siteName: 'SOR7ED',
    type: 'website',
    url: 'https://sor7ed.com',
    title: 'SOR7ED — Templates, not inspiration.',
    description:
      'Practical tools for neurodivergent minds, delivered via WhatsApp. No app. No spam.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SOR7ED — Your brain is not broken. Your tools are.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOR7ED — Templates, not inspiration.',
    description: 'Practical tools for neurodivergent minds, delivered via WhatsApp.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FFC107',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* League Gothic (display) + Roboto Light (body) — locked typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Gothic&family=Roboto:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=OpenDyslexic&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[#ffc107] focus:text-black focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
          {children}
          <Footer />
        </main>
        <AccessibilityControls />
        <CookieBanner />
      </body>
    </html>
  );
}
