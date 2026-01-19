"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * 🖱️ MICRO-INTERACTION HOOKS (L220-L229)
 * 
 * Implements:
 * - L216: Intent-Triggered Motion (Dwell detection)
 * - L94: Directional Reveal (Mouse entry direction)
 * - L95: Elastic Tap Feedback
 */

// L216: Detect user intent via dwell time
export function useIntentDwell(threshold: number = 120) {
    const [hasIntent, setHasIntent] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const onEnter = useCallback(() => {
        const t = setTimeout(() => setHasIntent(true), threshold);
        setTimer(t);
    }, [threshold]);

    const onLeave = useCallback(() => {
        if (timer) clearTimeout(timer);
        setHasIntent(false);
    }, [timer]);

    return { hasIntent, onEnter, onLeave };
}

// L94: Detect mouse entry direction
export type Direction = "top" | "bottom" | "left" | "right";

export function useDirectionalReveal() {
    const [direction, setDirection] = useState<Direction>("top");

    const detectDirection = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const fromTop = y;
        const fromBottom = rect.height - y;
        const fromLeft = x;
        const fromRight = rect.width - x;

        const min = Math.min(fromTop, fromBottom, fromLeft, fromRight);

        if (min === fromTop) setDirection("top");
        else if (min === fromBottom) setDirection("bottom");
        else if (min === fromLeft) setDirection("left");
        else setDirection("right");
    }, []);

    return { direction, detectDirection };
}

// L212: User-Aware Motion Scaling (based on interaction speed)
export function useMotionScale() {
    const [scale, setScale] = useState<"fast" | "normal" | "slow">("normal");
    const [lastClick, setLastClick] = useState(0);

    const recordInteraction = useCallback(() => {
        const now = Date.now();
        const delta = now - lastClick;

        if (delta < 300) setScale("fast");      // Power user
        else if (delta > 1500) setScale("slow"); // Careful user
        else setScale("normal");

        setLastClick(now);
    }, [lastClick]);

    // Duration modifiers
    const durationMultiplier = scale === "fast" ? 0.6 : scale === "slow" ? 1.4 : 1;

    return { scale, recordInteraction, durationMultiplier };
}

// L95: Elastic Tap state
export function useElasticTap() {
    const [isPressed, setIsPressed] = useState(false);

    const handlers = {
        onMouseDown: () => setIsPressed(true),
        onMouseUp: () => setIsPressed(false),
        onMouseLeave: () => setIsPressed(false),
    };

    const style = {
        transform: isPressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)",
    };

    return { isPressed, handlers, style };
}
