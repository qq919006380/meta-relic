"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

interface WishCoinProps {
    position: [number, number, number];
    onAnimationComplete: () => void;
}

export default function WishCoin({ position, onAnimationComplete }: WishCoinProps) {
    const coinRef = useRef<THREE.Mesh>(null);
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        setAnimationStarted(true);
    }, []);

    useFrame(() => {
        if (coinRef.current && animationStarted) {
            coinRef.current.rotation.y += 0.1;

            if (coinRef.current.position.y > -0.6) {
                coinRef.current.position.y -= 0.05;
            } else {
                onAnimationComplete();
            }
        }
    });
    return (
        <>
            <mesh ref={coinRef} position={position}>
                <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
                <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
            </mesh>
        </>
    )
}