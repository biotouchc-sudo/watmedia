'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function StatusPulse() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="flex items-center gap-2 cursor-help relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative flex h-3 w-3">
                <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>

            <span className="text-xs font-medium text-[var(--wat-text-muted)] group-hover:text-emerald-400 transition-colors duration-300">
                متاح لاستقبال المشاريع
            </span>

            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 10,
                    scale: isHovered ? 1 : 0.95,
                    pointerEvents: isHovered ? 'auto' : 'none'
                }}
                className="absolute top-8 right-0 w-64 p-3 rounded-lg border border-[var(--wat-glass-border)] bg-[var(--wat-surface)]/95 backdrop-blur-xl shadow-2xl z-50 origin-top-right"
            >
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-white">حالة الاستوديو: <span className="text-emerald-400">نشط</span></p>
                    <p className="text-xs text-[var(--wat-text-muted)] leading-relaxed">
                        نقبل حالياً مشروعين جديدين فقط لنهاية شهر يناير لضمان أعلى معايير الجودة.
                    </p>
                    <div className="h-1 w-full bg-[var(--wat-glass-border)] rounded-full mt-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-emerald-500"
                        />
                    </div>
                    <p className="text-[10px] text-right text-[var(--wat-text-muted)] mt-1">85% Capacity</p>
                </div>
            </motion.div>
        </div>
    )
}
