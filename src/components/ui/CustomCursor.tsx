"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---
type CursorVariant = "default" | "text" | "button" | "video";

interface CursorContextType {
    setVariant: (variant: CursorVariant) => void;
    setText: (text: string) => void;
    setHidden: (hidden: boolean) => void;
}

// --- Context ---
const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
}

// --- Component ---
/**
 * Level 102: Contextual Cursor
 * A smart cursor that shapeshifts based on the element it's hovering over.
 * Provides immediate visual feedback about the interactability of elements.
 */
export function CursorProvider({ children }: { children: React.ReactNode }) {
    const [variant, setVariant] = useState<CursorVariant>("default");
    const [text, setText] = useState("");
    const [hidden, setHidden] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse movement
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    // Context value
    const value = {
        setVariant,
        setText,
        setHidden,
    };

    // Cursor Size & Style Logix
    const variants = {
        default: {
            height: 16,
            width: 16,
            backgroundColor: "var(--wat-primary)",
            mixBlendMode: "normal" as any,
        },
        button: {
            height: 64,
            width: 64,
            backgroundColor: "var(--wat-accent)",
            opacity: 0.5,
            mixBlendMode: "exclusion" as any,
        },
        text: {
            height: 32,
            width: 4, // Text cursor bar
            backgroundColor: "var(--wat-foreground)",
            mixBlendMode: "difference" as any,
        },
        video: {
            height: 80,
            width: 80,
            backgroundColor: "white",
            mixBlendMode: "exclusion" as any,
        },
    };

    return (
        <CursorContext.Provider value={value}>
            {children}

            {/* The Actual Cursor Element */}
            <motion.div
                className={cn(
                    "fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center rounded-full backdrop-blur-[1px]",
                    hidden ? "opacity-0" : "opacity-100"
                )}
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    x: "-50%", // Center align
                    y: "-50%",
                    ...variants[variant],
                }}
            >
                {variant === "video" && (
                    <span className="text-xs font-bold text-black overflow-hidden whitespace-nowrap">
                        {text || "PLAY"}
                    </span>
                )}
            </motion.div>
        </CursorContext.Provider>
    );
}
