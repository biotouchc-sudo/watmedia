'use client'

import React, { useState, useEffect } from 'react'
import { SmartLink } from '@/components/ui/SmartLink'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { usePathname } from 'next/navigation'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { StatusPulse } from './StatusPulse'
import { cn } from '@/lib/utils'
import { TextFillHover } from '@/components/ui/TextFillHover'

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
                    <SmartLink href="/" className="relative flex items-center gap-4" cursorType="video">
                        {/* Logo Icon */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--wat-primary)] to-[var(--wat-primary-dim)] flex items-center justify-center text-black font-black text-2xl shadow-[0_0_25px_rgba(230,213,172,0.3)] group-hover:rotate-12 transition-transform duration-500">
                            W
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter text-white leading-none">
                                WATMEDIA
                            </span>
                            <span className="text-[10px] tracking-[0.2em] text-[var(--wat-primary)] uppercase font-medium">
                                Sovereignty
                            </span>
                        </div>
                    </SmartLink>
                </div>

                {/* Cognitive Navigation */}
                <div className="hidden md:flex items-center bg-[var(--wat-surface)]/50 rounded-full px-2 py-1 border border-[var(--wat-glass-border)] backdrop-blur-md">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <SmartLink
                                key={link.href}
                                href={link.href}
                                cursorType="text"
                                className={cn(
                                    "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "text-black bg-[var(--wat-primary)] shadow-[0_0_20px_var(--wat-primary)]"
                                        : "text-[var(--wat-text-muted)] hover:text-white hover:bg-white/5"
                                )}
                            >
                                <TextFillHover
                                    baseColor={isActive ? "#000000" : "var(--wat-text-muted)"}
                                    fillColor={isActive ? "#000000" : "white"}
                                >
                                    {link.name}
                                </TextFillHover>
                            </SmartLink>
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
                            <div className="inline-block">
                                <MagneticButton className="relative group overflow-hidden bg-[var(--wat-primary)] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_var(--wat-primary)]">
                                    <span className="relative z-10 flex items-center gap-2">
                                        ابدأ الآن <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </MagneticButton>
                            </div>
                        </SignUpButton>
                    </SignedOut>

                    {/* Social & Status - Visible on desktop */}
                    <div className="hidden lg:flex items-center gap-4 mr-4 border-r border-[var(--wat-glass-border)] pr-4">
                        <a href="https://wa.me/905364599079" target="_blank" className="text-[var(--wat-text-muted)] hover:text-[#25D366] transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                        </a>
                        <a href="https://www.instagram.com/_watmedia?igsh=MWlsMHJ2Z3FnbTdzbA==" target="_blank" className="text-[var(--wat-text-muted)] hover:text-[#E1306C] transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08zm0 1.9c-2.385 0-2.653.01-3.59.053-.935.042-1.445.195-1.782.325-.443.175-.76.383-1.09.715-.332.33-.54.646-.715 1.09-.13.337-.283.847-.325 1.782-.043.937-.053 1.205-.053 3.59v.302c0 2.385.01 2.653.053 3.59.042.935.195 1.445.325 1.782.175.443.383.76.715 1.09.33.33.646.54 1.09.715.337.13.847.283 1.782.325.937.043 1.205.053 3.59.053h.302c2.385 0 2.653-.01 3.59-.053.935-.042 1.445-.195 1.782-.325.443-.175.76-.383 1.09-.715.33.33.646.54 1.09-.715.13-.337.283-.847.325-1.782.043-.937.053-1.205.053-3.59v-.302c0-2.385-.01-2.653-.053-3.59-.042-.935-.195-1.445-.325-1.782-.175-.443-.383-.76-.715-1.09-.33-.33-.646-.54-1.09-.715-.337-.13-.847-.283-1.782-.325-.937-.043-1.205-.053-3.59-.053h-.302zm0 3.2c2.614 0 4.73 2.116 4.73 4.73s-2.116 4.73-4.73 4.73-4.73-2.116-4.73-4.73 2.116-4.73 4.73-4.73zm0 1.9c-1.564 0-2.83 1.266-2.83 2.83s1.266 2.83 2.83 2.83 2.83-1.266 2.83-2.83-1.266-2.83-2.83-2.83zm5.889-4.17c.52 0 .94.42.94.94 0 .52-.42.94-.94.94-.52 0-.94-.42-.94-.94 0-.52.42-.94.94-.94z" clipRule="evenodd" /></svg>
                        </a>
                        <div className="h-4 w-px bg-[var(--wat-glass-border)] mx-1" />
                        <div className="flex items-center gap-2">
                            <StatusPulse />
                            <span className="text-[10px] text-[var(--wat-primary)] font-medium uppercase tracking-wider hidden xl:block">
                                متاح لاستقبال المشاريع
                            </span>
                        </div>
                    </div>

                    <SignedIn>
                        <SmartLink
                            href="/dashboard"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--wat-glass-border)] hover:border-[var(--wat-primary)] transition-colors text-sm font-medium"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            لوحة التحكم
                        </SmartLink>
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
