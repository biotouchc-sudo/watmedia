import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'
import type { Metadata } from 'next'
import { db } from '@/db'
import { invoices as invoicesTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getOrSyncUser } from '@/lib/auth'

export const metadata: Metadata = {
    title: 'الفواتير',
}

export default async function InvoicesPage() {
    const userId = await getOrSyncUser()

    if (!userId) {
        return <div className="text-white">يرجى تسجيل الدخول.</div>
    }

    const invoices = await db.query.invoices.findMany({
        where: eq(invoicesTable.userId, userId),
        orderBy: (invoices, { desc }) => [desc(invoices.createdAt)],
    })

    const summary = invoices.reduce((acc, inv) => {
        const amount = parseFloat(inv.amount.replace(/[^0-9.]/g, '')) || 0
        acc.total += amount
        if (inv.status === 'PAID') acc.paid += amount
        else acc.pending += amount
        return acc
    }, { total: 0, paid: 0, pending: 0 })

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">الفواتير</h1>
                <p className="text-[var(--wat-text-muted)]">إدارة ومتابعة فواتيرك</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-[var(--wat-text-muted)]">إجمالي الفواتير</p>
                        <p className="text-3xl font-bold text-white mt-1">{summary.total.toLocaleString()} ر.س</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-[var(--wat-text-muted)]">المدفوع</p>
                        <p className="text-3xl font-bold text-green-400 mt-1">{summary.paid.toLocaleString()} ر.س</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-[var(--wat-text-muted)]">المعلق</p>
                        <p className="text-3xl font-bold text-yellow-400 mt-1">{summary.pending.toLocaleString()} ر.س</p>
                    </CardContent>
                </Card>
            </div>

            {/* Invoices Table */}
            <Card>
                <CardHeader>
                    <CardTitle>سجل الفواتير</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[var(--wat-surface)]">
                                <tr className="text-right">
                                    <th className="px-6 py-4 text-sm font-medium text-[var(--wat-text-muted)]">رقم الفاتورة</th>
                                    <th className="px-6 py-4 text-sm font-medium text-[var(--wat-text-muted)]">الوصف</th>
                                    <th className="px-6 py-4 text-sm font-medium text-[var(--wat-text-muted)]">المبلغ</th>
                                    <th className="px-6 py-4 text-sm font-medium text-[var(--wat-text-muted)]">التاريخ</th>
                                    <th className="px-6 py-4 text-sm font-medium text-[var(--wat-text-muted)]">الحالة</th>
                                    <th className="px-6 py-4 text-sm font-medium text-[var(--wat-text-muted)]">إجراء</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--wat-glass-border)]">
                                {invoices.length > 0 ? (
                                    invoices.map((invoice) => (
                                        <tr key={invoice.id} className="hover:bg-[var(--wat-glass-bg)]">
                                            <td className="px-6 py-4 text-white font-mono">{invoice.id}</td>
                                            <td className="px-6 py-4 text-[var(--wat-text-muted)]">{invoice.description}</td>
                                            <td className="px-6 py-4 text-white">{parseFloat(invoice.amount).toLocaleString()} ر.س</td>
                                            <td className="px-6 py-4 text-[var(--wat-text-muted)]">{invoice.date.toLocaleDateString('ar-SA')}</td>
                                            <td className="px-6 py-4">
                                                <Badge variant={invoice.status === 'PAID' ? 'success' : 'warning'}>
                                                    {invoice.status === 'PAID' ? 'مدفوعة' : 'معلقة'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                {invoice.status === 'UNPAID' ? (
                                                    <button className="text-sm text-[var(--wat-primary)] hover:text-[var(--wat-secondary)]">
                                                        ادفع الآن
                                                    </button>
                                                ) : (
                                                    <a href={`/invoice/${invoice.id}`} target="_blank" className="text-sm text-[var(--wat-text-muted)] hover:text-white flex items-center gap-1">
                                                        <span>📄</span> عرض الفاتورة
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-[var(--wat-text-muted)] italic">
                                            لا توجد فواتير حالية.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
