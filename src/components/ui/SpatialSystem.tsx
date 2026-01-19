"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * L215: Spatial Continuity System
 * Elements maintain visual continuity during layout changes.
 * 
 * L218: Cross-Component Linking
 * Hover on one component affects another linked component.
 * 
 * L219: Invisible Motion Layer
 * Automatic smoothing for all transitions.
 */

// ============ L218: Cross-Component Linking ============

interface LinkState {
    activeLink: string | null;
    setActiveLink: (id: string | null) => void;
}

const CrossLinkContext = createContext<LinkState>({
    activeLink: null,
    setActiveLink: () => { }
});

export function CrossLinkProvider({ children }: { children: React.ReactNode }) {
    const [activeLink, setActiveLink] = useState<string | null>(null);

    return (
        <CrossLinkContext.Provider value={{ activeLink, setActiveLink }}>
            {children}
        </CrossLinkContext.Provider>
    );
}

export function useCrossLink() {
    return useContext(CrossLinkContext);
}

interface CrossLinkTriggerProps {
    linkId: string;
    children: React.ReactNode;
    className?: string;
}

export function CrossLinkTrigger({ linkId, children, className }: CrossLinkTriggerProps) {
    const { setActiveLink } = useCrossLink();

    return (
        <div
            className={cn(className)}
            onMouseEnter={() => setActiveLink(linkId)}
            onMouseLeave={() => setActiveLink(null)}
        >
            {children}
        </div>
    );
}

interface CrossLinkTargetProps {
    linkId: string;
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
}

export function CrossLinkTarget({
    linkId,
    children,
    className,
    activeClassName = "scale-105 opacity-100"
}: CrossLinkTargetProps) {
    const { activeLink } = useCrossLink();
    const isActive = activeLink === linkId;

    return (
        <motion.div
            className={cn(className, isActive && activeClassName)}
            animate={{
                scale: isActive ? 1.05 : 1,
                opacity: isActive ? 1 : 0.7,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            {children}
        </motion.div>
    );
}

// ============ L215: Spatial Continuity ============

interface SpatialContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function SpatialContainer({ children, className }: SpatialContainerProps) {
    return (
        <LayoutGroup>
            <motion.div className={cn(className)} layout>
                {children}
            </motion.div>
        </LayoutGroup>
    );
}

interface SpatialItemProps {
    layoutId: string;
    children: React.ReactNode;
    className?: string;
}

export function SpatialItem({ layoutId, children, className }: SpatialItemProps) {
    return (
        <motion.div
            layoutId={layoutId}
            className={cn(className)}
            layout
            transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
            }}
        >
            {children}
        </motion.div>
    );
}

// ============ L219: Invisible Motion Layer ============

interface SmoothWrapperProps {
    children: React.ReactNode;
    className?: string;
    smoothing?: "subtle" | "normal" | "heavy";
}

export function SmoothWrapper({
    children,
    className,
    smoothing = "normal"
}: SmoothWrapperProps) {
    const configs = {
        subtle: { stiffness: 400, damping: 40 },
        normal: { stiffness: 300, damping: 30 },
        heavy: { stiffness: 200, damping: 25 },
    };

    return (
        <motion.div
            className={cn(className)}
            layout
            transition={{
                type: "spring",
                ...configs[smoothing],
            }}
        >
            {children}
        </motion.div>
    );
}

// Utility: Auto-smooth any prop changes
export function useAutoSmooth<T extends Record<string, number>>(values: T) {
    const smoothedValues = {} as T;

    Object.entries(values).forEach(([key, value]) => {
        // In a real implementation, this would use useSpring or similar
        smoothedValues[key as keyof T] = value as T[keyof T];
    });

    return smoothedValues;
}
