"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface IntentState {
  velocity: number; // pixels per ms
  isRapid: boolean;
  score: number; // 0-100 interest score
  status: "IDLE" | "FOCUS" | "RUSHING";
}

/**
 * Level 42: Intent Engine
 * Tracks cursor biometrics to determine user psychological state.
 * - High Velocity + Straight Lines = Goal Oriented (Rushing)
 * - Low Velocity + Curves = Exploring/Reading (Focus)
 * - Zero Velocity = Idle or Deep Reading
 */
export function useIntentEngine(): IntentState {
  const [state, setState] = useState<IntentState>({
    velocity: 0,
    isRapid: false,
    score: 0,
    status: "IDLE",
  });

  const lastPos = useRef({ x: 0, y: 0, time: 0 });
  const points = useRef<{ x: number; y: number; time: number }[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    const dt = now - lastPos.current.time;
    if (dt < 16) return; // Cap at ~60fps analysis

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const velocity = dist / dt; // px/ms

    // Update history for smoothing
    points.current.push({ x: e.clientX, y: e.clientY, time: now });
    if (points.current.length > 10) points.current.shift();

    // Determine status
    let status: IntentState["status"] = "IDLE";
    let score = state.score;

    if (velocity > 1.5) {
      status = "RUSHING";
      score = Math.min(score - 1, 0); // Rush kills focus score
    } else if (velocity > 0 && velocity < 0.2) {
      status = "FOCUS";
      score = Math.min(score + 2, 100); // Slow movement builds focus
    } else {
      status = "IDLE";
    }

    lastPos.current = { x: e.clientX, y: e.clientY, time: now };

    setState({
      velocity: parseFloat(velocity.toFixed(2)),
      isRapid: velocity > 2,
      score,
      status,
    });
  }, [state.score]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return state;
}
