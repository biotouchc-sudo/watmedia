import { db } from '@/db'
import { users, projects, invoices } from '@/db/schema'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { count } from 'drizzle-orm'

export default async function AdminDashboardPage() {
    const [userCount] = await db.select({ count: count() }).from(users)
    const [projectCount] = await db.select({ count: count() }).from(projects)
    const [invoiceCount] = await db.select({ count: count() }).from(invoices)

    const vitalStats = [
        { label: 'Total Users', value: userCount.count, color: 'text-blue-400' },
        { label: 'Total Projects', value: projectCount.count, color: 'text-purple-400' },
        { label: 'Total Invoices', value: invoiceCount.count, color: 'text-emerald-400' },
        { label: 'System Health', value: '100%', color: 'text-green-500' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Command Center</h1>
                <p className="text-[var(--wat-text-muted)]">Real-time system overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vitalStats.map((stat, i) => (
                    <Card key={i} className="border-[var(--wat-glass-border)] bg-[var(--wat-glass-bg)]">
                        <CardContent className="p-6">
                            <p className="text-sm text-[var(--wat-text-muted)] uppercase tracking-wider">{stat.label}</p>
                            <p className={`text-4xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Action Zone */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-[var(--wat-glass-border)]">
                    <CardHeader>
                        <CardTitle>Quick Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <a href="/admin/projects" className="block w-full text-center p-3 bg-[var(--wat-primary)] text-white rounded-lg hover:opacity-90 transition">
                            Manage Projects
                        </a>
                        <a href="/admin/invoices" className="block w-full text-center p-3 border border-[var(--wat-glass-border)] text-[var(--wat-text-muted)] rounded-lg hover:text-white hover:bg-[var(--wat-glass-bg)] transition">
                            Issue Invoice
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
