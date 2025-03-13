"use client";

export default function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
    return (
        <>
            <group position={position}>
                {/* 树干 */}
                <mesh position={[0, scale * 0.7, 0]} castShadow>
                    <cylinderGeometry args={[scale * 0.1, scale * 0.15, scale * 1.4, 8]} />
                    <meshStandardMaterial color="#4A3B22" roughness={0.9} />
                </mesh>
                {/* 树冠 */}
                <mesh position={[0, scale * 1.5, 0]} castShadow>
                    <coneGeometry args={[scale * 0.6, scale * 1.6, 8]} />
                    <meshStandardMaterial color="#1B4D3E" roughness={0.8} />
                </mesh>
            </group>
        </>
    )
}