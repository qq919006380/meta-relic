"use client";

export default function Mountain(prop: {
    position: [number, number, number],
    opacity: number,
    args: [number, number, number, number, boolean],
}) {
    return (
        <>
            {/* 远景山脉 */}
            <mesh position={prop.position} rotation={[0, Math.PI / 6, 0]}>
                <coneGeometry args={prop.args} />
                <meshStandardMaterial
                    color="#8B4513"
                    opacity={prop.opacity}
                    transparent={true}
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>
        </>
    )
}