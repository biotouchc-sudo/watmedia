"use client";
import { useEffect } from "react";

/**
 * Level 51: Privacy Masking
 * Automatically blurs sensitive content when the user switches tabs or minimizes the window.
 * This is a "Zero-Trust" UI feature.
 */
export function usePrivacyBlur() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.classList.add("blur-sensitive");
        document.title = "🔒 Secured | WATMEDIA";
      } else {
        document.body.classList.remove("blur-sensitive");
        document.title = "WATMEDIA | مهندسو النمو الرقمي";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);
}
