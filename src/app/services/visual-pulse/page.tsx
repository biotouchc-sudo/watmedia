import Link from 'next/link'
import { Card, Badge } from '@/components/ui'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Visual Pulse | التصميم البصري',
    description: 'خدمة تصميم الهوية البصرية الاحترافية. شعارات، واجهات مستخدم، مواد تسويقية تعكس قيم علامتك التجارية.',
}

const features = [
    { icon: '🎨', title: 'تصميم شعارات', desc: 'شعارات فريدة تعبر عن هوية علامتك' },
    { icon: '📐', title: 'UI/UX Design', desc: 'واجهات مستخدم بديهية وجذابة' },
    { icon: '📄', title: 'Brand Guidelines', desc: 'دليل هوية بصرية شامل' },
    { icon: '🎬', title: 'Motion Design', desc: 'رسوم متحركة واحترافية' },
    { icon: '📱', title: 'Social Media', desc: 'تصاميم منصات التواصل' },
    { icon: '🖼️', title: 'مواد تسويقية', desc: 'بروشورات، بطاقات، لافتات' },
]

const process = [
    { step: '01', title: 'البحث', desc: 'فهم السوق والمنافسين والجمهور المستهدف' },
    { step: '02', title: 'المفهوم', desc: 'تطوير أفكار ومفاهيم تصميمية متعددة' },
    { step: '03', title: 'التنفيذ', desc: 'تحويل المفهوم المعتمد إلى تصاميم نهائية' },
    { step: '04', title: 'التسليم', desc: 'تسليم جميع الملفات بصيغ متعددة' },
]

const pricing = [
    { name: 'Logo Only', price: '2,000', features: ['3 مفاهيم', 'تعديلات غير محدودة', 'ملفات AI/PNG/SVG'] },
    { name: 'Brand Package', price: '5,000', features: ['شعار كامل', 'Brand Guidelines', 'بطاقات أعمال', 'قوالب سوشيال'], popular: true },
    { name: 'Full Identity', price: '10,000+', features: ['كل ما سبق', 'UI/UX للموقع', 'مواد تسويقية', 'Motion Logo'] },
]

export default function VisualPulsePage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--wat-background)]">
                {/* Hero */}
                <section className="relative py-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(145,147,110,0.1)_0%,transparent_60%)] pointer-events-none" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <Badge variant="secondary" className="mb-6">خدمة إبداعية</Badge>
                        <div className="text-6xl mb-6">🎨</div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
                            Visual Pulse
                        </h1>
                        <p className="text-2xl text-[var(--wat-secondary)] mb-4">التصميم البصري</p>
                        <p className="text-xl text-[var(--wat-text-muted)] max-w-2xl mx-auto animate-fade-in-delay">
                            نصمم هويات بصرية لا تُنسى تميز علامتك التجارية وتجذب عملائك المستهدفين.
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
                            منهجيتنا
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
                            جاهز لهوية بصرية مميزة؟
                        </h2>
                        <Link
                            href="/contact"
                            className="inline-flex bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 glow"
                        >
                            احصل على عرض سعر
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
