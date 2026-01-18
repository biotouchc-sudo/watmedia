"use client";

import Link from "next/link";
import type { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useCursor } from "./CustomCursor";
import { useIntentEngine } from "@/hooks/useIntentEngine";
import { cn } from "@/lib/utils";

interface SmartLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: string;
    cursorType?: "button" | "video" | "text"; // Override cursor type
    cursorText?: string;
    prefetchScore?: number; // Score threshold to trigger prefetch (0-100)
}

/**
 * Level 103: Predictive Prefetching + Contextual Link
 * - Notifies the Cursor System on hover.
 * - Uses Intent Engine to smartly prefetch routes even before hover if implemented fully,
 *   or ensures prefetch happens only when user is "Focused" (saving bandwidth on "Rushing").
 */
export function SmartLink({
    children,
    className,
    cursorType = "button",
    cursorText = "",
    prefetchScore = 50,
    ...props
}: SmartLinkProps) {
    const router = useRouter();
    const { setVariant, setText } = useCursor();
    const { score, status } = useIntentEngine();

    const handleMouseEnter = () => {
        setVariant(cursorType);
        if (cursorText) setText(cursorText);

        // Smart Prefetch Logic
        // Only prefetch if user is NOT rushing, or if they are genuinely hovering.
        if (status !== "RUSHING" || score > prefetchScore) {
            router.prefetch(props.href.toString());
        }
    };

    const handleMouseLeave = () => {
        setVariant("default");
        setText("");
    };

    return (
        <Link
            {...props}
            className={cn("transition-colors", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </Link>
    );
}
