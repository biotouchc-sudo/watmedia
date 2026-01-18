"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FluidSkeletonProps {
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
    width?: string | number;
    height?: string | number;
}

/**
 * Level 104: Skeleton Morphing
 * Instead of a jarring switch from skeleton to content, this component
 * smoothly crossfades and morphs the layout.
 */
export function FluidSkeleton({
    isLoading,
    className,
    children,
    width = "100%",
    height = "100%",
}: FluidSkeletonProps) {
    return (
        <div className={cn("relative overflow-hidden", className)} style={{ width, height }}>
            <AnimatePresence mode="popLayout">
                {isLoading ? (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-secondary/30 animate-pulse rounded-md z-10"
                    >
                        {/* Shimmer effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
