import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[var(--wat-bg)] flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                {/* 404 Illustration */}
                <div className="relative mb-8">
                    <span className="text-[150px] font-bold gradient-text opacity-20">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">🔍</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-white mb-4">
                    الصفحة غير موجودة
                </h1>

                {/* Message */}
                <p className="text-[var(--wat-text-muted)] mb-8">
                    عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
                    تأكد من صحة الرابط أو عد للصفحة الرئيسية.
                </p>

                {/* Quick Links */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                        href="/"
                        className="px-8 py-4 bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white font-medium rounded-full transition-all duration-300 glow"
                    >
                        العودة للرئيسية
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-4 glass rounded-full font-medium text-[var(--wat-text)] hover:border-[var(--wat-primary)] transition-all duration-300"
                    >
                        اتصل بنا
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="glass p-6 rounded-2xl">
                    <h3 className="text-sm font-semibold text-[var(--wat-secondary)] mb-4">
                        روابط مفيدة
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { href: '/services', label: 'خدماتنا' },
                            { href: '/portfolio', label: 'أعمالنا' },
                            { href: '/about', label: 'من نحن' },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-[var(--wat-text-muted)] hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
