"use client";

import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * MEGA FOOTER (L200-L260 Compliant)
 * A professional, multi-column footer for luxury agencies.
 */

export function Footer() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: "الشركة",
            links: [
                { label: "من نحن", href: "/about" },
                { label: "أعمالنا", href: "/portfolio" },
                { label: "خدماتنا", href: "/services" },
                { label: "مسيرتنا", href: "/about#journey" },
            ]
        },
        {
            title: "الخدمات",
            links: [
                { label: "Architect Core", href: "/services/architect-core" },
                { label: "Visual Pulse", href: "/services/visual-pulse" },
                { label: "Growth Engine", href: "/services/growth-engine" },
                { label: "Conversion Flow", href: "/services/conversion-flow" },
            ]
        },
        {
            title: "القانونية",
            links: [
                { label: "سياسة الخصوصية", href: "/privacy" },
                { label: "الشروط والأحكام", href: "/terms" },
                { label: "إخلاء المسؤولية", href: "/disclaimer" },
            ]
        }
    ];

    return (
        <footer className="relative bg-[var(--wat-surface)] pt-24 pb-12 overflow-hidden">
            {/* Top Border Gradient */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--wat-primary)]/30 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-3xl font-bold tracking-tighter text-white">
                                WATMEDIA
                            </span>
                        </Link>
                        <p className="text-[var(--wat-text-muted)] leading-relaxed mb-8 max-w-sm">
                            نصوغ السيادة الرقمية للعلامات التجارية التي تقود المستقبل.
                            دمجنا الفن بالتكنولوجيا لنخلق تجارب استثنائية.
                        </p>

                        <div className="flex gap-4">
                            {/* Social Icons (Placeholders) */}
                            {["twitter", "instagram", "linkedin"].map(platform => (
                                <a
                                    key={platform}
                                    href={`#${platform}`}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[var(--wat-primary)] hover:border-[var(--wat-primary)] transition-colors"
                                    aria-label={platform}
                                >
                                    <span className="capitalize">{platform[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {sections.map(section => (
                            <div key={section.title}>
                                <h4 className="text-white font-bold mb-6">{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.links.map(link => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-[var(--wat-text-muted)] hover:text-[var(--wat-primary)] transition-colors inline-flex items-center group"
                                            >
                                                <span className="w-0 group-hover:w-2 transition-all duration-300 h-[1px] bg-[var(--wat-primary)] mr-0 group-hover:mr-2" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[var(--wat-text-muted)]">
                        © {currentYear} WATMEDIA. جميع الحقوق محفوظة.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-[var(--wat-text-muted)] tracking-widest uppercase">
                            Systems Operational
                        </span>
                    </div>
                </div>
            </div>

            {/* Background Noise/Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]"
                style={{ backgroundImage: 'var(--noise-pattern)' }}
            />
        </footer>
    );
}
