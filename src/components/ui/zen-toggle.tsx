"use client";

import { useState, useEffect } from "react";
import { Button } from "./Button";
import { EyeOff, Eye } from "lucide-react";

/**
 * Level 21: Zen Mode
 * A toggle that fades out sidebar/header/footer to let the user focus on reading.
 */
export function ZenToggle() {
    const [isZen, setIsZen] = useState(false);

    useEffect(() => {
        if (isZen) {
            document.body.classList.add("zen-mode");
        } else {
            document.body.classList.remove("zen-mode");
        }
    }, [isZen]);

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsZen(!isZen)}
            className="fixed bottom-4 left-4 z-50 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10 text-white shadow-lg transition-all duration-300"
            title={isZen ? "Exit Zen Mode" : "Enter Zen Mode"}
        >
            {isZen ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </Button>
    );
}
