"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * L207: useScrollProgress Hook
 * Provides normalized scroll progress (0-1) for scroll-linked animations.
 */
export function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            setProgress(scrollHeight > 0 ? scrolled / scrollHeight : 0);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial value
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return progress;
}

/**
 * L207: useScrollVelocity Hook
 * Detects scroll speed for velocity-based animations.
 */
export function useScrollVelocity() {
    const [velocity, setVelocity] = useState(0);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [lastTime, setLastTime] = useState(Date.now());

    useEffect(() => {
        const handleScroll = () => {
            const now = Date.now();
            const deltaY = window.scrollY - lastScrollY;
            const deltaTime = now - lastTime;
            
            if (deltaTime > 0) {
                const newVelocity = deltaY / deltaTime;
                setVelocity(newVelocity);
            }
            
            setLastScrollY(window.scrollY);
            setLastTime(now);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, lastTime]);

    return velocity;
}

/**
 * L229: useHoverSound Hook (Soundless Feedback)
 * Provides haptic-like visual feedback without actual sound.
 */
export function useHoverSoundless() {
    const [intensity, setIntensity] = useState(0);

    const onHoverStart = useCallback(() => {
        // Quick pulse then fade
        setIntensity(1);
        setTimeout(() => setIntensity(0.5), 50);
        setTimeout(() => setIntensity(0), 150);
    }, []);

    const onHoverEnd = useCallback(() => {
        setIntensity(0);
    }, []);

    return { 
        intensity, 
        handlers: { 
            onMouseEnter: onHoverStart, 
            onMouseLeave: onHoverEnd 
        } 
    };
}

/**
 * L221: useMagneticSoft Hook
 * Soft magnetic attraction for cursor proximity.
 */
export function useMagneticSoft(strength: number = 0.15, range: number = 100) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        
        if (distance < range) {
            const factor = 1 - (distance / range);
            setOffset({
                x: distanceX * strength * factor,
                y: distanceY * strength * factor,
            });
        }
    }, [strength, range]);

    const handleMouseLeave = useCallback(() => {
        setOffset({ x: 0, y: 0 });
    }, []);

    return { 
        offset, 
        handlers: { 
            onMouseMove: handleMouseMove, 
            onMouseLeave: handleMouseLeave 
        },
        style: {
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }
    };
}
