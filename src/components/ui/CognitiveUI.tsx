"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * L231: Contextual Friction
 * Adds confirmation step for critical/destructive actions.
 */
interface ConfirmActionProps {
    children: React.ReactNode;
    onConfirm: () => void;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "info";
}

export function ConfirmAction({
    children,
    onConfirm,
    message = "Are you sure?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "warning",
}: ConfirmActionProps) {
    const [showConfirm, setShowConfirm] = useState(false);

    const variantStyles = {
        danger: "bg-red-500/20 border-red-500/50",
        warning: "bg-yellow-500/20 border-yellow-500/50",
        info: "bg-blue-500/20 border-blue-500/50",
    };

    return (
        <div className="relative inline-block">
            <div onClick={() => setShowConfirm(true)}>
                {children}
            </div>

            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        className={cn(
                            "absolute top-full left-0 mt-2 p-4 rounded-xl border backdrop-blur-sm z-50 min-w-[200px]",
                            variantStyles[variant]
                        )}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <p className="text-sm text-white mb-3">{message}</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    onConfirm();
                                    setShowConfirm(false);
                                }}
                                className="px-3 py-1.5 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
                            >
                                {confirmText}
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white transition-colors"
                            >
                                {cancelText}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * L232: Temporal UI States
 * UI that changes based on time of day or session duration.
 */
export function useTemporalState() {
    const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("afternoon");
    const [sessionDuration, setSessionDuration] = useState(0);

    useEffect(() => {
        // Determine time of day
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) setTimeOfDay("morning");
        else if (hour >= 12 && hour < 17) setTimeOfDay("afternoon");
        else if (hour >= 17 && hour < 21) setTimeOfDay("evening");
        else setTimeOfDay("night");

        // Track session duration
        const interval = setInterval(() => {
            setSessionDuration(prev => prev + 1);
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    // Get theme suggestions based on time
    const getThemeSuggestion = useCallback(() => {
        switch (timeOfDay) {
            case "morning": return { brightness: 1.1, warmth: 0.9 };
            case "afternoon": return { brightness: 1.0, warmth: 1.0 };
            case "evening": return { brightness: 0.95, warmth: 1.1 };
            case "night": return { brightness: 0.85, warmth: 0.8 };
        }
    }, [timeOfDay]);

    // Suggest breaks based on session duration
    const shouldSuggestBreak = sessionDuration >= 45;

    return {
        timeOfDay,
        sessionDuration,
        getThemeSuggestion,
        shouldSuggestBreak,
    };
}

/**
 * L234: Implicit Navigation
 * Predicts and suggests next likely navigation step.
 */
export function useImplicitNavigation() {
    const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
    const [predictions, setPredictions] = useState<string[]>([]);

    const recordNavigation = useCallback((path: string) => {
        setNavigationHistory(prev => [...prev.slice(-10), path]);
    }, []);

    // Simple prediction based on common patterns
    useEffect(() => {
        const last = navigationHistory[navigationHistory.length - 1];

        const patterns: Record<string, string[]> = {
            "/": ["/services", "/portfolio", "/about"],
            "/services": ["/contact", "/portfolio"],
            "/portfolio": ["/contact", "/services"],
            "/about": ["/contact", "/services"],
        };

        setPredictions(patterns[last] || ["/contact"]);
    }, [navigationHistory]);

    return {
        recordNavigation,
        predictions,
        navigationHistory,
    };
}

/**
 * L251: Interactive ROI Calculator Component
 */
interface ROICalculatorProps {
    baseRate?: number;
    className?: string;
}

export function ROICalculator({
    baseRate = 0.15,
    className
}: ROICalculatorProps) {
    const [investment, setInvestment] = useState(10000);
    const [months, setMonths] = useState(12);

    const projectedROI = investment * (1 + baseRate * (months / 12)) - investment;
    const projectedTotal = investment + projectedROI;

    return (
        <div className={cn("glass p-6 rounded-2xl", className)}>
            <h3 className="text-xl font-bold text-white mb-4">ROI Calculator</h3>

            <div className="space-y-4">
                <div>
                    <label className="text-sm text-[var(--wat-text-muted)]">Investment (SAR)</label>
                    <input
                        type="range"
                        min={1000}
                        max={100000}
                        step={1000}
                        value={investment}
                        onChange={(e) => setInvestment(Number(e.target.value))}
                        className="w-full mt-2"
                    />
                    <span className="text-[var(--wat-primary)] font-mono">{investment.toLocaleString()}</span>
                </div>

                <div>
                    <label className="text-sm text-[var(--wat-text-muted)]">Duration (Months)</label>
                    <input
                        type="range"
                        min={3}
                        max={24}
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        className="w-full mt-2"
                    />
                    <span className="text-[var(--wat-primary)] font-mono">{months}</span>
                </div>

                <div className="pt-4 border-t border-[var(--wat-glass-border)]">
                    <div className="flex justify-between text-sm">
                        <span className="text-[var(--wat-text-muted)]">Projected ROI:</span>
                        <span className="text-green-400 font-bold">+{projectedROI.toLocaleString()} SAR</span>
                    </div>
                    <div className="flex justify-between text-lg mt-2">
                        <span className="text-white">Total Value:</span>
                        <span className="text-[var(--wat-primary)] font-bold">{projectedTotal.toLocaleString()} SAR</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
