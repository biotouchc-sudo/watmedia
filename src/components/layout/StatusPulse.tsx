'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

/**
 * L227: Enhanced StatusPulse
 * A refined system status indicator with holographic tooltip details.
 * Features:
 * - Live capacity visualization
 * - Intelligent hover interaction
 * - Glassmorphic data display
 */
export function StatusPulse() {
    const [isHovered, setIsHovered] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div
            className="relative z-50 flex items-center gap-2 cursor-help group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Pulse Emitter */}
            <div className="relative flex h-3 w-3">
                <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>

            {/* Label */}
            <span className="text-[10px] font-medium text-[var(--wat-text-muted)] group-hover:text-emerald-400 transition-colors duration-300 uppercase tracking-wider hidden xl:block">
                متاح لاستقبال المشاريع
            </span>

            {/* Holographic Tooltip */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 5, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-8 right-0 w-72 rounded-xl overflow-hidden shadow-2xl origin-top-right"
                    >
                        {/* Glass Container */}
                        <div className="relative p-4 bg-[var(--wat-surface)]/90 backdrop-blur-xl border border-[var(--wat-glass-border)]">
                            {/* Decorative Noise */}
                            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'var(--noise-pattern)' }} />

                            {/* Header */}
                            <div className="flex justify-between items-center mb-3 relative z-10">
                                <span className="text-xs font-bold text-white tracking-widest uppercase">System Status</span>
                                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-mono text-emerald-400 font-bold">ONLINE</span>
                                </span>
                            </div>

                            {/* Capacity Metric */}
                            <div className="space-y-1.5 mb-4 relative z-10">
                                <div className="flex justify-between text-[10px] text-[var(--wat-text-muted)] font-mono">
                                    <span>STUDIO LOAD</span>
                                    <span>85%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '85%' }}
                                        transition={{ duration: 1, delay: 0.1, ease: "circOut" }}
                                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                    />
                                </div>
                            </div>

                            {/* Info Text */}
                            <div className="relative z-10 border-t border-white/5 pt-3 mt-3">
                                <p className="text-xs text-[var(--wat-text-muted)] leading-relaxed mb-2">
                                    نقبل حالياً <span className="text-white font-medium">مشروعين</span> فقط لنهاية الربع الحالي لضمان أعلى معايير الجودة التنفيذية.
                                </p>
                                <div className="flex items-center gap-2 text-[10px] text-[var(--wat-primary)] font-mono">
                                    <span>NEXT SLOT:</span>
                                    <span className="text-white">FEB 01, 2026</span>
                                </div>
                            </div>

                            {/* Bottom Pulse Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
