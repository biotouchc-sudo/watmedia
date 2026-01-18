"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSoundSystem } from "@/components/ui/SoundSystem";

/**
 * Level 110: Voice Command Interface
 * "Jarvis-lite" for the website.
 * Listens for "Hey WAT" or specific keywords when active.
 * 
 * Note: Browser support varies. We wrap safely.
 */
export function VoiceInterface() {
    const [isListening, setIsListening] = useState(false);
    const router = useRouter();
    const { play } = useSoundSystem();

    useEffect(() => {
        // Check support
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
            const command = event.results[0][0].transcript.toLowerCase();
            // Simple command mapping
            if (command.includes("contact") || command.includes("talk")) {
                router.push("/contact");
                play("success");
                toast("Navigating to Contact...");
            } else if (command.includes("home") || command.includes("main")) {
                router.push("/");
                play("success");
                toast("Going Home...");
            } else if (command.includes("projects") || command.includes("work")) {
                router.push("/projects");
                play("success");
            }
            setIsListening(false);
        };

        recognition.onerror = () => {
            setIsListening(false);
        };

        // Add global key listener (Space+V ?) or just expose via hook later.
        // For now, we just define the logic.

        // Cleanup
        return () => {
            recognition.stop();
        };
    }, [router, play]);

    return null; // Headless component
}
