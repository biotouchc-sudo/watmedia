import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import Link from 'next/link'
import { db } from '@/db'
import { projects as projectsTable, invoices as invoicesTable } from '@/db/schema'
import { eq, count } from 'drizzle-orm'
import { getOrSyncUser } from '@/lib/auth'

export default async function DashboardPage() {
    const userId = await getOrSyncUser()

    if (!userId) {
        return <div className="text-white">يرجى تسجيل الدخول للوصول إلى لوحة التحكم.</div>
    }

    // Fetch Stats
    const [activeProjectsResult] = await db.select({ count: count() }).from(projectsTable).where(eq(projectsTable.userId, userId))
    const [unpaidInvoicesResult] = await db.select({ count: count() }).from(invoicesTable).where(eq(invoicesTable.userId, userId))

    const recentProjects = await db.query.projects.findMany({
        where: eq(projectsTable.userId, userId),
        orderBy: (projects, { desc }) => [desc(projects.createdAt)],
        limit: 5,
    })

    const stats = [
        { label: 'المشاريع النشطة', value: activeProjectsResult.count.toString(), icon: '📁', color: 'var(--wat-primary)' },
        { label: 'الفواتير المعلقة', value: unpaidInvoicesResult.count.toString(), icon: '📄', color: 'var(--wat-secondary)' },
        { label: 'تذاكر الدعم', value: '0', icon: '🎫', color: 'gray' },
        { label: 'الإشعارات', value: '5', icon: '🔔', color: 'var(--wat-primary)' },
    ]

    const quickActions = [
        { label: 'طلب خدمة جديدة', href: '/contact', icon: '➕' },
        { label: 'عرض الفواتير', href: '/dashboard/invoices', icon: '📄' },
        { label: 'إعدادات الحساب', href: '/dashboard/settings', icon: '⚙️' },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">مرحباً بك! 👋</h1>
                <p className="text-[var(--wat-text-muted)]">إليك نظرة سريعة على حسابك</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-[var(--wat-text-muted)]">{stat.label}</p>
                                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                                </div>
                                <span className="text-3xl">{stat.icon}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Projects */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>المشاريع الأخيرة</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <div className="space-y-4">
                            {recentProjects.length > 0 ? (
                                recentProjects.map((project, i) => (
                                    <div key={i} className="flex items-center gap-4 border-b border-[var(--wat-glass-border)] pb-4 last:border-0 last:pb-0">
                                        <div className="flex-1">
                                            <p className="text-white font-medium">{project.name}</p>
                                            <p className="text-sm text-[var(--wat-text-muted)]">{project.status}</p>
                                        </div>
                                        <div className="w-24">
                                            <div className="h-2 bg-[var(--wat-surface)] rounded-full">
                                                <div
                                                    className="h-2 bg-[var(--wat-primary)] rounded-full transition-all"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-[var(--wat-text-muted)] text-left mt-1">
                                                {project.progress}%
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[var(--wat-text-muted)] text-sm italic">لا توجد مشاريع حالية. اطلب خدمتك الأولى الآن!</p>
                            )}
                        </div>
                        <Link
                            href="/dashboard/projects"
                            className="block text-center text-sm text-[var(--wat-secondary)] hover:text-white mt-6 transition-colors"
                        >
                            عرض جميع المشاريع ←
                        </Link>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>إجراءات سريعة</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 space-y-3">
                        {quickActions.map((action, i) => (
                            <Link
                                key={i}
                                href={action.href}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--wat-glass-bg)] transition-colors border border-transparent hover:border-[var(--wat-glass-border)]"
                            >
                                <span className="text-xl">{action.icon}</span>
                                <span className="text-[var(--wat-text-muted)] hover:text-white">{action.label}</span>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
