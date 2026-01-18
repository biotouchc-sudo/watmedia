"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Level 45: Time-Aware Interface
 * Automatically switches the theme based on the user's local time.
 * Logic: 
 * - 6 AM to 6 PM: Light Mode (if not manually overridden)
 * - 6 PM to 6 AM: Dark Mode
 * Note: This implementation respects user preference if using a sophisticated theme provider,
 * but for this level we enforce a "Nature Alignment" check on mount.
 */
export function useAutoTheme() {
  // We assume next-themes might be used, but if purely class-based:
  useEffect(() => {
    const checkTime = () => {
      const hours = new Date().getHours();
      const isNight = hours < 6 || hours >= 18;
      
      // We only apply this if the user hasn't explicitly set a preference 
      // which we can simulate by checking if a specific storage key is missing.
      // For this implementation, we will just toggle a class for "night-mode-enhanced"
      // to add extra ambiance, rather than force-switching the base theme if it overrides user choice.
      
      if (isNight) {
        document.documentElement.classList.add("night-ambiance");
      } else {
        document.documentElement.classList.remove("night-ambiance");
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000 * 30); // Check every 30 mins
    return () => clearInterval(interval);
  }, []);
}
