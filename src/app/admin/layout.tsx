import { requireAdmin } from '@/lib/admin'
import { Sidebar } from 'lucide-react'
import Link from 'next/link'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // await requireAdmin() // Disabled for now to allow you to view it, re-enable after DB update

    return (
        <div className="min-h-screen bg-[var(--wat-bg)] flex">
            {/* Admin Sidebar */}
            <aside className="w-64 border-l border-[var(--wat-glass-border)] bg-[var(--wat-surface)] p-6 hidden md:block">
                <div className="mb-8">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Admin Center
                    </h2>
                    <p className="text-xs text-[var(--wat-text-muted)]">COMMAND MODE</p>
                </div>

                <nav className="space-y-2">
                    <Link href="/admin" className="block p-3 rounded-lg hover:bg-[var(--wat-glass-bg)] text-white">
                        Dashboard
                    </Link>
                    <div className="pt-4 pb-2 text-xs font-semibold text-[var(--wat-text-muted)]">MANAGEMENT</div>
                    <Link href="/admin/projects" className="block p-3 rounded-lg hover:bg-[var(--wat-glass-bg)] text-[var(--wat-text-muted)] hover:text-white">
                        Projects
                    </Link>
                    <Link href="/admin/invoices" className="block p-3 rounded-lg hover:bg-[var(--wat-glass-bg)] text-[var(--wat-text-muted)] hover:text-white">
                        Invoices
                    </Link>
                    <Link href="/admin/users" className="block p-3 rounded-lg hover:bg-[var(--wat-glass-bg)] text-[var(--wat-text-muted)] hover:text-white">
                        Users
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
