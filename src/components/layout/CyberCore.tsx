"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Level 68: Cyber Core
 * A "living" geometry that reacts to time and potentially user interaction.
 * Represents the "Brain" aspect of the Duality Protocol in 3D space.
 */
export function CyberCore() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Gentle floating rotation independent of the Float component
        meshRef.current.rotation.x = Math.sin(time / 4);
        meshRef.current.rotation.y = Math.sin(time / 2);
    });

    return (
        <Float
            speed={2} // Animation speed
            rotationIntensity={1} // XYZ rotation intensity
            floatIntensity={2} // Up/down float intensity
        >
            <mesh ref={meshRef} scale={1.5}>
                <icosahedronGeometry args={[1, 15]} />
                <MeshDistortMaterial
                    color="#D4AF37" // Brand Gold
                    envMapIntensity={0.8}
                    clearcoat={0.9}
                    clearcoatRoughness={0.1}
                    metalness={0.9}
                    roughness={0.2} // Shiny
                    distort={0.4} // Strength (0-1)
                    speed={2} // Speed of distortion
                />
            </mesh>
        </Float>
    );
}
