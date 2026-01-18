import { Card, CardContent } from '@/components/ui'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'من نحن | WATMEDIA',
    description: 'تعرف على WATMEDIA - شريكك في هندسة النمو الرقمي. نحن فريق من المحترفين نبني تجارب رقمية استثنائية.',
}

const stats = [
    { value: '50+', label: 'مشروع منجز' },
    { value: '30+', label: 'عميل سعيد' },
    { value: '5+', label: 'سنوات خبرة' },
    { value: '99%', label: 'رضا العملاء' },
]

const values = [
    {
        icon: '🎯',
        title: 'التركيز على النتائج',
        description: 'لا نقيس نجاحنا بعدد الساعات، بل بالنتائج الملموسة التي نحققها لعملائنا.',
    },
    {
        icon: '🔬',
        title: 'الابتكار المستمر',
        description: 'نستخدم أحدث التقنيات والمنهجيات لضمان بقاء عملائنا في المقدمة.',
    },
    {
        icon: '🤝',
        title: 'الشراكة الحقيقية',
        description: 'نحن لسنا مجرد مزودي خدمات، بل شركاء في رحلة نمو عملائنا.',
    },
    {
        icon: '⚡',
        title: 'السرعة والجودة',
        description: 'نؤمن أن الجودة والسرعة ليستا متناقضتين. نقدم كلاهما.',
    },
]

const team = [
    { name: 'أحمد الوطني', role: 'المؤسس والمدير التنفيذي', image: '👨‍💼' },
    { name: 'سارة المهندسة', role: 'مديرة التصميم', image: '👩‍🎨' },
    { name: 'محمد المطور', role: 'رئيس الهندسة', image: '👨‍💻' },
]

export default function AboutPage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--wat-background)]">
                {/* Hero Section */}
                <section className="relative py-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(145,147,110,0.1)_0%,transparent_60%)] pointer-events-none" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
                            نحن WATMEDIA
                        </h1>
                        <p className="text-xl text-[var(--wat-text-muted)] max-w-2xl mx-auto animate-fade-in-delay">
                            فريق من المهندسين والمصممين والاستراتيجيين، نجمعنا شغف واحد:
                            تحويل الأفكار إلى تجارب رقمية استثنائية تحقق نتائج ملموسة.
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-[var(--wat-text-muted)]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-24 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wat-secondary)]">
                            قصتنا
                        </h2>
                        <div className="glass p-8 rounded-2xl space-y-6 text-[var(--wat-text-muted)] leading-relaxed">
                            <p>
                                بدأت رحلتنا في عام 2020 برؤية واضحة: تقديم خدمات رقمية بمعايير عالمية
                                للسوق العربي. لاحظنا فجوة كبيرة بين ما يحتاجه السوق وما هو متاح،
                                فقررنا سدها.
                            </p>
                            <p>
                                اليوم، نفخر بأننا ساعدنا عشرات الشركات في تحويل أفكارها إلى منتجات
                                رقمية ناجحة. من المتاجر الإلكترونية إلى تطبيقات الويب المعقدة،
                                نتعامل مع كل مشروع كأنه مشروعنا الخاص.
                            </p>
                            <p>
                                ما يميزنا ليس فقط خبرتنا التقنية، بل فهمنا العميق لاحتياجات السوق
                                والمستخدم. نحن لا نبني مواقع فقط، نحن نهندس تجارب نمو.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wat-secondary)]">
                            قيمنا
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {values.map((value, i) => (
                                <Card key={i} className="p-6">
                                    <CardContent className="flex gap-4">
                                        <div className="text-4xl">{value.icon}</div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-[var(--wat-secondary)] mb-2">
                                                {value.title}
                                            </h3>
                                            <p className="text-[var(--wat-text-muted)]">
                                                {value.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 px-6 bg-[var(--wat-surface)]">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 text-[var(--wat-secondary)]">
                            فريقنا
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {team.map((member, i) => (
                                <Card key={i} className="text-center p-8">
                                    <div className="text-6xl mb-4">{member.image}</div>
                                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                                    <p className="text-[var(--wat-text-muted)]">{member.role}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
