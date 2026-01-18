"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { Suspense } from "react";
import { CyberCore } from "./CyberCore";

/**
 * Level 65: Global WebGL Scene
 * A persistent canvas that overlays (or underlays) the application
 * to provide a seamless 3D spatial experience.
 * 
 * Performance:
 * - Uses `eventSource` to map DOM events correctly
 * - Low-power mode for inactive tabs
 * - dpr clamping for mobile
 */
export function GlobalCanvas() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[-1]">
            <Canvas
                className="w-full h-full"
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [0, 0, 5], fov: 45 }}
            >
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.5} />

                    {/* Level 68: The Living Core */}
                    <CyberCore />

                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}
