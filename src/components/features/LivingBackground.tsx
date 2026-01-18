"use client";

import { useEffect } from "react";
import { useIntentEngine } from "@/hooks/useIntentEngine";

/**
 * Level 109: Ambient Data Viz (Living Background)
 * Updates CSS variables based on the user's intent state.
 * This allows the background (CSS or WebGL) to shift colors/moods.
 * 
 * - Rushing -> Red/Warmer shift
 * - Focus -> Blue/Cooler shift
 * - Idle -> Breathing animation
 */
export function LivingBackground() {
    const { status, velocity } = useIntentEngine();

    useEffect(() => {
        const root = document.documentElement;

        // Smooth transition logic could go here, but for CSS vars we set directly
        // and let CSS 'transition' handles handle smoothing.
        if (status === "RUSHING") {
            root.style.setProperty("--ambient-mood", "1.2"); // More intensity
            root.style.setProperty("--ambient-hue-shift", "20deg"); // Shift slightly
        } else if (status === "FOCUS") {
            root.style.setProperty("--ambient-mood", "0.8"); // Calmer
            root.style.setProperty("--ambient-hue-shift", "-10deg"); // Cooler
        } else {
            root.style.setProperty("--ambient-mood", "1.0"); // Neutral
            root.style.setProperty("--ambient-hue-shift", "0deg");
        }

    }, [status]);

    return null; // Logic only
}
