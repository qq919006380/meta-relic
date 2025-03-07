"use client";
import * as THREE from 'three';
export default function Background() {
    return (
        <>
            {/* 远景背景 - 传统山水画风格 */}
            <mesh position={[0, 0, -15]} rotation={[0, 0, 0]}>
                <planeGeometry args={[40, 20]} />
                <meshStandardMaterial
                    color="#F5F0E6"
                    side={THREE.DoubleSide}
                    roughness={1}
                    metalness={0}
                    opacity={0.8}
                    transparent={true}
                />
            </mesh>
        </>
    )
}