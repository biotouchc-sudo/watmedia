"use client";

import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

/**
 * 🌪️ KINETIC SOVEREIGNTY SYSTEM (L210-L219)
 * 
 * Implements:
 * - L211: Narrative Motion Flow (Staggered orchestration)
 * - L214: Micro-Physics Engine (Spring-based transforms)
 * - L210: Motion Tokens (Uses --ease-confident)
 */

interface KineticContextType {
    stagger?: number;
    delay?: number;
}

const KineticContext = React.createContext<KineticContextType>({ stagger: 0.1, delay: 0 });

// 1. ORCHESTRATOR (The Director)
interface RootProps extends HTMLMotionProps<"div"> {
    stagger?: number;
    delayBefore?: number;
    viewportAmount?: number;
}

function Root({
    children,
    className,
    stagger = 0.1,
    delayBefore = 0,
    viewportAmount = 0.2,
    ...props
}: RootProps) {
    return (
        <KineticContext.Provider value={{ stagger, delay: delayBefore }}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px", amount: viewportAmount }}
                transition={{ staggerChildren: stagger, delayChildren: delayBefore }}
                className={cn(className)}
                {...props}
            >
                {children}
            </motion.div>
        </KineticContext.Provider>
    );
}

// 2. ACTOR (The Element)
interface BlockProps extends HTMLMotionProps<"div"> {
    direction?: "up" | "down" | "left" | "right" | "scale" | "gradient";
    standard?: "confident" | "subtle";
}

function Block({
    children,
    className,
    direction = "up",
    standard = "confident",
    ...props
}: BlockProps) {

    // Micro-Physics Config (L214)
    const physics = {
        confident: { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.8 },
        subtle: { type: "spring" as const, stiffness: 80, damping: 24, mass: 1 },
    };

    // Narrative Flow Variants (L211)
    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
            scale: direction === "scale" ? 0.9 : 1,
            filter: "blur(8px)" // L204: Glass/Blur entrance
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                ...physics[standard],
                opacity: { duration: 0.8, ease: standard === "confident" ? [0.22, 1, 0.36, 1] : [0.4, 0, 0.2, 1] }
            }
        }
    };

    return (
        <motion.div
            variants={variants}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// 3. TEXTURE (The Text)
function Text({ children, className, ...props }: BlockProps) {
    return (
        <Block direction="up" standard="confident" className={cn("inline-block", className)} {...props}>
            {children}
        </Block>
    );
}

export const Kinetic = {
    Root,
    Block,
    Text
};
