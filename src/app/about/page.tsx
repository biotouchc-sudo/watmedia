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
                <section className="relative py-32 px-6 overflow-hidden flex items-center justify-center min-h-[50vh]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,100,255,0.05)_0%,transparent_60%)] pointer-events-none" />
                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text animate-fade-in tracking-tight">
                            نحن WATMEDIA
                        </h1>
                        <p className="text-xl md:text-3xl text-[var(--wat-text-muted)] max-w-4xl mx-auto animate-fade-in-delay leading-relaxed font-light">
                            فريق من <span className="text-white font-medium">المهندسين</span> و <span className="text-white font-medium">المصممين</span> و <span className="text-white font-medium">الاستراتيجيين</span>. <br />
                            نجمعنا شغف واحد: تحويل الأفكار إلى <span className="text-[var(--wat-primary)] font-bold underline decoration-wavy decoration-[var(--wat-primary)]/30 underline-offset-8">تجارب رقمية استثنائية</span>.
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

                {/* Story Section - Glass Monolith */}
                <section className="py-24 px-6 relative">
                    <div className="max-w-5xl mx-auto">
                        <div className="absolute -left-20 top-0 text-[10rem] opacity-5 font-bold pointer-events-none">STORY</div>
                        <h2 className="text-4xl font-bold text-center mb-12 text-white relative z-10">
                            قصتنا
                        </h2>
                        <div className="glass p-12 md:p-16 rounded-[3rem] border border-[var(--wat-glass-border)] shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-[var(--wat-surface)]/40 backdrop-blur-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-[var(--wat-primary)] via-[var(--wat-secondary)] to-[var(--wat-primary)]" />

                            <div className="space-y-8 text-xl md:text-2xl text-[var(--wat-text-muted)] leading-relaxed font-light">
                                <p>
                                    <span className="text-6xl float-right ml-4 text-[var(--wat-primary)] font-serif leading-none">بـ</span>
                                    دأت رحلتنا في عام 2020 برؤية واضحة: تقديم خدمات رقمية بمعايير <span className="text-white font-medium">عالمية</span> للسوق العربي. لاحظنا فجوة كبيرة بين ما يحتاجه السوق وما هو متاح، فقررنا سدها.
                                </p>
                                <p>
                                    اليوم، نفخر بأننا ساعدنا عشرات الشركات في تحويل أفكارها إلى منتجات رقمية ناجحة. من المتاجر الإلكترونية إلى تطبيقات الويب المعقدة، نتعامل مع كل مشروع كأنه <span className="text-[var(--wat-secondary)] font-bold">مشروعنا الخاص</span>.
                                </p>
                                <p>
                                    ما يميزنا ليس فقط خبرتنا التقنية، بل فهمنا العميق لاحتياجات السوق والمستخدم. نحن لا نبني مواقع فقط، <strong className="text-white">نحن نهندس تجارب نمو.</strong>
                                </p>
                            </div>
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
                <section className="py-24 px-6 bg-[var(--wat-surface)] border-t border-[var(--wat-glass-border)]">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-16 text-white">
                            العقول المدبرة
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {team.map((member, i) => (
                                <Card key={i} className="text-center p-8 glass border-[var(--wat-glass-border)] hover:border-[var(--wat-primary)] transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--wat-primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="text-8xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{member.image}</div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                    <p className="text-[var(--wat-text-muted)] group-hover:text-[var(--wat-primary)] transition-colors font-medium">{member.role}</p>
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
