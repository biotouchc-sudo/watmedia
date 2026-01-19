import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { SmartLink } from '@/components/ui/SmartLink'
import { BioAuth } from '@/components/features/BioAuth'
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
        <div className="space-y-8 animate-fade-in relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold gradient-text mb-2 animate-slide-in-right">مرحباً قائد النمو! 👋</h1>
                    <p className="text-[var(--wat-text-muted)] text-lg animate-fade-in-delay">لوحة القيادة جاهزة للإقلاع.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[var(--wat-surface-highlight)] border border-[var(--wat-glass-border)] text-xs text-[var(--wat-primary)] animate-pulse-glow flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--wat-primary)] animate-ping"></span>
                        النظام يعمل بكفاءة
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="glass hover:border-[var(--wat-primary-dim)] transition-all duration-500 group overflow-hidden relative border-[var(--wat-glass-border)] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-xl hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--wat-primary-glow)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-[var(--wat-text-muted)] font-medium mb-1">{stat.label}</p>
                                    <p className="text-4xl font-bold text-white mt-2 group-hover:scale-110 transition-transform origin-right duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{stat.value}</p>
                                </div>
                                <span className="text-3xl p-3 rounded-2xl bg-[var(--wat-glass-highlight)] group-hover:rotate-12 transition-transform duration-500 backdrop-blur-md border border-[var(--wat-glass-border)] shadow-lg" style={{ color: stat.color }}>{stat.icon}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Projects */}
                <Card className="lg:col-span-2 glass border-[var(--wat-glass-border)] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-xl">
                    <CardHeader className="border-b border-[var(--wat-glass-border)] bg-gradient-to-r from-[var(--wat-glass-highlight)] to-transparent">
                        <CardTitle className="text-xl flex items-center gap-2">
                            🚀 المشاريع النشطة
                            <span className="text-xs font-normal text-[var(--wat-text-muted)] px-2 py-0.5 rounded-full border border-[var(--wat-glass-border)]">محدث</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-[var(--wat-glass-border)]">
                            {recentProjects.length > 0 ? (
                                recentProjects.map((project, i) => (
                                    <div key={i} className="flex items-center gap-4 p-6 hover:bg-[var(--wat-glass-highlight)] transition-colors group cursor-pointer relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--wat-primary)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                        <div className="w-12 h-12 rounded-full bg-[var(--wat-surface)] flex items-center justify-center border border-[var(--wat-glass-border)] text-xl group-hover:border-[var(--wat-primary)] transition-colors shadow-inner">
                                            🚀
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-bold text-lg group-hover:text-[var(--wat-primary)] transition-colors">{project.name}</p>
                                            <p className="text-xs text-[var(--wat-text-muted)] uppercase tracking-wider">{project.status}</p>
                                        </div>
                                        <div className="w-32">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-[var(--wat-text-muted)]">الإنجاز</span>
                                                <span className="text-white font-mono">{project.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-[var(--wat-surface)] rounded-full overflow-hidden border border-white/5">
                                                <div
                                                    className="h-full bg-gradient-to-r from-[var(--wat-primary)] to-[var(--wat-secondary)] rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_var(--wat-primary)]"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-16 text-center">
                                    <div className="text-6xl mb-6 opacity-20 animate-pulse">🌑</div>
                                    <p className="text-[var(--wat-text-muted)] text-xl font-light">لا توجد مشاريع نشطة حالياً.</p>
                                    <p className="text-sm text-[var(--wat-text-muted)] opacity-60 mt-2">السكون يسبق الانطلاق... ابدأ مشروعك الأول الآن.</p>
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-[var(--wat-glass-border)] bg-[var(--wat-glass-highlight)]/30 hover:bg-[var(--wat-glass-highlight)]/50 transition-colors">
                            <SmartLink
                                href="/dashboard/projects"
                                className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--wat-secondary)] hover:text-white transition-colors group"
                            >
                                عرض كل الأرشيف <span className="text-lg group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">→</span>
                            </SmartLink>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column: BioAuth + Quick Actions */}
                <div className="space-y-6">
                    {/* BioAuth Component */}
                    <div className="animate-fade-in-delay" style={{ animationDelay: '0.3s' }}>
                        <BioAuth />
                    </div>

                    {/* Quick Actions */}
                    <Card className="glass h-fit sticky top-24 border-[var(--wat-glass-border)] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-xl">
                        <CardHeader className="bg-gradient-to-r from-[var(--wat-glass-highlight)] to-transparent">
                            <CardTitle className="text-lg text-[var(--wat-accent)] flex items-center gap-2">
                                ⚡ عمليات سريعة
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 grid gap-4 mt-4">
                            {quickActions.map((action, i) => (
                                <SmartLink
                                    key={i}
                                    href={action.href}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-[var(--wat-surface)]/50 border border-[var(--wat-glass-border)] hover:border-[var(--wat-primary)] hover:bg-[var(--wat-surface)] hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all duration-300 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{action.icon}</span>
                                    <span className="font-medium text-[var(--wat-text-muted)] group-hover:text-white transition-colors">{action.label}</span>
                                </SmartLink>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
