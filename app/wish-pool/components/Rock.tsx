"use client";

export default function Rock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    return (
        <>
            <mesh position={position} castShadow>
                <dodecahedronGeometry args={[scale * 0.5]} />
                <meshStandardMaterial color="#696969" roughness={0.8} />
            </mesh>
        </>
    )
}