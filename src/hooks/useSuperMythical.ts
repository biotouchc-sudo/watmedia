"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/**
 * 🧪 SUPER MYTHICAL FEATURES (L262-L264)
 */

/**
 * L262: Eye-Gaze Simulation
 * Simulates eye-gaze tracking using mouse position as proxy.
 * In production, would integrate with WebGazer.js or similar.
 */
interface GazePoint {
    x: number;
    y: number;
    focusDuration: number;
}

export function useEyeGazeSimulation() {
    const [gazePoint, setGazePoint] = useState<GazePoint>({ x: 0, y: 0, focusDuration: 0 });
    const [focusedElement, setFocusedElement] = useState<string | null>(null);
    const lastMoveTime = useRef(Date.now());
    const focusTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const timeSinceLastMove = now - lastMoveTime.current;
            
            setGazePoint(prev => ({
                x: e.clientX,
                y: e.clientY,
                focusDuration: timeSinceLastMove > 500 ? prev.focusDuration + 1 : 0,
            }));
            
            lastMoveTime.current = now;

            // Detect element under "gaze"
            const element = document.elementFromPoint(e.clientX, e.clientY);
            if (element) {
                const id = element.id || element.getAttribute("data-gaze-id");
                if (id && id !== focusedElement) {
                    setFocusedElement(id);
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [focusedElement]);

    // Trigger action when gaze focuses on element
    const onGazeFocus = useCallback((elementId: string, callback: () => void, duration: number = 2000) => {
        if (focusedElement === elementId) {
            if (focusTimer.current) clearTimeout(focusTimer.current);
            focusTimer.current = setTimeout(callback, duration);
        }
    }, [focusedElement]);

    return { gazePoint, focusedElement, onGazeFocus };
}

/**
 * L263: Spatial Audio Anchors
 * Provides positional audio based on UI element positions.
 */
interface AudioAnchor {
    id: string;
    x: number;
    y: number;
    soundUrl?: string;
}

export function useSpatialAudio() {
    const [anchors, setAnchors] = useState<AudioAnchor[]>([]);
    const [listenerPosition, setListenerPosition] = useState({ x: 0, y: 0 });
    const audioContext = useRef<AudioContext | null>(null);

    // Initialize audio context on first interaction
    const initAudio = useCallback(() => {
        if (!audioContext.current && typeof window !== "undefined") {
            audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }, []);

    // Register an audio anchor
    const registerAnchor = useCallback((anchor: AudioAnchor) => {
        setAnchors(prev => [...prev.filter(a => a.id !== anchor.id), anchor]);
    }, []);

    // Update listener position (typically follows cursor or scroll)
    const updateListener = useCallback((x: number, y: number) => {
        setListenerPosition({ x, y });
    }, []);

    // Calculate volume based on distance
    const getVolumeForAnchor = useCallback((anchorId: string): number => {
        const anchor = anchors.find(a => a.id === anchorId);
        if (!anchor) return 0;

        const distance = Math.sqrt(
            Math.pow(anchor.x - listenerPosition.x, 2) +
            Math.pow(anchor.y - listenerPosition.y, 2)
        );

        // Max distance of 500px for full falloff
        return Math.max(0, 1 - distance / 500);
    }, [anchors, listenerPosition]);

    // Calculate stereo pan based on position
    const getPanForAnchor = useCallback((anchorId: string): number => {
        const anchor = anchors.find(a => a.id === anchorId);
        if (!anchor || typeof window === "undefined") return 0;

        const centerX = window.innerWidth / 2;
        const offset = anchor.x - centerX;
        
        // -1 (full left) to 1 (full right)
        return Math.max(-1, Math.min(1, offset / centerX));
    }, [anchors]);

    return {
        initAudio,
        registerAnchor,
        updateListener,
        getVolumeForAnchor,
        getPanForAnchor,
    };
}

/**
 * L264: Design-Code Sync Bridge
 * Enables bidirectional sync between design tokens and runtime.
 */
interface DesignToken {
    name: string;
    value: string;
    category: "color" | "spacing" | "typography" | "motion";
}

export function useDesignCodeSync() {
    const [tokens, setTokens] = useState<DesignToken[]>([]);
    const [isDirty, setIsDirty] = useState(false);

    // Load tokens from CSS variables
    useEffect(() => {
        if (typeof window === "undefined") return;

        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        
        const loadedTokens: DesignToken[] = [
            { name: "--wat-primary", value: computedStyle.getPropertyValue("--wat-primary").trim(), category: "color" },
            { name: "--wat-bg", value: computedStyle.getPropertyValue("--wat-bg").trim(), category: "color" },
            { name: "--wat-surface", value: computedStyle.getPropertyValue("--wat-surface").trim(), category: "color" },
            { name: "--ease-confident", value: computedStyle.getPropertyValue("--ease-confident").trim(), category: "motion" },
            { name: "--ease-subtle", value: computedStyle.getPropertyValue("--ease-subtle").trim(), category: "motion" },
        ];

        setTokens(loadedTokens);
    }, []);

    // Update a token at runtime
    const updateToken = useCallback((name: string, value: string) => {
        if (typeof document === "undefined") return;
        
        document.documentElement.style.setProperty(name, value);
        setTokens(prev => prev.map(t => t.name === name ? { ...t, value } : t));
        setIsDirty(true);
    }, []);

    // Export tokens as JSON
    const exportTokens = useCallback(() => {
        return JSON.stringify(tokens, null, 2);
    }, [tokens]);

    // Reset to original CSS values
    const resetTokens = useCallback(() => {
        tokens.forEach(token => {
            document.documentElement.style.removeProperty(token.name);
        });
        setIsDirty(false);
    }, [tokens]);

    return {
        tokens,
        isDirty,
        updateToken,
        exportTokens,
        resetTokens,
    };
}
