import { Card } from '@/components/ui'
import { Badge } from '@/components/ui'

/*
  This is a specialized printable layout.
  When the user clicks "Print" or "Download PDF" (which triggers window.print()),
  this CSS ensures it looks like a formal document.
*/

interface InvoiceProps {
    data: {
        id: string
        date: Date
        description: string
        amount: string
        status: string
        clientName?: string
        clientEmail?: string
    }
}

export default function InvoiceTemplate({ data }: InvoiceProps) {
    return (
        <div className="bg-white text-black p-12 max-w-4xl mx-auto min-h-screen relative" id="invoice-template">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-gray-100 pb-8 mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">WATMEDIA</h1>
                    <p className="text-gray-500 text-sm">Riyadh, Saudi Arabia</p>
                    <p className="text-gray-500 text-sm">support@watmedia.sa</p>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl font-light text-gray-400 mb-2">INVOICE</h2>
                    <p className="text-xl font-mono font-bold">{data.id}</p>
                    <Badge variant={data.status === 'PAID' ? 'success' : 'error'} className="mt-2 text-xs">
                        {data.status}
                    </Badge>
                </div>
            </div>

            {/* Client Info */}
            <div className="mb-12">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Bill To</h3>
                <p className="font-bold text-lg">{data.clientEmail || 'Valued Client'}</p>
                <p className="text-gray-500">Project ID: {data.id.split('-')[1] || 'GEN'}</p>
            </div>

            {/* Table */}
            <div className="mb-12">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-4 text-gray-500 font-medium">Description</th>
                            <th className="text-right py-4 text-gray-500 font-medium">Date</th>
                            <th className="text-right py-4 text-gray-500 font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-100">
                            <td className="py-6 font-medium">{data.description}</td>
                            <td className="text-right py-6 text-gray-500">{data.date.toLocaleDateString()}</td>
                            <td className="text-right py-6 font-bold">{data.amount} SAR</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Total */}
            <div className="flex justify-end mb-16">
                <div className="w-64">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Subtotal</span>
                        <span>{data.amount} SAR</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Tax (0%)</span>
                        <span>0 SAR</span>
                    </div>
                    <div className="flex justify-between py-4 text-xl font-bold">
                        <span>Total</span>
                        <span>{data.amount} SAR</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-12 left-12 right-12 text-center text-gray-400 text-sm">
                <p>Thank you for doing business with WATMEDIA.</p>
                <p className="mt-2 text-xs">This is a widely recognized electronic invoice.</p>
            </div>
        </div>
    )
}
