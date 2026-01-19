import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'خدماتنا | WATMEDIA',
    description: 'اكتشف خدمات WATMEDIA الشاملة: هندسة المواقع، التصميم البصري، والتسويق الرقمي. حلول متكاملة لنمو أعمالك.',
}

const services = [
    {
        id: 'architect-core',
        icon: '🏗️',
        name: 'Architect Core',
        nameAr: 'هندسة المواقع',
        description: 'تصميم وتطوير مواقع وتطبيقات ويب عالية الأداء باستخدام أحدث التقنيات.',
        features: [
            'مواقع Next.js سريعة ومُحسّنة لـ SEO',
            'متاجر إلكترونية متكاملة',
            'تطبيقات ويب معقدة',
            'واجهات برمجة تطبيقات (APIs)',
        ],
        price: 'تبدأ من 5,000 ر.س',
    },
    {
        id: 'visual-pulse',
        icon: '🎨',
        name: 'Visual Pulse',
        nameAr: 'التصميم البصري',
        description: 'تصميم هوية بصرية احترافية تعكس قيم علامتك التجارية وتجذب عملائك.',
        features: [
            'تصميم الشعارات والهوية البصرية',
            'تصميم واجهات المستخدم (UI/UX)',
            'المواد التسويقية والإعلانية',
            'Motion Graphics',
        ],
        price: 'تبدأ من 3,000 ر.س',
    },
    {
        id: 'growth-engine',
        icon: '🚀',
        name: 'Growth Engine',
        nameAr: 'محرك النمو',
        description: 'استراتيجيات تسويق رقمي مبنية على البيانات لتحقيق نمو مستدام.',
        features: [
            'إدارة الحملات الإعلانية (Google, Meta)',
            'تحسين محركات البحث (SEO)',
            'التسويق بالمحتوى',
            'التحليلات والتقارير',
        ],
        price: 'تبدأ من 2,500 ر.س/شهر',
    },
]

export default function ServicesPage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--wat-background)]">
                {/* Hero Section */}
                <section className="relative py-32 px-6 overflow-hidden flex items-center justify-center min-h-[50vh]">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                    <div className="absolute top-[-20%] right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text animate-fade-in tracking-tight">
                            خدماتنا
                        </h1>
                        <div className="h-1 w-32 bg-[var(--wat-primary)] mx-auto mb-8 rounded-full shadow-[0_0_20px_var(--wat-primary)]" />
                        <p className="text-xl md:text-2xl text-[var(--wat-text-muted)] max-w-3xl mx-auto animate-fade-in-delay leading-relaxed font-light">
                            حلول رقمية متكاملة مصممة خصيصاً لتحقيق أهداف نمو أعمالك. <br />
                            <strong className="text-white">من الفكرة إلى التنفيذ، نحن معك في كل خطوة.</strong>
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {services.map((service, i) => (
                            <Card key={service.id} className="p-8 md:p-12 glass border-[var(--wat-glass-border)] hover:border-[var(--wat-primary)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--wat-primary)] opacity-5 blur-[100px] rounded-full pointer-events-none" />

                                <CardContent className="p-0 relative z-10">
                                    <div className="grid md:grid-cols-2 gap-12 items-center">
                                        <div className="space-y-6">
                                            <div className="w-24 h-24 rounded-3xl bg-[var(--wat-surface)] border border-[var(--wat-glass-border)] flex items-center justify-center text-6xl shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                                {service.icon}
                                            </div>
                                            <div>
                                                <h2 className="text-4xl font-bold text-white mb-2 group-hover:text-[var(--wat-primary)] transition-colors">
                                                    {service.name}
                                                </h2>
                                                <h3 className="text-xl text-[var(--wat-secondary)] font-medium">
                                                    {service.nameAr}
                                                </h3>
                                            </div>
                                            <p className="text-[var(--wat-text-muted)] text-lg leading-relaxed border-l-2 border-[var(--wat-glass-border)] pl-4">
                                                {service.description}
                                            </p>
                                            <div className="inline-block px-6 py-3 rounded-xl bg-[var(--wat-surface)] border border-[var(--wat-glass-border)]">
                                                <span className="text-sm text-[var(--wat-text-muted)] block mb-1">الاستثمار</span>
                                                <div className="text-2xl font-bold gradient-text">
                                                    {service.price}
                                                </div>
                                            </div>
                                            <div className="pt-4">
                                                <Link
                                                    href={`/contact?service=${service.id}`}
                                                    className="inline-flex items-center gap-3 bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]"
                                                >
                                                    ابدأ المشروع الآن
                                                    <span className="text-xl group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">→</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="glass p-8 rounded-3xl border border-[var(--wat-glass-border)] bg-[var(--wat-surface)]/30">
                                            <h4 className="text-sm font-bold text-[var(--wat-secondary)] uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[var(--wat-secondary)] animate-pulse" />
                                                مميزات الباقة
                                            </h4>
                                            <div className="space-y-4">
                                                {service.features.map((feature, j) => (
                                                    <div
                                                        key={j}
                                                        className="flex items-center gap-4 text-[var(--wat-text-muted)] group-hover:text-white transition-colors p-3 rounded-lg hover:bg-[var(--wat-glass-highlight)]/50"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-[var(--wat-primary)]/20 flex items-center justify-center text-[var(--wat-primary)]">✓</div>
                                                        <span className="font-medium">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-white">
                            جاهز لبدء مشروعك؟
                        </h2>
                        <p className="text-[var(--wat-text-muted)] mb-8 max-w-2xl mx-auto">
                            تواصل معنا اليوم لمناقشة فكرتك والحصول على استشارة مجانية.
                            فريقنا جاهز لمساعدتك.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 glow"
                        >
                            تواصل معنا
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
