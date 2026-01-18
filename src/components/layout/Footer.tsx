import Link from 'next/link'

const footerLinks = {
    services: [
        { name: 'Architect Core', href: '/services/architect-core' },
        { name: 'Visual Pulse', href: '/services/visual-pulse' },
        { name: 'Growth Engine', href: '/services/growth-engine' },
    ],
    company: [
        { name: 'من نحن', href: '/about' },
        { name: 'أعمالنا', href: '/portfolio' },
        { name: 'اتصل بنا', href: '/contact' },
    ],
    legal: [
        { name: 'سياسة الخصوصية', href: '/privacy' },
        { name: 'الشروط والأحكام', href: '/terms' },
    ],
}

const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'LinkedIn', href: '#', icon: 'in' },
    { name: 'Instagram', href: '#', icon: '📸' },
]

export function Footer() {
    return (
        <footer className="bg-[var(--wat-surface)] border-t border-[var(--wat-glass-border)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--wat-primary)] to-transparent opacity-50" />

            <div className="mx-auto max-w-7xl px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Node */}
                    <div className="space-y-6">
                        <div className="relative inline-block">
                            <h2 className="text-3xl font-bold gradient-text tracking-tight scale-110 origin-left">WATMEDIA</h2>
                            <div className="absolute -inset-4 bg-[var(--wat-primary)] opacity-10 blur-xl rounded-full -z-10 animate-pulse-slow" />
                        </div>
                        <p className="text-sm text-[var(--wat-text-muted)] max-w-xs leading-relaxed">
                            مهندسو النمو الرقمي. <br />
                            نحن لا نتوقع النتائج، نحن نهندسها.
                        </p>

                        {/* Social Signals */}
                        <div className="flex gap-4 pt-2">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-lg hover:border-[var(--wat-primary)] hover:text-white hover:bg-[var(--wat-primary)]/10 transition-all duration-300 hover:scale-110 group shadow-lg"
                                >
                                    <span className="group-hover:animate-spin-slow">{social.icon}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Service Node */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--wat-primary)] animate-pulse" />
                            خدماتنا
                        </h3>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--wat-text-muted)] hover:text-[var(--wat-primary)] transition-all duration-300 flex items-center gap-2 hover:translate-x-1"
                                    >
                                        <span className="opacity-0 hover:opacity-100 transition-opacity">›</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Node */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--wat-secondary)] animate-pulse" />
                            الشركة
                        </h3>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--wat-text-muted)] hover:text-[var(--wat-secondary)] transition-all duration-300 flex items-center gap-2 hover:translate-x-1"
                                    >
                                        <span className="opacity-0 hover:opacity-100 transition-opacity">›</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Node */}
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                            قانوني
                        </h3>
                        <ul className="space-y-4">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--wat-text-muted)] hover:text-red-400 transition-all duration-300 flex items-center gap-2 hover:translate-x-1"
                                    >
                                        <span className="opacity-0 hover:opacity-100 transition-opacity">›</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* System Status & Copyright */}
                <div className="mt-16 pt-8 border-t border-[var(--wat-glass-border)] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border-[var(--wat-glass-border)] bg-[var(--wat-surface)]/50">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                        <span className="text-xs font-mono text-[var(--wat-text-muted)] tracking-wider">ALL SYSTEMS OPERATIONAL</span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
                        <p className="text-xs text-[var(--wat-text-muted)]">
                            © {new Date().getFullYear()} WATMEDIA. جميع الحقوق محفوظة.
                        </p>
                        <p className="text-xs text-[var(--wat-text-muted)] flex items-center gap-1">
                            صُنع بـ <span className="text-red-500 animate-pulse">❤</span> في المملكة العربية السعودية
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
