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

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        if (ref.current) {
            const { left, top, width, height } = ref.current.getBoundingClientRect();

            // Calculate center
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Calculate distance from center
            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            // Apply magnetic force
            const x = deltaX * strength;
            const y = deltaY * strength;

            setPosition({ x, y });
        }

        // Call original handler if exists
        onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPosition({ x: 0, y: 0 });
        onMouseLeave?.(e);
    };

    return (
        <motion.button
            ref={ref}
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
