"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * L401: Cinematic Page Transitions
 * Enhanced page transitions with staggered fade, scale, and blur effects
 * for a premium, film-like navigation experience.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const variants = {
        initial: {
            opacity: 0,
            y: 30,
            scale: 0.98,
            filter: "blur(10px)",
        },
        enter: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // Confident easing
                staggerChildren: 0.1,
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 1.02,
            filter: "blur(5px)",
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // Subtle out
            }
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                variants={variants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
