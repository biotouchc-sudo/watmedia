"use client";
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
} as const;

const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
} as const;

export const StaggerContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div variants={item} className={className}>
        {children}
    </motion.div>
);
