"use client";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from '@react-three/fiber';

export default function Butterfly({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            // 蝴蝶飞舞动画
            meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.1;
            meshRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.2;
        }
    });
    return (
        <>
            <group ref={meshRef} position={position}>
                {/* 蝴蝶翅膀 */}
                <mesh castShadow>
                    <boxGeometry args={[0.2, 0.01, 0.3]} />
                    <meshStandardMaterial color="#4169E1" transparent opacity={0.6} />
                </mesh>
                <mesh castShadow rotation={[0, 0, Math.PI / 4]}>
                    <boxGeometry args={[0.2, 0.01, 0.3]} />
                    <meshStandardMaterial color="#4169E1" transparent opacity={0.6} />
                </mesh>
            </group>
        </>
    )
}