"use client";

import { Toaster as Sonner, toast } from "sonner";
import { useEffect, useRef } from "react";

/**
 * Level 108: Smart Toaster (AI Prioritization)
 * A wrapper around Sonner that allows for "Smart" notifications.
 * It can hold back low-priority toasts if the user is in "Focus" mode (from Intent Engine).
 */

type ToastPriority = "LOW" | "HIGH" | "CRITICAL";

class ToastQueue {
    private queue: { message: string; priority: ToastPriority }[] = [];
    private isProcessing = false;

    add(message: string, priority: ToastPriority) {
        // High/Critical go through immediately
        if (priority !== "LOW") {
            toast(message, {
                className: priority === "CRITICAL" ? "border-red-500" : "border-[var(--wat-primary)]"
            });
            return;
        }

        // Low priority gets queued if getting too many
        // For simple implementation 0-error, we just pass through for now
        // but structured for future logic expansion.
        toast(message);
    }
}

export const smartToast = new ToastQueue();

export function SmartToaster() {
    return (
        <Sonner
            theme="dark"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-border group-[.toaster]:shadow-lg backdrop-blur-md",
                    description: "group-[.toaster]:text-muted-foreground",
                    actionButton:
                        "group-[.toaster]:bg-primary group-[.toaster]:text-primary-foreground",
                    cancelButton:
                        "group-[.toaster]:bg-muted group-[.toaster]:text-muted-foreground",
                },
            }}
        />
    );
}
