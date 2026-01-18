import { EcosystemSection } from '@/components/home/EcosystemSection'
import Link from "next/link";

export default function Home() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--wat-background)] text-white overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(145,147,110,0.15)_0%,transparent_70%)] pointer-events-none" />

            <main className="relative z-10 flex flex-col items-center gap-8 text-center px-6 animate-fade-in w-full">
                {/* Logo */}
                <div className="relative mt-20 md:mt-0">
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight gradient-text">
                        WATMEDIA
                    </h1>
                    <div className="absolute -inset-4 bg-[var(--wat-primary)] opacity-20 blur-3xl rounded-full -z-10" />
                </div>

                {/* Tagline */}
                <p className="text-xl md:text-2xl text-[var(--wat-text-muted)] max-w-lg animate-fade-in-delay">
                    مهندسو النمو الرقمي. نحن لا نتوقع النتائج، نحن نهندسها.
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-4 mt-6 animate-fade-in-delay">
                    <Link
                        href="/dashboard"
                        className="group relative px-8 py-4 bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)] text-white hover:text-black font-medium rounded-full transition-all duration-300 glow hover:scale-105"
                    >
                        <span className="relative z-10">Dashboard</span>
                    </Link>
                    <Link
                        href="/sign-in"
                        className="px-8 py-4 glass rounded-full font-medium text-[var(--wat-text)] hover:border-[var(--wat-primary)] transition-all duration-300 hover:scale-105"
                    >
                        Sign In
                    </Link>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
                    {[
                        { icon: "🏗️", title: "Architect Core", desc: "هندسة المواقع والأنظمة المتكاملة" },
                        { icon: "🎨", title: "Visual Pulse", desc: "تصميم الهوية البصرية الاحترافية" },
                        { icon: "🚀", title: "Growth Engine", desc: "إدارة الحملات الإعلانية الممولة" },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="glass p-6 rounded-2xl text-center hover:border-[var(--wat-primary)] transition-all duration-300 hover:-translate-y-1"
                            style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                        >
                            <div className="text-4xl mb-3">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-[var(--wat-secondary)]">{feature.title}</h3>
                            <p className="text-sm text-[var(--wat-text-muted)] mt-2">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Ecosystem Section - Operation Eclipse */}
                <div className="w-full mt-12">
                    <EcosystemSection />
                </div>
            </main>
        </div>
    );
}
