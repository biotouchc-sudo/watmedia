"use client";

import { EcosystemSection } from '@/components/home/EcosystemSection'
import { SmartLink } from '@/components/ui/SmartLink'
import { PhysicsReveal } from '@/components/ui/PhysicsReveal'
import { Marquee } from '@/components/ui/Marquee'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { SmartIcon, FloatingIcon } from '@/components/ui/SmartIcon'
import { GlassCard } from '@/components/ui/GlassCard'

export default function Home() {
    return (
        <div className="relative min-h-screen bg-[var(--wat-background)] text-white overflow-hidden selection:bg-[var(--wat-primary)] selection:text-black">

            {/* Ambient Noise Texture is applied via globals.css on body */}

            {/* Hero Section - Cinematic Split */}
            <main className="relative z-10 flex flex-col items-center pt-32 pb-20 px-4 md:px-8">

                {/* Massive Typography */}
                <div className="relative w-full max-w-[1400px] mx-auto text-center md:text-left flex flex-col md:gap-4 overflow-hidden">
                    <PhysicsReveal className="w-full">
                        <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 animate-slide-in-up drop-shadow-2xl">
                            WATMEDIA
                        </h1>
                    </PhysicsReveal>

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mt-8 md:mt-0 px-2">
                        <p className="text-xl md:text-2xl text-[var(--wat-primary)] font-mono tracking-widest uppercase animate-fade-in-delay opacity-0 [animation-delay:400ms]">
                            A Digital Sovereignty Agency
                        </p>

                        <p className="text-sm md:text-base text-[var(--wat-text-muted)] max-w-md text-right hidden md:block animate-fade-in-delay opacity-0 [animation-delay:600ms]">
                            نحن لا نبني مواقع إلكترونية، نحن نشيد صروحاً رقمية. <br />
                            الدمج الكامل بين <span className="text-white">الذكاء الاستراتيجي</span> و <span className="text-white">الجمال المطلق</span>.
                        </p>
                    </div>
                </div>

                {/* Primary CTA Cluster */}
                <div className="flex flex-wrap gap-6 mt-16 md:mt-24 w-full max-w-[1400px] justify-center md:justify-start animate-fade-in-delay opacity-0 [animation-delay:800ms]">
                    <MagneticButton strength={0.3} className="group">
                        <SmartLink
                            href="/dashboard"
                            className="px-12 py-6 bg-[var(--wat-primary)] text-black font-bold text-xl rounded-full transition-all duration-500 hover:bg-white hover:scale-105 shadow-[0_0_40px_rgba(230,213,172,0.3)] flex items-center gap-3"
                        >
                            ابدأ الرحلة
                            <span className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">→</span>
                        </SmartLink>
                    </MagneticButton>

                    <MagneticButton strength={0.2} className="group">
                        <SmartLink
                            href="/portfolio"
                            className="px-12 py-6 glass rounded-full font-bold text-xl text-white hover:bg-white/10 transition-all duration-500 flex items-center gap-3 border border-white/10"
                        >
                            استكشف الأعمال
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">⚡</span>
                        </SmartLink>
                    </MagneticButton>
                </div>

                {/* Infinite Marquee Strip */}
                <div className="w-full mt-32 border-y border-[var(--wat-glass-border)] bg-[var(--wat-surface)]/30 backdrop-blur-sm py-8 transform -skew-y-2 origin-left">
                    <Marquee speed={30} pauseOnHover={false}>
                        <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--wat-text-muted)] to-[var(--wat-text-muted)]/20 px-8">STRATEGY</span>
                        <span className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--wat-primary)] px-8">DESIGN</span>
                        <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--wat-text-muted)] to-[var(--wat-text-muted)]/20 px-8">TECHNOLOGY</span>
                        <span className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--wat-text-muted)] to-[var(--wat-text-muted)]/20 px-8">GROWTH</span>
                        <span className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--wat-secondary)] px-8">INTELLIGENCE</span>
                    </Marquee>
                </div>

                {/* Bento Grid - Features */}
                <div className="w-full max-w-[1400px] mt-32 grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6">
                    {/* Large Card */}
                    <GlassCard
                        enableTilt
                        className="md:col-span-4 md:row-span-2 p-10 flex flex-col justify-between group hover:border-[var(--wat-primary-dim)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--wat-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--wat-surface)] border border-[var(--wat-glass-border)] flex items-center justify-center text-[var(--wat-primary)] mb-6 shadow-2xl">
                                <FloatingIcon icon="architect" size={32} />
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-4">Architect Core.</h3>
                            <p className="text-xl text-[var(--wat-text-muted)] max-w-lg">
                                بنية تحتية رقمية صممت لتعيش عقوداً. كود نظيف، أداء مرعب، وأمان سيبراني من المستوى الحكومي.
                            </p>
                        </div>
                        <div className="mt-8 flex gap-2 relative z-10">
                            <div className="h-1 flex-1 bg-[var(--wat-surface-highlight)] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--wat-primary)] w-[85%] animate-pulse-glow" />
                            </div>
                            <span className="text-xs font-mono text-[var(--wat-primary)]">SCORE: 98/100</span>
                        </div>
                    </GlassCard>

                    {/* Medium Card 1 */}
                    <GlassCard enableTilt tiltIntensity={10} className="md:col-span-2 p-8 group hover:border-white/20">
                        <div className="absolute top-0 right-0 p-32 bg-[var(--wat-secondary)]/5 blur-[80px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2">Visual Pulse</h3>
                            <p className="text-sm text-[var(--wat-text-muted)]">هوية بصرية تخطف الأنفاس.</p>
                            <div className="mt-4 flex items-center justify-end text-[var(--wat-primary)]">
                                <SmartIcon icon="visual" size={48} className="group-hover:scale-125 transition-transform duration-500 delay-100" />
                            </div>
                        </div>
                    </GlassCard>

                    {/* Medium Card 2 */}
                    <GlassCard enableTilt tiltIntensity={10} className="md:col-span-2 p-8 group hover:border-white/20">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2">Growth Engine</h3>
                            <p className="text-sm text-[var(--wat-text-muted)]">نمو لا يتوقف.</p>
                            <div className="mt-4 flex items-center justify-end text-[var(--wat-secondary)]">
                                <SmartIcon icon="growth" size={48} className="group-hover:scale-125 transition-transform duration-500 delay-100" />
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Ecosystem Section */}
                <div className="w-full mt-32">
                    <EcosystemSection />
                </div>
            </main>
        </div>
    )
}
