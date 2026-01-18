"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AdaptiveTextProps {
    defaultText: string;
    activeText: string;
    isActive?: boolean; // Can be controlled externally (e.g., by Intent Engine)
    className?: string;
}

/**
 * Level 49: Adaptive UI Text
 * Text that changes its semantic meaning based on user context.
 * "Static labels are dead. Words should react to interest."
 */
export function AdaptiveText({
    defaultText,
    activeText,
    isActive = false,
    className
}: AdaptiveTextProps) {
    const [isHovered, setIsHovered] = useState(false);
    const showActive = isActive || isHovered;

    return (
        <div
            className={cn("relative overflow-hidden inline-flex items-center justify-center cursor-default group", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {showActive ? (
                    <motion.span
                        key="active"
                        initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="text-[var(--wat-primary)] font-bold block"
                    >
                        {activeText}
                    </motion.span>
                ) : (
                    <motion.span
                        key="default"
                        initial={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="block"
                    >
                        {defaultText}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}
