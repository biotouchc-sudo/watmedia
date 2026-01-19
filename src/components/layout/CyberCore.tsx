"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Level 68: Cyber Core
 * A "living" geometry that reacts to time and potentially user interaction.
 * Represents the "Brain" aspect of the Duality Protocol in 3D space.
 */
export function CyberCore() {
    const points = useRef<THREE.Points>(null);

    useFrame((state, delta) => {
        if (!points.current) return;
        points.current.rotation.x -= delta / 10;
        points.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.05} // Subtle size
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function Points({ children }: { children: React.ReactNode }) {
    const count = 2000; // Number of stars
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color("#D4AF37"); // Gold tint

        for (let i = 0; i < count; i++) {
            const r = (Math.random() - 0.5) * 10; // Spread
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            const x = 10 * Math.sin(phi) * Math.cos(theta); // Sphere distribution
            const y = 10 * Math.sin(phi) * Math.sin(theta);
            const z = 10 * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Varied opacity/brightness hack via color
            color.setHSL(0.12, 0.8, Math.random() * 0.5 + 0.1);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }
        return [positions, colors];
    }, [count]);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            {children}
        </points>
    );
}
