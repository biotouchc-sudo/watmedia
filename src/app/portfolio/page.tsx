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
                <section className="relative py-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(145,147,110,0.1)_0%,transparent_60%)] pointer-events-none" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
                            أعمالنا
                        </h1>
                        <p className="text-xl text-[var(--wat-text-muted)] max-w-2xl mx-auto animate-fade-in-delay">
                            كل مشروع نقوم به هو قصة نجاح. استعرض بعض المشاريع التي نفخر بها.
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
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <Card key={project.id} className="group overflow-hidden">
                                <div className="text-6xl text-center py-8 bg-[var(--wat-surface)]">
                                    {project.image}
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white group-hover:text-[var(--wat-secondary)] transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-[var(--wat-text-muted)]">
                                                {project.category}
                                            </p>
                                        </div>
                                        <Badge variant="success">{project.results}</Badge>
                                    </div>
                                    <p className="text-sm text-[var(--wat-text-muted)]">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">{tag}</Badge>
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
