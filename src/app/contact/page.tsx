import { ContactForm } from '@/components/forms/ContactForm'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'اتصل بنا | WATMEDIA',
    description: 'تواصل مع فريق WATMEDIA لمناقشة مشروعك. نحن هنا لمساعدتك في تحقيق أهدافك الرقمية.',
}

const contactInfo = [
    {
        icon: '📧',
        title: 'البريد الإلكتروني',
        value: 'hello@watmedia.com',
        href: 'mailto:hello@watmedia.com',
    },
    {
        icon: '📱',
        title: 'الهاتف',
        value: '+966 50 XXX XXXX',
        href: 'tel:+966500000000',
    },
    {
        icon: '📍',
        title: 'الموقع',
        value: 'الرياض، المملكة العربية السعودية',
        href: '#',
    },
]

const workingHours = [
    { day: 'الأحد - الخميس', hours: '9:00 ص - 6:00 م' },
    { day: 'الجمعة - السبت', hours: 'مغلق' },
]

export default function ContactPage() {
    return (
        <>
            <main className="min-h-screen bg-[var(--wat-background)]">
                {/* Hero Section */}
                <section className="relative py-24 px-6 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(145,147,110,0.1)_0%,transparent_60%)] pointer-events-none" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text animate-fade-in">
                            تواصل معنا
                        </h1>
                        <p className="text-xl text-[var(--wat-text-muted)] max-w-2xl mx-auto animate-fade-in-delay">
                            لديك فكرة؟ نحن هنا لنحولها إلى واقع رقمي.
                            تواصل معنا الآن للحصول على استشارة مجانية.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-[var(--wat-secondary)] mb-6">
                                    معلومات التواصل
                                </h2>
                                <div className="space-y-6">
                                    {contactInfo.map((info, i) => (
                                        <a
                                            key={i}
                                            href={info.href}
                                            className="flex items-start gap-4 group"
                                        >
                                            <div className="text-2xl">{info.icon}</div>
                                            <div>
                                                <div className="text-sm text-[var(--wat-text-muted)]">
                                                    {info.title}
                                                </div>
                                                <div className="text-white group-hover:text-[var(--wat-secondary)] transition-colors">
                                                    {info.value}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-[var(--wat-secondary)] mb-4">
                                    ساعات العمل
                                </h3>
                                <div className="space-y-2">
                                    {workingHours.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="text-[var(--wat-text-muted)]">{item.day}</span>
                                            <span className="text-white">{item.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="glass p-6 rounded-2xl">
                                <h3 className="text-lg font-semibold text-[var(--wat-secondary)] mb-2">
                                    💡 نصيحة
                                </h3>
                                <p className="text-sm text-[var(--wat-text-muted)]">
                                    للحصول على أسرع استجابة، أخبرنا بتفاصيل مشروعك ومتطلباتك في الرسالة.
                                    كلما كانت المعلومات أكثر، كان اقتراحنا أفضل!
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-[var(--wat-secondary)] mb-6">
                                أرسل لنا رسالة
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
