import { Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'الإعدادات',
}

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">الإعدادات</h1>
                <p className="text-[var(--wat-text-muted)]">إدارة إعدادات حسابك</p>
            </div>

            {/* Profile Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>معلومات الحساب</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input label="الاسم الكامل" placeholder="أحمد محمد" defaultValue="أحمد محمد" />
                        <Input label="البريد الإلكتروني" type="email" placeholder="ahmed@example.com" defaultValue="ahmed@example.com" disabled />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input label="رقم الهاتف" type="tel" placeholder="+966 5X XXX XXXX" />
                        <Input label="اسم الشركة" placeholder="شركتي" />
                    </div>
                    <button className="px-6 py-3 bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white rounded-full font-medium transition-all">
                        حفظ التغييرات
                    </button>
                </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
                <CardHeader>
                    <CardTitle>الإشعارات</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                    {[
                        { label: 'إشعارات البريد الإلكتروني', desc: 'استقبال تحديثات المشاريع عبر الإيميل' },
                        { label: 'إشعارات الفواتير', desc: 'تنبيه عند إصدار فاتورة جديدة' },
                        { label: 'النشرة الإخبارية', desc: 'نصائح وأخبار من WATMEDIA' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--wat-glass-border)] last:border-0">
                            <div>
                                <p className="text-white">{item.label}</p>
                                <p className="text-sm text-[var(--wat-text-muted)]">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-[var(--wat-surface)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--wat-primary)]"></div>
                            </label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-500/30">
                <CardHeader>
                    <CardTitle className="text-red-400">منطقة الخطر</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white">حذف الحساب</p>
                            <p className="text-sm text-[var(--wat-text-muted)]">حذف حسابك وجميع بياناتك نهائياً</p>
                        </div>
                        <button className="px-6 py-2 border border-red-500 text-red-400 hover:bg-red-500 hover:text-white rounded-full font-medium transition-all">
                            حذف الحساب
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
