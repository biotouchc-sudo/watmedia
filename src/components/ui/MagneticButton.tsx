"use client";

import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    children: React.ReactNode;
    strength?: number; // How strong the pull is (default: 0.5)
    range?: number; // Pixel range to activate magnetism
}

/**
 * Level 101: Magnetic UI
 * Applies Fitts's Law enhancement by virtually expanding the target area.
 * The button physically moves towards the cursor when close, reducing the
 * precision required to click it.
 */
export function MagneticButton({
    children,
    className,
    strength = 0.5,
    range = 100,
    onMouseMove,
    onMouseLeave,
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const intentTimer = useRef<NodeJS.Timeout | null>(null);
    const [isActive, setIsActive] = useState(false);

    const handleMouseEnter = () => {
        // Level 90: Intent-Based Hover Delay
        // Only activate magnetism if user dwells for 120ms
        intentTimer.current = setTimeout(() => {
            setIsActive(true);
        }, 120);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isActive) return;

        const { clientX, clientY } = e;
        if (ref.current) {
            const { left, top, width, height } = ref.current.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            setPosition({ x: deltaX * strength, y: deltaY * strength });
        }
        onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (intentTimer.current) clearTimeout(intentTimer.current);
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
        onMouseLeave?.(e);
    };

    return (
        <motion.button
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn(
                "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
