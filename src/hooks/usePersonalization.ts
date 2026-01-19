"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * L235: Federated Personalization
 * On-device AI for personalization without server-side tracking.
 * Uses localStorage for persistence and simple pattern matching.
 */

interface UserPreferences {
    theme: "light" | "dark" | "auto";
    density: "compact" | "comfortable" | "spacious";
    motionPreference: "full" | "reduced" | "none";
    frequentPages: string[];
    preferredLanguage: string;
    lastVisit: number;
    visitCount: number;
    engagementScore: number;
}

const DEFAULT_PREFERENCES: UserPreferences = {
    theme: "dark",
    density: "comfortable",
    motionPreference: "full",
    frequentPages: [],
    preferredLanguage: "ar",
    lastVisit: 0,
    visitCount: 0,
    engagementScore: 0,
};

const STORAGE_KEY = "wat_federated_prefs";

export function useFederatedPersonalization() {
    const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
            } catch {
                // Invalid data, use defaults
            }
        }
        
        // Update visit metrics
        setPreferences(prev => ({
            ...prev,
            lastVisit: Date.now(),
            visitCount: prev.visitCount + 1,
        }));
        
        setIsLoaded(true);
    }, []);

    // Persist changes
    useEffect(() => {
        if (!isLoaded || typeof window === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }, [preferences, isLoaded]);

    // Track page visits for personalization
    const trackPageVisit = useCallback((path: string) => {
        setPreferences(prev => {
            const frequentPages = [...prev.frequentPages];
            const existing = frequentPages.indexOf(path);
            
            if (existing > -1) {
                frequentPages.splice(existing, 1);
            }
            frequentPages.unshift(path);
            
            return {
                ...prev,
                frequentPages: frequentPages.slice(0, 10),
                engagementScore: Math.min(100, prev.engagementScore + 5),
            };
        });
    }, []);

    // Update preference
    const updatePreference = useCallback(<K extends keyof UserPreferences>(
        key: K,
        value: UserPreferences[K]
    ) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    }, []);

    // Get personalized recommendations
    const getRecommendations = useCallback((): string[] => {
        const { frequentPages, engagementScore } = preferences;
        
        // Simple recommendation logic
        if (engagementScore > 50 && frequentPages.includes("/services")) {
            return ["/contact", "/portfolio"];
        }
        if (frequentPages.includes("/portfolio")) {
            return ["/services", "/about"];
        }
        return ["/services", "/portfolio"];
    }, [preferences]);

    // Reset all personalization data
    const resetPersonalization = useCallback(() => {
        setPreferences(DEFAULT_PREFERENCES);
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    return {
        preferences,
        isLoaded,
        trackPageVisit,
        updatePreference,
        getRecommendations,
        resetPersonalization,
    };
}

/**
 * L240: Edge Personalization Simulator
 * Simulates edge-computed personalization (in production would use Cloudflare Workers, etc.)
 */
export function useEdgePersonalization() {
    const [edgeData, setEdgeData] = useState({
        region: "unknown",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: typeof navigator !== "undefined" ? navigator.language : "en",
        deviceType: "desktop" as "mobile" | "tablet" | "desktop",
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Detect device type
        const width = window.innerWidth;
        let deviceType: "mobile" | "tablet" | "desktop" = "desktop";
        if (width < 768) deviceType = "mobile";
        else if (width < 1024) deviceType = "tablet";

        setEdgeData(prev => ({ ...prev, deviceType }));
    }, []);

    // Get edge-optimized content hints
    const getContentHints = useCallback(() => {
        return {
            preferCompactImages: edgeData.deviceType === "mobile",
            preferReducedMotion: edgeData.deviceType === "mobile",
            suggestedLocale: edgeData.language.split("-")[0],
        };
    }, [edgeData]);

    return { edgeData, getContentHints };
}

/**
 * L242: Partial Hydration Manager
 * Manages which components should be hydrated based on visibility.
 */
export function usePartialHydration() {
    const [hydratedComponents, setHydratedComponents] = useState<Set<string>>(new Set());

    const markHydrated = useCallback((componentId: string) => {
        setHydratedComponents(prev => new Set([...prev, componentId]));
    }, []);

    const isHydrated = useCallback((componentId: string) => {
        return hydratedComponents.has(componentId);
    }, [hydratedComponents]);

    const shouldHydrate = useCallback((componentId: string, isVisible: boolean) => {
        if (hydratedComponents.has(componentId)) return false;
        return isVisible;
    }, [hydratedComponents]);

    return { markHydrated, isHydrated, shouldHydrate };
}
