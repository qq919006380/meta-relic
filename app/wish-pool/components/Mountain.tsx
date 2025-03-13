"use client";

export default function Mountain({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    return (
        <>
            <mesh position={position} castShadow>
                <coneGeometry args={[scale * 2, scale * 3, 4]} />
                <meshStandardMaterial color="#4A5D23" roughness={1} />
            </mesh>
        </>
    )
}