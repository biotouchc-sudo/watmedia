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
        <footer className="bg-[var(--wat-surface)] border-t border-[var(--wat-glass-border)]">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold gradient-text">WATMEDIA</h2>
                        <p className="text-sm text-[var(--wat-text-muted)] max-w-xs">
                            مهندسو النمو الرقمي. نحن لا نتوقع النتائج، نحن نهندسها.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-sm hover:border-[var(--wat-primary)] transition-colors"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--wat-secondary)] uppercase tracking-wider mb-4">
                            خدماتنا
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--wat-text-muted)] hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--wat-secondary)] uppercase tracking-wider mb-4">
                            الشركة
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--wat-text-muted)] hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--wat-secondary)] uppercase tracking-wider mb-4">
                            قانوني
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--wat-text-muted)] hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-[var(--wat-glass-border)] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[var(--wat-text-muted)]">
                        © {new Date().getFullYear()} WATMEDIA. جميع الحقوق محفوظة.
                    </p>
                    <p className="text-xs text-[var(--wat-text-muted)]">
                        صُنع بـ 💚 في المملكة العربية السعودية
                    </p>
                </div>
            </div>
        </footer>
    )
}
