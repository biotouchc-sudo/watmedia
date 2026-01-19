"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    rippleColor?: string;
}

interface Ripple {
    id: number;
    x: number;
    y: number;
    size: number;
}

/**
 * L502: Ripple Button
 * A premium button with material-style ripple effect on click.
 */
export function RippleButton({
    children,
    className,
    variant = "primary",
    size = "md",
    rippleColor,
    onClick,
    ...props
}: RippleButtonProps) {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const newRipple: Ripple = {
            id: Date.now(),
            x,
            y,
            size,
        };

        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        onClick?.(e);
    };

    const variants = {
        primary: "bg-[var(--wat-primary)] text-black hover:bg-white",
        secondary: "bg-transparent border border-[var(--wat-glass-border)] text-white hover:border-[var(--wat-primary)] hover:text-[var(--wat-primary)]",
        ghost: "bg-transparent text-[var(--wat-text-muted)] hover:text-white hover:bg-white/5",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const defaultRippleColors = {
        primary: "rgba(0, 0, 0, 0.2)",
        secondary: "rgba(230, 213, 172, 0.3)",
        ghost: "rgba(255, 255, 255, 0.1)",
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            className={cn(
                "relative overflow-hidden rounded-full font-bold transition-all duration-300",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {/* Ripple Effects */}
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: ripple.size,
                            height: ripple.size,
                            backgroundColor: rippleColor || defaultRippleColors[variant],
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
}

export default RippleButton;
