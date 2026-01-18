import { db } from '@/db'
import { users, invoices } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui'

async function createInvoice(formData: FormData) {
    'use server'

    const description = formData.get('description') as string
    const amount = formData.get('amount') as string
    const userId = formData.get('userId') as string
    const status = formData.get('status') as string // UNPAID, PAID
    const date = new Date()

    await db.insert(invoices).values({
        description,
        amount,
        userId,
        status,
        date
    })

    revalidatePath('/admin/invoices')
    redirect('/admin/invoices')
}

export default async function NewInvoicePage() {
    const allUsers = await db.query.users.findMany()

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Issue New Invoice</h1>

            <form action={createInvoice} className="space-y-6 bg-[var(--wat-surface)] p-8 rounded-xl border border-[var(--wat-glass-border)]">
                <div>
                    <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Description</label>
                    <input type="text" name="description" placeholder="e.g. Website Development Phase 1" required className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white focus:ring-2 focus:ring-[var(--wat-primary)] outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Amount (SAR)</label>
                        <input type="text" name="amount" placeholder="5000" required className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Client</label>
                        <select name="userId" className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white outline-none">
                            {allUsers.map(user => (
                                <option key={user.id} value={user.id}>{user.email}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[var(--wat-text-muted)] mb-2">Status</label>
                    <select name="status" className="w-full bg-[var(--wat-glass-bg)] border border-[var(--wat-glass-border)] rounded-lg p-3 text-white outline-none">
                        <option value="UNPAID">Unpaid</option>
                        <option value="PAID">Paid</option>
                    </select>
                </div>

                <Button type="submit" className="w-full bg-[var(--wat-primary)] text-white py-4 rounded-lg font-bold hover:bg-[var(--wat-secondary)] hover:text-black transition-all">
                    Generate Invoice
                </Button>
            </form>
        </div>
    )
}
