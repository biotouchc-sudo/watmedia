import Link from 'next/link'
import { Card, Badge } from '@/components/ui'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Growth Engine | التسويق الرقمي',
    description: 'خدمة التسويق الرقمي وإدارة الحملات الإعلانية. Google Ads, Meta Ads, SEO, Content Marketing.',
}

const features = [
    { icon: '📈', title: 'Google Ads', desc: 'حملات بحث وعرض محسّنة' },
    { icon: '📱', title: 'Meta Ads', desc: 'إعلانات Facebook و Instagram' },
    { icon: '🔍', title: 'SEO', desc: 'تحسين محركات البحث العضوي' },
    { icon: '✍️', title: 'Content Marketing', desc: 'محتوى جذاب يحقق نتائج' },
    { icon: '📊', title: 'Analytics', desc: 'تحليلات وتقارير مفصلة' },
    { icon: '🎯', title: 'Conversion Rate', desc: 'تحسين معدلات التحويل' },
]

const results = [
    { metric: '+300%', label: 'زيادة في الزيارات' },
    { metric: '+150%', label: 'معدل التحويل' },
    { metric: '-40%', label: 'تكلفة الاكتساب' },
    { metric: '5x', label: 'العائد على الاستثمار' },
]

const pricing = [
    { name: 'Starter', price: '2,500', period: '/شهر', features: ['منصة واحدة', 'تقارير أسبوعية', 'ميزانية حتى 5,000 ر.س'] },
    { name: 'Growth', price: '5,000', period: '/شهر', features: ['منصتين', 'تقارير يومية', 'ميزانية حتى 15,000 ر.س', 'SEO أساسي'], popular: true },
    { name: 'Scale', price: '10,000+', period: '/شهر', features: ['جميع المنصات', 'مدير حساب مخصص', 'SEO متقدم', 'Content Marketing'] },
]

export default function GrowthEnginePage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--wat-background)]">
                {/* Hero */}
                <section className="relative py-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(145,147,110,0.1)_0%,transparent_60%)] pointer-events-none" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <Badge variant="secondary" className="mb-6">خدمة نمو</Badge>
                        <div className="text-6xl mb-6">🚀</div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
                            Growth Engine
                        </h1>
                        <p className="text-2xl text-[var(--wat-secondary)] mb-4">محرك النمو</p>
                        <p className="text-xl text-[var(--wat-text-muted)] max-w-2xl mx-auto animate-fade-in-delay">
                            نصمم ونننفذ استراتيجيات تسويق رقمي مبنية على البيانات
                            لتحقيق نمو مستدام وعائد استثمار مضمون.
                        </p>
                    </div>
                </section>

                {/* Results */}
                <section className="py-16 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-8 text-[var(--wat-secondary)]">
                            نتائج حقيقية لعملائنا
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {results.map((r, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-4xl font-bold gradient-text mb-2">{r.metric}</div>
                                    <div className="text-[var(--wat-text-muted)]">{r.label}</div>
                                </div>
                            ))}
                        </div>
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

                {/* Pricing */}
                <section className="py-24 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wat-secondary)]">
                            الباقات الشهرية
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {pricing.map((plan, i) => (
                                <Card key={i} className={`p-8 ${plan.popular ? 'border-[var(--wat-primary)] relative' : ''}`}>
                                    {plan.popular && (
                                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">الأكثر طلباً</Badge>
                                    )}
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="text-3xl font-bold gradient-text mb-1">
                                        {plan.price}
                                    </div>
                                    <p className="text-[var(--wat-text-muted)] mb-6">{plan.period}</p>
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
                <section className="py-24 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-white">
                            جاهز لتسريع نموك؟
                        </h2>
                        <Link
                            href="/contact"
                            className="inline-flex bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 glow"
                        >
                            احصل على استشارة مجانية
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
