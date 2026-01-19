"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

/**
 * L223: Opacity Breathing
 * Elements gently "breathe" when idle, creating a sense of life.
 */
interface BreathingProps extends HTMLMotionProps<"div"> {
    intensity?: "subtle" | "normal" | "strong";
    children: React.ReactNode;
}

export function OpacityBreathing({
    children,
    className,
    intensity = "subtle",
    ...props
}: BreathingProps) {
    const amplitudes = {
        subtle: [1, 0.85, 1],
        normal: [1, 0.7, 1],
        strong: [1, 0.5, 1],
    };

    return (
        <motion.div
            className={cn(className)}
            animate={{ opacity: amplitudes[intensity] }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/**
 * L225: Text Fill Hover Sweep
 * Text fills with accent color on hover from left to right.
 */
interface TextFillProps {
    children: string;
    className?: string;
    fillColor?: string;
}

export function TextFillHover({
    children,
    className,
    fillColor = "var(--wat-primary)",
}: TextFillProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className={cn("relative inline-block cursor-pointer", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Base text */}
            <span className="relative z-0">{children}</span>

            {/* Overlay text that clips */}
            <span
                className="absolute inset-0 z-10 overflow-hidden"
                style={{
                    color: fillColor,
                    clipPath: isHovered ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                    transition: "clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
            >
                {children}
            </span>
        </span>
    );
}

/**
 * L227: Blur-In Tooltip
 * Tooltip appears with a blur-to-clear effect.
 */
interface BlurTooltipProps {
    content: string;
    children: React.ReactNode;
    position?: "top" | "bottom";
}

export function BlurTooltip({
    content,
    children,
    position = "top",
}: BlurTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const positionStyles = position === "top"
        ? "bottom-full mb-2"
        : "top-full mt-2";

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            <motion.div
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[var(--wat-surface)] border border-[var(--wat-glass-border)] text-sm text-white whitespace-nowrap pointer-events-none z-50",
                    positionStyles
                )}
                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.9 }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    filter: isVisible ? "blur(0px)" : "blur(8px)",
                    scale: isVisible ? 1 : 0.9,
                }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                {content}
            </motion.div>
        </div>
    );
}

/**
 * L228: Focus Ring Animation
 * Animated focus ring for keyboard navigation (A11y luxury).
 */
interface FocusRingProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

export function FocusRing({ children, className, ...props }: FocusRingProps) {
    return (
        <motion.div
            className={cn(
                "relative outline-none",
                "focus-within:ring-2 focus-within:ring-[var(--wat-primary)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--wat-bg)]",
                "transition-shadow duration-300",
                className
            )}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
