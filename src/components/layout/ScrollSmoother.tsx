"use client";

import { useEffect, useRef, PropsWithChildren } from "react";
import Lenis from "lenis";

/**
 * Level 51: Physics-Based Smooth Scroll
 * Wraps the application to provide inertia and momentum to scrolling.
 * Updated to use the new 'lenis' package (React 19 compatible).
 */
export function ScrollSmoother({ children }: PropsWithChildren) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        lenisRef.current = new Lenis({
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
        });

        // Animation frame loop
        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    return <>{children}</>;
}
