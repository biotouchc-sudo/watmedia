'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Calendar, Mail, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CrystalConcierge() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => setIsOpen(!isOpen)

    const actions = [
        { label: 'محادثة فورية', icon: MessageCircle, color: 'bg-green-500', href: 'https://wa.me/966500000000' },
        { label: 'حجز استشارة', icon: Calendar, color: 'bg-blue-500', href: '/book' },
        { label: 'طلب عرض سعر', icon: FileText, color: 'bg-purple-500', href: '/contact' },
    ]

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="flex flex-col gap-3"
                    >
                        {actions.map((action, index) => (
                            <motion.a
                                key={action.label}
                                href={action.href}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 bg-[var(--wat-surface)]/90 backdrop-blur-md border border-[var(--wat-glass-border)] p-3 rounded-xl shadow-lg hover:scale-105 transition-transform group"
                            >
                                <span className="text-sm font-medium text-white">{action.label}</span>
                                <div className={cn("p-2 rounded-full text-white", action.color)}>
                                    <action.icon size={18} />
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleOpen}
                className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300",
                    isOpen ? "bg-red-500 rotate-90" : "bg-[var(--wat-primary)] hover:bg-[var(--wat-secondary)]"
                )}
            >
                {isOpen ? (
                    <X className="text-white" size={24} />
                ) : (
                    <MessageCircle className="text-white" size={28} />
                )}
            </motion.button>
        </div>
    )
}
