"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * 📈 GROWTH & CONVERSION HOOKS (L250-L254)
 * 
 * Implements:
 * - L250: Smart Commitment Flow (Progressive engagement)
 * - L252: Magic Link Journeys (Session restoration)
 */

// L250: Track user commitment level
type CommitmentLevel = "visitor" | "interested" | "engaged" | "committed";

export function useCommitmentFlow() {
    const [level, setLevel] = useState<CommitmentLevel>("visitor");
    const [interactions, setInteractions] = useState(0);

    const recordInteraction = useCallback((weight: number = 1) => {
        setInteractions((prev) => {
            const newCount = prev + weight;
            
            if (newCount >= 10) setLevel("committed");
            else if (newCount >= 5) setLevel("engaged");
            else if (newCount >= 2) setLevel("interested");
            
            return newCount;
        });
    }, []);

    // Calculate next CTA text based on commitment
    const ctaText = {
        visitor: "استكشف المزيد",
        interested: "احجز استشارة مجانية",
        engaged: "ابدأ مشروعك الآن",
        committed: "تواصل مع فريقنا",
    }[level];

    return { level, interactions, recordInteraction, ctaText };
}

// L252: Magic Link - Save and restore user position
const MAGIC_KEY = "wat_magic_journey";

interface JourneyState {
    path: string;
    scrollY: number;
    timestamp: number;
    formData?: Record<string, string>;
}

export function useMagicLink() {
    const saveJourney = useCallback((formData?: Record<string, string>) => {
        if (typeof window === "undefined") return;
        
        const state: JourneyState = {
            path: window.location.pathname,
            scrollY: window.scrollY,
            timestamp: Date.now(),
            formData,
        };
        
        localStorage.setItem(MAGIC_KEY, JSON.stringify(state));
    }, []);

    const restoreJourney = useCallback((): JourneyState | null => {
        if (typeof window === "undefined") return null;
        
        const stored = localStorage.getItem(MAGIC_KEY);
        if (!stored) return null;

        const state: JourneyState = JSON.parse(stored);
        
        // Only restore if less than 7 days old
        if (Date.now() - state.timestamp > 7 * 24 * 60 * 60 * 1000) {
            localStorage.removeItem(MAGIC_KEY);
            return null;
        }

        return state;
    }, []);

    const clearJourney = useCallback(() => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(MAGIC_KEY);
    }, []);

    return { saveJourney, restoreJourney, clearJourney };
}
