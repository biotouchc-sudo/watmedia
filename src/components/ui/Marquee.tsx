"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
    className?: string;
    pauseOnHover?: boolean;
}

/**
 * Level 95: Infinite Marquee
 * A seamless, GPU-accelerated scrolling strip for high-impact typography.
 */
export function Marquee({
    children,
    direction = "left",
    speed = 20,
    className,
    pauseOnHover = true,
}: MarqueeProps) {
    const velocity = direction === "left" ? -100 : 100;

    return (
        <div className={cn("flex overflow-hidden select-none gap-8 sm:gap-16 w-full mask-gradient-x", className)}>
            <motion.div
                className="flex min-w-full shrink-0 gap-8 sm:gap-16 items-center justify-around whitespace-nowrap"
                animate={{
                    x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
                {...(pauseOnHover && { whileHover: { animationPlayState: "paused" } })}
            >
                {children}
            </motion.div>
            <motion.div
                className="flex min-w-full shrink-0 gap-8 sm:gap-16 items-center justify-around whitespace-nowrap"
                aria-hidden="true"
                animate={{
                    x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
                {...(pauseOnHover && { whileHover: { animationPlayState: "paused" } })}
            >
                {children}
            </motion.div>
            {/* Third copy for absolute safety on ultrawide monitors */}
            <motion.div
                className="flex min-w-full shrink-0 gap-8 sm:gap-16 items-center justify-around whitespace-nowrap"
                aria-hidden="true"
                animate={{
                    x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
