"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[var(--wat-bg)] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle at center, var(--wat-primary-glow) 0%, transparent 70%)"
                }}
            />

            <div className="relative z-10 text-center max-w-2xl">
                {/* Large 404 Typography */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[120px] md:text-[200px] leading-none font-bold text-[var(--wat-primary)] opacity-10 select-none"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    404
                </motion.h1>

                <div className="mt-[-40px] md:mt-[-80px]">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        الصفحة مفقودة
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-[var(--wat-text-muted)] text-lg mb-10 max-w-lg mx-auto"
                    >
                        يبدو أنك وصلت إلى قطاع غير مستكشف في البروتوكول.
                        <br />
                        البيانات المطلوبة غير متاحة حالياً.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/"
                            className="px-8 py-3 bg-[var(--wat-primary)] text-black font-bold rounded-lg hover:bg-white transition-all duration-300"
                        >
                            العودة للقاعدة
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-3 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-all duration-300"
                        >
                            الإبلاغ عن خطأ
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
