"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * L208: Masked Gradient Reveal
 * Content reveals through a gradient mask as user scrolls.
 */
interface MaskedRevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
}

export function MaskedGradientReveal({
    children,
    className,
    direction = "up"
}: MaskedRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const maskDirections = {
        up: "to top",
        down: "to bottom",
        left: "to left",
        right: "to right",
    };

    const clipProgress = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <motion.div
            ref={ref}
            className={cn("relative", className)}
            style={{
                maskImage: useTransform(
                    clipProgress,
                    (v) => `linear-gradient(${maskDirections[direction]}, black ${v}%, transparent ${v + 10}%)`
                ),
                WebkitMaskImage: useTransform(
                    clipProgress,
                    (v) => `linear-gradient(${maskDirections[direction]}, black ${v}%, transparent ${v + 10}%)`
                ),
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * L233: Invisible Alignment System
 * Auto-aligns elements to an invisible grid for visual harmony.
 */
interface AlignedContainerProps {
    children: React.ReactNode;
    className?: string;
    columns?: 12 | 16 | 24;
    gap?: number;
}

export function AlignedContainer({
    children,
    className,
    columns = 12,
    gap = 16
}: AlignedContainerProps) {
    return (
        <div
            className={cn("grid", className)}
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `${gap}px`,
            }}
        >
            {children}
        </div>
    );
}

interface AlignedItemProps {
    children: React.ReactNode;
    className?: string;
    span?: number;
    start?: number;
}

export function AlignedItem({
    children,
    className,
    span = 1,
    start
}: AlignedItemProps) {
    return (
        <div
            className={cn(className)}
            style={{
                gridColumn: start ? `${start} / span ${span}` : `span ${span}`,
            }}
        >
            {children}
        </div>
    );
}

/**
 * L236: Adaptive White Space
 * Adjusts spacing based on content density and viewport.
 */
interface AdaptiveSpaceProps {
    children: React.ReactNode;
    className?: string;
    density?: "comfortable" | "compact" | "spacious";
}

export function AdaptiveSpace({
    children,
    className,
    density = "comfortable"
}: AdaptiveSpaceProps) {
    const spacingMultipliers = {
        compact: 0.5,
        comfortable: 1,
        spacious: 1.5,
    };

    const multiplier = spacingMultipliers[density];

    return (
        <div
            className={cn(className)}
            style={{
                "--spacing-unit": `${multiplier}rem`,
                padding: `calc(var(--spacing-unit) * 2)`,
                gap: `calc(var(--spacing-unit) * 1.5)`,
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
}
