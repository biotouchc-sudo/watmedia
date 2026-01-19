"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    gradientOpacity?: number;
    spotlightColor?: string;
    enableSpotlight?: boolean;
    enableNoise?: boolean;
    borderGradient?: boolean;
    enableTilt?: boolean;
    tiltIntensity?: number;
}

/**
 * L204: GlassCard
 * Premium Glassmorphism container with dynamic lighting, texture, and 3D Tilt.
 * Replacing standard CSS .glass classes with a reactive component.
 */
export function GlassCard({
    children,
    className,
    gradientOpacity = 0.15,
    spotlightColor = "rgba(230, 213, 172, 0.4)", // WAT Primary
    enableSpotlight = true,
    enableNoise = true,
    borderGradient = false,
    enableTilt = false,
    tiltIntensity = 15,
    ...props
}: GlassCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics for tilt
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]), { stiffness: 150, damping: 20 });

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        // Spotlight Calculation
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        // Tilt Calculation
        if (enableTilt) {
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            x.set((clientX - centerX) / width);
            y.set((clientY - centerY) / height);
        }
    };

    const handleMouseLeave = () => {
        if (enableTilt) {
            x.set(0);
            y.set(0);
        }
    };

    return (
        <motion.div
            className={cn(
                "relative group overflow-hidden bg-[var(--wat-glass-bg)] backdrop-blur-[var(--wat-glass-blur)]",
                "border border-[var(--wat-glass-border)] rounded-[2rem]",
                "transition-colors duration-500", // Removed transform transition to let spring handle it
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                rotateX: enableTilt ? rotateX : 0,
                rotateY: enableTilt ? rotateY : 0,
                transformStyle: "preserve-3d",
            }}
            {...(props as any)}
        >
            {/* Spotlight Effect */}
            {enableSpotlight && (
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${mouseX}px ${mouseY}px,
                                ${spotlightColor},
                                transparent 40%
                            )
                        `,
                    }}
                />
            )}

            {/* Noise Texture */}
            {enableNoise && (
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{ backgroundImage: 'var(--noise-pattern)' }}
                />
            )}

            {/* Border Gradient (Optional Premium Highlight) */}
            {borderGradient && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--wat-primary)]/50 to-transparent opacity-50" />
            )}

            {/* Content Container */}
            <div className="relative z-10 h-full" style={{ transform: enableTilt ? "translateZ(20px)" : "none" }}>
                {children}
            </div>
        </motion.div>
    );
}

export default GlassCard;
