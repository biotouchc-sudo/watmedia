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
            "M4 6h16M4 12h16M4 18h16", // Three lines
        ],
    },
    close: {
        paths: [
            "M6 6l12 12M6 18L18 6", // X shape
        ],
    },
    arrow_right: {
        paths: [
            "M5 12h14M12 5l7 7-7 7",
        ],
    },
    arrow_left: {
        paths: [
            "M19 12H5M12 19l-7-7 7-7",
        ],
    },
    check: {
        paths: [
            "M5 12l5 5L20 7",
        ],
    },
    plus: {
        paths: [
            "M12 5v14M5 12h14",
        ],
    },
    minus: {
        paths: [
            "M5 12h14",
        ],
    },
    architect: {
        paths: [
            "M4 22h16M12 2v20M8 22V6h8v16M4 6h16", // Simple classic column structure
        ]
    },
    visual: {
        paths: [
            "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z", // Eye shape
            "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", // Iris
        ]
    },
    growth: {
        paths: [
            "M23 6l-9.5 9.5-5-5L1 18", // Chart line
            "M17 6h6v6", // Arrow tip
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
