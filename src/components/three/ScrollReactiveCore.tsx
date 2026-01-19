"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * L207: Scroll-Linked 3D Core
 * CyberCore that reacts to scroll position for immersive depth.
 */

interface ScrollReactiveCoreProps {
    scrollY: number; // 0-1 normalized scroll progress
    baseColor?: string;
    accentColor?: string;
}

export function ScrollReactiveCore({
    scrollY,
    baseColor = "#E6D5AC",
    accentColor = "#C4A470"
}: ScrollReactiveCoreProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Custom shader for organic feel
    const shader = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uScroll: { value: 0 },
            uBaseColor: { value: new THREE.Color(baseColor) },
            uAccentColor: { value: new THREE.Color(accentColor) },
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            uniform float uTime;
            uniform float uScroll;
            
            void main() {
                vUv = uv;
                vNormal = normal;
                
                // Organic displacement based on scroll
                vec3 pos = position;
                float displacement = sin(pos.x * 3.0 + uTime) * 
                                   cos(pos.y * 3.0 + uTime) * 
                                   0.1 * (1.0 + uScroll * 0.5);
                pos += normal * displacement;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            uniform float uTime;
            uniform float uScroll;
            uniform vec3 uBaseColor;
            uniform vec3 uAccentColor;
            
            void main() {
                // Fresnel effect
                float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                
                // Color gradient based on scroll
                vec3 color = mix(uBaseColor, uAccentColor, fresnel + uScroll * 0.3);
                
                // Subtle pulse
                float pulse = sin(uTime * 0.5) * 0.1 + 0.9;
                
                gl_FragColor = vec4(color * pulse, 0.8 - uScroll * 0.3);
            }
        `,
    }), [baseColor, accentColor]);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
            materialRef.current.uniforms.uScroll.value = scrollY;
        }

        if (meshRef.current) {
            // Rotate based on scroll
            meshRef.current.rotation.y = scrollY * Math.PI * 2;
            meshRef.current.rotation.x = Math.sin(scrollY * Math.PI) * 0.3;

            // Scale pulse
            const scale = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
            meshRef.current.scale.setScalar(scale * (1 + scrollY * 0.2));
        }
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1, 4]} />
            <shaderMaterial
                ref={materialRef}
                {...shader}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
