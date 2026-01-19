"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * L238: Explainable AI Nudges
 * Provides contextual suggestions with transparent reasoning.
 */
interface AINudgeProps {
    suggestion: string;
    reasoning: string;
    action?: () => void;
    actionLabel?: string;
    dismissable?: boolean;
    className?: string;
}

export function AINudge({
    suggestion,
    reasoning,
    action,
    actionLabel = "Apply",
    dismissable = true,
    className,
}: AINudgeProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [showReasoning, setShowReasoning] = useState(false);

    if (!isVisible) return null;

    return (
        <motion.div
            className={cn(
                "p-4 rounded-xl bg-[var(--wat-surface)] border border-[var(--wat-primary)]/20 relative",
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div className="flex-1">
                    <p className="text-white font-medium">{suggestion}</p>

                    <button
                        onClick={() => setShowReasoning(!showReasoning)}
                        className="text-xs text-[var(--wat-text-muted)] hover:text-[var(--wat-primary)] mt-1 underline underline-offset-2"
                    >
                        {showReasoning ? "Hide reasoning" : "Why this suggestion?"}
                    </button>

                    <AnimatePresence>
                        {showReasoning && (
                            <motion.p
                                className="text-sm text-[var(--wat-text-muted)] mt-2 p-2 bg-white/5 rounded-lg"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                {reasoning}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {action && (
                        <button
                            onClick={action}
                            className="mt-3 px-4 py-1.5 bg-[var(--wat-primary)] text-black rounded-lg text-sm font-medium hover:bg-white transition-colors"
                        >
                            {actionLabel}
                        </button>
                    )}
                </div>

                {dismissable && (
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-[var(--wat-text-muted)] hover:text-white"
                    >
                        ✕
                    </button>
                )}
            </div>
        </motion.div>
    );
}

/**
 * L239: Behavioral Color Accents
 * Colors that shift based on user behavior patterns.
 */
type Behavior = "exploring" | "focused" | "hesitant" | "decisive";

export function useBehavioralColors() {
    const [behavior, setBehavior] = useState<Behavior>("exploring");
    const [scrollCount, setScrollCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollCount(prev => prev + 1);
        const handleClick = () => setClickCount(prev => prev + 1);

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        // Analyze behavior based on patterns
        if (clickCount > 10 && scrollCount < 5) {
            setBehavior("decisive"); // Lots of clicks, little scrolling
        } else if (scrollCount > 20 && clickCount < 3) {
            setBehavior("exploring"); // Lots of scrolling, few clicks
        } else if (scrollCount > 10 && clickCount > 5) {
            setBehavior("focused"); // Engaged with content
        } else {
            setBehavior("hesitant"); // Not much interaction
        }
    }, [scrollCount, clickCount]);

    const getAccentColor = useCallback(() => {
        const colors = {
            exploring: "var(--wat-secondary)",    // Cool, inviting
            focused: "var(--wat-primary)",        // Warm, affirming
            hesitant: "#60A5FA",                  // Calm blue
            decisive: "#34D399",                  // Action green
        };
        return colors[behavior];
    }, [behavior]);

    return { behavior, getAccentColor };
}

/**
 * L253: Consent-First Analytics Component
 * Analytics that only activate after explicit consent.
 */
interface ConsentBannerProps {
    onAccept: () => void;
    onDecline: () => void;
    className?: string;
}

export function ConsentBanner({ onAccept, onDecline, className }: ConsentBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <motion.div
            className={cn(
                "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] p-4 rounded-2xl glass z-50",
                className
            )}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h4 className="text-white font-bold mb-2">🍪 نحترم خصوصيتك</h4>
            <p className="text-sm text-[var(--wat-text-muted)] mb-4">
                نستخدم تحليلات مجهولة الهوية لتحسين تجربتك. لا نتتبع بياناتك الشخصية أبداً.
            </p>
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        onAccept();
                        setIsVisible(false);
                    }}
                    className="flex-1 py-2 bg-[var(--wat-primary)] text-black rounded-lg font-medium hover:bg-white transition-colors"
                >
                    موافق
                </button>
                <button
                    onClick={() => {
                        onDecline();
                        setIsVisible(false);
                    }}
                    className="flex-1 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                    لا شكراً
                </button>
            </div>
        </motion.div>
    );
}

/**
 * L254: One-Click Proof Generator
 * Generates shareable proof/testimonial cards.
 */
interface ProofCardProps {
    metric: string;
    value: string;
    description: string;
    onShare?: () => void;
    className?: string;
}

export function ProofCard({
    metric,
    value,
    description,
    onShare,
    className
}: ProofCardProps) {
    return (
        <div className={cn(
            "glass p-6 rounded-2xl text-center relative overflow-hidden",
            className
        )}>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--wat-primary)]/10 to-transparent" />

            <p className="text-xs uppercase tracking-widest text-[var(--wat-text-muted)] mb-2">
                {metric}
            </p>
            <p className="text-5xl font-bold text-[var(--wat-primary)] mb-2">
                {value}
            </p>
            <p className="text-sm text-[var(--wat-text-muted)]">
                {description}
            </p>

            {onShare && (
                <button
                    onClick={onShare}
                    className="mt-4 px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors flex items-center gap-2 mx-auto"
                >
                    <span>📤</span>
                    Share Proof
                </button>
            )}
        </div>
    );
}
