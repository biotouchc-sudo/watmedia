"use client";

import { motion } from "framer-motion";

/**
 * L501: Cinematic Loading State
 * A premium, brand-defining loading experience with:
 * - Orbital animation rings
 * - Pulsing logo
 * - Elegant progress indicator
 */
export default function Loading() {
    return (
        <div className="min-h-screen bg-[var(--wat-background)] flex items-center justify-center overflow-hidden">
            <div className="relative flex flex-col items-center">

                {/* Orbital Rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="absolute w-32 h-32 border border-[var(--wat-primary)]/20 rounded-full"
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute w-48 h-48 border border-[var(--wat-primary)]/10 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute w-64 h-64 border border-white/5 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* Central Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex flex-col items-center"
                >
                    {/* Logo Icon */}
                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 20px rgba(230, 213, 172, 0.2)",
                                "0 0 40px rgba(230, 213, 172, 0.4)",
                                "0 0 20px rgba(230, 213, 172, 0.2)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--wat-primary)] to-[var(--wat-primary-dim)] flex items-center justify-center text-black font-black text-4xl mb-6"
                    >
                        W
                    </motion.div>

                    {/* Brand Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-2xl font-bold tracking-tighter text-white mb-2"
                    >
                        WATMEDIA
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 0.4 }}
                        className="text-[10px] tracking-[0.3em] text-[var(--wat-primary)] uppercase mb-8"
                    >
                        Digital Sovereignty
                    </motion.p>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 192 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative h-[2px] bg-white/10 overflow-hidden rounded-full"
                >
                    <motion.div
                        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--wat-primary)] to-transparent"
                        animate={{ x: ["-100%", "400%"] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>

                {/* Status Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 flex items-center gap-2"
                >
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-[var(--wat-primary)]"
                    />
                    <span className="text-[10px] tracking-widest text-[var(--wat-text-muted)] uppercase font-mono">
                        Initializing Protocol
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
