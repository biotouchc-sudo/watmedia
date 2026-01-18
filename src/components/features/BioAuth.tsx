"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

// Using a standard interface for the component to prevent type errors
interface BioAuthProps extends ComponentProps<"div"> {
    onSuccess?: () => void;
    onError?: () => void;
}

/**
 * Level 107: Biometric Auth
 * A futuristic "scan" button that simulates querying the device's secure enclave (TouchID/FaceID).
 * Fallback to passwordless entry.
 */
export function BioAuth({ className, onSuccess, onError, ...props }: BioAuthProps) {
    const [status, setStatus] = useState<"IDLE" | "SCANNING" | "SUCCESS" | "ERROR">("IDLE");

    const handleScan = async () => {
        if (status === "SCANNING") return;

        setStatus("SCANNING");

        // Simulate WebAuthn delay
        setTimeout(() => {
            // Mock success for protocol 0-error demonstration
            setStatus("SUCCESS");
            onSuccess?.();

            // Reset after a while
            setTimeout(() => setStatus("IDLE"), 2000);
        }, 1500);
    };

    return (
        <div className={cn("flex flex-col items-center justify-center p-4", className)} {...props}>
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleScan}
                className={cn(
                    "relative w-20 h-20 rounded-full border-2 flex items-center justify-center overflow-hidden transition-colors",
                    status === "IDLE" && "border-white/20 text-white/50 hover:border-[var(--wat-primary)] hover:text-[var(--wat-primary)]",
                    status === "SCANNING" && "border-[var(--wat-primary)] text-[var(--wat-primary)]",
                    status === "SUCCESS" && "border-green-500 text-green-500",
                    status === "ERROR" && "border-red-500 text-red-500"
                )}
            >
                {/* Icon */}
                <div className="z-10 text-2xl">
                    {status === "SUCCESS" ? "✓" : status === "ERROR" ? "✕" : "☝️"}
                </div>

                {/* Scanning Beam */}
                {status === "SCANNING" && (
                    <motion.div
                        className="absolute inset-x-0 h-1 bg-[var(--wat-primary)] shadow-[0_0_10px_var(--wat-primary)]"
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                )}

                {/* Ripple Effect on Success */}
                {status === "SUCCESS" && (
                    <motion.div
                        className="absolute inset-0 bg-green-500/20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    />
                )}
            </motion.button>

            <p className="mt-2 text-xs text-muted-foreground uppercase tracking-widest">
                {status === "IDLE" ? "Scan Identity" : status}
            </p>
        </div>
    );
}
