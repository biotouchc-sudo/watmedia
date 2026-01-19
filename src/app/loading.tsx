"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[var(--wat-background)] flex items-center justify-center overflow-hidden">
            <div className="flex flex-col items-center">
                {/* Minimal Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold tracking-tighter text-white mb-8"
                >
                    WATMEDIA
                </motion.div>

                {/* Abstract Progress Bar */}
                <div className="relative w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
                    <motion.div
                        className="absolute inset-0 bg-[var(--wat-primary)]"
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "loop"
                        }}
                    />
                </div>

                {/* Subtle Status */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 text-xs tracking-widest text-[var(--wat-primary)] uppercase"
                >
                    Loading Protocol
                </motion.p>
            </div>
        </div>
    )
}
