"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

/**
 * 🧠 COGNITIVE UI SYSTEM (L230-L239)
 * 
 * Implements:
 * - L230: Cognitive Density Control (Expert Mode)
 * - L237: Micro-Fatigue Detection
 * - L212: User-Aware Motion Scaling
 */

interface CognitiveState {
    expertMode: boolean;
    interactionSpeed: "power" | "normal" | "careful";
    fatigueLevel: number; // 0-100
    setExpertMode: (v: boolean) => void;
    recordClick: () => void;
}

const CognitiveContext = createContext<CognitiveState | null>(null);

export function CognitiveProvider({ children }: { children: React.ReactNode }) {
    const [expertMode, setExpertMode] = useState(false);
    const [interactionSpeed, setInteractionSpeed] = useState<"power" | "normal" | "careful">("normal");
    const [fatigueLevel, setFatigueLevel] = useState(0);
    const [clickTimestamps, setClickTimestamps] = useState<number[]>([]);

    // L212: Analyze click speed to determine user profile
    const recordClick = useCallback(() => {
        const now = Date.now();
        setClickTimestamps((prev) => {
            const recent = [...prev, now].slice(-10); // Keep last 10 clicks

            if (recent.length >= 3) {
                const avgGap = recent.slice(1).reduce((sum, t, i) => sum + (t - recent[i]), 0) / (recent.length - 1);

                if (avgGap < 400) setInteractionSpeed("power");
                else if (avgGap > 1200) setInteractionSpeed("careful");
                else setInteractionSpeed("normal");
            }

            return recent;
        });
    }, []);

    // L237: Simulate fatigue detection (in real app, would track mouse inactivity)
    useEffect(() => {
        const interval = setInterval(() => {
            setFatigueLevel((prev) => Math.min(100, prev + 1));
        }, 30000); // Increase every 30 seconds

        // Reset on any interaction
        const resetFatigue = () => setFatigueLevel(0);
        window.addEventListener("click", resetFatigue);
        window.addEventListener("scroll", resetFatigue);

        return () => {
            clearInterval(interval);
            window.removeEventListener("click", resetFatigue);
            window.removeEventListener("scroll", resetFatigue);
        };
    }, []);

    return (
        <CognitiveContext.Provider value={{ expertMode, interactionSpeed, fatigueLevel, setExpertMode, recordClick }}>
            {children}
        </CognitiveContext.Provider>
    );
}

export function useCognitive() {
    const ctx = useContext(CognitiveContext);
    if (!ctx) throw new Error("useCognitive must be used within CognitiveProvider");
    return ctx;
}

// L230: Hook that returns UI density based on user profile
export function useCognitiveDensity() {
    const { expertMode, interactionSpeed, fatigueLevel } = useCognitive();

    // Expert Mode: show everything
    if (expertMode) return "full";

    // High fatigue: simplify
    if (fatigueLevel > 70) return "minimal";

    // Power user: show more
    if (interactionSpeed === "power") return "full";

    // Careful user: show less
    if (interactionSpeed === "careful") return "minimal";

    return "normal";
}
