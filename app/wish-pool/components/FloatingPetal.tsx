"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

export default function FloatingPetal({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            // 花瓣飘落动画
            meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() + position[0]) * 0.1;
            meshRef.current.position.x = position[0] + Math.cos(clock.getElapsedTime() * 0.5) * 0.1;
            meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
        }
    });
    return (
        <>
            <mesh ref={meshRef} position={position} rotation={[0, 0, Math.PI / 4]} castShadow>
                <planeGeometry args={[0.1, 0.1]} />
                <meshStandardMaterial color="#FFB7C5" side={THREE.DoubleSide} transparent opacity={0.8} />
            </mesh>
        </>
    )
}