"use client";
import { useEffect } from "react";
import { toast } from "sonner";

/**
 * Level 46: Returning User Memory
 * Detects if the user has visited before and welcomes them back.
 */
export function useWelcomeBack() {
  useEffect(() => {
    // Check if code is running in browser
    if (typeof window === "undefined") return;

    const hasVisited = localStorage.getItem("wat_visited");
    
    // If user has visited before, welcome them back
    if (hasVisited) {
      // Small delay to not overwhelm on load
      setTimeout(() => {
        toast("Welcome back, Commander.", {
          description: "Systems are fully operational.",
          duration: 4000,
          action: {
            label: "Dismiss",
            onClick: () => console.log("Welcome back dismissed"),
          },
        });
      }, 1500);
    } else {
      // First visit, mark it
      localStorage.setItem("wat_visited", "true");
    }
  }, []);
}
