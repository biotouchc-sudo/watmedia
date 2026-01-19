import { db } from '@/db'
import { invoices, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import InvoiceTemplate from '@/components/business/invoice/InvoiceTemplate'
import { Button } from '@/components/ui'
import Link from 'next/link'

export default async function InvoiceViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // In strict mode, we should verify ownership here (userId === currentUserId)
    const invoice = await db.query.invoices.findFirst({
        where: eq(invoices.id, id),
    })

    if (!invoice) return notFound()

    const user = await db.query.users.findFirst({
        where: eq(users.id, invoice.userId)
    })

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            {/* Controls (Hidden when printing) */}
            <div className="w-full max-w-4xl mb-6 flex justify-between items-center print:hidden">
                <Link href="/dashboard/invoices" className="text-gray-600 hover:text-black">
                    ← Back to Dashboard
                </Link>
                <div className="flex gap-4">
                    <button
                        className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                    /* In a client component this would be onClick={() => window.print()} */
                    /* Since this is server, we need a client wrapper or simple script */
                    >
                        Press Ctrl+P to Save as PDF
                    </button>
                </div>
            </div>

            {/* The Paper */}
            <div className="shadow-2xl print:shadow-none w-full max-w-4xl">
                <InvoiceTemplate data={{
                    id: invoice.id,
                    date: invoice.date,
                    description: invoice.description,
                    amount: invoice.amount,
                    status: invoice.status,
                    clientEmail: user?.email
                }} />
            </div>

            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #invoice-template, #invoice-template * {
                        visibility: visible;
                    }
                    #invoice-template {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        min-height: 100vh;
                    }
                    @page { margin: 0; }
                }
            `}</style>
        </div>
    )
}
