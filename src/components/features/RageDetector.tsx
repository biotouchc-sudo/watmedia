"use client";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { MessageSquareHeart } from "lucide-react";

/**
 * Level 81: Rage Click Detector
 * Detects if a user clicks rapidly in the same area (sign of frustration)
 * and proactively offers assistance.
 */
export function RageDetector() {
    const clicks = useRef<{ x: number; y: number; time: number }[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const now = Date.now();
            // Keep only clicks from the last 1000ms
            clicks.current = clicks.current.filter((c) => now - c.time < 1000);

            // Add new click
            clicks.current.push({ x: e.clientX, y: e.clientY, time: now });

            // Check for rage click pattern (3+ clicks in <1s within small radius)
            if (clicks.current.length >= 3) {
                // Calculate distance between first and last click to ensure it's the same spot
                const first = clicks.current[0];
                const last = clicks.current[clicks.current.length - 1];
                const dist = Math.sqrt(Math.pow(last.x - first.x, 2) + Math.pow(last.y - first.y, 2));

                if (dist < 50) { // 50px radius
                    toast.info("هل تواجه مشكلة؟", {
                        description: "لاحظنا بعض الصعوبة في التفاعل. هل تحتاج إلى مساعدة فورية؟",
                        icon: <MessageSquareHeart className="w-5 h-5 text-rose-500" />,
                        duration: 5000,
                        action: {
                            label: "تواصل معنا",
                            onClick: () => window.location.href = "/contact",
                        },
                    });
                    // Reset to avoid spamming
                    clicks.current = [];
                }
            }
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return null;
}
