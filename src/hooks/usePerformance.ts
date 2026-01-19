"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * ⚡ QUANTUM PERFORMANCE HOOKS (L240-L245)
 * 
 * Implements:
 * - L241: Adaptive Asset Delivery (Network-aware quality)
 * - L245: Telemetry-Backed Auto Throttle (Device capability detection)
 */

type ConnectionType = "4g" | "3g" | "2g" | "slow-2g" | "unknown";
type DeviceTier = "high" | "mid" | "low";

interface PerformanceState {
    connection: ConnectionType;
    deviceTier: DeviceTier;
    shouldReduceMotion: boolean;
    imageQuality: "high" | "medium" | "low";
}

// L241: Detect network conditions for adaptive delivery
export function useAdaptiveDelivery(): PerformanceState {
    const [state, setState] = useState<PerformanceState>({
        connection: "unknown",
        deviceTier: "high",
        shouldReduceMotion: false,
        imageQuality: "high",
    });

    useEffect(() => {
        // Network detection
        const nav = navigator as any;
        const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
        
        if (connection) {
            const type = connection.effectiveType as ConnectionType;
            setState((prev) => ({
                ...prev,
                connection: type,
                imageQuality: type === "4g" ? "high" : type === "3g" ? "medium" : "low",
            }));
        }

        // L245: Device capability detection
        const cores = navigator.hardwareConcurrency || 4;
        const memory = (nav.deviceMemory as number) || 4;
        
        let tier: DeviceTier = "high";
        if (cores <= 2 || memory <= 2) tier = "low";
        else if (cores <= 4 || memory <= 4) tier = "mid";

        // Reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        setState((prev) => ({
            ...prev,
            deviceTier: tier,
            shouldReduceMotion: prefersReducedMotion || tier === "low",
        }));
    }, []);

    return state;
}

// L244: LCP Critical resource optimizer
export function useCriticalResource(resourceUrl: string, priority: "high" | "low" = "high") {
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        // Preload critical resources
        if (priority === "high") {
            const link = document.createElement("link");
            link.rel = "preload";
            link.href = resourceUrl;
            link.as = resourceUrl.endsWith(".woff2") ? "font" : "image";
            link.crossOrigin = "anonymous";
            document.head.appendChild(link);

            return () => {
                document.head.removeChild(link);
            };
        }
    }, [resourceUrl, priority]);
}
