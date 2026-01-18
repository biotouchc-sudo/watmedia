import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const sidebarLinks = [
    { href: '/dashboard', icon: '📊', label: 'نظرة عامة' },
    { href: '/dashboard/projects', icon: '📁', label: 'المشاريع' },
    { href: '/dashboard/analytics', icon: '📈', label: 'التحليلات' },
    { href: '/dashboard/invoices', icon: '📄', label: 'الفواتير' },
    { href: '/dashboard/settings', icon: '⚙️', label: 'الإعدادات' },
]

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    return (
        <div className="min-h-screen bg-[var(--wat-background)] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[var(--wat-surface)] border-l border-[var(--wat-glass-border)] fixed top-0 right-0 h-full z-40 hidden lg:block backdrop-blur-xl">
                {/* Logo */}
                <div className="p-6 border-b border-[var(--wat-glass-border)] flex justify-center">
                    <Link href="/" className="relative w-full h-12 flex items-center justify-center group">
                        <img
                            src="/logo.png"
                            alt="WATMEDIA"
                            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                        />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--wat-text-muted)] hover:text-white hover:bg-[var(--wat-glass-bg)] transition-colors"
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* User Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--wat-glass-border)]">
                    <div className="flex items-center gap-3">
                        <UserButton />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">حسابك</p>
                            <p className="text-xs text-[var(--wat-text-muted)]">إدارة الحساب</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:mr-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 glass px-6 py-4 flex items-center justify-between lg:hidden border-b border-[var(--wat-glass-border)]">
                    <Link href="/">
                        <img
                            src="/logo.png"
                            alt="WATMEDIA"
                            className="h-8 w-auto object-contain"
                        />
                    </Link>
                    <UserButton />
                </header>

                {/* Page Content */}
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
