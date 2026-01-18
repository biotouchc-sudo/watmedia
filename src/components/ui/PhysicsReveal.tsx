"use client";

import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

interface PhysicsRevealProps {
    children: React.ReactNode;
    className?: string;
    demoMode?: boolean; // For testing
}

/**
 * Level 106: Scrollytelling (Physics Reveal)
 * Elements react to the SPEED of scrolling, not just location.
 * High scroll speed = elements "bend" or skew (skewY).
 */
export function PhysicsReveal({ children, className, demoMode = false }: PhysicsRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const skewVelocity = useSpring(scrollVelocity, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const skewY = useTransform(skewVelocity, [-1000, 1000], [-5, 5]);

    // Opacity fade in
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                y,
                skewY, // The physical reaction to velocity
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
