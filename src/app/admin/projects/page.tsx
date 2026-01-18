import { db } from '@/db'
import { users, projects } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui'

async function createProject(formData: FormData) {
    'use server'

    const name = formData.get('name') as string
    const service = formData.get('service') as string
    const userId = formData.get('userId') as string
    const status = formData.get('status') as string
    const progress = formData.get('progress') as string
    const startDate = new Date(formData.get('startDate') as string)
    const dueDate = new Date(formData.get('dueDate') as string)

    await db.insert(projects).values({
        name,
        service,
        userId,
        status,
        progress,
        startDate,
        dueDate
    })

    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}

export default async function NewProjectPage() {
    const allUsers = await db.query.users.findMany()

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Create New Project</h1>

            <form action={createProject} className="space-y-6 bg-[var(--wat-surface)] p-8 rounded-xl border border-[var(--wat-glass-border)]">
                <div>
                    <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Project Name</label>
                    <input type="text" name="name" required className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white focus:ring-2 focus:ring-[var(--wat-primary)] outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Service Type</label>
                        <select name="service" className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white outline-none">
                            <option value="ARCHITECT_CORE">Architect Core</option>
                            <option value="VISUAL_PULSE">Visual Pulse</option>
                            <option value="GROWTH_ENGINE">Growth Engine</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Client (User)</label>
                        <select name="userId" className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white outline-none">
                            {allUsers.map(user => (
                                <option key={user.id} value={user.id}>{user.email}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Status</label>
                        <select name="status" className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white outline-none">
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Progress (%)</label>
                        <input type="number" name="progress" min="0" max="100" defaultValue="0" className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white outline-none" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Start Date</label>
                        <input type="date" name="startDate" required className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Due Date</label>
                        <input type="date" name="dueDate" required className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white outline-none" />
                    </div>
                </div>

                <Button type="submit" className="w-full bg-[var(--wat-primary)] text-white py-4 rounded-lg font-bold hover:bg-[var(--wat-secondary)] hover:text-black transition-all">
                    Launch Project
                </Button>
            </form>
        </div>
    )
}
