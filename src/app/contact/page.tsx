import { SmartContactForm } from '@/components/forms/SmartContactForm'
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
                                <h2 className="text-2xl font-bold text-[var(--wat-secondary)] mb-6 animate-slide-in-right">
                                    قنوات التواصل
                                </h2>
                                <div className="space-y-6">
                                    {/* WhatsApp - Priority */}
                                    <a
                                        href="https://wa.me/905364599079"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 group p-4 rounded-xl glass border border-white/5 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(37,211,102,0.2)]"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] text-2xl group-hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        </div>
                                        <div>
                                            <div className="text-xs text-[var(--wat-text-muted)]">واتس اب (مباشر)</div>
                                            <div className="text-lg font-bold text-white group-hover:text-[#25D366] transition-colors dir-ltr">
                                                +90 536 459 9079
                                            </div>
                                        </div>
                                    </a>

                                    {/* Instagram - Social */}
                                    <a
                                        href="https://www.instagram.com/_watmedia?igsh=MWlsMHJ2Z3FnbTdzbA=="
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 group p-4 rounded-xl glass border border-white/5 hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(225,48,108,0.2)]"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#E1306C]/20 flex items-center justify-center text-[#E1306C] text-2xl group-hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                                        </div>
                                        <div>
                                            <div className="text-xs text-[var(--wat-text-muted)]">انستغرام</div>
                                            <div className="text-lg font-bold text-white group-hover:text-[#E1306C] transition-colors">
                                                @_watmedia
                                            </div>
                                        </div>
                                    </a>

                                    {/* Email */}
                                    <a
                                        href="mailto:hello@watmedia.com"
                                        className="flex items-center gap-4 group p-4 rounded-xl glass border border-white/5 hover:border-[var(--wat-secondary)]/50 hover:bg-[var(--wat-secondary)]/10 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[var(--wat-secondary)]/20 flex items-center justify-center text-[var(--wat-secondary)] text-2xl group-hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                        </div>
                                        <div>
                                            <div className="text-xs text-[var(--wat-text-muted)]">البريد الإلكتروني</div>
                                            <div className="text-lg font-bold text-white group-hover:text-[var(--wat-secondary)] transition-colors">
                                                hello@watmedia.com
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-[var(--wat-secondary)] mb-4">
                                    ساعات العمل
                                </h3>
                                <div className="space-y-2 glass p-4 rounded-xl border border-white/5">
                                    {workingHours.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm py-2 border-b border-white/5 last:border-0">
                                            <span className="text-[var(--wat-text-muted)]">{item.day}</span>
                                            <span className="text-white font-medium">{item.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-[var(--wat-secondary)] mb-6">
                                أرسل لنا رسالة
                            </h2>
                            <SmartContactForm />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
