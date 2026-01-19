import type { Metadata } from 'next'
import Link from 'next/link'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { CursorProvider } from '@/components/ui/CustomCursor'
import { SoundProvider } from '@/components/ui/SoundSystem'

// Layout Components
import { StatusPulse } from '@/components/layout/StatusPulse'
import { CrystalConcierge } from '@/components/layout/CrystalConcierge'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { BackToTop } from '@/components/layout/BackToTop'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { Header } from '@/components/layout/Header'
import { EasterEggProvider } from '@/hooks/useKonamiCode'
import { ZenToggle } from '@/components/ui/zen-toggle'
import { ReturningUserWelcomer } from '@/components/layout/ReturningUserWelcomer'
import { RageDetector } from '@/components/features/RageDetector'
import { PrivacyMask } from '@/components/features/PrivacyMask'
import { AutoThemeController } from '@/components/features/AutoThemeController'
import { PageTransition } from '@/components/layout/PageTransition'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { GlobalCanvas } from '@/components/layout/GlobalCanvas'
import { SmartToaster } from '@/components/ui/SmartToaster'
import { LivingBackground } from '@/components/features/LivingBackground'
import { VoiceInterface } from '@/components/features/VoiceInterface'
import { Footer } from '@/components/layout/Footer'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: {
        default: 'WATMEDIA | مهندسو النمو الرقمي',
        template: '%s | WATMEDIA',
    },
    description: 'شريكك في هندسة النمو الرقمي. نحن لا نتوقع النتائج، نحن نهندسها.',
    keywords: ['تصميم مواقع', 'تطوير ويب', 'تسويق رقمي', 'SEO', 'السعودية'],
    authors: [{ name: 'WATMEDIA' }],
    openGraph: {
        type: 'website',
        locale: 'ar_SA',
        siteName: 'WATMEDIA',
    },
}

import { ScrollSmoother } from '@/components/layout/ScrollSmoother'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                elements: {
                    formButtonPrimary: 'bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] transition-all',
                    card: 'glass border-[var(--wat-glass-border)]',
                },
            }}
        >
            <html lang="ar" dir="rtl" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SoundProvider>
                    <CursorProvider>
                        <body className="bg-[var(--wat-background)] text-white min-h-screen flex flex-col pt-20">
                            {/* Level 51: Physics Engine */}
                            <ScrollSmoother>
                                {/* Cyborg Arsenal: Scroll Progress */}
                                <ScrollProgress />

                                {/* Cyborg Arsenal: Command Palette (CMD+K) */}
                                <CommandPalette />

                                <Header />

                                <EasterEggProvider>
                                    <PageTransition>
                                        {children}
                                    </PageTransition>
                                </EasterEggProvider>

                                {/* Cyborg Arsenal: Floating Elements */}
                                <CrystalConcierge />
                                <BackToTop />
                                <WhatsAppFloat />
                                <ZenToggle />
                                <ReturningUserWelcomer />
                                <RageDetector />
                                <PrivacyMask />
                                <AutoThemeController />

                                <GlobalCanvas />
                                <Analytics />

                                {/* JSON-LD Structured Data */}
                                <script
                                    type="application/ld+json"
                                    dangerouslySetInnerHTML={{
                                        __html: JSON.stringify({
                                            "@context": "https://schema.org",
                                            "@type": "Organization",
                                            "name": "WATMEDIA",
                                            "url": "https://watmedia.sa",
                                            "logo": "https://watmedia.sa/logo.png",
                                            "description": "نحن نبني المستقبل الرقمي. حلول متكاملة في التكنولوجيا، التصميم، والنمو.",
                                            "address": {
                                                "@type": "PostalAddress",
                                                "addressLocality": "Riyadh",
                                                "addressCountry": "SA"
                                            },
                                        }),
                                    }}
                                />
                                <Footer />
                            </ScrollSmoother>
                        </body>
                    </CursorProvider>
                </SoundProvider>
            </html>
        </ClerkProvider>
    )
}
