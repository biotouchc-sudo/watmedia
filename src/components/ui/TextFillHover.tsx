"use client";

import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface TextFillHoverProps {
    children: string;
    className?: string;
    fillColor?: string;
    baseColor?: string;
    duration?: number;
    direction?: 'left' | 'right' | 'center';
}

/**
 * L225: Text Fill Hover Sweep
 * Premium text hover effect with clip-path sweep animation
 * Creates a revealing color fill from the specified direction
 */
export function TextFillHover({
    children,
    className = '',
    fillColor = 'var(--wat-primary)',
    baseColor = 'var(--wat-text-muted)',
    duration = 0.4,
    direction = 'left'
}: TextFillHoverProps) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Smooth spring for the fill progress
    const fillProgress = useSpring(0, {
        stiffness: 300,
        damping: 30,
    });

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        fillProgress.set(100);
    }, [fillProgress]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        fillProgress.set(0);
    }, [fillProgress]);

    // Generate clip-path based on direction
    const getClipPath = (progress: number) => {
        switch (direction) {
            case 'right':
                return `inset(0 0 0 ${100 - progress}%)`;
            case 'center':
                const half = (100 - progress) / 2;
                return `inset(0 ${half}% 0 ${half}%)`;
            case 'left':
            default:
                return `inset(0 ${100 - progress}% 0 0)`;
        }
    };

    return (
        <span
            ref={containerRef}
            className={`relative inline-block cursor-pointer ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Base Text Layer */}
            <span
                className="relative transition-colors duration-300"
                style={{ color: baseColor }}
            >
                {children}
            </span>

            {/* Reveal Layer with Color Fill */}
            <motion.span
                className="absolute inset-0 pointer-events-none font-inherit"
                style={{
                    color: fillColor,
                    clipPath: isHovered
                        ? getClipPath(100)
                        : getClipPath(0),
                }}
                initial={false}
                animate={{
                    clipPath: isHovered
                        ? getClipPath(100)
                        : getClipPath(0),
                }}
                transition={{
                    duration,
                    ease: [0.22, 1, 0.36, 1], // ease-confident
                }}
            >
                {children}
            </motion.span>

            {/* Underline sweep effect */}
            <motion.span
                className="absolute bottom-0 left-0 h-[2px] origin-left"
                style={{
                    backgroundColor: fillColor,
                }}
                initial={{ scaleX: 0 }}
                animate={{
                    scaleX: isHovered ? 1 : 0,
                    originX: direction === 'right' ? 1 : 0,
                }}
                transition={{
                    duration: duration * 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: isHovered ? 0.05 : 0,
                }}
            />
        </span>
    );
}

/**
 * L225 Variant: Split Character Animation
 * Each character animates individually on hover
 */
interface SplitTextFillProps {
    children: string;
    className?: string;
    fillColor?: string;
    baseColor?: string;
    staggerDelay?: number;
}

export function SplitTextFill({
    children,
    className = '',
    fillColor = 'var(--wat-primary)',
    baseColor = 'var(--wat-text-muted)',
    staggerDelay = 0.02
}: SplitTextFillProps) {
    const [isHovered, setIsHovered] = useState(false);
    const characters = children.split('');

    return (
        <span
            className={`relative inline-block cursor-pointer ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    className="relative inline-block"
                    style={{ color: baseColor }}
                    animate={{
                        color: isHovered ? fillColor : baseColor,
                        y: isHovered ? -2 : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                        delay: isHovered
                            ? index * staggerDelay
                            : (characters.length - index) * staggerDelay,
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
}

/**
 * L225 Variant: Gradient Sweep Fill
 * Gradient color sweep on hover
 */
interface GradientTextFillProps {
    children: string;
    className?: string;
    gradientFrom?: string;
    gradientTo?: string;
    baseColor?: string;
}

export function GradientTextFill({
    children,
    className = '',
    gradientFrom = 'var(--wat-primary)',
    gradientTo = 'var(--wat-secondary)',
    baseColor = 'var(--wat-text-muted)'
}: GradientTextFillProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className={`relative inline-block cursor-pointer ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Base Layer */}
            <span style={{ color: baseColor }}>
                {children}
            </span>

            {/* Gradient Overlay */}
            <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {children}
            </motion.span>
        </span>
    );
}

export default TextFillHover;
