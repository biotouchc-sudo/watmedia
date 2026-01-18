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

// Layout Components
import { StatusPulse } from '@/components/layout/StatusPulse'
import { CrystalConcierge } from '@/components/layout/CrystalConcierge'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { BackToTop } from '@/components/layout/BackToTop'
import { CommandPalette } from '@/components/layout/CommandPalette'

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
                <body className="bg-[var(--wat-background)] text-white min-h-screen flex flex-col pt-20">
                    {/* Cyborg Arsenal: Scroll Progress */}
                    <ScrollProgress />

                    {/* Cyborg Arsenal: Command Palette (CMD+K) */}
                    <CommandPalette />

                    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--wat-glass-border)] h-20">
                        <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <Link href="/" className="text-2xl font-bold gradient-text">
                                    WATMEDIA
                                </Link>
                                <div className="hidden md:block">
                                    <StatusPulse />
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden md:flex items-center gap-8">
                                <Link href="/services" className="text-sm text-[var(--wat-text-muted)] hover:text-white transition-colors">الخدمات</Link>
                                <Link href="/portfolio" className="text-sm text-[var(--wat-text-muted)] hover:text-white transition-colors">أعمالنا</Link>
                                <Link href="/about" className="text-sm text-[var(--wat-text-muted)] hover:text-white transition-colors">من نحن</Link>
                                <Link href="/contact" className="text-sm text-[var(--wat-text-muted)] hover:text-white transition-colors">اتصل بنا</Link>
                            </div>

                            <div className="flex items-center gap-4">
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="text-sm text-[var(--wat-text-muted)] hover:text-white pointer-events-auto">تسجيل الدخول</button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button className="bg-[var(--wat-primary)] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[var(--wat-secondary)] hover:text-black transition-all glow pointer-events-auto">ابدأ الآن</button>
                                    </SignUpButton>
                                </SignedOut>
                                <SignedIn>
                                    <Link href="/dashboard" className="text-sm text-[var(--wat-text-muted)] hover:text-white">لوحة التحكم</Link>
                                    <UserButton afterSignOutUrl="/" />
                                </SignedIn>
                                {/* Keyboard Shortcut Hint */}
                                <kbd className="hidden lg:inline-flex h-6 items-center gap-1 rounded border border-[var(--wat-glass-border)] bg-[var(--wat-surface)] px-2 text-[10px] text-[var(--wat-text-muted)]">
                                    ⌘K
                                </kbd>
                            </div>
                        </nav>
                    </header>

                    {children}

                    {/* Cyborg Arsenal: Floating Elements */}
                    <CrystalConcierge />
                    <BackToTop />

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
                </body>
            </html>
        </ClerkProvider>
    )
}
