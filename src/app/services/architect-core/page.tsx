import Link from 'next/link'
import { Card, CardContent, Badge } from '@/components/ui'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Architect Core | هندسة المواقع',
    description: 'خدمة تصميم وتطوير مواقع وتطبيقات ويب عالية الأداء باستخدام أحدث التقنيات. Next.js, React, TypeScript.',
}

const features = [
    { icon: '⚡', title: 'أداء فائق', desc: 'مواقع سريعة مع Lighthouse Score > 95' },
    { icon: '🔒', title: 'أمان متقدم', desc: 'حماية شاملة مع Security Headers' },
    { icon: '📱', title: 'متجاوب 100%', desc: 'تصميم مثالي على جميع الأجهزة' },
    { icon: '🔍', title: 'SEO محسّن', desc: 'ترتيب أعلى في محركات البحث' },
    { icon: '🎨', title: 'تصميم مخصص', desc: 'واجهات فريدة تعكس هويتك' },
    { icon: '🛠️', title: 'لوحة تحكم', desc: 'إدارة المحتوى بسهولة تامة' },
]

const process = [
    { step: '01', title: 'الاكتشاف', desc: 'فهم أهدافك ومتطلباتك بعمق' },
    { step: '02', title: 'التصميم', desc: 'إنشاء تصاميم احترافية للاعتماد' },
    { step: '03', title: 'التطوير', desc: 'برمجة الموقع بأحدث التقنيات' },
    { step: '04', title: 'الإطلاق', desc: 'نشر الموقع ومتابعة الأداء' },
]

const techStack = [
    'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
    'PostgreSQL', 'Drizzle ORM', 'Vercel', 'Clerk Auth'
]

const pricing = [
    { name: 'Landing Page', price: '5,000', features: ['صفحة واحدة', 'تصميم مخصص', 'SEO أساسي', 'نموذج اتصال'] },
    { name: 'Corporate', price: '15,000', features: ['5-10 صفحات', 'لوحة تحكم', 'Blog', 'SEO متقدم'], popular: true },
    { name: 'E-Commerce', price: '25,000+', features: ['متجر كامل', 'إدارة منتجات', 'بوابات دفع', 'تقارير'] },
]

const faqs = [
    { q: 'كم يستغرق بناء الموقع؟', a: 'من 2-6 أسابيع حسب حجم المشروع وتعقيده.' },
    { q: 'هل يمكنني تعديل المحتوى بنفسي؟', a: 'نعم، نوفر لوحة تحكم سهلة الاستخدام.' },
    { q: 'ماذا يشمل السعر؟', a: 'التصميم، التطوير، النشر، والتدريب على الاستخدام.' },
]

export default function ArchitectCorePage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--wat-background)]">
                {/* Hero */}
                <section className="relative py-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(145,147,110,0.1)_0%,transparent_60%)] pointer-events-none" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <Badge variant="secondary" className="mb-6">خدمة رئيسية</Badge>
                        <div className="text-6xl mb-6">🏗️</div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
                            Architect Core
                        </h1>
                        <p className="text-2xl text-[var(--wat-secondary)] mb-4">هندسة المواقع</p>
                        <p className="text-xl text-[var(--wat-text-muted)] max-w-2xl mx-auto animate-fade-in-delay">
                            نبني مواقع وتطبيقات ويب عالية الأداء تحقق أهدافك التجارية
                            باستخدام أحدث التقنيات وأفضل الممارسات العالمية.
                        </p>
                    </div>
                </section>

                {/* Problem & Solution */}
                <section className="py-16 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                        <Card className="p-8 border-red-500/30">
                            <h3 className="text-xl font-bold text-red-400 mb-4">❌ المشكلة</h3>
                            <ul className="space-y-3 text-[var(--wat-text-muted)]">
                                <li>• مواقع بطيئة تفقدك الزوار</li>
                                <li>• تصاميم قديمة لا تعكس احترافيتك</li>
                                <li>• صعوبة في تحديث المحتوى</li>
                                <li>• عدم ظهور في نتائج البحث</li>
                            </ul>
                        </Card>
                        <Card className="p-8 border-green-500/30">
                            <h3 className="text-xl font-bold text-green-400 mb-4">✅ الحل</h3>
                            <ul className="space-y-3 text-[var(--wat-text-muted)]">
                                <li>• مواقع سريعة بتقنية Edge</li>
                                <li>• تصاميم عصرية ومتجاوبة</li>
                                <li>• لوحة تحكم سهلة الاستخدام</li>
                                <li>• SEO محسّن من البداية</li>
                            </ul>
                        </Card>
                    </div>
                </section>

                {/* Features */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wat-secondary)]">
                            ماذا ستحصل؟
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
                            كيف نعمل؟
                        </h2>
                        <div className="space-y-8">
                            {process.map((p, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="w-16 h-16 rounded-2xl bg-[var(--wat-primary)] flex items-center justify-center text-2xl font-bold text-white shrink-0">
                                        {p.step}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
                                        <p className="text-[var(--wat-text-muted)]">{p.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-xl font-semibold text-[var(--wat-secondary)] mb-6">
                            التقنيات المستخدمة
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {techStack.map((tech) => (
                                <Badge key={tech} variant="outline">{tech}</Badge>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section className="py-24 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wat-secondary)]">
                            الباقات والأسعار
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

                {/* FAQ */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wat-secondary)]">
                            الأسئلة الشائعة
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <Card key={i} className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                                    <p className="text-[var(--wat-text-muted)]">{faq.a}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-white">
                            جاهز لبناء موقعك؟
                        </h2>
                        <p className="text-[var(--wat-text-muted)] mb-8">
                            تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مخصص.
                        </p>
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
