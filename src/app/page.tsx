import { EcosystemSection } from '@/components/home/EcosystemSection'
import Link from "next/link";

export default function Home() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--wat-background)] text-white overflow-hidden">
            {/* Background Glow Effect - Magnetic Pulse */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(145,147,110,0.15)_0%,transparent_60%)] pointer-events-none animate-pulse-slow" />
            <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,242,254,0.1)_0%,transparent_60%)] pointer-events-none blur-3xl opacity-50" />

            <main className="relative z-10 flex flex-col items-center gap-12 text-center px-6 animate-fade-in w-full pt-20">
                {/* Logo & Hero - Magnetic Core */}
                <div className="relative group cursor-default">
                    <h1 className="text-7xl md:text-9xl font-bold tracking-tighter gradient-text animate-slide-in-up drop-shadow-2xl">
                        WATMEDIA
                    </h1>
                    <div className="absolute inset-0 bg-[var(--wat-primary)] opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity duration-1000 -z-10" />
                    <div className="absolute -inset-8 border border-[var(--wat-primary)]/10 rounded-full scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 pointer-events-none" />
                </div>

                {/* Tagline */}
                <p className="text-2xl md:text-3xl text-[var(--wat-text-muted)] max-w-2xl mx-auto animate-fade-in-delay leading-relaxed">
                    مهندسو النمو الرقمي. <br className="hidden md:block" />
                    <span className="text-white font-medium">نحن لا نتوقع النتائج، نحن نهندسها.</span>
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row gap-6 mt-8 animate-fade-in-delay items-center">
                    <Link
                        href="/dashboard"
                        className="group relative px-10 py-5 bg-[var(--wat-primary)] text-white font-bold text-lg rounded-full transition-all duration-300 glow hover:scale-105 hover:bg-[var(--wat-secondary)] hover:text-black shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.6)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            ابدأ رحلتك
                            <span className="text-xl group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">→</span>
                        </span>
                    </Link>
                    <Link
                        href="/portfolio"
                        className="group px-10 py-5 glass rounded-full font-bold text-lg text-[var(--wat-text)] hover:border-[var(--wat-primary)] transition-all duration-300 hover:scale-105 hover:bg-[var(--wat-surface-highlight)] flex items-center gap-2"
                    >
                        استعرض أعمالنا
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
                    </Link>
                </div>

                {/* Features Grid - Scroll Reveal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl w-full perspective-1000">
                    {[
                        { icon: "🏗️", title: "Architect Core", desc: "هندسة برمجية صلبة غير قابلة للكسر. بنيت لتبقى وتتوسع." },
                        { icon: "🎨", title: "Visual Pulse", desc: "تصميمات تخطف الأنفاس. هوية بصرية لا يمكن تجاهلها." },
                        { icon: "🚀", title: "Growth Engine", desc: "استراتيجيات نمو عدوانية. تحويل الزوار إلى عملاء دائمين." },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="glass p-8 rounded-3xl text-center border-[var(--wat-glass-border)] hover:border-[var(--wat-primary)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group"
                            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                        >
                            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-[var(--wat-secondary)] mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                            <p className="text-[var(--wat-text-muted)] leading-relaxed group-hover:text-white/80 transition-colors">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Ecosystem Section - Operation Eclipse */}
                <div className="w-full mt-24 border-t border-[var(--wat-glass-border)] pt-24 bg-gradient-to-b from-transparent to-black/30">
                    <EcosystemSection />
                </div>
            </main>
        </div>
    );
}
