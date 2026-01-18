import { Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'الإعدادات',
}

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">الإعدادات</h1>
                <p className="text-[var(--wat-text-muted)]">إدارة إعدادات حسابك وتفضيلاتك</p>
            </div>

            {/* Profile Settings */}
            <Card className="glass border-[var(--wat-glass-border)]">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <span>👤</span> معلومات الحساب
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input label="الاسم الكامل" placeholder="أحمد محمد" defaultValue="أحمد محمد" className="bg-[var(--wat-surface)] border-[var(--wat-glass-border)] focus:border-[var(--wat-primary)]" />
                        <Input label="البريد الإلكتروني" type="email" placeholder="ahmed@example.com" defaultValue="ahmed@example.com" disabled className="bg-[var(--wat-surface)]/50 border-[var(--wat-glass-border)] opacity-70" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input label="رقم الهاتف" type="tel" placeholder="+966 5X XXX XXXX" className="bg-[var(--wat-surface)] border-[var(--wat-glass-border)] focus:border-[var(--wat-primary)]" />
                        <Input label="اسم الشركة" placeholder="شركتي" className="bg-[var(--wat-surface)] border-[var(--wat-glass-border)] focus:border-[var(--wat-primary)]" />
                    </div>
                    <button className="px-8 py-3 bg-gradient-to-r from-[var(--wat-primary)] to-[var(--wat-primary-dim)] hover:shadow-lg hover:shadow-[var(--wat-primary-glow)] text-black rounded-full font-bold transition-all transform hover:-translate-y-1">
                        حفظ التغييرات
                    </button>
                </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="glass border-[var(--wat-glass-border)]">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <span>🔔</span> الإشعارات
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                    {[
                        { label: 'إشعارات البريد الإلكتروني', desc: 'استقبال تحديثات المشاريع عبر الإيميل' },
                        { label: 'إشعارات الفواتير', desc: 'تنبيه عند إصدار فاتورة جديدة' },
                        { label: 'النشرة الإخبارية', desc: 'نصائح وأخبار من WATMEDIA' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-[var(--wat-glass-border)] last:border-0 hover:bg-[var(--wat-glass-highlight)] px-4 -mx-4 transition-colors">
                            <div>
                                <p className="text-white font-medium">{item.label}</p>
                                <p className="text-sm text-[var(--wat-text-muted)]">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer group">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-[var(--wat-surface)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--wat-primary)] group-hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
                            </label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-900/30 bg-red-900/5 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-red-400 flex items-center gap-2">
                        <span>⚠️</span> منطقة الخطر
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">حذف الحساب</p>
                            <p className="text-sm text-[var(--wat-text-muted)]">حذف حسابك وجميع بياناتك نهائياً. لا يمكن التراجع عن هذا الإجراء.</p>
                        </div>
                        <button className="px-6 py-2 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white rounded-full font-medium transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                            حذف الحساب
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
