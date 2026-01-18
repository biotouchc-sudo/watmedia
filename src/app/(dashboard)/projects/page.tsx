import { Card, Badge } from '@/components/ui'
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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">المشاريع</h1>
                    <p className="text-[var(--wat-text-muted)]">إدارة ومتابعة مشاريعك</p>
                </div>
                <a href="/contact" className="px-6 py-3 bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white rounded-full font-medium transition-all">
                    طلب مشروع جديد
                </a>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <Card key={project.id} className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                {/* Project Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                                        <Badge
                                            variant={project.status === 'COMPLETED' ? 'success' : 'warning'}
                                        >
                                            {project.status === 'COMPLETED' ? 'مكتمل' : project.status === 'IN_PROGRESS' ? 'قيد التنفيذ' : 'معلق'}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-[var(--wat-text-muted)]">
                                        الخدمة: {project.service}
                                    </p>
                                </div>

                                {/* Dates */}
                                <div className="text-sm text-[var(--wat-text-muted)]">
                                    <p>البداية: {project.startDate?.toLocaleDateString('ar-SA') || '-'}</p>
                                    <p>التسليم: {project.dueDate?.toLocaleDateString('ar-SA') || '-'}</p>
                                </div>

                                {/* Progress */}
                                <div className="w-32">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-[var(--wat-text-muted)]">التقدم</span>
                                        <span className="text-white">{project.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-[var(--wat-surface)] rounded-full">
                                        <div
                                            className={`h-2 rounded-full transition-all ${project.progress === '100' ? 'bg-green-500' : 'bg-[var(--wat-primary)]'
                                                }`}
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    /* Empty State */
                    <Card className="p-12 text-center">
                        <div className="text-4xl mb-4">📁</div>
                        <h3 className="text-xl font-semibold text-white mb-2">لا توجد مشاريع</h3>
                        <p className="text-[var(--wat-text-muted)] mb-6">ابدأ بطلب مشروع جديد</p>
                        <a href="/contact" className="px-6 py-3 bg-[var(--wat-primary)] text-white rounded-full">
                            طلب مشروع
                        </a>
                    </Card>
                )}
            </div>
        </div>
    )
}
