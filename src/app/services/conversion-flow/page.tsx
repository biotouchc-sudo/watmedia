import Link from 'next/link'
import { Card, Badge } from '@/components/ui'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Conversion Flow | تحسين التحويلات',
    description: 'خدمة تحسين معدلات التحويل وتجربة المستخدم. A/B Testing, UX Optimization, Sales Funnels.',
}

const features = [
    { icon: '🔬', title: 'A/B Testing', desc: 'اختبارات مستمرة لتحسين الأداء' },
    { icon: '🎯', title: 'Landing Pages', desc: 'صفحات هبوط محسّنة للتحويل' },
    { icon: '📊', title: 'Analytics Setup', desc: 'إعداد تتبع شامل للبيانات' },
    { icon: '🔄', title: 'Sales Funnels', desc: 'قمع مبيعات محسّن' },
    { icon: '💬', title: 'UX Research', desc: 'فهم سلوك المستخدمين' },
    { icon: '⚡', title: 'Speed Optimization', desc: 'تحسين سرعة التحميل' },
]

const process = [
    { step: '01', title: 'التحليل', desc: 'فحص شامل للموقع والبيانات الحالية' },
    { step: '02', title: 'الفرضيات', desc: 'وضع فرضيات للتحسين بناءً على البيانات' },
    { step: '03', title: 'الاختبار', desc: 'تنفيذ اختبارات A/B ومراقبة النتائج' },
    { step: '04', title: 'التطبيق', desc: 'تطبيق التغييرات الفائزة والتكرار' },
]

const pricing = [
    { name: 'Audit', price: '3,000', features: ['تقرير تحليلي شامل', 'توصيات التحسين', 'خطة عمل'] },
    { name: 'Optimize', price: '8,000', features: ['كل ما سبق', '3 اختبارات A/B', 'تحسين صفحة هبوط', 'تقارير شهرية'], popular: true },
    { name: 'Scale', price: '15,000+', features: ['اختبارات غير محدودة', 'تحسين مستمر', 'مدير مخصص', 'تقارير أسبوعية'] },
]

export default function ConversionFlowPage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--wat-background)]">
                {/* Hero */}
                <section className="relative py-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(145,147,110,0.1)_0%,transparent_60%)] pointer-events-none" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <Badge variant="secondary" className="mb-6">خدمة تحسين</Badge>
                        <div className="text-6xl mb-6">🔄</div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
                            Conversion Flow
                        </h1>
                        <p className="text-2xl text-[var(--wat-secondary)] mb-4">تحسين التحويلات</p>
                        <p className="text-xl text-[var(--wat-text-muted)] max-w-2xl mx-auto animate-fade-in-delay">
                            نحوّل زوار موقعك إلى عملاء من خلال تحسين تجربة المستخدم
                            وزيادة معدلات التحويل بشكل علمي ومدروس.
                        </p>
                    </div>
                </section>

                {/* Features */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wat-secondary)]">
                            خدماتنا
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((f, i) => (
                                <Card key={i} className="p-6 text-center">
                                    <div className="text-4xl mb-4">{f.icon}</div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                                    <p className="text-sm text-[var(--wat-text-muted)]">{f.desc}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="py-24 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wat-secondary)]">
                            منهجية CRO
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {process.map((p, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-[var(--wat-primary)] flex items-center justify-center text-2xl font-bold text-white mb-4">
                                        {p.step}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                                    <p className="text-sm text-[var(--wat-text-muted)]">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wat-secondary)]">
                            الباقات
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {pricing.map((plan, i) => (
                                <Card key={i} className={`p-8 ${plan.popular ? 'border-[var(--wat-primary)] relative' : ''}`}>
                                    {plan.popular && (
                                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">الأكثر طلباً</Badge>
                                    )}
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="text-3xl font-bold gradient-text mb-6">
                                        {plan.price} <span className="text-lg text-[var(--wat-text-muted)]">ر.س</span>
                                    </div>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-2 text-[var(--wat-text-muted)]">
                                                <span className="text-green-400">✓</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/contact"
                                        className={`block text-center py-3 rounded-full font-medium transition-all ${plan.popular
                                                ? 'bg-[var(--wat-primary)] text-white hover:bg-[var(--wat-secondary)] hover:text-black'
                                                : 'glass hover:border-[var(--wat-primary)]'
                                            }`}
                                    >
                                        ابدأ الآن
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-white">
                            جاهز لمضاعفة تحويلاتك؟
                        </h2>
                        <Link
                            href="/contact"
                            className="inline-flex bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 glow"
                        >
                            احصل على تحليل مجاني
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
