"use client";

import { motion, MotionProps, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type SpringMotionProps = HTMLMotionProps<"div"> & {
    className?: string;
    as?: React.ElementType; // Allow rendering as different elements (button, section, etc.)
    stiffness?: number;
    damping?: number;
    mass?: number;
};

const DEFAULT_SPRING = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
};

const SpringMotion = forwardRef<HTMLDivElement, SpringMotionProps>(
    (
        {
            children,
            className,
            as: Component = motion.div, // Default to motion.div if 'as' prop is not motion component aware, but here we cast
            stiffness,
            damping,
            mass,
            transition,
            ...props
        },
        ref
    ) => {
        // Merge custom spring config with defaults, or allow full transition override
        const springConfig = transition || {
            type: "spring",
            stiffness: stiffness ?? DEFAULT_SPRING.stiffness,
            damping: damping ?? DEFAULT_SPRING.damping,
            mass: mass ?? DEFAULT_SPRING.mass,
        };

        // If 'as' is provided but it's not a motion primitive, we might need to handle it differently.
        // However, for simplicity and typical usage with standard HTML elements, we use motion(Component) or just motion.div.
        // Since Component default is motion.div, we can use it.
        // If the user passes a string like 'button', we need motion.button.

        // safe dynamic motion component
        const MotionComponent = typeof Component === 'string'
            ? (motion as any)[Component]
            : Component;

        return (
            <MotionComponent
                ref={ref}
                className={cn("will-change-transform", className)}
                transition={springConfig}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {children}
            </MotionComponent>
        );
    }
);

SpringMotion.displayName = "SpringMotion";

export { SpringMotion };
