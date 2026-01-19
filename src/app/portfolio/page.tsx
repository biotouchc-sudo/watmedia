import Link from 'next/link'
import { Card, Badge } from '@/components/ui'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'أعمالنا | WATMEDIA',
    description: 'استعرض مشاريعنا الناجحة. من المتاجر الإلكترونية إلى التطبيقات المعقدة، نفخر بكل مشروع نقدمه.',
}

const projects = [
    {
        id: 1,
        title: 'متجر الأناقة',
        category: 'متجر إلكتروني',
        description: 'متجر إلكتروني متكامل لبيع الأزياء والإكسسوارات مع نظام دفع متعدد.',
        image: '🛍️',
        tags: ['Next.js', 'Stripe', 'Tailwind'],
        results: '+150% مبيعات',
    },
    {
        id: 2,
        title: 'منصة التعليم الذكي',
        category: 'SaaS',
        description: 'منصة تعليمية تفاعلية مع نظام إدارة محتوى متقدم وتحليلات الطلاب.',
        image: '📚',
        tags: ['React', 'Node.js', 'PostgreSQL'],
        results: '+10K مستخدم',
    },
    {
        id: 3,
        title: 'تطبيق إدارة المهام',
        category: 'تطبيق ويب',
        description: 'تطبيق لإدارة المشاريع والمهام للفرق البعيدة مع تكامل Slack.',
        image: '✅',
        tags: ['TypeScript', 'Prisma', 'tRPC'],
        results: '50+ فريق',
    },
    {
        id: 4,
        title: 'بوابة العقارات',
        category: 'موقع عقاري',
        description: 'منصة لعرض العقارات مع خرائط تفاعلية وجولات افتراضية.',
        image: '🏠',
        tags: ['Next.js', 'Maps API', 'Supabase'],
        results: '+300 عقار',
    },
    {
        id: 5,
        title: 'هوية العيادة الطبية',
        category: 'هوية بصرية',
        description: 'تصميم هوية بصرية كاملة لعيادة أسنان مع موقع إلكتروني احترافي.',
        image: '🦷',
        tags: ['Branding', 'UI/UX', 'Website'],
        results: '+200% حجوزات',
    },
    {
        id: 6,
        title: 'حملة إطلاق المنتج',
        category: 'تسويق رقمي',
        description: 'حملة إعلانية متكاملة لإطلاق منتج جديد عبر منصات متعددة.',
        image: '🚀',
        tags: ['Meta Ads', 'Google Ads', 'SEO'],
        results: '+5M وصول',
    },
]

const categories = ['الكل', 'متجر إلكتروني', 'SaaS', 'تطبيق ويب', 'هوية بصرية', 'تسويق رقمي']

export default function PortfolioPage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--wat-background)]">
                {/* Hero Section */}
                <section className="relative py-32 px-6 overflow-hidden flex items-center justify-center min-h-[60vh]">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[var(--wat-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <Badge variant="supreme" className="mb-8 mx-auto hover:scale-105 transition-transform cursor-default">
                            ✨ معرض الإبداع الرقمي
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text animate-slide-in-up tracking-tight leading-tight">
                            أعمال تتحدث <br />
                            <span className="text-white drop-shadow-xl">عن نفسها</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-[var(--wat-text-muted)] max-w-3xl mx-auto animate-fade-in-delay leading-relaxed">
                            من المتاجر الإلكترونية العملاقة إلى الهويات البصرية المذهلة. <br />
                            نحن لا نبني موافع، نحن نبني <span className="text-[var(--wat-primary)] font-bold">إمبراطوريات رقمية</span>.
                        </p>
                    </div>
                </section>

                {/* Filter Tags */}
                <section className="px-6 pb-8">
                    <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="px-4 py-2 rounded-full text-sm glass hover:border-[var(--wat-primary)] transition-colors"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <Card key={project.id} className="group overflow-hidden glass border-[var(--wat-glass-border)] hover:border-[var(--wat-primary)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative">
                                {/* Spotlight Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--wat-primary)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="text-8xl text-center py-12 bg-[var(--wat-surface)] group-hover:bg-[var(--wat-surface-highlight)] transition-colors duration-500 relative overflow-hidden">
                                    <div className="relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out">{project.image}</div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--wat-background)] to-transparent opacity-50" />
                                </div>
                                <div className="p-8 space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-[var(--wat-primary)] transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm font-medium text-[var(--wat-secondary)] mt-1 uppercase tracking-wide">
                                                {project.category}
                                            </p>
                                        </div>
                                        <Badge variant="success" className="shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse-slow">{project.results}</Badge>
                                    </div>
                                    <p className="text-[var(--wat-text-muted)] leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--wat-glass-border)]">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-xs font-mono text-[var(--wat-text-muted)] px-2 py-1 rounded bg-[var(--wat-surface)] border border-[var(--wat-glass-border)]">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6 text-white">
                            هل تريد أن يكون مشروعك التالي هنا؟
                        </h2>
                        <p className="text-[var(--wat-text-muted)] mb-8 max-w-2xl mx-auto">
                            نحن جاهزون لتحويل فكرتك إلى قصة نجاح جديدة.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] hover:text-black text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 glow"
                        >
                            ابدأ مشروعك الآن
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
