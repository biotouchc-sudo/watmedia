"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDirectionalReveal } from "@/hooks/useMicroInteractions";
import { useState } from "react";

interface DirectionalCardProps extends Omit<HTMLMotionProps<"div">, "onMouseEnter"> {
    children: React.ReactNode;
    hoverColor?: string;
}

/**
 * L94: Directional Reveal Card
 * The hover overlay slides in from the direction the mouse entered.
 */
export function DirectionalCard({
    children,
    className,
    hoverColor = "var(--wat-primary)",
    ...props
}: DirectionalCardProps) {
    const { direction, detectDirection } = useDirectionalReveal();
    const [isHovered, setIsHovered] = useState(false);

    const getTransform = () => {
        switch (direction) {
            case "top": return { y: "-100%" };
            case "bottom": return { y: "100%" };
            case "left": return { x: "-100%" };
            case "right": return { x: "100%" };
        }
    };

    return (
        <motion.div
            className={cn("relative overflow-hidden", className)}
            onMouseEnter={(e) => {
                detectDirection(e);
                setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {/* Directional Overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0"
                style={{ backgroundColor: hoverColor, opacity: 0.1 }}
                initial={getTransform()}
                animate={isHovered ? { x: 0, y: 0 } : getTransform()}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
