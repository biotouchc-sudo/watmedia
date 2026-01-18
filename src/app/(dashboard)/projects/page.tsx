import { Card, Badge } from '@/components/ui'
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import type { Metadata } from 'next'
import { db } from '@/db'
import { projects as projectsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getOrSyncUser } from '@/lib/auth'

export const metadata: Metadata = {
    title: 'المشاريع',
}

export default async function ProjectsPage() {
    const userId = await getOrSyncUser()

    if (!userId) {
        return <div className="text-white">يرجى تسجيل الدخول.</div>
    }

    const projects = await db.query.projects.findMany({
        where: eq(projectsTable.userId, userId),
        orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    })

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[var(--wat-glass-border)] pb-6">
                <div>
                    <h1 className="text-4xl font-bold gradient-text mb-2 animate-slide-in-right">المشاريع</h1>
                    <p className="text-[var(--wat-text-muted)] text-lg animate-fade-in-delay">إدارة ومتابعة مشاريعك بدقة متناهية.</p>
                </div>
                <a href="/contact" className="px-6 py-3 bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white rounded-full font-medium transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] hover:-translate-y-1 animate-pulse-slow">
                    ✨ طلب مشروع جديد
                </a>
            </div>

            {/* Projects List */}
            <StaggerContainer className="grid gap-6">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <StaggerItem key={project.id}>
                            <Card className="p-6 glass border-[var(--wat-glass-border)] hover:border-[var(--wat-primary)] transition-all duration-500 group relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(0,242,254,0.15)] hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                                <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                                    {/* Icon */}
                                    <div className="hidden md:flex w-16 h-16 rounded-2xl bg-[var(--wat-surface)]/80 items-center justify-center border border-[var(--wat-glass-border)] text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                                        🚀
                                    </div>

                                    {/* Project Info */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-white group-hover:text-[var(--wat-primary)] transition-colors duration-300">{project.name}</h3>
                                            <Badge
                                                variant={project.status === 'COMPLETED' ? 'success' : 'supreme'}
                                                className="animate-fade-in"
                                            >
                                                {project.status === 'COMPLETED' ? 'مكتمل' : project.status === 'IN_PROGRESS' ? 'جاري التنفيذ' : 'قيد الانتظار'}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-[var(--wat-text-muted)] flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[var(--wat-accent)]"></span>
                                            الخدمة: {project.service}
                                        </p>
                                    </div>

                                    {/* Dates */}
                                    <div className="text-sm text-[var(--wat-text-muted)] bg-[var(--wat-surface)]/50 px-4 py-2 rounded-lg border border-[var(--wat-glass-border)] group-hover:border-[var(--wat-glass-highlight)] transition-colors">
                                        <div className="flex justify-between gap-4 mb-1">
                                            <span>البداية:</span>
                                            <span className="text-white font-mono">{project.startDate?.toLocaleDateString('ar-SA') || '-'}</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span>التسليم:</span>
                                            <span className="text-[var(--wat-secondary)] font-mono font-bold">{project.dueDate?.toLocaleDateString('ar-SA') || '-'}</span>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="w-full md:w-48">
                                        <div className="flex justify-between text-xs mb-2">
                                            <span className="text-[var(--wat-text-muted)] font-medium">حالة الإنجاز</span>
                                            <span className={`font-mono font-bold ${project.progress === '100' ? 'text-green-400' : 'text-[var(--wat-primary)]'}`}>{project.progress}%</span>
                                        </div>
                                        <div className="h-3 bg-[var(--wat-surface)] rounded-full overflow-hidden border border-[var(--wat-glass-border)] shadow-inner">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_currentColor] ${project.progress === '100'
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                                                    : 'bg-gradient-to-r from-[var(--wat-primary)] to-[var(--wat-secondary)]'
                                                    }`}
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </StaggerItem>
                    ))
                ) : (
                    /* Empty State with Supreme Aesthetics */
                    <StaggerItem>
                        <Card className="p-16 text-center glass border-[var(--wat-glass-border)] flex flex-col items-center justify-center min-h-[400px]">
                            <div className="relative mb-8">
                                <div className="text-7xl animate-bounce-slow opacity-80">🔭</div>
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/50 blur-xl rounded-full animate-pulse"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">لا توجد مشاريع في الأفق</h3>
                            <p className="text-[var(--wat-text-muted)] mb-8 text-lg max-w-md mx-auto">
                                الكون واسع ولكن مساحتك فارغة. ابدأ رحلتك الرقمية معنا اليوم.
                            </p>
                            <a href="/contact" className="group px-8 py-4 bg-[var(--wat-primary)] text-white rounded-full font-bold shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] hover:bg-[var(--wat-secondary)] hover:text-black transition-all duration-300 flex items-center gap-3">
                                <span className="text-xl group-hover:rotate-90 transition-transform duration-300">🚀</span>
                                طلب مشروع جديد
                            </a>
                        </Card>
                    </StaggerItem>
                )}
            </StaggerContainer>
        </div>
    )
}
