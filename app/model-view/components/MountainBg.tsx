"use client";

export default function MountainBg() {
    return (
        <>
            {/* 更多远景山脉 - 层叠效果 */}
            {[0, 1, 2].map((i) => {
                const z = -16 - i * 3;
                const opacity = 0.5 - i * 0.1;
                return (
                    <group key={`mountain-layer-${i}`}>
                        <mesh position={[-15 - i * 5, 3, z]} rotation={[0, Math.PI / 6, 0]}>
                            <coneGeometry args={[8, 7, 16, 1, true]} />
                            <meshStandardMaterial
                                color={i === 0 ? "#8B4513" : "#6B8E23"}
                                opacity={opacity}
                                transparent={true}
                                roughness={0.9}
                                metalness={0.1}
                            />
                        </mesh>
                        <mesh position={[15 + i * 5, 2, z]} rotation={[0, -Math.PI / 6, 0]}>
                            <coneGeometry args={[10, 5, 16, 1, true]} />
                            <meshStandardMaterial
                                color={i === 0 ? "#8B4513" : "#6B8E23"}
                                opacity={opacity}
                                transparent={true}
                                roughness={0.9}
                                metalness={0.1}
                            />
                        </mesh>
                    </group>
                );
            })}
        </>
    )
}