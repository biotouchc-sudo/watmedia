"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { useElasticTap } from "@/hooks/useMicroInteractions";
import React from "react";

interface ElasticButtonProps extends Omit<HTMLMotionProps<"button">, "style"> {
    children: React.ReactNode;
}

/**
 * L95: Elastic Tap Feedback
 * Button compresses slightly when pressed, giving tactile feedback.
 */
export function ElasticButton({
    children,
    className,
    ...props
}: ElasticButtonProps) {
    const { handlers, style } = useElasticTap();

    return (
        <motion.button
            className={cn(
                "relative inline-flex items-center justify-center",
                className
            )}
            style={style}
            {...handlers}
            {...props}
        >
            {children}
        </motion.button>
    );
}
