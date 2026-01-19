"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * L226: Smart Icon Morph
 * Icon smoothly transforms between states to explain function.
 */

interface IconState {
    paths: string[];
    viewBox?: string;
}

const iconLibrary: Record<string, IconState> = {
    menu: {
        paths: [
            "M4 8h16M4 16h16", // Clean double line
        ],
    },
    close: {
        paths: [
            "M18 6L6 18M6 6l12 12", // X
        ],
    },
    arrow_right: {
        paths: [
            "M5 12h14M12 5l7 7-7 7", // Arrow R
        ],
    },
    arrow_left: {
        paths: [
            "M19 12H5M12 19l-7-7 7-7", // Arrow L
        ],
    },
    check: {
        paths: [
            "M20 6L9 17l-5-5", // Check
        ],
    },
    plus: {
        paths: [
            "M5 12h14M12 5v14", // Plus
        ],
    },
    minus: {
        paths: [
            "M5 12h14", // Minus
        ],
    },
    architect: {
        paths: [
            // Layers / Stack -> Represents Structure & Code
            "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        ]
    },
    visual: {
        paths: [
            // Eye / Aperture -> Represents Vision & Design
            "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
            "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
        ]
    },
    growth: {
        paths: [
            // Rocket / Trend -> Represents Growth & Engine
            "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
            "M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
            "M9 9l1.5 1.5",
            "M15 15l1.5 1.5"
        ]
    }
};

interface SmartIconProps {
    icon: keyof typeof iconLibrary;
    size?: number;
    className?: string;
    strokeWidth?: number;
}

export function SmartIcon({
    icon,
    size = 24,
    className,
    strokeWidth = 2,
}: SmartIconProps) {
    const [currentIcon, setCurrentIcon] = useState(icon);
    const iconData = iconLibrary[currentIcon] || iconLibrary.menu;

    useEffect(() => {
        setCurrentIcon(icon);
    }, [icon]);

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("transition-colors", className)}
        >
            <AnimatePresence mode="wait">
                {iconData.paths.map((d, i) => (
                    <motion.path
                        key={`${currentIcon}-${i}`}
                        d={d}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ pathLength: 0, opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                            delay: i * 0.05,
                        }}
                    />
                ))}
            </AnimatePresence>
        </svg>
    );
}

/**
 * L226: Smart Icon Button
 * Button that morphs its icon based on state.
 */
interface SmartIconButtonProps {
    initialIcon: keyof typeof iconLibrary;
    activeIcon: keyof typeof iconLibrary;
    onToggle?: (isActive: boolean) => void;
    className?: string;
    size?: number;
}

export function SmartIconButton({
    initialIcon,
    activeIcon,
    onToggle,
    className,
    size = 24,
}: SmartIconButtonProps) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        onToggle?.(!isActive);
    };

    return (
        <motion.button
            onClick={handleClick}
            className={cn(
                "p-2 rounded-lg hover:bg-white/10 transition-colors",
                className
            )}
            whileTap={{ scale: 0.95 }}
        >
            <SmartIcon icon={isActive ? activeIcon : initialIcon} size={size} />
        </motion.button>
    );
}

/**
 * L226 Variant: Pulsing Icon
 * Attention-grabbing pulse animation for notifications/alerts
 */
interface PulsingIconProps {
    icon: keyof typeof iconLibrary;
    size?: number;
    className?: string;
    pulseColor?: string;
    pulseScale?: number;
}

export function PulsingIcon({
    icon,
    size = 24,
    className,
    pulseColor = "var(--wat-primary)",
    pulseScale = 1.5,
}: PulsingIconProps) {
    return (
        <span
            className={cn("relative inline-flex items-center justify-center", className)}
            style={{ width: size * 1.5, height: size * 1.5 }}
        >
            {/* Pulse Ring */}
            <motion.span
                className="absolute inset-0 rounded-full"
                style={{
                    backgroundColor: pulseColor,
                    opacity: 0.3,
                }}
                animate={{
                    scale: [1, pulseScale],
                    opacity: [0.3, 0],
                }}
                transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 0.5,
                }}
            />
            <SmartIcon icon={icon} size={size} className="relative z-10" />
        </span>
    );
}

/**
 * L226 Variant: Floating Icon
 * Gentle floating animation for decorative icons
 */
interface FloatingIconProps {
    icon: keyof typeof iconLibrary;
    size?: number;
    className?: string;
    floatDistance?: number;
    duration?: number;
}

export function FloatingIcon({
    icon,
    size = 24,
    className,
    floatDistance = 5,
    duration = 3,
}: FloatingIconProps) {
    return (
        <motion.span
            className={cn("inline-flex items-center justify-center", className)}
            animate={{
                y: [-floatDistance, floatDistance, -floatDistance],
            }}
            transition={{
                duration,
                ease: "easeInOut",
                repeat: Infinity,
            }}
        >
            <SmartIcon icon={icon} size={size} />
        </motion.span>
    );
}

/**
 * L226 Variant: Ripple Icon Button
 * Click feedback with ripple effect
 */
interface RippleIconButtonProps {
    icon: keyof typeof iconLibrary;
    size?: number;
    className?: string;
    rippleColor?: string;
    onClick?: () => void;
}

export function RippleIconButton({
    icon,
    size = 24,
    className,
    rippleColor = "var(--wat-primary)",
    onClick,
}: RippleIconButtonProps) {
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const newRipple = { id: Date.now(), x, y };
        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);

        onClick?.();
    };

    return (
        <motion.button
            className={cn(
                "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-transparent border-none cursor-pointer p-3",
                className
            )}
            onClick={handleClick}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Ripples */}
            {ripples.map(ripple => (
                <motion.span
                    key={ripple.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: size,
                        height: size,
                        backgroundColor: rippleColor,
                    }}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            ))}
            <SmartIcon icon={icon} size={size} className="relative z-10" />
        </motion.button>
    );
}
