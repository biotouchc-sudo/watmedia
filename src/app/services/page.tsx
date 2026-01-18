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
                <section className="relative py-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(145,147,110,0.1)_0%,transparent_60%)] pointer-events-none" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
                            خدماتنا
                        </h1>
                        <p className="text-xl text-[var(--wat-text-muted)] max-w-2xl mx-auto animate-fade-in-delay">
                            حلول رقمية متكاملة مصممة خصيصاً لتحقيق أهداف نمو أعمالك.
                            من الفكرة إلى التنفيذ، نحن معك في كل خطوة.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {services.map((service, i) => (
                            <Card key={service.id} className="p-8 md:p-12">
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <div className="text-5xl mb-4">{service.icon}</div>
                                            <h2 className="text-2xl font-bold text-white mb-2">
                                                {service.name}
                                            </h2>
                                            <h3 className="text-lg text-[var(--wat-secondary)] mb-4">
                                                {service.nameAr}
                                            </h3>
                                            <p className="text-[var(--wat-text-muted)] mb-6">
                                                {service.description}
                                            </p>
                                            <div className="text-xl font-semibold gradient-text mb-6">
                                                {service.price}
                                            </div>
                                            <Link
                                                href={`/services/${service.id}`}
                                                className="inline-flex items-center gap-2 bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white px-6 py-3 rounded-full transition-all duration-300"
                                            >
                                                اعرف المزيد
                                                <span>←</span>
                                            </Link>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-semibold text-[var(--wat-secondary)] uppercase tracking-wider mb-4">
                                                ماذا يتضمن
                                            </h4>
                                            {service.features.map((feature, j) => (
                                                <div
                                                    key={j}
                                                    className="flex items-center gap-3 text-[var(--wat-text-muted)]"
                                                >
                                                    <span className="w-2 h-2 bg-[var(--wat-primary)] rounded-full" />
                                                    {feature}
                                                </div>
                                            ))}
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
