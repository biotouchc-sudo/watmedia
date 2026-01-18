'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { StatusPulse } from './StatusPulse'
import { cn } from '@/lib/utils'

export function Header() {
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'الخدمات', href: '/services' },
        { name: 'أعمالنا', href: '/portfolio' },
        { name: 'من نحن', href: '/about' },
        { name: 'اتصل بنا', href: '/contact' },
    ]

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "h-20 bg-[var(--wat-background)]/80 backdrop-blur-xl border-b border-[var(--wat-glass-border)] shadow-lg"
                    : "h-24 bg-transparent border-b border-transparent"
            )}
        >
            <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Brand Identity */}
                <div className="flex items-center gap-6 group">
                    <Link href="/" className="relative flex items-center gap-3">
                        {/* Logo Icon (Replaced text with dynamic logo concept if image unavailable, leveraging emoji for now or just text) */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--wat-primary)] to-[var(--wat-secondary)] flex items-center justify-center text-black font-bold text-xl shadow-[0_0_20px_var(--wat-primary)] group-hover:rotate-12 transition-transform duration-500">
                            W
                        </div>
                        <span className="text-2xl font-bold gradient-text tracking-tight">
                            WATMEDIA
                        </span>
                    </Link>
                    <div className="hidden md:block opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                        <StatusPulse />
                    </div>
                </div>

                {/* Cognitive Navigation */}
                <div className="hidden md:flex items-center bg-[var(--wat-surface)]/50 rounded-full px-2 py-1 border border-[var(--wat-glass-border)] backdrop-blur-md">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "text-black bg-[var(--wat-primary)] shadow-[0_0_20px_var(--wat-primary)]"
                                        : "text-[var(--wat-text-muted)] hover:text-white hover:bg-white/5"
                                )}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </div>

                {/* Action Center */}
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm text-[var(--wat-text-muted)] hover:text-white font-medium transition-colors">
                                تسجيل الدخول
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="relative group overflow-hidden bg-[var(--wat-primary)] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_var(--wat-primary)]">
                                <span className="relative z-10 flex items-center gap-2">
                                    ابدأ الآن <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <Link
                            href="/dashboard"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--wat-glass-border)] hover:border-[var(--wat-primary)] transition-colors text-sm font-medium"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            لوحة التحكم
                        </Link>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10 border-2 border-[var(--wat-primary)] shadow-[0_0_15px_var(--wat-primary)]"
                                }
                            }}
                        />
                    </SignedIn>

                    {/* Command Hint */}
                    <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--wat-glass-border)] bg-[var(--wat-surface)]/50 text-[10px] text-[var(--wat-text-muted)] font-mono hover:border-[var(--wat-primary)] transition-colors cursor-default">
                        <span className="text-xs">⌘</span> K
                    </button>
                </div>
            </nav>
        </header>
    )
}
