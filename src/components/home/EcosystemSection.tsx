'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, BarChart3, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function EcosystemSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[var(--wat-surface)]/50 to-black pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                                لماذا تكتفي بموقع إلكتروني... <br />
                                <span className="gradient-text">بينما يمكنك امتلاك إمبراطورية؟</span>
                            </h2>
                            <p className="text-lg text-[var(--wat-text-muted)] leading-relaxed">
                                في WATMEDIA، نحن لا نسلمك مجرد كود. نحن نسلمك <strong>نظاماً متكاملاً (Ecosystem)</strong> لإدارة نموك الرقمي.
                                لوحة تحكم حية، فواتير ذكية، وتحليلات فورية. هذا هو الفرق بين "الهواة" و "الشركاء الاستراتيجيين".
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'لوحة تحكم مركزية', desc: 'راقب مشاريعك وفواتيرك في مكان واحد.', icon: BarChart3 },
                                { title: 'أمان سيبراني', desc: 'حماية متقدمة لبياناتك وبيانات عملائك.', icon: ShieldCheck },
                                { title: 'سرعة فائقة', desc: 'بنية تحتية مصممة للأداء العالي عالمياً.', icon: Zap },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="h-10 w-10 shrink-0 rounded-lg bg-[var(--wat-primary)]/10 flex items-center justify-center text-[var(--wat-primary)]">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                                        <p className="text-sm text-[var(--wat-text-muted)]">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Link href="/dashboard">
                                <Button size="lg" className="group">
                                    جرب النظام الآن (Dashboard)
                                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Visual Content (Dashboard Simulation) */}
                    <div className="relative">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--wat-primary)] to-purple-600 opacity-20 blur-2xl animate-pulse" />
                        <Card className="relative bg-[#0A0A0A]/90 border-[var(--wat-glass-border)] backdrop-blur-xl overflow-hidden aspect-[4/3] group perspective-1000">
                            {/* Dashboard Mockup Header */}
                            <div className="h-12 border-b border-[var(--wat-glass-border)] flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="ml-4 h-6 w-32 bg-[var(--wat-surface)] rounded-md opacity-50" />
                            </div>

                            {/* Dashboard Content */}
                            <div className="p-6 grid gap-6">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-24 rounded-xl bg-[var(--wat-surface)] border border-[var(--wat-glass-border)] p-4">
                                        <div className="h-8 w-8 rounded-full bg-[var(--wat-primary)]/20 mb-2" />
                                        <div className="h-2 w-16 bg-white/10 rounded-full" />
                                    </div>
                                    <div className="h-24 rounded-xl bg-[var(--wat-surface)] border border-[var(--wat-glass-border)] p-4">
                                        <div className="h-8 w-8 rounded-full bg-purple-500/20 mb-2" />
                                        <div className="h-2 w-16 bg-white/10 rounded-full" />
                                    </div>
                                    <div className="h-24 rounded-xl bg-[var(--wat-surface)] border border-[var(--wat-glass-border)] p-4">
                                        <div className="h-8 w-8 rounded-full bg-emerald-500/20 mb-2" />
                                        <div className="h-2 w-16 bg-white/10 rounded-full" />
                                    </div>
                                </div>
                                <div className="h-40 rounded-xl bg-[var(--wat-surface)] border border-[var(--wat-glass-border)] p-4 flex items-end gap-2">
                                    <motion.div
                                        initial={{ height: '20%' }}
                                        whileInView={{ height: '60%' }}
                                        transition={{ duration: 1 }}
                                        className="w-full bg-[var(--wat-primary)]/20 rounded-t-sm"
                                    />
                                    <motion.div
                                        initial={{ height: '30%' }}
                                        whileInView={{ height: '80%' }}
                                        transition={{ duration: 1, delay: 0.1 }}
                                        className="w-full bg-[var(--wat-primary)]/40 rounded-t-sm"
                                    />
                                    <motion.div
                                        initial={{ height: '10%' }}
                                        whileInView={{ height: '40%' }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="w-full bg-[var(--wat-primary)]/60 rounded-t-sm"
                                    />
                                    <motion.div
                                        initial={{ height: '40%' }}
                                        whileInView={{ height: '90%' }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className="w-full bg-[var(--wat-primary)] rounded-t-sm shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                                    />
                                </div>
                            </div>

                            {/* Floating "Live" Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-6 top-20 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 p-4 rounded-xl shadow-xl rotate-12"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-xs font-bold text-emerald-400">System Active</span>
                                </div>
                                <p className="text-xs text-white font-mono">1.2s Latency</p>
                            </motion.div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
