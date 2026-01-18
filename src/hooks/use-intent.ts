import { useState, useRef, useCallback } from "react";

interface UseIntentOptions {
  delay?: number; // Time in ms to consider as "intent" (default: 150ms)
  onIntent?: () => void; // Callback when intent is detected
}

interface UseIntentReturn {
  isIntent: boolean;
  intentHandlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
}

/**
 * useIntent Hook
 * Detects if a user hovers over an element for a specific duration, signaling "intent".
 * Useful for prefetching, detailed tooltips, or expanding UI elements.
 */
export function useIntent({ delay = 150, onIntent }: UseIntentOptions = {}): UseIntentReturn {
  const [isIntent, setIsIntent] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setIsIntent(true);
      if (onIntent) onIntent();
    }, delay);
  }, [delay, onIntent]);

  const onMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setIsIntent(false);
  }, []);

  return {
    isIntent,
    intentHandlers: {
      onMouseEnter,
      onMouseLeave,
    },
  };
}
