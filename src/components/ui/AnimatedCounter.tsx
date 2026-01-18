'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
    value: number
    suffix?: string
    prefix?: string
    duration?: number
    className?: string
}

/**
 * Animated number counter that counts up when visible
 */
export function AnimatedCounter({
    value,
    suffix = '',
    prefix = '',
    duration = 2000,
    className = '',
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isInView) return

        let start = 0
        const step = value / (duration / 16)
        let animationFrame: number

        const animate = () => {
            start += step
            if (start >= value) {
                setCount(value)
            } else {
                setCount(Math.floor(start))
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [isInView, value, duration])

    return (
        <span ref={ref} className={className}>
            {prefix}{count.toLocaleString('ar-SA')}{suffix}
        </span>
    )
}

/**
 * Animated counter with percentage formatting
 */
export function AnimatedPercentage({
    value,
    duration = 2000,
    className = '',
}: Omit<AnimatedCounterProps, 'suffix' | 'prefix'>) {
    return (
        <AnimatedCounter
            value={value}
            suffix="%"
            duration={duration}
            className={className}
        />
    )
}
