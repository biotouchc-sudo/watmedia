"use client";

import { useCallback, useRef, useState } from "react";

/**
 * L212: User-Aware Motion Scaling
 * Adjusts animation speed based on user interaction patterns.
 */

type UserProfile = "power" | "normal" | "careful";

interface MotionScaleState {
    profile: UserProfile;
    durationMultiplier: number;
    springStiffness: number;
}

export function useMotionScaling() {
    const clickHistory = useRef<number[]>([]);
    const [state, setState] = useState<MotionScaleState>({
        profile: "normal",
        durationMultiplier: 1,
        springStiffness: 100,
    });

    const recordInteraction = useCallback(() => {
        const now = Date.now();
        clickHistory.current = [...clickHistory.current.slice(-9), now];

        if (clickHistory.current.length >= 3) {
            const gaps = clickHistory.current.slice(1).map((t, i) => t - clickHistory.current[i]);
            const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;

            let profile: UserProfile = "normal";
            let durationMultiplier = 1;
            let springStiffness = 100;

            if (avgGap < 350) {
                // Power user: fast clicks
                profile = "power";
                durationMultiplier = 0.6;
                springStiffness = 180;
            } else if (avgGap > 1200) {
                // Careful user: slow, deliberate
                profile = "careful";
                durationMultiplier = 1.3;
                springStiffness = 60;
            }

            setState({ profile, durationMultiplier, springStiffness });
        }
    }, []);

    // Generate motion config based on profile
    const getMotionConfig = useCallback((baseConfig: {
        duration?: number;
        stiffness?: number;
        damping?: number;
    }) => {
        return {
            duration: (baseConfig.duration || 0.3) * state.durationMultiplier,
            stiffness: baseConfig.stiffness ? baseConfig.stiffness * (state.springStiffness / 100) : state.springStiffness,
            damping: baseConfig.damping || 20,
        };
    }, [state]);

    return {
        ...state,
        recordInteraction,
        getMotionConfig,
    };
}

/**
 * L213: Motion Budget Enforcer
 * Limits concurrent animations to maintain performance.
 */
export function useMotionBudget(maxConcurrent: number = 5) {
    const activeAnimations = useRef(0);
    const [canAnimate, setCanAnimate] = useState(true);

    const requestAnimation = useCallback(() => {
        if (activeAnimations.current >= maxConcurrent) {
            return false;
        }
        activeAnimations.current++;
        setCanAnimate(activeAnimations.current < maxConcurrent);
        return true;
    }, [maxConcurrent]);

    const releaseAnimation = useCallback(() => {
        activeAnimations.current = Math.max(0, activeAnimations.current - 1);
        setCanAnimate(true);
    }, []);

    return { canAnimate, requestAnimation, releaseAnimation };
}

/**
 * L217: Emotion-Calibrated Motion
 * Returns appropriate motion config based on emotional context.
 */
type EmotionContext = "success" | "error" | "warning" | "info" | "neutral";

export function useEmotionMotion() {
    const getEmotionConfig = useCallback((emotion: EmotionContext) => {
        const configs = {
            success: {
                // Confident, upward motion
                initial: { y: 10, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                transition: { type: "spring", stiffness: 200, damping: 15 },
            },
            error: {
                // Shake/vibrate
                initial: { x: 0 },
                animate: { x: [0, -8, 8, -4, 4, 0] },
                transition: { duration: 0.5 },
            },
            warning: {
                // Slow, cautious pulse
                initial: { scale: 1 },
                animate: { scale: [1, 1.02, 1] },
                transition: { duration: 0.8, repeat: 2 },
            },
            info: {
                // Gentle fade
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.4 },
            },
            neutral: {
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.3 },
            },
        };

        return configs[emotion];
    }, []);

    return { getEmotionConfig };
}
