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
