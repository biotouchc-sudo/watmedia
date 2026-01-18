"use client";

import { useWelcomeBack } from "@/hooks/useWelcomeBack";

/**
 * Level 46: Returning User Memory (Client Component)
 * This component simply invokes the hook to ensure it runs on the client.
 */
export function ReturningUserWelcomer() {
    useWelcomeBack();
    return null;
}
