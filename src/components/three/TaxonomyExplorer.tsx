"use client";

import { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * L209: Visual Taxonomy Explorer
 * A 3D interactive map of the site structure.
 */

interface SiteNode {
    id: string;
    label: string;
    path: string;
    children?: SiteNode[];
    position?: [number, number, number];
}

const defaultSiteMap: SiteNode[] = [
    { id: "home", label: "Home", path: "/", position: [0, 0, 0] },
    { id: "services", label: "Services", path: "/services", position: [-3, 1, 0] },
    { id: "portfolio", label: "Portfolio", path: "/portfolio", position: [3, 1, 0] },
    { id: "about", label: "About", path: "/about", position: [-2, -1, 0] },
    { id: "contact", label: "Contact", path: "/contact", position: [2, -1, 0] },
    { id: "dashboard", label: "Dashboard", path: "/dashboard", position: [0, 2, 0] },
];

interface NodeMeshProps {
    node: SiteNode;
    onHover: (id: string | null) => void;
    isHovered: boolean;
    onClick: (path: string) => void;
}

function NodeMesh({ node, onHover, isHovered, onClick }: NodeMeshProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hoverScale, setHoverScale] = useState(1);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.scale.lerp(
                new THREE.Vector3(hoverScale, hoverScale, hoverScale),
                0.1
            );
        }
    });

    useEffect(() => {
        setHoverScale(isHovered ? 1.3 : 1);
    }, [isHovered]);

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={node.position}>
                <mesh
                    ref={meshRef}
                    onPointerEnter={() => onHover(node.id)}
                    onPointerLeave={() => onHover(null)}
                    onClick={() => onClick(node.path)}
                >
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial
                        color={isHovered ? "#E6D5AC" : "#1A1A1A"}
                        emissive={isHovered ? "#E6D5AC" : "#333"}
                        emissiveIntensity={isHovered ? 0.5 : 0.1}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
                <Text
                    position={[0, 0.5, 0]}
                    fontSize={0.2}
                    color={isHovered ? "#E6D5AC" : "#888"}
                    anchorX="center"
                    anchorY="middle"
                >
                    {node.label}
                </Text>
            </group>
        </Float>
    );
}

function ConnectionLines({ nodes }: { nodes: SiteNode[] }) {
    const lineGeometry = useMemo(() => {
        const points: THREE.Vector3[] = [];
        const home = nodes.find(n => n.id === "home");
        if (!home?.position) return new THREE.BufferGeometry();

        nodes.forEach(node => {
            if (node.id !== "home" && node.position && home.position) {
                points.push(new THREE.Vector3(...home.position));
                points.push(new THREE.Vector3(...node.position));
            }
        });

        return new THREE.BufferGeometry().setFromPoints(points);
    }, [nodes]);

    return (
        <lineSegments geometry={lineGeometry}>
            <lineBasicMaterial color="#333" transparent opacity={0.3} />
        </lineSegments>
    );
}

interface TaxonomyExplorerProps {
    siteMap?: SiteNode[];
    onNavigate?: (path: string) => void;
    className?: string;
}

export function TaxonomyExplorer({
    siteMap = defaultSiteMap,
    onNavigate,
    className
}: TaxonomyExplorerProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const handleClick = (path: string) => {
        if (onNavigate) {
            onNavigate(path);
        } else {
            window.location.href = path;
        }
    };

    return (
        <div className={className} style={{ width: "100%", height: "400px" }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Suspense fallback={null}>
                    <ConnectionLines nodes={siteMap} />
                    {siteMap.map(node => (
                        <NodeMesh
                            key={node.id}
                            node={node}
                            onHover={setHoveredId}
                            isHovered={hoveredId === node.id}
                            onClick={handleClick}
                        />
                    ))}
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}
